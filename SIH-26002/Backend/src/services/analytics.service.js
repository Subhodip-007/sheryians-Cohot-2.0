import Shipment from "../models/shipment.model.js";
import Vehicle from "../models/vehicle.model.js";
import Incident from "../models/incident.model.js";
import RouteSegment from "../models/routeSegment.model.js";
import Recommendation from "../models/recommendation.model.js";


const getDashboardAnalytics =
    async () => {

        const [
            activeShipments,
            atRiskShipments,
            activeVehicles,
            incidents,
            highRiskSegments,
            pendingRecommendations
        ] = await Promise.all([

            Shipment.countDocuments({
                status: {
                    $in: [
                        "ASSIGNED",
                        "IN_TRANSIT",
                        "DELAYED"
                    ]
                }
            }),

            Shipment.countDocuments({
                status: "AT_RISK"
            }),

            Vehicle.countDocuments({
                status: {
                    $in: [
                        "AVAILABLE",
                        "ASSIGNED",
                        "IN_TRANSIT"
                    ]
                }
            }),

            Incident.countDocuments({
                status: {
                    $in: [
                        "REPORTED",
                        "VERIFIED"
                    ]
                }
            }),

            RouteSegment.countDocuments({
                riskScore: {
                    $gte: 60
                }
            }),

            Recommendation.countDocuments({
                status: "PENDING"
            })

        ]);


        return {
            activeShipments,
            atRiskShipments,
            activeVehicles,
            activeIncidents:
                incidents,
            highRiskSegments,
            pendingRecommendations
        };
    };


export {
    getDashboardAnalytics
};