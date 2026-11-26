
import React, { useContext, useEffect, useState } from 'react';
import "../shared/LockScreen.scss";

import { AppContext } from '../context/App.context';

const LockScreen = () => {
    const {
        isUnlocked,
        openLock,
        isMusicPlaying,
        currentTrack
    } = useContext(AppContext);

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return (
        <div
            className={`LockScreen ${isUnlocked ? "unlock" : ""}`}
            onClick={openLock}
        >
            <div className="watch">
                <div className="lock-date">
                    {formattedDate}
                </div>

                <div className="lock-time">
                    {formattedTime}
                </div>
            </div>

            {isMusicPlaying && (
    <div className="LockMusicWidget">

        <div className="music-art">
            <span>♫</span>
        </div>

        <div className="music-details">
            <span className="music-label">
                NOW PLAYING
            </span>

            <p className="music-title">
                {currentTrack || "Unknown Track"}
            </p>

            <span className="music-source">
                YouTube Music
            </span>
        </div>

        <div className="music-visualizer">
            {[1, 2, 3, 4, 5].map((item) => (
                <span key={item}></span>
            ))}
        </div>

    </div>
)}
        </div>
    );
};

export default LockScreen;
