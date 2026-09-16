import axios from "axios";


// --------------------------------------------------
// Fetch Weather
// --------------------------------------------------

const getWeatherData = async (
    latitude,
    longitude
) => {

    const response =
        await axios.get(
            "https://api.open-meteo.com/v1/forecast",
            {
                params: {
                    latitude,
                    longitude,

                    current:
                        "temperature_2m,precipitation,wind_speed_10m,visibility",

                    hourly:
                        "precipitation_probability",

                    forecast_days: 1
                }
            }
        );


    return response.data;
};


// --------------------------------------------------
// Convert Weather → Risk
// --------------------------------------------------

const calculateWeatherRisk = (
    weather
) => {

    let risk = 0;


    const current =
        weather.current;


    if (!current) {
        return risk;
    }


    // ----------------------------------------------
    // Precipitation
    // ----------------------------------------------

    if (
        current.precipitation >= 10
    ) {

        risk += 35;

    } else if (
        current.precipitation >= 5
    ) {

        risk += 20;

    } else if (
        current.precipitation > 0
    ) {

        risk += 10;
    }


    // ----------------------------------------------
    // Wind
    // ----------------------------------------------

    if (
        current.wind_speed_10m >= 50
    ) {

        risk += 30;

    } else if (
        current.wind_speed_10m >= 30
    ) {

        risk += 20;

    } else if (
        current.wind_speed_10m >= 15
    ) {

        risk += 10;
    }


    // ----------------------------------------------
    // Visibility
    // ----------------------------------------------

    if (
        current.visibility <= 1000
    ) {

        risk += 30;

    } else if (
        current.visibility <= 3000
    ) {

        risk += 20;

    } else if (
        current.visibility <= 5000
    ) {

        risk += 10;
    }


    return Math.min(
        100,
        risk
    );
};


export {
    getWeatherData,
    calculateWeatherRisk
};