import { useEffect, useState } from "react";

export default function Loading({ videoSrc, duration = 3000, onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration);

    const finishTimer = setTimeout(() => {
      onFinish?.();
    }, duration + 500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [duration, onFinish]);

  return (
    <div className={`loading ${fadeOut ? "fade-out" : ""}`}>
      <video
        src={videoSrc}
        autoPlay
        muted
        playsInline
      />
    </div>
  );
}