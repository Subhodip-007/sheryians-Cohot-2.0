import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";



export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  // let stream;
  const streamRef = useRef(null);

 

  useEffect(() => {

  init({
    landmarkerRef,
    videoRef,
    setExpression,
    streamRef,
  });

  return () => {

    if (animationRef.current) {

      cancelAnimationFrame(
        animationRef.current
      );

    }

    if (landmarkerRef.current) {

      landmarkerRef.current.close();

    }

    if (streamRef.current) {

      streamRef.current
        .getTracks()
        .forEach(
          (track) => track.stop()
        );

    }

  };

}, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
      }}
    >
      <video
        ref={videoRef}
        style={{
          width: "400px",
          maxWidth: "100%",
          borderRadius: "12px",
          transform: "scaleX(-1)",
        }}
        playsInline
        muted
      />

      <h2>{expression}</h2>

      <button onClick={()=>{detect({landmarkerRef,videoRef,setExpression})}}>
        Detect Expression
      </button>
    </div>
  );
}