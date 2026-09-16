import {
    getRouteIntelligence
} from "../services/routeIntelligence.service.js";


const getIntelligence = async (
    req,
    res,
    next
) => {

    try {

        const result =
            await getRouteIntelligence(
                req.params.id
            );


        res.status(200).json({

            success: true,

            intelligence:
                result

        });

    } catch (error) {

        next(error);

    }
};


export {
    getIntelligence
};