import React, { useRef, useState } from "react";

const MusicPlayer = ({ song, loading }) => {

    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = async () => {

        if (!audioRef.current) return;

        try {

            if (audioRef.current.paused) {
                await audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }

        } catch (error) {
            console.error("PLAY ERROR:", error);
        }
    };

    // Skip forward 3 seconds
    const skipForward = () => {

        if (!audioRef.current) return;

        audioRef.current.currentTime = Math.min(
            audioRef.current.currentTime + 3,
            audioRef.current.duration || 0
        );

    };

    // Skip backward 3 seconds
    const skipBackward = () => {

        if (!audioRef.current) return;

        audioRef.current.currentTime = Math.max(
            audioRef.current.currentTime - 3,
            0
        );

    };

    const formatTime = (time) => {

        if (!time || Number.isNaN(time)) {
            return "0:00";
        }

        const minutes = Math.floor(time / 60);

        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");

        return `${minutes}:${seconds}`;
    };

    const title =
        song?.title ||
        song?.name ||
        "Unknown Song";

    const artist =
        song?.artist ||
        song?.performer ||
        song?.author ||
        "Unknown Artist";

    const audioUrl =
        song?.url ||
        song?.audioUrl ||
        song?.audio ||
        song?.src;

    const image =
        song?.image ||
        song?.poster ||
        song?.cover ||
        song?.albumArt;

    return (
        <>
            <audio
                ref={audioRef}
                src={audioUrl}

                onTimeUpdate={() => {
                    setCurrentTime(audioRef.current.currentTime);
                }}

                onLoadedMetadata={() => {
                    setDuration(audioRef.current.duration);
                }}

                onEnded={() => {
                    setIsPlaying(false);
                }}
            />

            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "80px",
                    background: "#fff",
                    borderTop: "1px solid #ddd",
                    boxShadow: "0 -5px 20px rgba(0,0,0,0.08)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 30px",
                    boxSizing: "border-box",
                    zIndex: 9999
                }}
            >

                {/* Poster */}

                <div
                    style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        background: "#eee",
                        flexShrink: 0
                    }}
                >

                    {image && (
                        <img
                            src={image}
                            alt={title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />
                    )}

                </div>


                {/* Song details */}

                <div
                    style={{
                        marginLeft: "15px",
                        width: "220px"
                    }}
                >

                    <h3
                        style={{
                            margin: 0,
                            fontSize: "14px"
                        }}
                    >
                        {loading ? "Fetching song..." : title}
                    </h3>

                    <p
                        style={{
                            margin: "4px 0 0",
                            fontSize: "12px",
                            color: "#999"
                        }}
                    >
                        {loading ? "Please wait" : artist}
                    </p>

                </div>


                {/* Controls */}

                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "18px"
                    }}
                >

                    {/* -3 Seconds */}

                    <button
                        onClick={skipBackward}
                        disabled={!audioUrl}
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: audioUrl ? "pointer" : "not-allowed",
                            fontSize: "14px",
                            fontWeight: 600
                        }}
                    >
                        ↶ 3
                    </button>


                    {/* Play / Pause */}

                    <button
                        onClick={togglePlay}
                        disabled={!audioUrl}
                        style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            border: "none",
                            background: "#111",
                            color: "#fff",
                            cursor: audioUrl ? "pointer" : "not-allowed"
                        }}
                    >
                        {isPlaying ? "❚❚" : "▶"}
                    </button>


                    {/* +3 Seconds */}

                    <button
                        onClick={skipForward}
                        disabled={!audioUrl}
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: audioUrl ? "pointer" : "not-allowed",
                            fontSize: "14px",
                            fontWeight: 600
                        }}
                    >
                        3 ↷
                    </button>

                </div>


                {/* Progress */}

                <div
                    style={{
                        width: "300px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}
                >

                    <span
                        style={{
                            fontSize: "11px",
                            color: "#999"
                        }}
                    >
                        {formatTime(currentTime)}
                    </span>

                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={(e) => {

                            const value = Number(e.target.value);

                            if (audioRef.current) {
                                audioRef.current.currentTime = value;
                            }

                            setCurrentTime(value);
                        }}
                        style={{
                            flex: 1
                        }}
                    />

                    <span
                        style={{
                            fontSize: "11px",
                            color: "#999"
                        }}
                    >
                        {formatTime(duration)}
                    </span>

                </div>

            </div>
        </>
    );
};

export default MusicPlayer;