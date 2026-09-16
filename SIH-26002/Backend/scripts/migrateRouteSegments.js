import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB
    from "../src/config/db.js";

import RouteSegment
    from "../src/models/routeSegment.model.js";


dotenv.config();


const migrateRouteSegments = async () => {

    try {

        await connectDB();


        const segments =
            await RouteSegment.find({
                segmentIndex: {
                    $exists: false
                }
            })
            .sort({
                createdAt: 1
            });


        console.log(
            `Found ${segments.length} segments without segmentIndex`
        );


        const routeIndexes = new Map();


        for (
            const segment
            of segments
        ) {

            const routeId =
                segment.route.toString();


            if (
                !routeIndexes.has(
                    routeId
                )
            ) {

                const existingCount =
                    await RouteSegment.countDocuments({
                        route: segment.route,
                        segmentIndex: {
                            $exists: true
                        }
                    });


                routeIndexes.set(
                    routeId,
                    existingCount
                );
            }


            const currentIndex =
                routeIndexes.get(
                    routeId
                );


            segment.segmentIndex =
                currentIndex;


            await segment.save();


            routeIndexes.set(
                routeId,
                currentIndex + 1
            );


            console.log(
                `Updated ${segment._id} → segmentIndex ${currentIndex}`
            );
        }


        console.log(
            "Route segment migration completed"
        );

    } catch (error) {

        console.error(
            "Migration failed:",
            error.message
        );

        process.exitCode = 1;

    } finally {

        await mongoose.connection.close();

    }
};


migrateRouteSegments();
