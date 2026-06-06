// --- 1. RADAR BASE CONFIGURATION & LAYOUT COORDINATES ---
const CANVAS = document.getElementById('radarScreen');
const CTX = CANVAS.getContext('2d');

const CENTER_X = window.innerWidth * 0.35; 
const CENTER_Y = window.innerHeight * 0.5;
const RADAR_RADIUS = Math.min(window.innerWidth, window.innerHeight) * 0.44;

let flights = [];
let selectedFlight = null;
let score = 0;
let simTime = new Date();

const AIRPORT_LAYOUT = {
    tower: { x: CENTER_X, y: CENTER_Y },
    runways: [
        { id: "09L/27R", x1: CENTER_X - 180, y1: CENTER_Y - 45, x2: CENTER_X + 180, y2: CENTER_Y - 45 },
        { id: "09R/27L", x1: CENTER_X - 180, y1: CENTER_Y + 45, x2: CENTER_X + 180, y2: CENTER_Y + 45 }
    ],
    gates: [
        { id: "G1", x: CENTER_X - 90, y: CENTER_Y - 10, status: "VACANT", flightId: null, progress: 0, task: null },
        { id: "G2", x: CENTER_X - 30, y: CENTER_Y - 10, status: "VACANT", flightId: null, progress: 0, task: null },
        { id: "G3", x: CENTER_X + 30, y: CENTER_Y - 10, status: "VACANT", flightId: null, progress: 0, task: null },
        { id: "G4", x: CENTER_X + 90, y: CENTER_Y - 10, status: "VACANT", flightId: null, progress: 0, task: null }
    ],
    taxiways: [
        { name: "T1", x1: CENTER_X - 160, y1: CENTER_Y - 25, x2: CENTER_X + 160, y2: CENTER_Y - 25 },
        { name: "T2", x1: CENTER_X - 160, y1: CENTER_Y + 25, x2: CENTER_X + 160, y2: CENTER_Y + 25 },
        { name: "C1", x1: CENTER_X - 140, y1: CENTER_Y - 45, x2: CENTER_X - 140, y2: CENTER_Y + 45 },
        { name: "C2", x1: CENTER_X + 140, y1: CENTER_Y - 45, x2: CENTER_X + 140, y2: CENTER_Y + 45 }
    ]
};

let gates = AIRPORT_LAYOUT.gates;

// --- 2. THE INTELLIGENT FLIGHT AGENT CLASS ---
class Flight {
    constructor() {
        this.id = this.generateCallsign();
        
        const spawnAngle = Math.random() * Math.PI * 2;
        this.x = CENTER_X + Math.cos(spawnAngle) * (RADAR_RADIUS * 0.95);
        this.y = CENTER_Y + Math.sin(spawnAngle) * (RADAR_RADIUS * 0.95);

        this.intendsToLand = Math.random() < 0.70;

        if (this.intendsToLand) {
            this.status = 'INBOUND'; 
            this.altitude = Math.floor(Math.random() * 3 + 5) * 1000; 
            this.targetAltitude = this.altitude;
            this.speed = 190;
            
            let angleToRwy = Math.atan2(AIRPORT_LAYOUT.runways[0].y1 - this.y, AIRPORT_LAYOUT.runways[0].x1 - this.x) * (180 / Math.PI);
            this.heading = Math.round((angleToRwy + 360 + 90) % 360);
        } else {
            this.status = 'TRANSIT'; 
            this.altitude = Math.floor(Math.random() * 3 + 9) * 1000; 
            this.targetAltitude = this.altitude;
            this.speed = 260;
            this.heading = Math.floor(Math.random() * 360); 
        }
        
        this.currentHeading = this.heading;
        this.history = [];
        this.hasRequestedClearance = false;
        this.assignedGate = null;

        logComm(this.id, `${this.status === 'TRANSIT' ? 'Enroute transit traffic crossing sector' : 'Inbound arrival tracking close pattern'}. Alt: ${this.altitude} ft, Heading: ${this.heading}°`);
    }

    generateCallsign() {
        const airlines = ['AIC', 'IND', 'UAE', 'BAW', 'QTR', 'CCA'];
        return `${airlines[Math.floor(Math.random() * airlines.length)]}${Math.floor(Math.random() * 890 + 100)}`;
    }

    update() {
        if (Math.random() < 0.12) {
            this.history.push({ x: this.x, y: this.y });
            if (this.history.length > 6) this.history.shift();
        }

        if (this.status !== 'GROUND') {
            
            // Smoothly turn towards target heading
            if (this.currentHeading !== this.heading) {
                let angularDiff = (this.heading - this.currentHeading + 360) % 360;
                this.currentHeading += angularDiff > 180 ? -1 : 1;
                this.currentHeading = (this.currentHeading + 360) % 360;
            }

            // Smooth altitude transition
            if (this.altitude < this.targetAltitude) this.altitude += 20;
            if (this.altitude > this.targetAltitude) this.altitude -= 20;

            const standardRad = (this.currentHeading - 90) * (Math.PI / 180);
            const scalarVelocity = this.speed * 0.0015; 
            this.x += Math.cos(standardRad) * scalarVelocity;
            this.y += Math.sin(standardRad) * scalarVelocity;

            // Trigger radio request when close
            if (this.status === 'INBOUND' && !this.hasRequestedClearance) {
                let distToRunway = Math.hypot(AIRPORT_LAYOUT.runways[0].x1 - this.x, AIRPORT_LAYOUT.runways[0].y1 - this.y);
                if (distToRunway < RADAR_RADIUS * 0.6) {
                    this.hasRequestedClearance = true;
                    this.status = 'AWAITING_REPLY';
                    logComm(this.id, `Intercepting approach corridor. Requesting landing instructions.`);
                    if (selectedFlight === this) selectFlight(this);
                }
            }

            // --- REALISTIC APPROACH PHASE 1: VECTORING TO INTERCEPT POINT ---
            if (this.status === 'VECTORING') {
                const rwyThreshold = AIRPORT_LAYOUT.runways[0];
                const interceptX = rwyThreshold.x1 - 150; // The Final Approach Fix (Far West of runway)
                const interceptY = rwyThreshold.y1; // Perfectly aligned with runway Y centerline

                // Continuously update heading to hit the Intercept Point
                let angleToIntercept = Math.atan2(interceptY - this.y, interceptX - this.x) * (180 / Math.PI);
                this.heading = Math.round((angleToIntercept + 360 + 90) % 360);

                // If we reach the intercept point, turn onto Final Approach
                if (Math.hypot(interceptX - this.x, interceptY - this.y) < 15) {
                    this.status = 'FINAL_APPROACH';
                    this.heading = 90; // Face strictly East down the runway
                    this.currentHeading = 90; // Snap turn to lock on
                    this.y = interceptY; // Snap perfectly to the centerline
                    this.targetAltitude = 0; // Begin final descent
                    this.speed = 130; // Final approach landing speed
                    logComm(this.id, `Localizer intercepted. Established on final approach Runway 09L.`);
                    if (selectedFlight === this) selectFlight(this);
                }
            }

            // --- REALISTIC APPROACH PHASE 2: FINAL APPROACH ---
            if (this.status === 'FINAL_APPROACH') {
                const rwyThreshold = AIRPORT_LAYOUT.runways[0];
                this.heading = 90; // Keep heading perfectly straight

                // Cross the runway threshold
                if (this.x >= rwyThreshold.x1 && Math.abs(this.y - rwyThreshold.y1) < 10) {
                    this.executeTouchdownSequence();
                }
            }

            // --- REALISTIC APPROACH PHASE 3: RUNWAY ROLLOUT ---
            if (this.status === 'RUNWAY_ROLLOUT') {
                if (this.x >= this.assignedGate.x) {
                    this.status = 'TAXI_TO_GATE';
                    this.heading = 180; // Turn South towards terminal
                    this.currentHeading = 180;
                    this.speed = 30; // Slow down to taxi speed
                    this.x = this.assignedGate.x; // Lock onto the taxi column
                }
            }

            // --- REALISTIC APPROACH PHASE 4: DOCKING ---
            if (this.status === 'TAXI_TO_GATE') {
                if (this.y >= this.assignedGate.y) {
                    this.status = 'GROUND';
                    this.y = this.assignedGate.y; // Lock into the gate box
                    
                    this.assignedGate.status = 'OCCUPIED';
                    this.assignedGate.task = 'DEBOARDING PASSENGERS';
                    this.assignedGate.progress = 0;
                    
                    logComm(this.id, `Taxi complete. Blocked in at ${this.assignedGate.id}. Engines off.`);
                    updateGateDisplay();
                    if (selectedFlight === this) selectFlight(null);
                }
            }
        }
    }

    executeTouchdownSequence() {
        if (this.assignedGate) {
            this.status = 'RUNWAY_ROLLOUT';
            this.heading = 90; 
            this.currentHeading = 90;
            this.y = AIRPORT_LAYOUT.runways[0].y1; 
            this.altitude = 0;
            this.targetAltitude = 0;
            this.speed = 65; // Hit the brakes
            
            logComm(this.id, `Touchdown. Rollout active, taxiing to ${this.assignedGate.id}.`);
        } else {
            this.triggerGoAround("System failure: Gate assignment lost.");
        }
    }

    triggerGoAround(reasonLog) {
        this.status = 'GO_AROUND';
        this.targetAltitude = 4000;
        this.speed = 210;
        this.heading = 360; 
        logComm(this.id, `Missed approach, executing go-around. Climbing to 4,000 ft. Reason: ${reasonLog}`);
        
        if (this.assignedGate && this.assignedGate.status === 'RESERVED') {
            this.assignedGate.status = 'VACANT';
            this.assignedGate.flightId = null;
            this.assignedGate = null;
            updateGateDisplay();
        }
        
        setTimeout(() => {
            if (this.status === 'GO_AROUND') {
                this.status = 'INBOUND';
                this.hasRequestedClearance = false;
                let angleToRwy = Math.atan2(AIRPORT_LAYOUT.runways[0].y1 - this.y, AIRPORT_LAYOUT.runways[0].x1 - this.x) * (180 / Math.PI);
                this.heading = Math.round((angleToRwy + 360 + 90) % 360);
                logComm(this.id, `Re-entering approach pattern. Awaiting instructions.`);
            }
        }, 20000);
    }
}

// --- 3. DYNAMIC SCOPE VECTOR CANVAS RENDERING ENGINE ---
function renderRadarView() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    CTX.strokeStyle = 'rgba(0, 75, 0, 0.22)';
    CTX.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
        CTX.beginPath();
        CTX.arc(CENTER_X, CENTER_Y, RADAR_RADIUS * (i / 4), 0, Math.PI * 2);
        CTX.stroke();
    }

    CTX.strokeStyle = 'rgba(0, 140, 0, 0.18)';
    CTX.lineWidth = 1.5;
    CTX.setLineDash([3, 4]);
    AIRPORT_LAYOUT.taxiways.forEach(t => {
        CTX.beginPath();
        CTX.moveTo(t.x1, t.y1);
        CTX.lineTo(t.x2, t.y2);
        CTX.stroke();
    });
    CTX.setLineDash([]); 

    AIRPORT_LAYOUT.runways.forEach(r => {
        CTX.strokeStyle = 'rgba(0, 35, 0, 0.85)';
        CTX.lineWidth = 8;
        CTX.beginPath();
        CTX.moveTo(r.x1, r.y1);
        CTX.lineTo(r.x2, r.y2);
        CTX.stroke();

        CTX.strokeStyle = 'rgba(51, 255, 51, 0.55)';
        CTX.lineWidth = 1;
        CTX.beginPath();
        CTX.moveTo(r.x1, r.y1);
        CTX.lineTo(r.x2, r.y2);
        CTX.stroke();

        CTX.fillStyle = 'rgba(0, 230, 0, 0.7)';
        CTX.font = '9px monospace';
        CTX.fillText(r.id.split('/')[0], r.x1 - 25, r.y1 + 3);
        CTX.fillText(r.id.split('/')[1], r.x2 + 8, r.y2 + 3);
    });

    AIRPORT_LAYOUT.gates.forEach(g => {
        if (g.status === 'VACANT') {
            CTX.strokeStyle = 'rgba(0, 180, 0, 0.35)';
            CTX.fillStyle = 'rgba(0, 25, 0, 0.4)';
        } else if (g.status === 'RESERVED') {
            CTX.strokeStyle = 'rgba(255, 255, 0, 0.6)'; 
            CTX.fillStyle = 'rgba(100, 100, 0, 0.4)';
        } else {
            CTX.strokeStyle = '#00ff00';
            CTX.fillStyle = g.task === 'READY FOR PUSHBACK' ? 'rgba(0, 255, 0, 0.35)' : 'rgba(0, 90, 0, 0.45)';
        }
        CTX.beginPath();
        CTX.rect(g.x - 7, g.y - 7, 14, 14);
        CTX.fill();
        CTX.stroke();

        CTX.fillStyle = 'rgba(51, 255, 51, 0.75)';
        CTX.font = '8px monospace';
        CTX.fillText(g.id, g.x - 4, g.y + 3);

        if (g.flightId) {
            CTX.fillStyle = '#ffffff';
            CTX.font = '9px monospace';
            CTX.fillText(`✈ ${g.flightId}`, g.x - 22, g.y - 11);
        }
    });

    CTX.fillStyle = '#ff3333';
    CTX.beginPath();
    CTX.arc(AIRPORT_LAYOUT.tower.x, AIRPORT_LAYOUT.tower.y, 3.5, 0, Math.PI * 2);
    CTX.fill();

    flights.forEach(f => {
        if (f.status === 'GROUND') return;

        const isCurrentSelected = selectedFlight === f;

        f.history.forEach((h, idx) => {
            CTX.fillStyle = `rgba(51, 255, 51, ${0.14 * (idx / f.history.length)})`;
            CTX.beginPath();
            CTX.arc(h.x, h.y, 2, 0, Math.PI * 2);
            CTX.fill();
        });

        CTX.save();
        CTX.translate(f.x, f.y);
        CTX.rotate((f.currentHeading * Math.PI) / 180);
        
        if (f.status === 'AWAITING_REPLY') {
            CTX.strokeStyle = isCurrentSelected ? '#ffffff' : '#ffff00'; 
        } else if (f.status === 'GO_AROUND') {
            CTX.strokeStyle = '#ff3333'; 
        } else if (f.status === 'FINAL_APPROACH' || f.status === 'VECTORING') {
            CTX.strokeStyle = isCurrentSelected ? '#ffffff' : '#00ffff'; 
        } else {
            CTX.strokeStyle = isCurrentSelected ? '#ffffff' : '#33ff33';
        }

        CTX.lineWidth = 1.5;
        CTX.beginPath();
        CTX.moveTo(0, -6); CTX.lineTo(0, 6);
        CTX.moveTo(-8, -1); CTX.lineTo(8, -1);
        CTX.moveTo(-3, 4); CTX.lineTo(3, 4);
        CTX.stroke();
        CTX.restore();

        CTX.fillStyle = isCurrentSelected ? '#ffffff' : (f.status === 'AWAITING_REPLY' ? '#ffff00' : '#33ff33');
        CTX.font = '11px monospace';
        CTX.fillText(f.id, f.x + 14, f.y - 7);
        CTX.fillText(`A${String(Math.round(f.altitude / 100)).padStart(3, '0')} V${f.speed}`, f.x + 14, f.y + 5);
        CTX.fillText(`${f.status}`, f.x + 14, f.y + 17);
    });
}

// --- 4. CONTROLLER CORES CLICKS INTERACTION & TERMINAL SYSTEM INTERFACE ---
CANVAS.addEventListener('click', (e) => {
    const boundRect = CANVAS.getBoundingClientRect();
    const scaleX = CANVAS.width / boundRect.width;
    const scaleY = CANVAS.height / boundRect.height;
    const cursorX = (e.clientX - boundRect.left) * scaleX;
    const cursorY = (e.clientY - boundRect.top) * scaleY;

    let interceptedTarget = null;
    flights.forEach(f => {
        if (f.status === 'GROUND') return;
        if (Math.hypot(f.x - cursorX, f.y - cursorY) < 25) { 
            interceptedTarget = f;
        }
    });

    selectFlight(interceptedTarget);
});

function selectFlight(flight) {
    selectedFlight = flight;
    
    const inputField = document.getElementById('terminalInput');
    const feedbackText = document.getElementById('terminalPromptFeedback');
    const slidersPanel = document.getElementById('tacticalSliders');

    if (!flight) {
        document.getElementById('termFlightId').innerText = "NONE SELECTED";
        document.getElementById('termFlightStatus').innerText = "WAITING";
        feedbackText.innerText = "Select an inbound airborne vector target on the radar screen...";
        inputField.disabled = true;
        inputField.value = "";
        slidersPanel.classList.add('hidden');
        return;
    }

    inputField.disabled = false;
    inputField.focus(); 
    slidersPanel.classList.remove('hidden');
    
    document.getElementById('termFlightId').innerText = flight.id;
    document.getElementById('termFlightStatus').innerText = flight.status;
    
    document.getElementById('headingSlider').value = flight.heading;
    document.getElementById('altitudeSlider').value = flight.targetAltitude;
    document.getElementById('headingVal').innerText = `${String(flight.heading).padStart(3, '0')}°`;
    document.getElementById('altitudeVal').innerText = `${flight.targetAltitude} FT`;

    if (flight.status === 'AWAITING_REPLY') {
        feedbackText.innerHTML = `Aircraft requests landing. Type <span class="text-white underline">GRANTED [GATE]</span> (e.g. GRANTED G1) or <span class="text-white underline">DENIED</span>.`;
    } else if (flight.status === 'TRANSIT') {
feedbackText.innerHTML = `Traffic traversing cross-sector routes. You can type <span class="text-white underline">GRANTED</span> to force a landing vector.`;
    } else if (flight.status === 'VECTORING' || flight.status === 'FINAL_APPROACH') {
        feedbackText.innerText = "Approach authorization locked. Target is tracking localizer to Runway 09L.";
    } else {
        feedbackText.innerText = "Input text arguments to rewrite flying profiles parameters dynamically.";
    }
}

// --- TERMINAL COMMAND PROCESSOR ---
document.getElementById('terminalInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && selectedFlight) {
        
        const args = e.target.value.trim().toLowerCase().split(' ');
        const command = args[0];
        const requestedGate = args[1]; 
        
        const feedbackText = document.getElementById('terminalPromptFeedback');

        if (selectedFlight.status === 'AWAITING_REPLY' || selectedFlight.status === 'TRANSIT') {
            if (command === 'granted' || command === 'grant') {
                
                let targetGate = null;
                
                if (requestedGate) {
                    targetGate = gates.find(g => g.id.toLowerCase() === requestedGate && g.status === 'VACANT');
                    if (!targetGate) {
                        feedbackText.innerHTML = `<span class="text-red-500 font-bold">ERROR:</span> Gate ${requestedGate.toUpperCase()} is invalid or already occupied.`;
                        return; 
                    }
                } else {
                    targetGate = gates.find(g => g.status === 'VACANT');
                }

                if (targetGate) {
                    selectedFlight.status = 'VECTORING';
                    selectedFlight.targetAltitude = 2000; 
                    selectedFlight.speed = 160; 
                    selectedFlight.assignedGate = targetGate;
                    
                    targetGate.status = 'RESERVED';
                    targetGate.flightId = selectedFlight.id;
                    updateGateDisplay();
                    
                    logComm('TOWER', `${selectedFlight.id}, radar contact. Vectoring to intercept localizer for runway 09L. Gate ${targetGate.id} reserved.`);
                    feedbackText.innerText = `Vectoring authorized. Target tracking to Final Approach Fix.`;
                } else {
                    logComm('TOWER', `${selectedFlight.id}, negative landing clearance. Apron gates full.`);
                    selectedFlight.triggerGoAround("Denied by tower: All gate nodes occupied.");
                }
            } 
            else if (command === 'denied' || command === 'deny') {
                if (selectedFlight.status === 'TRANSIT') {
                    feedbackText.innerText = "Target is already ignoring airport.";
                } else {
                    logComm('TOWER', `${selectedFlight.id}, landing authorization denied.`);
                    selectedFlight.triggerGoAround("Explicitly rejected by controller.");
                }
            } 
            else {
                feedbackText.innerHTML = `<span class="text-red-500 font-bold">ERROR:</span> Unknown command. Type <span class="text-white font-bold underline">GRANTED</span> or <span class="text-white font-bold underline">DENIED</span>.`;
            }
        } else {
            if (command === 'goaround') {
                selectedFlight.triggerGoAround("Manual tactical controller intervention.");
            } else {
                feedbackText.innerText = "Target is established and cannot accept that command right now.";
            }
        }

        e.target.value = ""; 
        selectFlight(selectedFlight); 
    }
});

document.getElementById('headingSlider').addEventListener('input', (e) => {
    if (selectedFlight) {
        selectedFlight.heading = parseInt(e.target.value);
        document.getElementById('headingVal').innerText = `${String(selectedFlight.heading).padStart(3, '0')}°`;
    }
});
document.getElementById('altitudeSlider').addEventListener('input', (e) => {
    if (selectedFlight) {
        selectedFlight.targetAltitude = parseInt(e.target.value);
        document.getElementById('altitudeVal').innerText = `${selectedFlight.targetAltitude} FT`;
    }
});

// --- 5. GROUND SERVICE & GATE OPERATIONS LOGISTICS ---
function evaluateGroundTurnaroundTicks() {
    gates.forEach(g => {
        if (g.status === 'OCCUPIED' && g.task) {
            g.progress += 0.25; 
            if (g.progress >= 100) {
                if (g.task === 'DEBOARDING PASSENGERS') {
                    g.task = 'GROUND SERVICE (FUEL/CARGO)'; g.progress = 0;
                } else if (g.task === 'GROUND SERVICE (FUEL/CARGO)') {
                    g.task = 'BOARDING OUTBOUND PASSENGERS'; g.progress = 0;
                } else if (g.task === 'BOARDING OUTBOUND PASSENGERS') {
                    g.task = 'READY FOR PUSHBACK'; g.progress = 100;
                }
            }
        }
    });
    updateGateDisplay();
}

function clearGatePushbackAction(gateId) {
    let gateNode = gates.find(g => g.id === gateId);
    if (gateNode && gateNode.task === 'READY FOR PUSHBACK') {
        let flIdx = flights.findIndex(f => f.id === gateNode.flightId);
        if (flIdx !== -1) {
            let fl = flights[flIdx];
            fl.status = 'DEPARTURE';
            fl.x = CENTER_X + 150; fl.y = CENTER_Y + 45; 
            fl.heading = 90; fl.currentHeading = 90;
            fl.altitude = 800; fl.targetAltitude = 7000; fl.speed = 240;
            
            logComm(fl.id, "Pushback approved. Cleared for takeoff runway 09R.");
            score += 100;
            document.getElementById('score').innerText = String(score).padStart(4, '0');
        }
        gateNode.status = 'VACANT'; gateNode.flightId = null; gateNode.task = null; gateNode.progress = 0;
        updateGateDisplay();
    }
}

function logComm(callsign, message) {
    const logBox = document.getElementById('commsLog');
    const dynamicNode = document.createElement('div');
    dynamicNode.innerHTML = `<span class="text-[#00ff00] font-bold">[${callsign}]</span>: ${message}`;
    logBox.appendChild(dynamicNode);
    logBox.scrollTop = logBox.scrollHeight;
}

function updateGateDisplay() {
    const tbodyNode = document.getElementById('gateTableBody');
    tbodyNode.innerHTML = '';
    gates.forEach(g => {
        const isReady = g.task === 'READY FOR PUSHBACK';
        let statusText = g.task || g.status; 
        
        tbodyNode.innerHTML += `
            <tr class="border-b border-[#002200]/30 text-xs">
                <td class="py-2 font-bold text-[#00ff00]">${g.id}</td>
                <td class="py-2 ${g.flightId ? 'text-white' : 'text-zinc-600'}">${g.flightId || 'NONE'}</td>
                <td class="py-2 text-[11px] text-emerald-500/80">${statusText}</td>
                <td class="py-2 text-right">
                    ${isReady ? `<button onclick="clearGatePushbackAction('${g.id}')" class="bg-[#004400] text-[10px] px-2 py-0.5 rounded text-white font-bold border border-[#00ff00]">PUSHBACK</button>` : 
                     (g.status === 'OCCUPIED' ? `${Math.floor(g.progress)}%` : '—')}
                </td>
            </tr>
        `;
    });
}

// --- 6. CORE TIMING LOOPS SCHEDULERS ---
function resizeCanvas() {
    CANVAS.width = CANVAS.parentElement.clientWidth;
    CANVAS.height = CANVAS.parentElement.clientHeight;
}
window.addEventListener('resize', resizeCanvas);

setInterval(() => {
    let activeAirborne = flights.filter(f => f.status !== 'GROUND').length;
    if (activeAirborne < 5) {
        flights.push(new Flight());
    }
}, 15000); 

function coreSimulationLoop() {
    simTime.setSeconds(simTime.getSeconds() + 1);
    document.getElementById('simClock').innerText = simTime.toTimeString().split(' ')[0];
    document.getElementById('activeCount').innerText = flights.filter(f => f.status !== 'GROUND').length;

    flights = flights.filter(f => {
        if ((f.status === 'DEPARTURE' || f.status === 'TRANSIT') && Math.hypot(f.x - CENTER_X, f.y - CENTER_Y) > RADAR_RADIUS) {
            if (f.status === 'DEPARTURE') logComm('SYSTEM', `Outbound target ${f.id} cleared sector boundaries.`);
            return false;
        }
        return true;
    });

    flights.forEach(f => f.update());
    evaluateGroundTurnaroundTicks();
    renderRadarView();

    requestAnimationFrame(coreSimulationLoop);
}

// --- BUG FIX: WAITS FOR HTML/CSS TO LOAD BEFORE BOOTING THE GAME ---
window.onload = () => {
    resizeCanvas();
    updateGateDisplay();
    flights.push(new Flight()); 
    coreSimulationLoop();
};
// config smoother fligth path // pushback option // gate selection bug // more feature  