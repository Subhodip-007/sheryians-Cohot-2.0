import {
    getDashboardAnalytics
} from "../services/analytics.service.js";


const dashboard = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await getDashboardAnalytics();


        res.status(200).json({

            success: true,

            analytics: data

        });

    } catch (error) {

        next(error);

    }
};


export {
    dashboard
};