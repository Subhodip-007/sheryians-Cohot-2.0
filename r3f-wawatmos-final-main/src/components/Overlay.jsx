
import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export const Overlay = ({ onFullscreen }) => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();

  // Trigger confetti when the experience ends.
  useEffect(() => {
    if (end) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: [
          "#FF69B4",
          "#00BFFF",
          "#FFD700",
          "#FF8C00",
        ],
      });
    }
  }, [end]);

  const handleStart = async () => {
    // Request fullscreen directly from the user's click.
    // If fullscreen is unavailable, continue normally.
    try {
      await onFullscreen?.();
    } catch (error) {
      console.warn("Could not enter fullscreen:", error);
    }

    // Preserve the existing experience-start behavior.
    setPlay(true);
  };

  return (
    <div
      className={`overlay ${
        play ? "overlay--disable" : ""
      } ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${
          progress === 100 ? "loader--disappear" : ""
        }`}
      />

      {progress === 100 && (
        <div
          className={`intro ${
            play ? "intro--disappear" : ""
          }`}
        >
          <h1
            className="logo"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              letterSpacing: "0.2rem",
              textTransform: "uppercase",
            }}
          >
            Unknown sphere

            <div className="spinner">
              <div className="spinner__image" />
            </div>
          </h1>

          <p className="intro__scroll">
            Thoda scroll karne ka kasht karo, please...
          </p>

          <button
            className="explore"
            onClick={handleStart}
          >
            Chale ?
          </button>
        </div>
      )}

      <div
        className={`outro ${
          end ? "outro--appear" : ""
        }`}
      >
        <p
          className="outro__text"
          style={{
            textAlign: "center",
            lineHeight: "1.5",
          }}
        >
          Wish we could take this flight together for
          real, make a few memories, and let the world
          wait for a while.
          <br />
          Wishing you a very happy birthday, Bipasha!
          <br />
          I hope your special day is as wonderful as you
          are, and may your next trip around the sun be
          full of happiness, surprises, and beautiful
          adventures.
        </p>
      </div>
    </div>
  );
};
