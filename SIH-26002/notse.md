ui/pages/
│
├── public/
│   └── LandingPage.jsx
│
├── auth/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── ForgotPasswordPage.jsx
│
├── dashboard/
│   └── DashboardPage.jsx
│
├── shipments/
│   ├── ShipmentsPage.jsx
│   ├── CreateShipmentPage.jsx
│   └── ShipmentDetailsPage.jsx
│
├── routes/
│   └── RouteIntelligencePage.jsx
│
├── tracking/
│   └── TrackingPage.jsx
│
├── incidents/
│   └── IncidentsPage.jsx
│
├── reports/
│   └── FieldReportsPage.jsx
│
├── analytics/
│   └── AnalyticsPage.jsx
│
├── assistant/
│   └── AIAssistantPage.jsx
│
└── settings/
    └── SettingsPage.jsx

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
# SIH26002 — AI-Based Smart Logistics & Accessibility Intelligence Platform for NER

## 0. ONE-LINE PROJECT DEFINITION

> **A MERN-based logistics decision-support platform for the North Eastern Region that monitors shipments and vehicles, evaluates route accessibility and disruption risk, detects incidents, predicts operational impact, ranks alternative routes, explains the recommendation, and lets an authorized operator approve a reroute.**

---

# 1. OUR STRATEGY

We are **not building a completely new logistics platform from zero**.

We are taking the strongest proven historical SIH workflow and modifying the intelligence layer.

### Base project

**Road Transport Network Telematics — Kalparatna/SIH-2024_PS1753**

Its public repository already contains the basic operational skeleton:

* route management
* checkpoints
* driver management
* live truck tracking
* delays
* geofencing
* GPS/GIS
* 3PL requests
* capacity/dispatch concepts
* operational response

The repository explicitly describes GPS/GIS, route management, live monitoring, delay/detour alerts, schedule changes, 3PL requests and geofencing.

### We add

* NER-specific accessibility intelligence
* weather-aware risk
* disruption impact analysis
* field incident reporting
* route-risk scoring
* alternative-route ranking
* explainable recommendations
* human approval before rerouting
* optional multimodal fallback
* low-connectivity-friendly design

---

# 2. THE HISTORICAL PROJECTS WE ARE BENCHMARKING

## A. Road Transport Network Telematics

**Repository**

https://github.com/Kalparatna/SIH-2024_PS1753

**Similarity: 92/100**

### Existing pathway

```text
Route
  ↓
Checkpoint
  ↓
Driver / Truck
  ↓
GPS
  ↓
Tracking
  ↓
Delay
  ↓
Admin response
```

### What we reuse conceptually

* route entity
* checkpoint concept
* driver/vehicle management
* tracking
* geofencing
* delay reporting
* admin dashboard
* operational response

### What we improve

```text
GPS / Incident / Weather
          ↓
      Risk Engine
          ↓
 Accessibility Score
          ↓
Affected Shipment Analysis
          ↓
Alternative Route Ranking
          ↓
Explainable Recommendation
          ↓
Operator Approval
          ↓
Reroute
```

This is our **PRIMARY BASELINE**.

---

## B. Dynamic Mail Transmission

**Repository**

https://github.com/H-Bharmal/SIH_2024

**Similarity: 84/100 conceptually**

It addresses dynamic choice across transportation modes including land, rail, air and water. Its public repository is primarily a prototype/frontend-oriented repository rather than a complete logistics backend.

### We take

* multimodal thinking
* mode comparison
* alternative transport selection

### We do not copy

* frontend-only/prototype architecture
* absence of a serious optimization backend

### Our modification

```text
Road only
      ↓
Risk becomes HIGH
      ↓
Check alternative modes
      ↓
Road + Rail
      ↓
Compare:
ETA
Cost
Risk
Accessibility
Availability
      ↓
Recommend
```

---

## C. KnitKraft

**Repository**

https://github.com/RajnishPuri/KnitKraft

**Similarity: 76/100**

It is a SIH 2023 winning project, and its repository has a substantial application structure with models, routes, views, source/public assets and 94 commits. Its README describes customized interfaces for farmers, service providers, buyers, educators, quality inspectors, transportation and warehouse partners, plus real-time tracking.

### We take

* role-based workflows
* transportation role
* warehouse/logistics actors
* real-time tracking
* modular backend organization
* role-specific dashboards

### We improve

KnitKraft is fundamentally a **supply-chain management application**.

Our project becomes:

**supply chain + network intelligence + risk + decisions**

---

## D. Real-Time Vehicle Tracking System

**Repository**

https://github.com/pivotrick/Real-Time-Vehicle-Tracking-system

**Similarity: 72/100**

The project focuses on real-time vehicle availability, routes, GPS, ETA and transportation monitoring, including MQTT-oriented tracking.

### We take

* vehicle tracking
* route display
* driver/vehicle relationship
* ETA
* telemetry concept

### We improve

Tracking is only an **input** to our intelligence layer.

---

## E. DRISHTI

**Repository**

https://github.com/SamridhVaasu/project-drishti-SIH

**Similarity: 69/100**

Its README claims predictive intelligence, anomaly detection, AI-powered recommendations, real-time operational visibility, route optimization and offline field operations.

However, the public repository currently contains only three commits and a relatively small Vite/React frontend structure; the visible repository does not substantiate the full enterprise ML/data architecture described in the README.

### We take

* predictive-dashboard concept
* anomaly visualization
* operational intelligence UX
* executive/operational separation

### We improve

**Every AI claim in our project must correspond to an actual implemented computation/model.**

---

# 3. THE IMPORTANT LOOPHOLES WE ARE FIXING

## Historical gap → our feature

**1. No strong disruption-prediction → impact-analysis → rerouting pipeline**

→ We build:

```text
Incident
 ↓
Affected segment
 ↓
Affected shipments
 ↓
ETA impact
 ↓
Alternative routes
 ↓
Recommendation
 ↓
Approval
 ↓
Reroute
```

---

**2. Route optimization is not genuinely risk-aware**

→ We rank routes using:

```text
ETA
+
distance
+
road condition
+
weather
+
incident risk
+
accessibility
+
vehicle compatibility
```

---

**3. No serious NER accessibility intelligence**

→ Every route segment gets an:

**Accessibility Score: 0–100**

---

**4. Weak field incident → network impact**

→ Field report becomes an operational event:

```text
Field Report
 ↓
Geolocation
 ↓
Road segment
 ↓
Risk update
 ↓
Affected shipment detection
 ↓
Recommendation
```

---

**5. Little/no explainability**

→ Never show:

> AI recommends Route B.

Show:

> Route B recommended because disruption probability is lower, road accessibility is higher and current rainfall exposure is lower.

---

**6. Weak environmental/context fusion**

→ Combine:

```text
Weather
Terrain
Road condition
Connectivity
Incident history
Vehicle type
```

---

**7. AI claims exceed implementation**

→ Our prototype initially uses:

**rule-based/weighted intelligence**

Then later:

**ML prediction**

We will not fake an ML model just to put “AI” on the presentation.

---

# 4. OUR ACTUAL PRODUCT

## Product name — working concept

Use any final name later.

For development:

**NER-Lens / NER Logistics Intelligence Platform**

---

# 5. PRIMARY USERS

We do NOT need ten different user types.

Use four.

## USER 1 — ADMIN / AUTHORITY

Responsibilities:

* manage routes
* manage vehicles
* manage drivers
* monitor network
* review incidents
* approve/reject reroutes
* view analytics

---

## USER 2 — LOGISTICS OPERATOR

Responsibilities:

* create shipment
* assign vehicle
* monitor shipment
* request recommendation
* review route alternatives
* approve operational changes

---

## USER 3 — DRIVER

Responsibilities:

* view assigned shipment
* view route
* update status
* share location
* report incident

---

## USER 4 — FIELD AGENT

Responsibilities:

* report road incident
* upload image
* send location
* classify severity
* add description

---

# 6. USER FLOW

```text
                 ┌─────────────┐
                 │    ADMIN    │
                 └──────┬──────┘
                        │
                  Manage Network
                        │
        ┌───────────────┼─────────────────┐
        ↓               ↓                 ↓
     Routes          Vehicles          Incidents
        │               │                 │
        └───────────────┼─────────────────┘
                        ↓
                 Logistics Operator
                        │
                  Create Shipment
                        │
                        ↓
                  Route Selection
                        │
                        ↓
               Intelligence Engine
                        │
             ┌──────────┴──────────┐
             ↓                     ↓
         Low Risk              High Risk
             │                     │
          Continue             Alternatives
                                   │
                                   ↓
                            Operator Approval
                                   │
                                   ↓
                                Reroute

Field Agent
    │
    ↓
Report Incident
    │
    ↓
Risk Engine
    │
    ↓
Affected Network
    │
    ↓
Affected Shipments
```

---

# 7. NUMBER OF MAIN PAGES

Keep the prototype to approximately **10–12 main pages**.

## Authentication

### 1. Login

`/login`

### 2. Register

`/register`

---

# ADMIN / OPERATOR APPLICATION

### 3. Dashboard

`/dashboard`

Main overview:

* active shipments
* active vehicles
* high-risk routes
* incidents
* delays
* accessibility distribution

---

### 4. Network Map

`/network`

Main intelligence map.

Show:

* routes
* vehicles
* incidents
* risk levels
* accessibility
* blocked segments

This is the visual heart of the application.

---

### 5. Shipments

`/shipments`

CRUD:

* create
* view
* update
* assign
* cancel
* track

---

### 6. Shipment Details

`/shipments/:id`

Show:

* origin
* destination
* vehicle
* current route
* ETA
* current status
* risk
* accessibility
* incidents
* route history

---

### 7. Route Intelligence

`/routes`

Show:

* candidate routes
* route comparison
* accessibility score
* risk score
* ETA
* distance

---

### 8. Recommendation Details

`/recommendations/:id`

This is one of the most important pages.

Display:

```text
Recommended Route
Risk
Accessibility
ETA
Distance
Risk reduction
Reasons
Alternative routes
```

Actions:

**Approve Reroute**

**Reject**

---

### 9. Incidents

`/incidents`

Show:

* incident list
* severity
* location
* status
* affected segment
* affected shipments

---

### 10. Report Incident

`/incidents/create`

Used by field agent/driver.

---

### 11. Vehicles / Drivers

`/fleet`

Can initially be one combined page.

---

### 12. Analytics

`/analytics`

Show:

* route risk distribution
* incidents by type
* delays
* accessibility
* reroute count
* estimated delay avoided

---

# 8. PAGE FLOWCHART

```text
LOGIN
  │
  ▼
DASHBOARD
  │
  ├──────────────► NETWORK MAP
  │                   │
  │                   ├── Vehicle
  │                   ├── Route
  │                   └── Incident
  │
  ├──────────────► SHIPMENTS
  │                    │
  │                    └── Shipment Details
  │                              │
  │                              ▼
  │                     Route Intelligence
  │                              │
  │                              ▼
  │                       Recommendations
  │                              │
  │                              ▼
  │                       Approve / Reject
  │
  ├──────────────► INCIDENTS
  │                    │
  │                    └── Report Incident
  │
  ├──────────────► FLEET
  │
  └──────────────► ANALYTICS
```

---

# 9. FRONTEND FOLDER STRUCTURE

```text
frontend/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── RiskBadge.jsx
│   │   ├── ShipmentCard.jsx
│   │   ├── VehicleCard.jsx
│   │   ├── IncidentCard.jsx
│   │   ├── RouteCard.jsx
│   │   ├── RouteComparison.jsx
│   │   ├── MapView.jsx
│   │   ├── RiskLegend.jsx
│   │   └── Loading.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── NetworkMap.jsx
│   │   ├── Shipments.jsx
│   │   ├── ShipmentDetails.jsx
│   │   ├── Routes.jsx
│   │   ├── RecommendationDetails.jsx
│   │   ├── Incidents.jsx
│   │   ├── CreateIncident.jsx
│   │   ├── Fleet.jsx
│   │   └── Analytics.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── AppContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useMap.js
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   ├── shipment.service.js
│   │   ├── route.service.js
│   │   ├── incident.service.js
│   │   └── recommendation.service.js
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── utils/
│   │   ├── formatDate.js
│   │   ├── riskColor.js
│   │   └── score.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
└── vite.config.js
```

---

# 10. BACKEND FOLDER STRUCTURE

This is where we stay very close to the backend architecture you already know.

```text
backend/
│
├── controllers/
│   ├── auth.controller.js
│   ├── shipment.controller.js
│   ├── route.controller.js
│   ├── vehicle.controller.js
│   ├── incident.controller.js
│   ├── recommendation.controller.js
│   └── analytics.controller.js
│
├── models/
│   ├── User.js
│   ├── Shipment.js
│   ├── Vehicle.js
│   ├── Route.js
│   ├── RouteSegment.js
│   ├── Incident.js
│   ├── WeatherSnapshot.js
│   └── Recommendation.js
│
├── routes/
│   ├── auth.routes.js
│   ├── shipment.routes.js
│   ├── route.routes.js
│   ├── vehicle.routes.js
│   ├── incident.routes.js
│   ├── recommendation.routes.js
│   └── analytics.routes.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   ├── error.middleware.js
│   └── upload.middleware.js
│
├── services/
│   ├── route.service.js
│   ├── risk.service.js
│   ├── accessibility.service.js
│   ├── incident.service.js
│   ├── recommendation.service.js
│   ├── weather.service.js
│   ├── tracking.service.js
│   └── map.service.js
│
├── config/
│   ├── db.js
│   └── env.js
│
├── utils/
│   ├── score.js
│   ├── distance.js
│   └── geo.js
│
├── uploads/
│
├── app.js
├── server.js
├── package.json
└── .env
```

---

# 11. FOUR-LAYER BACKEND ARCHITECTURE

```text
                 CLIENT
                   │
                   ▼
          ┌─────────────────┐
          │  ROUTES / API   │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │   CONTROLLER    │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │    SERVICES     │
          │ Business Logic  │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │ MONGOOSE MODELS │
          └────────┬────────┘
                   │
                   ▼
               MongoDB
```

This is the correct architecture for your current knowledge.

You already work with Express routing, controllers, middleware, MongoDB/Mongoose, JWT, bcrypt, environment variables, CORS, Postman and REST APIs. On the React side, your current practice includes React Router, hooks, Context API, Axios and Tailwind/Vite-based applications. That makes a modular MERN monolith with a dedicated `services/` layer a much more realistic starting point than jumping to microservices.

---

# 12. WHY THE SERVICES FOLDER MATTERS

Currently you have mostly practiced:

```text
Route
 ↓
Controller
 ↓
Model
```

For this project we add:

```text
Route
 ↓
Controller
 ↓
Service
 ↓
Model
```

Example:

```text
POST /api/incidents
        ↓
incident.controller
        ↓
incident.service
        ↓
Find nearby route segment
        ↓
Update risk
        ↓
Find affected shipments
        ↓
recommendation.service
        ↓
Generate alternatives
```

This is the main architectural concept I would have you learn during this project.

---

# 13. DATABASE MODELS

## USER

```text
User
├── name
├── email
├── password
├── role
└── location
```

Roles:

```text
ADMIN
OPERATOR
DRIVER
FIELD_AGENT
```

---

# VEHICLE

```text
Vehicle
├── registrationNumber
├── type
├── capacity
├── status
├── currentLocation
├── assignedDriver
└── currentShipment
```

---

# DRIVER

You can initially keep driver information inside `User`.

Do not create a separate Driver collection unless necessary.

---

# SHIPMENT

```text
Shipment
├── trackingId
├── origin
├── destination
├── cargoType
├── weight
├── vehicle
├── driver
├── route
├── status
├── eta
├── currentLocation
└── riskScore
```

Statuses:

```text
PENDING
ASSIGNED
IN_TRANSIT
DELAYED
AT_RISK
DELIVERED
CANCELLED
```

---

# ROUTE

```text
Route
├── name
├── origin
├── destination
├── geometry
├── distance
├── estimatedTime
├── segments[]
└── mode
```

---

# ROUTE SEGMENT

This is one of the most important models.

```text
RouteSegment
├── route
├── geometry
├── roadCondition
├── terrain
├── slope
├── connectivity
├── weatherRisk
├── incidentRisk
├── accessibilityScore
└── riskScore
```

---

# INCIDENT

```text
Incident
├── type
├── severity
├── description
├── location
├── photo
├── affectedSegment
├── reportedBy
├── status
└── createdAt
```

Types:

```text
LANDSLIDE
FLOOD
ROAD_BLOCK
ACCIDENT
VEHICLE_BREAKDOWN
ROAD_DAMAGE
WEATHER
OTHER
```

---

# WEATHER SNAPSHOT

```text
WeatherSnapshot
├── location
├── temperature
├── rainfall
├── precipitationProbability
├── windSpeed
├── visibility
├── weatherCode
└── recordedAt
```

---

# RECOMMENDATION

```text
Recommendation
├── shipment
├── currentRoute
├── recommendedRoute
├── alternatives[]
├── riskScore
├── accessibilityScore
├── confidence
├── reasons[]
├── expectedDelay
├── riskReduction
└── status
```

Statuses:

```text
PENDING
APPROVED
REJECTED
EXPIRED
```

---

# 14. MONGODB GEO MODEL

Store locations as GeoJSON:

```text
location:
{
    type: "Point",
    coordinates: [longitude, latitude]
}
```

Use MongoDB `2dsphere` indexes for proximity/intersection queries. MongoDB explicitly supports `$near`, `$geoWithin`, `$geoIntersects` and other spherical geospatial operations through geospatial indexes.

This allows:

```text
Incident location
       ↓
Find nearby route segments
       ↓
Identify affected network
```

without manually calculating every distance in application code.

---

# 15. API DESIGN

## AUTH

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout
```

---

## USERS

```text
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
```

Keep this minimal.

---

# VEHICLES

```text
POST   /api/vehicles
GET    /api/vehicles
GET    /api/vehicles/:id
PATCH  /api/vehicles/:id
DELETE /api/vehicles/:id
```

---

# SHIPMENTS

```text
POST   /api/shipments
GET    /api/shipments
GET    /api/shipments/:id
PATCH  /api/shipments/:id
DELETE /api/shipments/:id
```

---

# ROUTES

```text
POST   /api/routes
GET    /api/routes
GET    /api/routes/:id
PATCH  /api/routes/:id
DELETE /api/routes/:id
```

---

# INCIDENTS

```text
POST   /api/incidents
GET    /api/incidents
GET    /api/incidents/:id
PATCH  /api/incidents/:id
DELETE /api/incidents/:id
```

---

# RISK

```text
GET /api/risk/segment/:id
POST /api/risk/recalculate/:id
```

---

# ACCESSIBILITY

```text
GET /api/accessibility/route/:id
GET /api/accessibility/segment/:id
POST /api/accessibility/recalculate/:id
```

---

# RECOMMENDATIONS

```text
POST /api/recommendations/generate
GET  /api/recommendations
GET  /api/recommendations/:id
POST /api/recommendations/:id/approve
POST /api/recommendations/:id/reject
```

---

# ANALYTICS

```text
GET /api/analytics/dashboard
GET /api/analytics/incidents
GET /api/analytics/routes
GET /api/analytics/shipments
```

---

# 16. THE MOST IMPORTANT API

## `POST /api/recommendations/generate`

Input:

```text
shipmentId
```

Backend:

```text
Shipment
 ↓
Current Route
 ↓
Route Segments
 ↓
Weather
 ↓
Incident data
 ↓
Road condition
 ↓
Connectivity
 ↓
Vehicle compatibility
 ↓
Calculate route scores
 ↓
Rank candidates
 ↓
Return recommendation
```

---

# 17. RISK ENGINE

Initially use a weighted scoring model.

Example:

```text
Risk Score =
    25% Weather Risk
  + 20% Incident Risk
  + 20% Road Condition
  + 15% Terrain Risk
  + 10% Connectivity Risk
  + 10% Vehicle Compatibility Risk
```

Normalize everything:

```text
0–20    Very Low
21–40   Low
41–60   Medium
61–80   High
81–100  Critical
```

Do not claim this is ML.

It is an **initial decision model**.

---

# 18. ACCESSIBILITY ENGINE

Example:

```text
Accessibility Score =

30% Road Quality
20% Weather
15% Terrain
15% Connectivity
10% Incident History
10% Vehicle Compatibility
```

Higher score = easier/safer access.

Example:

```text
Segment 17

Road Quality        70
Weather             45
Terrain             50
Connectivity        80
Incident History    60
Vehicle Fit         90

Accessibility       65/100
```

Later, the weights themselves can become data-driven.

---

# 19. ROUTE SCORE

Do not equate:

**best route = shortest route**

Instead:

```text
Route Score =

30% ETA
20% Risk
20% Accessibility
15% Distance
10% Cost
5% Vehicle suitability
```

The exact weights can change during testing.

---

# 20. WHAT THE ROUTE ENGINE SHOULD RETURN

```text
Route A
├── ETA: 8h 40m
├── Distance: 410 km
├── Risk: 72
└── Accessibility: 48

Route B
├── ETA: 9h 05m
├── Distance: 435 km
├── Risk: 25
└── Accessibility: 83

Route C
├── ETA: 10h 00m
├── Distance: 460 km
├── Risk: 18
└── Accessibility: 89
```

Recommendation:

```text
ROUTE B
```

because:

```text
+25 minutes
−47 risk points
+35 accessibility points
```

---

# 21. MAP STACK

## Frontend

Use:

**React + Leaflet**

Why?

* straightforward React integration
* flexible map layers
* suitable for prototype
* easy route/marker/polyline visualization

---

## Route engine

For the prototype:

**Mapbox Directions API**

Mapbox's Directions API supports driving routes, waypoint-based routing and traffic-aware driving profiles. It accepts up to 25 coordinates per request for the supported profiles.

Use it to calculate candidate road routes.

### Important architectural rule

Do **not** expose the Mapbox secret/token unnecessarily from the backend architecture.

Prefer:

```text
React
 ↓
Our Express API
 ↓
Mapbox
```

rather than making every sensitive integration a frontend responsibility.

---

# 22. GEOCODING

For the prototype:

**Mapbox Geocoding/Search**

or another controlled geocoding provider.

Avoid building your entire application around the public Nominatim endpoint because public geocoding services have usage constraints and are not appropriate as a high-volume production dependency.

---

# 23. WEATHER API

## Recommended first choice

**Open-Meteo**

It provides current/forecast weather data and historical/historical-forecast datasets. Its documentation exposes precipitation, wind, visibility, soil variables and other useful parameters; historical weather can reach decades back, while historical forecast data is useful for ML training and forecast analysis.

This is particularly useful for your project because:

```text
Historical Weather
        ↓
Training dataset later

Current forecast
        ↓
Current route risk
```

---

# 24. SHIPMENT TRACKING API

For the **prototype**, do not make an external courier API the foundation.

Create your own shipment model and simulate:

```text
Shipment
 ↓
Vehicle
 ↓
Current coordinates
 ↓
Status
 ↓
ETA
```

### Why?

Your SIH problem is about **logistics intelligence**, not commercial parcel tracking.

An external courier API gives you courier tracking events but does not solve:

```text
NER road risk
+
accessibility
+
incident impact
+
rerouting
```

AfterShip does provide tracking APIs and webhooks for courier tracking, including tracking creation and updates, so it is a reasonable later integration if external parcel tracking becomes necessary.

### Prototype choice

**Use simulated shipment telemetry.**

This gives you complete control over the demo.

---

# 25. VEHICLE LOCATION

For MVP:

```text
Simulated GPS
```

Example:

```text
Every 5–10 seconds
vehicle moves slightly
 ↓
POST /api/tracking/update
 ↓
MongoDB currentLocation
 ↓
Socket.IO event
 ↓
React map updates
```

Later:

```text
Android driver app
       ↓
GPS
       ↓
API
```

---

# 26. REAL-TIME COMMUNICATION

Use:

**Socket.IO**

For:

* live vehicle movement
* incident alerts
* shipment status
* reroute events

Conceptual flow:

```text
Vehicle update
      ↓
Express
      ↓
Socket.IO
      ↓
Connected operators
      ↓
Map moves in real time
```

---

# 27. SHOULD WE USE REDIS?

## For MVP: NO.

Do not add Redis simply because:

> "production applications use Redis."

That would add complexity without solving your main problem.

Your initial architecture:

```text
React
 ↓
Express
 ↓
MongoDB
```

is enough.

---

## When Redis becomes useful

Add Redis later for:

```text
Caching weather responses
Caching routes
Realtime state
Rate limiting
Distributed Socket.IO state
Background jobs
```

It becomes particularly relevant if you move to multiple backend instances or need durable shared state for realtime infrastructure. Vercel's current WebSocket guidance explicitly recommends a durable external state layer such as Redis when state must survive across WebSocket connections/functions.

### Decision

```text
MVP:
NO REDIS

SIH scalable demo:
OPTIONAL

Real deployment with multiple instances:
YES
```

---

# 28. AI STRATEGY

This is important.

Do not start by asking:

> Which AI model should we use?

First define:

> **Which prediction problem are we solving?**

---

# 29. FIRST AI PROBLEM

## Predict disruption risk

Input:

```text
rainfall
temperature
visibility
wind
terrain
road condition
historical incidents
connectivity
```

Output:

```text
Probability of disruption
```

Example:

```text
Route Segment 18

Disruption probability:
0.74

Risk:
HIGH
```

---

# 30. AI MODEL PATH

## Version 1

Rule-based:

```text
Weighted Score
```

No ML.

---

## Version 2

Create a dataset:

```text
Date
Location
Rainfall
Wind
Road Condition
Terrain
Incident Count
Connectivity
Past Delay
Disruption
```

Target:

```text
disruption = 0 / 1
```

---

## Candidate models

Start with:

**Logistic Regression**

Then compare:

**Random Forest**

Then:

**XGBoost**

For a student prototype, Random Forest/XGBoost can be a stronger practical baseline than attempting a neural network unnecessarily.

---

# 31. ML ARCHITECTURE

```text
Weather Data
     │
Road Data
     │
Incident History
     │
Vehicle Data
     │
     ▼
Feature Builder
     │
     ▼
Training Dataset
     │
     ▼
ML Model
     │
     ▼
Disruption Probability
     │
     ▼
Node Backend
     │
     ▼
Risk Engine
```

---

# 32. IMPORTANT: DO NOT TRAIN THE MODEL INSIDE NODE

Keep ML separate.

Use:

```text
Python
```

for training.

Possible structure:

```text
ml/
│
├── data/
│
├── notebooks/
│
├── preprocessing/
├── train.py
├── evaluate.py
├── model.pkl
└── inference.py
```

Then expose:

```text
POST /predict
```

through a small Python API.

Use:

**FastAPI**

Architecture:

```text
Node Backend
      │
      │ POST /predict
      ▼
Python ML Service
      │
      ▼
Model
      │
      ▼
Probability
      │
      ▼
Node
```

---

# 33. BUT FOR THE FIRST VERSION

Don't even build the Python service immediately.

Use:

```text
risk.service.js
```

with deterministic scoring.

Then once the rest of the platform works:

```text
Replace:
weighted risk

with:
ML predicted risk
```

This is much safer.

---

# 34. AI EXPLAINABILITY

The model output should not simply be:

```text
risk = 0.81
```

Return:

```text
riskScore: 81

reasons:
[
 "Heavy rainfall forecast",
 "High historical incident frequency",
 "Poor road condition",
 "Low network connectivity"
]
```

Later:

```text
feature importance
```

can be generated from the ML model.

This creates a strong government-facing decision-support story.

---

# 35. FIELD INCIDENT FLOW

```text
FIELD AGENT
     │
     ▼
Create Incident
     │
     ├── Type
     ├── Severity
     ├── GPS
     ├── Photo
     └── Description
     │
     ▼
POST /api/incidents
     │
     ▼
Incident Service
     │
     ▼
Find nearby RouteSegment
     │
     ▼
Increase risk
     │
     ▼
Recalculate accessibility
     │
     ▼
Find affected shipments
     │
     ▼
Generate alternatives
     │
     ▼
Operator Dashboard
```

THIS IS ONE OF YOUR MAIN DIFFERENTIATORS.

---

# 36. DISRUPTION IMPACT ENGINE

Suppose:

```text
Incident:
LANDSLIDE

Coordinates:
[94.x, 26.x]

Severity:
CRITICAL
```

Backend:

```text
Find RouteSegment within 2 km
        ↓
Segment RS-12 affected
        ↓
Find shipments using RS-12
        ↓
Shipment #1001
Shipment #1002
Shipment #1007
        ↓
Recalculate ETA
        ↓
Generate recommendations
```

Return:

```text
3 shipments affected
2 vehicles affected
Average ETA increase:
2h 17m
```

This is far more impactful than simply displaying a red marker.

---

# 37. OFFLINE SUPPORT

Do not build a complete offline-first application initially.

Implement a small but convincing version.

## Field agent

Store unsent incidents locally:

```text
localStorage / IndexedDB
```

Example:

```text
Incident
Status:
Pending Sync
```

When internet returns:

```text
Pending Incident
      ↓
POST API
      ↓
Success
      ↓
Synced
```

This directly supports NER low-connectivity conditions without requiring a huge architecture.

---

# 38. MULTIMODAL SUPPORT

Do not build a nationwide multimodal optimizer.

For the prototype:

```text
ROAD
RAIL
ROAD + RAIL
```

Model:

```text
TransportMode
```

and compare:

```text
ETA
Cost
Risk
Accessibility
Availability
```

Example:

```text
ROAD

9h 20m
Risk 78
Cost ₹X

ROAD + RAIL

11h 00m
Risk 32
Cost ₹Y
```

Then:

> **Road + Rail recommended because disruption risk is significantly lower.**

---

# 39. DASHBOARD

## Top KPI cards

```text
ACTIVE SHIPMENTS
126

AT RISK
17

ACTIVE INCIDENTS
4

HIGH-RISK ROUTES
6

DELAYED
9

REROUTED
7
```

---

## Main map

```text
─────────────────────────────────────
|                                   |
|              MAP                  |
|                                   |
|   Vehicles     Routes             |
|   Incidents    Risk zones         |
|                                   |
─────────────────────────────────────
```

---

## Bottom panels

```text
High-Risk Shipments
Recent Incidents
AI Recommendations
```

---

# 40. ROUTE COMPARISON UI

This should be one of your strongest pages.

```text
                ROUTE A       ROUTE B       ROUTE C

Distance        410 km        438 km        460 km
ETA             8h 30m        9h 05m        9h 40m
Risk             HIGH          LOW           VERY LOW
Accessibility     51            82             89
Cost               X             Y              Z

Recommendation                 ★
```

Then:

```text
WHY ROUTE B?

✓ Lower rainfall exposure
✓ Better road condition
✓ No active incidents
✓ Better accessibility
✓ 47% lower risk

Additional ETA:
+35 minutes
```

---

# 41. RECOMMENDATION WORKFLOW

```text
Recommendation generated
          │
          ▼
Operator reviews
          │
      ┌───┴────┐
      ▼        ▼
   APPROVE    REJECT
      │
      ▼
Update Shipment
      │
      ▼
Update Route
      │
      ▼
Notify Driver
      │
      ▼
Track new route
```

---

# 42. NOTIFICATION STRATEGY

Don't build a complex notification infrastructure.

For prototype:

### In-app notifications

```text
⚠ Shipment #102 at risk

Reason:
Heavy rainfall + road incident

Recommended action:
Switch to Route B
```

Later:

* email
* SMS
* push notifications

---

# 43. PACKAGES — FRONTEND

Recommended:

```text
react
react-router-dom
axios
leaflet
react-leaflet
recharts
framer-motion
lucide-react
```

Optional:

```text
react-hook-form
zod
```

Use them only if they simplify validation/forms.

---

# 44. PACKAGES — BACKEND

Core:

```text
express
mongoose
cors
dotenv
bcryptjs
jsonwebtoken
cookie-parser
```

Validation:

```text
express-validator
```

HTTP:

```text
axios
```

Uploads:

```text
multer
```

Realtime:

```text
socket.io
```

Security:

```text
helmet
```

Optional:

```text
express-rate-limit
morgan
```

---

# 45. FRONTEND STATE MANAGEMENT

Don't use Redux just because this is a large application.

Start with:

```text
Context API
```

Use:

```text
AuthContext
```

for:

* user
* login
* logout
* role

Use local/component state for:

* filters
* forms
* modals
* map selection

Later, if the state genuinely becomes difficult to manage:

**Zustand/Redux can be introduced.**

---

# 46. AUTHENTICATION

Use the authentication pattern you already know:

```text
Register
 ↓
bcrypt password
 ↓
MongoDB
 ↓
Login
 ↓
JWT
 ↓
Cookie / Authorization
 ↓
auth middleware
 ↓
role middleware
```

Example roles:

```text
ADMIN
OPERATOR
DRIVER
FIELD_AGENT
```

---

# 47. ROLE AUTHORIZATION

```text
ADMIN
 ├── CRUD routes
 ├── CRUD vehicles
 ├── manage users
 ├── view analytics
 └── approve critical decisions

OPERATOR
 ├── create shipment
 ├── track
 ├── generate route recommendation
 └── approve reroute

DRIVER
 ├── assigned shipments
 ├── location
 └── incident report

FIELD_AGENT
 ├── incident report
 └── incident status
```

---

# 48. DEPLOYMENT

## Frontend

**Vercel**

This is a very good choice for your React/Vite frontend.

```text
GitHub
 ↓
Vercel
 ↓
React application
```

---

# 49. BACKEND

You have two reasonable choices.

## Option A — Render

For your current architecture, I would choose:

**Render Web Service**

because it directly supports deploying Node/Express applications and also supports inbound WebSocket connections for real-time applications.

Architecture:

```text
React
 ↓
Vercel
 ↓
Express API
 ↓
Render
 ↓
MongoDB Atlas
```

---

## Option B — Vercel backend

Vercel currently supports Express applications and can deploy an Express app as a Vercel Function.

However, for **your Socket.IO/live vehicle tracking prototype**, I would still prefer keeping the backend as a long-running Render service initially.

### My recommendation

```text
Frontend → Vercel

Backend → Render

Database → MongoDB Atlas
```

Then later:

```text
ML service → Render / Railway / similar Python host
Redis → managed Redis
```

---

# 50. FINAL DEPLOYMENT ARCHITECTURE

```text
                        USERS
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
         VERCEL                     DRIVER
       React App                      │
             │                        │
             └──────────┬─────────────┘
                        ▼
                 EXPRESS API
                    RENDER
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
      MongoDB        Map APIs       Weather
       Atlas                         API
          │
          │
          ▼
      Intelligence
        Services
          │
          ▼
      Python ML
       Service
       (later)
```

---

# 51. DEVELOPMENT PHASES

## PHASE 1 — Foundation

Build:

```text
React
Express
MongoDB
JWT
```

Implement:

* Login
* Register
* Role system
* Dashboard shell

---

# PHASE 2 — Logistics CRUD

Implement:

```text
Vehicle
Driver
Shipment
Route
```

CRUD completely.

---

# PHASE 3 — Map

Implement:

```text
Map
Routes
Vehicles
Markers
Polylines
```

Then:

```text
Origin
Destination
Route generation
```

---

# PHASE 4 — Tracking

Add:

```text
Vehicle currentLocation
```

Then:

```text
Socket.IO
```

for simulated live movement.

---

# PHASE 5 — Incidents

Implement:

```text
Create incident
View incident
Severity
Coordinates
Photo
Status
```

---

# PHASE 6 — Intelligence

Add:

```text
Accessibility score
Risk score
```

First deterministic.

---

# PHASE 7 — THE KEY DEMO

Implement:

```text
Incident
 ↓
Affected route
 ↓
Affected shipment
 ↓
Recalculate
 ↓
Alternative routes
 ↓
Explain
 ↓
Approve
 ↓
Reroute
```

Do this before building anything else fancy.

---

# PHASE 8 — WEATHER

Connect Open-Meteo.

```text
Coordinates
 ↓
Weather
 ↓
Route segments
 ↓
Risk
```

Open-Meteo's forecast and historical APIs provide the variables needed for a useful weather-risk prototype, including precipitation, wind and visibility.

---

# PHASE 9 — ML

Only after the deterministic system works.

```text
Historical data
 ↓
Dataset
 ↓
Train
 ↓
Evaluate
 ↓
Predict
 ↓
Risk engine
```

---

# PHASE 10 — POLISH

Add:

* analytics
* responsive layout
* loading states
* error handling
* offline incident queue
* deployment
* demo data
* presentation mode

---

# 52. WHAT NOT TO BUILD

## DO NOT BUILD

**Blockchain**

No meaningful value.

**Complex chatbot**

Not core to SIH26002.

**Microservices**

Premature.

**Kafka**

Premature.

**Kubernetes**

Absolutely unnecessary for the prototype.

**Full national logistics simulation**

Too broad.

**Hardware GPS device**

Not necessary for first prototype.

**Huge mobile application**

Not necessary.

**Advanced deep-learning model**

Not initially justified.

---

# 53. WHAT WE SHOULD BUILD PERFECTLY

There are only five things that matter most.

## 1. Excellent map

```text
Network visibility
```

## 2. Strong incident workflow

```text
Report → impact
```

## 3. Strong accessibility score

```text
Why is this road accessible or risky?
```

## 4. Strong route comparison

```text
Fastest vs safest vs resilient
```

## 5. Strong decision workflow

```text
Recommendation → explanation → approval → action
```

---

# 54. THE COMPLETE SYSTEM FLOW

```text
                    ┌──────────────┐
                    │     USER     │
                    └──────┬───────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  React Frontend │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Express REST API│
                  └────────┬────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Business Services   │
                ├─────────────────────┤
                │ Shipment            │
                │ Route               │
                │ Incident            │
                │ Risk                │
                │ Accessibility       │
                │ Recommendation      │
                └──────────┬──────────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
         MongoDB        Map API       Weather API
                           │             │
                           └──────┬──────┘
                                  ▼
                           Intelligence
                              Engine
                                  │
                        ┌─────────┴──────────┐
                        ▼                    ▼
                     Rule ML               ML Model
                    Prototype               Later
                        │                    │
                        └─────────┬──────────┘
                                  ▼
                            Recommendation
                                  │
                                  ▼
                              Operator
                                  │
                       ┌──────────┴─────────┐
                       ▼                    ▼
                    APPROVE               REJECT
                       │
                       ▼
                    REROUTE
                       │
                       ▼
                    TRACKING
```

---

# 55. THE MOST IMPORTANT DEMO SCENARIO

Your entire SIH presentation can revolve around one scenario.

## Initial state

```text
Shipment #104

Guwahati → Imphal

Route A

ETA: 9h 10m
Risk: 21
Accessibility: 84
```

---

## Incident occurs

```text
Landslide
Route Segment RS-07
Severity: Critical
```

---

## System reacts

```text
RS-07
 ↓
Risk = 95
 ↓
Shipment #104 affected
 ↓
ETA +2h 40m
```

---

## Intelligence engine

```text
Route B

ETA: 9h 35m
Risk: 28
Accessibility: 79
```

---

## System recommendation

```text
RECOMMENDED

Route B

Reason:

✓ Avoids affected segment
✓ Lower weather exposure
✓ Lower disruption probability
✓ Suitable for current vehicle

ETA:
+25 minutes

Risk reduction:
~70%
```

---

## Human action

```text
[ APPROVE REROUTE ]
```

---

## System

```text
Route changed
Driver notified
ETA updated
Shipment status updated
```

That is your **killer demo**.

---

# 56. WHY THIS IS DIFFERENT FROM THE PREVIOUS PROJECTS

## Previous baseline

```text
TRACK
MONITOR
REPORT
```

## Our system

```text
TRACK
   ↓
UNDERSTAND
   ↓
PREDICT
   ↓
ASSESS IMPACT
   ↓
COMPARE
   ↓
EXPLAIN
   ↓
DECIDE
   ↓
ACT
```

This is the strongest conceptual improvement.

---

# 57. WHAT WE ARE ACTUALLY CLAIMING

Don't say:

> "We created an AI that solves logistics."

Say:

> **"We created an intelligent logistics decision-support system that converts real-time network conditions, weather, road accessibility and field incidents into explainable route-risk assessments and actionable rerouting recommendations."**

That claim is much more defensible.

---

# 58. MVP VS SCALE-UP

## MVP

```text
MERN
+
MongoDB
+
Leaflet
+
Mapbox
+
Open-Meteo
+
Socket.IO
+
Weighted Risk Engine
```

---

## Scale-up

```text
MERN
+
Redis
+
ML service
+
Real-time streams
+
External logistics integrations
+
Advanced routing engine
+
Offline mobile
+
Distributed infrastructure
```

---

# 59. FINAL TECHNOLOGY STACK

## Frontend

```text
React
Vite
Tailwind CSS
React Router
Axios
Context API
Leaflet / React-Leaflet
Recharts
Framer Motion
Lucide React
```

---

## Backend

```text
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
Multer
Socket.IO
Axios
Express Validator
Helmet
CORS
dotenv
```

---

## External services

```text
Mapbox Directions API
Mapbox Geocoding/Search
Open-Meteo
MongoDB Atlas
Cloudinary/ImageKit (incident photos)
```

---

## AI

### Initial

```text
Weighted scoring
```

### Later

```text
Python
FastAPI
scikit-learn
Random Forest / XGBoost
```

---

## Deployment

```text
Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

ML → Separate Python service later

Redis → Later only
```

---

# 60. THE FIVE-PERSON TEAM BREAKDOWN

## Person 1 — Frontend / Dashboard

```text
Dashboard
Map
Analytics
UI system
```

## Person 2 — Backend / Auth

```text
Auth
Users
Middleware
API
Shipment CRUD
```

## Person 3 — Logistics Backend

```text
Routes
Vehicles
Tracking
Socket.IO
```

## Person 4 — Intelligence

```text
Risk
Accessibility
Incident impact
Recommendation engine
```

## Person 5 — Integration / AI

```text
Map API
Weather API
ML dataset
ML model
deployment
```

Everyone still works together through Git branches and pull requests.

---

# 61. THE REPOSITORIES — WHAT EACH ONE CONTRIBUTES TO OUR DESIGN

```text
ROAD TELEMATICS
       │
       ├── Route
       ├── Driver
       ├── Vehicle
       ├── GPS
       ├── Delay
       ├── Geofence
       └── Operations
              │
              ▼

KNITKRAFT
       │
       ├── Role system
       ├── Transport actor
       ├── Warehouse actor
       └── Workflow
              │
              ▼

DYNAMIC MAIL
       │
       └── Multimodal choice
              │
              ▼

VEHICLE TRACKING
       │
       └── Tracking baseline
              │
              ▼

DRISHTI
       │
       ├── Predictive dashboard
       ├── Anomaly concept
       └── Decision-support UX
              │
              ▼

              OUR SYSTEM
                   │
       ┌───────────┼────────────┐
       ▼           ▼            ▼
 Accessibility   Risk       Disruption
       │           │            │
       └───────────┼────────────┘
                   ▼
             Route Ranking
                   │
                   ▼
             Explainability
                   │
                   ▼
              Human Approval
                   │
                   ▼
                 Action
```

---

# 62. THE PRINCIPLE WE SHOULD FOLLOW THROUGHOUT DEVELOPMENT

> **Do not try to implement every feature in the SIH statement. Implement one end-to-end operational intelligence loop exceptionally well, then expand around it.**

That loop is:

```text
INCIDENT
   ↓
NETWORK IMPACT
   ↓
RISK
   ↓
ACCESSIBILITY
   ↓
ROUTE ALTERNATIVES
   ↓
EXPLANATION
   ↓
OPERATOR DECISION
   ↓
REROUTE
   ↓
TRACKING
```

Everything else exists to support that loop.

---

# 63. FINAL ARCHITECTURE IN ONE IMAGE/MENTAL MODEL

```text
                    SIH26002
                       │
                       ▼
             ┌──────────────────┐
             │   NER NETWORK    │
             └────────┬─────────┘
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
       SHIPMENT     VEHICLE     INCIDENT
          │           │            │
          └───────────┼────────────┘
                      ▼
                GEO / WEATHER
                      │
                      ▼
             ┌─────────────────┐
             │  RISK ENGINE    │
             └────────┬────────┘
                      │
             ┌────────┴────────┐
             ▼                 ▼
       ACCESSIBILITY       DISRUPTION
             │                 │
             └────────┬────────┘
                      ▼
               ROUTE ENGINE
                      │
                      ▼
             ROUTE COMPARISON
                      │
                      ▼
              EXPLAINABLE AI
                      │
                      ▼
              HUMAN APPROVAL
                      │
                      ▼
                   REROUTE
                      │
                      ▼
               LIVE TRACKING
```

# 64. FINAL DECISION

### **Base**

**Road Transport Network Telematics**

### **Borrow conceptually**

**KnitKraft + Dynamic Mail Transmission + DRISHTI**

### **Use only as baseline reference**

**Real-Time Vehicle Tracking**

### **Our actual innovation**

**NER-specific accessibility + disruption impact + risk-aware routing + explainable human-in-the-loop decisions.**

### **Our first technical milestone**

> **Build the complete Incident → Affected Shipment → Risk Recalculation → Alternative Route → Explainable Recommendation → Operator Approval → Reroute loop using MERN.**

### **Our second milestone**

> Add live simulated vehicle tracking and weather.

### **Our third milestone**

> Replace the initial rule-based risk score with a real ML disruption model.

### **Our deployment**

> **React/Vite → Vercel | Express/Socket.IO → Render | MongoDB → Atlas**

### **Redis**

> **Not initially. Add only when there is an actual caching/realtime scaling requirement.**

### **AI**

> **No fake AI. Start with deterministic intelligence, then introduce a measured ML model with a real dataset and evaluation metrics.**

This gives you a prototype that is **close enough to a proven SIH logistics architecture to be achievable**, but different enough to demonstrate a clear technical improvement over the historical solutions we analyzed.





////////////////////
last edit step60 
step 106
Backend/
│
├── scripts/
│   └── createAdmin.js
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── vehicle.controller.js
│   │   ├── route.controller.js
│   │   ├── routeSegment.controller.js
│   │   ├── shipment.controller.js
│   │   ├── incident.controller.js
│   │   ├── accessibility.controller.js
│   │   ├── risk.controller.js
│   │   ├── weather.controller.js
│   │   ├── recommendation.controller.js
│   │   ├── shipmentImpact.controller.js
│   │   ├── analytics.controller.js
│   │   └── tracking.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── auth.validation.js
│   │   ├── role.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── vehicle.model.js
│   │   ├── route.model.js
│   │   ├── routeSegment.model.js
│   │   ├── shipment.model.js
│   │   ├── incident.model.js
│   │   └── recommendation.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── vehicle.routes.js
│   │   ├── route.routes.js
│   │   ├── routeSegment.routes.js
│   │   ├── shipment.routes.js
│   │   ├── incident.routes.js
│   │   ├── accessibility.routes.js
│   │   ├── risk.routes.js
│   │   ├── weather.routes.js
│   │   ├── recommendation.routes.js
│   │   ├── shipmentImpact.routes.js
│   │   ├── analytics.routes.js
│   │   └── tracking.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── vehicle.service.js
│   │   ├── route.service.js
│   │   ├── routeSegment.service.js
│   │   ├── shipment.service.js
│   │   ├── incident.service.js
│   │   ├── shipmentImpact.service.js
│   │   ├── accessibility.service.js
│   │   ├── risk.service.js
│   │   ├── weather.service.js
│   │   ├── routeWeather.service.js
│   │   ├── routeScore.service.js
│   │   ├── recommendation.service.js
│   │   ├── recommendationApproval.service.js
│   │   ├── analytics.service.js
│   │   └── tracking.service.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── score.js
│   │
│   ├── socket.js
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
///////////////////////////////////////////////////
AUTH
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout

USERS
POST   /api/users/drivers
POST   /api/users/field-agents
POST   /api/users/operators
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
PATCH  /api/users/:id/status
DELETE /api/users/:id

VEHICLES
POST   /api/vehicles
GET    /api/vehicles
GET    /api/vehicles/:id
PATCH  /api/vehicles/:id
PATCH  /api/vehicles/:id/driver
DELETE /api/vehicles/:id/driver
DELETE /api/vehicles/:id

ROUTES
POST   /api/routes
GET    /api/routes
GET    /api/routes/:id
PATCH  /api/routes/:id
DELETE /api/routes/:id

ROUTE SEGMENTS
POST   /api/route-segments/route/:routeId
GET    /api/route-segments/route/:routeId
GET    /api/route-segments/:id
PATCH  /api/route-segments/:id
DELETE /api/route-segments/:id

SHIPMENTS
POST   /api/shipments
GET    /api/shipments
GET    /api/shipments/:id
PATCH  /api/shipments/:id
DELETE /api/shipments/:id

INCIDENTS
POST   /api/incidents
GET    /api/incidents
GET    /api/incidents/:id
PATCH  /api/incidents/:id
DELETE /api/incidents/:id

RISK
GET    /api/risk/segment/:id

ACCESSIBILITY
GET    /api/accessibility/segment/:id

WEATHER
GET    /api/weather/segment/:id

SHIPMENT IMPACT
GET    /api/shipment-impact/incident/:incidentId
POST   /api/shipment-impact/incident/:incidentId/apply

RECOMMENDATIONS
POST   /api/recommendations/generate
GET    /api/recommendations
POST   /api/recommendations/:id/approve
POST   /api/recommendations/:id/reject

TRACKING
PATCH  /api/tracking/vehicle/:vehicleId/location

ANALYTICS
GET    /api/analytics/dashboard
///////////////////////////////////////////////////
                 FIELD AGENT
                      │
                      ▼
                 INCIDENT API
                      │
                      ▼
             ┌─────────────────┐
             │ INCIDENT SERVICE│
             └────────┬────────┘
                      │
                      ▼
                ROUTE SEGMENT
                      │
             ┌────────┴────────┐
             ▼                 ▼
        Weather API         Incident Data
             │                 │
             └────────┬────────┘
                      ▼
                 RISK ENGINE
                      │
            ┌─────────┴─────────┐
            ▼                   ▼
      Accessibility          Risk Score
            │                   │
            └─────────┬─────────┘
                      ▼
               ROUTE METRICS
                      │
                      ▼
              SHIPMENT IMPACT
                      │
                      ▼
             CANDIDATE ROUTES
                      │
                      ▼
            RECOMMENDATION ENGINE
                      │
                      ▼
              EXPLAINABLE RESULT
                      │
                      ▼
                  OPERATOR
                 /        \
                ▼          ▼
            APPROVE       REJECT
               │
               ▼
             REROUTE
               │
               ▼
          LIVE TRACKING

/////
TODAY'S TEST ORDER

Don't test 40 APIs randomly. Do it in this exact order:

1. Server starts
2. Health
3. Admin login
4. Driver login
5. Operator login
6. Create vehicle
7. Assign driver
8. Create route
9. Create 3 route segments
10. Create shipment
11. Set currentSegment
12. Create critical incident
13. Check segment risk
14. Check shipment impact
15. Update weather risk
16. Create second candidate route
17. Generate recommendation
18. Approve recommendation
19. Check shipment route changed
20. Update vehicle location
21. Check analytics

The single test scenario that matters most is:

Create Shipment
      ↓
Create Route
      ↓
Create RouteSegments
      ↓
Create Incident
      ↓
Incident finds Segment
      ↓
Risk increases
      ↓
Shipment becomes AT_RISK
      ↓
Generate Recommendation
      ↓
Approve
      ↓
Shipment gets new Route
      ↓
Vehicle continues tracking
////////////////////////////////////////////
STEP 308 — Final .env

Your environment should now roughly contain:

PORT=5000

NODE_ENV=development

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_LONG_RANDOM_SECRET

CLIENT_URL=http://localhost:5173

ADMIN_NAME=System Administrator
ADMIN_EMAIL=admin@sih26002.com
ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD

ORS_API_KEY=YOUR_ORS_API_KEY

Do not commit this file.

STEP 309 — Final dependency list

Your backend should now have roughly:

express
mongoose
dotenv
cors
cookie-parser
bcryptjs
jsonwebtoken
express-validator
helmet
morgan
axios
socket.io
express-rate-limit

You don't need Redis yet.

For your current prototype:

MongoDB
+
Express
+
Socket.IO

is enough.

Adding Redis now would mostly increase your complexity without giving the prototype meaningful benefit.

STEP 310 — Final architecture

You now have a genuine four-layer backend:

                  CLIENT
                     │
                     ▼
                  ROUTES
                     │
                     ▼
                MIDDLEWARE
             ┌───────┼────────┐
             │       │        │
            Auth   Role   Validation
             │       │        │
             └───────┼────────┘
                     ▼
                 CONTROLLER
                     │
                     ▼
                  SERVICE
                     │
          ┌──────────┼───────────┐
          │          │           │
        Model      External     Utils
          │          APIs
          ▼
       MongoDB

And the intelligence layer:

ORS / OSRM
     ↓
Route
     ↓
RouteSegments
     ↓
Weather + Incident + Road Factors
     ↓
Risk Engine
     ↓
Accessibility Engine
     ↓
Shipment Impact
     ↓
Recommendation
     ↓
Human Approval
     ↓
Reroute
     ↓
Tracking
Backend prototype status
AUTH                         ✅
USER MANAGEMENT              ✅
ONE ADMIN                    ✅
ROLE AUTHORIZATION           ✅
VEHICLES                     ✅
ROUTES                       ✅
ROUTE SEGMENTS               ✅
SHIPMENTS                    ✅
INCIDENTS                    ✅

ORS ROUTING                  ✅
OSRM FALLBACK                ✅
ROUTE GENERATION             ✅
ROUTE SEGMENTATION            ✅

WEATHER                      ✅
RISK ENGINE                  ✅
ACCESSIBILITY                ✅
INCIDENT IMPACT              ✅
SHIPMENT IMPACT              ✅

RECOMMENDATIONS              ✅
EXPLAINABLE REASONS          ✅
APPROVAL / REJECTION         ✅
REROUTING                    ✅

LIVE TRACKING                ✅
SOCKET.IO                    ✅
ANALYTICS                    ✅

VALIDATION                   ✅
RATE LIMITING                ✅
STATUS TRANSITIONS           ✅
DUPLICATE RECOMMENDATION     ✅
ERROR HANDLING               ✅
GRACEFUL SHUTDOWN            ✅

At this point, stop adding backend features. The next step should be the full regression test of the backend using one realistic scenario:

ADMIN
 ↓
create Driver
 ↓
create Vehicle
 ↓
assign Driver
 ↓
generate Route
 ↓
generate Segments
 ↓
create Shipment
 ↓
track Shipment
 ↓
Field Agent reports CRITICAL incident
 ↓
segment risk increases
 ↓
shipment becomes AT_RISK
 ↓
candidate routes generated
 ↓
recommendation created
 ↓
Operator approves
 ↓
shipment route changes
 ↓
tracking continues