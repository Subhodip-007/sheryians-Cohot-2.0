
import React, { useContext, useEffect, useRef } from "react";
import UseWindow from "./UseWindow";
import { AppContext } from "../../context/App.context";

const YoutubeWindow = () => {
    const {
        isOpenYoutube,
        setIsMusicPlaying,
        setCurrentTrack
    } = useContext(AppContext);

    const playerRef = useRef(null);

    useEffect(() => {
        if (!isOpenYoutube) return;

        let player;

        const initializePlayer = () => {
            player = new window.YT.Player(playerRef.current, {
                height: "615",
                width: "660",
                playerVars: {
                    listType: "playlist",
                    list: "PLzjPyD9Cznf3fNS8LsJWxe742ALwjG7ia"
                },
                events: {
                    onStateChange: (event) => {
                        const playing =
                            event.data === window.YT.PlayerState.PLAYING;

                        setIsMusicPlaying(playing);

                        if (playing) {
                            setCurrentTrack(
                                event.target.getVideoData().title
                            );
                        }
                    }
                }
            });
        };

        if (window.YT?.Player) {
            initializePlayer();
        } else {
            window.onYouTubeIframeAPIReady = initializePlayer;

            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(script);
        }

        return () => {
            setIsMusicPlaying(false);
            player?.destroy();
        };

    }, [isOpenYoutube]);

    if (!isOpenYoutube) return null;

    return (
        <UseWindow windowId="youtube">
            <div ref={playerRef}></div>
        </UseWindow>
    );
};

export default YoutubeWindow;
