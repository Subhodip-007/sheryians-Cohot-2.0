
import { useState } from "react";
import axios from "axios";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Open-Meteo Weather API
const getWeather = async (city) => {

    // Step 1: Get city coordinates
    const locationResponse = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
            params: {
                name: city,
                count: 1,
                language: "en",
                format: "json"
            }
        }
    );

    const location = locationResponse.data.results?.[0];

    if (!location) {
        throw new Error("City not found. Please try another city.");
    }

    // Step 2: Fetch current and historical weather
    const weatherResponse = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
            params: {
                latitude: location.latitude,
                longitude: location.longitude,
                current: "temperature_2m,relative_humidity_2m,weather_code",
                daily: "temperature_2m_mean",
                past_days: 7,
                forecast_days: 1,
                timezone: "auto"
            }
        }
    );

    return {
        location,
        weather: weatherResponse.data
    };
};

// Convert weather codes into descriptions
const getWeatherCondition = (code) => {

    if (code === 0) return "Clear Sky";
    if ([1, 2, 3].includes(code)) return "Partly Cloudy";
    if ([45, 48].includes(code)) return "Fog";
    if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
    if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
    if ([71, 73, 75, 77].includes(code)) return "Snow";
    if ([80, 81, 82].includes(code)) return "Rain Showers";
    if ([85, 86].includes(code)) return "Snow Showers";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";

    return "Unknown";
};

function App() {

    const [city, setCity] = useState("Delhi");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch Weather
    const fetchWeather = async () => {

        if (!city.trim()) {
            setError("Please enter a city name.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await getWeather(city);

            setWeather(data);

        } catch (err) {
            setError(
                err.response?.data?.reason ||
                err.message ||
                "Unable to fetch weather data."
            );

            setWeather(null);

        } finally {
            setLoading(false);
        }
    };

    // Historical Chart Data
    const chartData = weather
        ? {
            labels: weather.weather.daily.time,

            datasets: [
                {
                    label: "Average Temperature (°C)",

                    data: weather.weather.daily.temperature_2m_mean,

                    borderColor: "blue",

                    backgroundColor: "rgba(0, 0, 255, 0.1)",

                    tension: 0.4
                }
            ]
        }
        : {
            labels: [],
            datasets: []
        };

    return (
        <div>

            <h2>Weather Dashboard</h2>

            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter City Name"
            />

            <button onClick={fetchWeather} disabled={loading}>
                {loading ? "Loading..." : "Get Current Weather"}
            </button>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {weather && (
                <div>

                    <h3>
                        Current Weather
                    </h3>

                    <p>
                        City: {weather.location.name}
                    </p>

                    <p>
                        Temperature: {weather.weather.current.temperature_2m} °C
                    </p>

                    <p>
                        Humidity: {weather.weather.current.relative_humidity_2m}%
                    </p>

                    <p>
                        Condition: {
                            getWeatherCondition(
                                weather.weather.current.weather_code
                            )
                        }
                    </p>

                </div>
            )}

            <h3>Historical Temperature Trend</h3>

            {weather && (
                <Line data={chartData} />
            )}

            <p>
                Weather data by{" "}
                <a
                    href="https://open-meteo.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Open-Meteo
                </a>
            </p>

        </div>
    );
}

export default App;
