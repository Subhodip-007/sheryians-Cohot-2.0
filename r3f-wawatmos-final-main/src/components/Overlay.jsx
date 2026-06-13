import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";
import { useEffect } from "react";
import confetti from "canvas-confetti"; // <-- 1. Import the confetti library

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();

  // <-- 2. Add this useEffect to trigger the pop when the flight ends
  useEffect(() => {
    if (end) {
      // Fire the confetti!
      confetti({
        particleCount: 150,      // Number of confetti pieces
        spread: 100,             // How wide it bursts
        origin: { y: 0.6 },      // Starts slightly below the center
        colors: ['#FF69B4', '#00BFFF', '#FFD700', '#FF8C00'] // Matching your gradient colors!
      });
    }
  }, [end]);

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
<h1 
            className="logo" 
            style={{
              // This creates the same Pink-to-Blue gradient as your 3D text
              background: "rgba(255, 255, 255, 0.1)",
              // Automatically adjusts the size so it fits all screens perfectly
              fontSize: "clamp(3rem, 8vw, 6rem)", 
              letterSpacing: "0.2rem",
              textTransform: "uppercase" // Optional: makes it UNKNOWN SPHERE
            }}
          >
            Unknown sphere
            
            <div className="spinner">
              <div className="spinner__image" />
            </div>
          </h1>
          <p className="intro__scroll">Thoda scroll karne ka kasht karo, please...</p>
          <button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}
          >
            Chale ?
          </button>
        </div>
      )}

      {/* <-- 3. Your updated outro text */}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text" style={{ textAlign: "center", lineHeight: "1.5" }}>
          I wish we had a great flight together.<br />
          Wishing you a very happy birthday, Bipasha!<br />
          Have a fantastic day and a wonderful year ahead.
        </p>
      </div>
    </div>
  );
};