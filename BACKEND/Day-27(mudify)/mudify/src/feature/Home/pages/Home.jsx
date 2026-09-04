// import React from 'react'
// import FaceExpression from "/src/feature/Expression/components/FaceExpression";

// const Home = () => {
//   return (
//     <FaceExpression/> /// now when i click on face detection button atfer detection we will get mood 

//     // our api will be called based on mood song /get  will fetch song and will show ui of song player 
//     // now in home we will follow four layer architecture
//   )
// }

// export default Home
import { useEffect, useState } from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import MusicPlayer from "../components/MusicPlayer";

import { getSong } from "../services/song.api";

const Home = () => {

    const [song, setSong] = useState(null);

    const [loading, setLoading] = useState(false);


    const handleMoodDetected = async (mood) => {

        try {

            console.log("DETECTED MOOD:", mood);

            setLoading(true);

            const data = await getSong({
                mood
            });

            console.log("SONG RESPONSE:", data);

            setSong(data?.song);

        } catch (error) {

            console.error("SONG FETCH ERROR:", error);

        } finally {

            setLoading(false);
        }

    };


    return (

        <div
            style={{
                minHeight: "100vh",
                paddingBottom: "90px"
            }}
        >

            <FaceExpression
                onMoodDetected={handleMoodDetected}
            />

            <MusicPlayer
                song={song}
                loading={loading}
            />

        </div>
    );
};

export default Home;