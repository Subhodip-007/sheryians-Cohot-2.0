import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";


import authRoutes
    from "./routes/auth.routes.js";
import userRoutes
    from "./routes/user.routes.js";
import vehicleRoutes
    from "./routes/vehicle.routes.js";
import routeRoutes
    from "./routes/route.routes.js";
    import routeSegmentRoutes
    from "./routes/routeSegment.routes.js";
    import shipmentRoutes
    from "./routes/shipment.routes.js";
    import incidentRoutes
    from "./routes/incident.routes.js";
 import accessibilityRoutes
    from "./routes/accessibility.routes.js";

import riskRoutes
    from "./routes/risk.routes.js";  
    import shipmentImpactRoutes
    from "./routes/shipmentImpact.routes.js"; 
    import weatherRoutes
    from "./routes/weather.routes.js";
    import recommendationRoutes
    from "./routes/recommendation.routes.js";
    import analyticsRoutes
    from "./routes/analytics.routes.js";
    import trackingRoutes
    from "./routes/tracking.routes.js";
import routeGenerationRoutes
    from "./routes/routeGeneration.routes.js";
    import routeSegmentationRoutes
    from "./routes/routeSegmentation.routes.js";
    import routeIntelligenceRoutes
    from "./routes/routeIntelligence.routes.js";
    import reroutingRoutes
    from "./routes/rerouting.routes.js";
    import incidentImpactRoutes
    from "./routes/incidentImpact.routes.js";
    import rateLimit
    from "express-rate-limit";
    import trackingSimulatorRoutes
    from "./routes/trackingSimulator.routes.js";
    import {  
    errorMiddleware
} from "./middleware/error.middleware.js";


const app = express();


// --------------------
// Security
// --------------------

app.use(
    helmet()
);


// --------------------
// CORS
// --------------------



app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);


// --------------------
// Body Parser
// --------------------

app.use(
    express.json()
);

app.use(
    express.urlencoded({
        extended: true
    })
);


// --------------------
// Cookies
// --------------------

app.use(
    cookieParser()
);


// --------------------
// Logger
// --------------------

app.use(
    morgan("dev")
);


// --------------------
// Health Check
// --------------------

app.get(
    "/api/health",
    (req, res) => {

        res.status(200).json({

            success: true,

            message:
                "SIH26002 Backend is running",

            environment:
                process.env.NODE_ENV ||
                "development",

            timestamp:
                new Date().toISOString()

        });

    }
);
const apiLimiter =
    rateLimit({
        windowMs:
            15 * 60 * 1000,

        max: 300,

        standardHeaders: true,

        legacyHeaders: false,

        message: {
            success: false,
            message:
                "Too many requests. Please try again later."
        }
    });

// --------------------
// Routes
// --------------------

app.use(
    "/api/auth",
    authRoutes
);
app.use(
    "/api/users",
    userRoutes
);
app.use(
    "/api/vehicles",
    vehicleRoutes
);
app.use(
    "/api/routes",
    routeRoutes
);
app.use(
    "/api/route-segments",
    routeSegmentRoutes
);
app.use(
    "/api/shipments",
    shipmentRoutes
);
app.use(
    "/api/incidents",
    incidentRoutes
);
app.use(
    "/api/accessibility",
    accessibilityRoutes
);

app.use(
    "/api/risk",
    riskRoutes
);
app.use(
    "/api/shipment-impact",
    shipmentImpactRoutes
);
app.use(
    "/api/weather",
    weatherRoutes
);
app.use(
    "/api/recommendations",
    recommendationRoutes
);
app.use(
    "/api/analytics",
    analyticsRoutes
);
app.use(
    "/api/tracking",
    trackingRoutes
);
app.use(
    "/api/route-generation",
    routeGenerationRoutes
);
app.use(
    "/api/route-segmentation",
    routeSegmentationRoutes
);

app.use(
    "/api/route-intelligence",
    routeIntelligenceRoutes
);
app.use(
    "/api/rerouting",
    reroutingRoutes
);
app.use(
    "/api/incident-impact",
    incidentImpactRoutes
);
app.use(
    "/api",
    apiLimiter
);
app.use(
    "/api/tracking-simulator",
    trackingSimulatorRoutes
);
// --------------------
// Error Handler
// --------------------

app.use(
    errorMiddleware
);


export default app;