const toRadians = (value) => {
    return value * Math.PI / 180;
};


const calculateDistanceKm = (
    pointA,
    pointB
) => {

    const [
        lon1,
        lat1
    ] = pointA;

    const [
        lon2,
        lat2
    ] = pointB;


    const earthRadius = 6371;


    const dLat =
        toRadians(
            lat2 - lat1
        );

    const dLon =
        toRadians(
            lon2 - lon1
        );


    const a =
        Math.sin(dLat / 2) ** 2 +

        Math.cos(
            toRadians(lat1)
        ) *

        Math.cos(
            toRadians(lat2)
        ) *

        Math.sin(dLon / 2) ** 2;


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return (
        earthRadius * c
    );
};


const calculateLineDistanceKm = (
    coordinates
) => {

    let totalDistance = 0;


    for (
        let i = 0;
        i < coordinates.length - 1;
        i++
    ) {

        totalDistance +=
            calculateDistanceKm(
                coordinates[i],
                coordinates[i + 1]
            );
    }


    return Number(
        totalDistance.toFixed(2)
    );
};


export {
    calculateDistanceKm,
    calculateLineDistanceKm
};