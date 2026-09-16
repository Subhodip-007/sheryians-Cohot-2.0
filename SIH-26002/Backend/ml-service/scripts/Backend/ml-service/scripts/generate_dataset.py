import os
import numpy as np
import pandas as pd


SEED = 42

np.random.seed(SEED)


DATA_DIR = os.path.join(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    ),
    "data"
)


os.makedirs(
    DATA_DIR,
    exist_ok=True
)


NUM_ROWS = 5000


def clamp(
    values,
    minimum=0,
    maximum=100
):
    return np.clip(
        values,
        minimum,
        maximum
    )


# --------------------------------------------------
# Environmental features
# --------------------------------------------------

rainfall_1h = np.random.gamma(
    shape=2.0,
    scale=5.0,
    size=NUM_ROWS
)

rainfall_3h = (
    rainfall_1h +
    np.random.gamma(
        shape=2.0,
        scale=8.0,
        size=NUM_ROWS
    )
)

rainfall_24h = (
    rainfall_3h +
    np.random.gamma(
        shape=2.0,
        scale=20.0,
        size=NUM_ROWS
    )
)


wind_speed = np.random.normal(
    18,
    10,
    NUM_ROWS
)

wind_speed = np.maximum(
    wind_speed,
    0
)


visibility = np.random.normal(
    8000,
    3000,
    NUM_ROWS
)

visibility = np.clip(
    visibility,
    300,
    15000
)


temperature = np.random.normal(
    24,
    7,
    NUM_ROWS
)


# --------------------------------------------------
# Terrain / road features
# --------------------------------------------------

terrain_risk = np.random.uniform(
    0,
    100,
    NUM_ROWS
)

slope_risk = np.random.uniform(
    0,
    100,
    NUM_ROWS
)

road_condition = np.random.uniform(
    20,
    100,
    NUM_ROWS
)

connectivity = np.random.uniform(
    20,
    100,
    NUM_ROWS
)


# --------------------------------------------------
# Incident features
# --------------------------------------------------

active_incident = np.random.binomial(
    1,
    0.15,
    NUM_ROWS
)


incident_severity = np.random.choice(
    [0, 1, 2, 3],
    size=NUM_ROWS,
    p=[
        0.70,
        0.15,
        0.10,
        0.05
    ]
)


historical_incidents = np.random.poisson(
    2,
    NUM_ROWS
)


historical_disruptions = np.random.poisson(
    1,
    NUM_ROWS
)


# --------------------------------------------------
# Vehicle
# --------------------------------------------------

vehicle_suitability = np.random.uniform(
    30,
    100,
    NUM_ROWS
)


# --------------------------------------------------
# Build latent disruption score
# --------------------------------------------------

rain_component = (
    rainfall_1h * 0.30
    + rainfall_3h * 0.20
    + rainfall_24h * 0.10
)


terrain_component = (
    terrain_risk * 0.10
    + slope_risk * 0.10
)


road_component = (
    (100 - road_condition) * 0.08
)


connectivity_component = (
    (100 - connectivity) * 0.04
)


incident_component = (
    active_incident * 15
    + incident_severity * 8
)


history_component = (
    historical_incidents * 1.2
    + historical_disruptions * 2
)


weather_component = (
    wind_speed * 0.15
    + (10000 - visibility) / 1000 * 2
)


latent_score = (
    rain_component
    + terrain_component
    + road_component
    + connectivity_component
    + incident_component
    + history_component
    + weather_component
)


# --------------------------------------------------
# Convert to probability
# --------------------------------------------------

probability = (
    1
    /
    (
        1
        +
        np.exp(
            -(latent_score - 55) / 12
        )
    )
)


# --------------------------------------------------
# Add stochastic noise
# --------------------------------------------------

probability = np.clip(
    probability * 0.9
    + np.random.normal(
        0,
        0.05,
        NUM_ROWS
    ),
    0,
    1
)


disruption = (
    np.random.random(
        NUM_ROWS
    )
    <
    probability
).astype(int)


# --------------------------------------------------
# Build dataframe
# --------------------------------------------------

df = pd.DataFrame({

    "rainfall_1h":
        rainfall_1h,

    "rainfall_3h":
        rainfall_3h,

    "rainfall_24h":
        rainfall_24h,

    "wind_speed":
        wind_speed,

    "visibility":
        visibility,

    "temperature":
        temperature,

    "terrain_risk":
        terrain_risk,

    "slope_risk":
        slope_risk,

    "road_condition":
        road_condition,

    "connectivity":
        connectivity,

    "active_incident":
        active_incident,

    "incident_severity":
        incident_severity,

    "historical_incidents":
        historical_incidents,

    "historical_disruptions":
        historical_disruptions,

    "vehicle_suitability":
        vehicle_suitability,

    "disruption":
        disruption
})


output_path = os.path.join(
    DATA_DIR,
    "disruption_dataset.csv"
)


df.to_csv(
    output_path,
    index=False
)


print(
    f"Dataset created: {output_path}"
)

print(
    f"Rows: {len(df)}"
)

print(
    "\nTarget distribution:"
)

print(
    df["disruption"].value_counts(
        normalize=True
    )
)