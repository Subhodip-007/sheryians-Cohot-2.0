const clampScore = (score) => {
    return Math.min(
        100,
        Math.max(0, score)
    );
};


// ---------------------------------------------
// Accessibility Score
// ---------------------------------------------

const calculateAccessibilityScore = ({
    roadCondition,
    terrainRisk,
    slopeRisk,
    connectivity,
    weatherRisk,
    incidentRisk,
    vehicleSuitability
}) => {

    /*
        Higher is better:
        roadCondition
        connectivity
        vehicleSuitability

        Higher is worse:
        terrainRisk
        slopeRisk
        weatherRisk
        incidentRisk
    */


    const terrainAccessibility =
        100 - terrainRisk;

    const slopeAccessibility =
        100 - slopeRisk;

    const weatherAccessibility =
        100 - weatherRisk;

    const incidentAccessibility =
        100 - incidentRisk;


    const score =

        (roadCondition * 0.30) +

        (terrainAccessibility * 0.15) +

        (slopeAccessibility * 0.10) +

        (connectivity * 0.15) +

        (weatherAccessibility * 0.10) +

        (incidentAccessibility * 0.10) +

        (vehicleSuitability * 0.10);


    return Math.round(
        clampScore(score)
    );
};


// ---------------------------------------------
// Risk Score
// ---------------------------------------------

const calculateRiskScore = ({
    roadCondition,
    terrainRisk,
    slopeRisk,
    connectivity,
    weatherRisk,
    incidentRisk,
    vehicleSuitability
}) => {

    /*
        Convert positive factors into risk.

        Bad road condition:
        100 road condition → 0 risk

        Good connectivity:
        100 connectivity → 0 risk

        Good vehicle suitability:
        100 suitability → 0 risk
    */


    const roadRisk =
        100 - roadCondition;

    const connectivityRisk =
        100 - connectivity;

    const vehicleRisk =
        100 - vehicleSuitability;


    const score =

        (weatherRisk * 0.25) +

        (incidentRisk * 0.20) +

        (roadRisk * 0.20) +

        (terrainRisk * 0.15) +

        (connectivityRisk * 0.10) +

        (vehicleRisk * 0.10);


    return Math.round(
        clampScore(score)
    );
};


const getRiskLevel = (
    riskScore
) => {

    if (riskScore <= 20) {
        return "VERY_LOW";
    }

    if (riskScore <= 40) {
        return "LOW";
    }

    if (riskScore <= 60) {
        return "MEDIUM";
    }

    if (riskScore <= 80) {
        return "HIGH";
    }

    return "CRITICAL";
};


export {
    calculateAccessibilityScore,
    calculateRiskScore,
    getRiskLevel
};