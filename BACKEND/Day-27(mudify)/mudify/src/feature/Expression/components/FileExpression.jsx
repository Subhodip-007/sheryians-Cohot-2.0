import { useEffect, useRef, useState } from "react";

import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  let stream;

  const init = async () => {
    try {
      // Load MediaPipe vision WASM files
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      // Create face landmarker
      landmarkerRef.current =
        await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
          },

          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        });

      // Start camera
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        await videoRef.current.play();
      }
    } catch (error) {
      console.error(
        "Error initializing face detection:",
        error
      );

      setExpression("Camera / Model Error");
    }
  };

  const detect = () => {
    if (
      !landmarkerRef.current ||
      !videoRef.current ||
      videoRef.current.readyState < 2
    ) {
      setExpression("Camera is not ready");
      return;
    }

    const results =
      landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
      );

    if (results.faceBlendshapes?.length > 0) {
      const blendshapes =
        results.faceBlendshapes[0].categories;

      const getScore = (name) => {
        return (
          blendshapes.find(
            (b) => b.categoryName === name
          )?.score || 0
        );
      };

      const smileLeft =
        getScore("mouthSmileLeft");

      const smileRight =
        getScore("mouthSmileRight");

      const jawOpen =
        getScore("jawOpen");

      const browUp =
        getScore("browInnerUp");

      const frownLeft =
        getScore("mouthFrownLeft");

      const frownRight =
        getScore("mouthFrownRight");

      let currentExpression = "Neutral 😐";

      if (
        smileLeft > 0.5 &&
        smileRight > 0.5
      ) {
        currentExpression = "Happy 😄";
      } else if (
        jawOpen > 0.35 &&
        browUp > 0.2
      ) {
        currentExpression = "Surprised 😲";
      } else if (
        frownLeft > 0.05 &&
        frownRight > 0.05
      ) {
        currentExpression = "Sad 😢";
      }

      setExpression(currentExpression);
    } else {
      setExpression("No face detected");
    }
  };

  useEffect(() => {
    init();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (stream) {
        stream
          .getTracks()
          .forEach((track) => track.stop());
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

      <button onClick={detect}>
        Detect Expression
      </button>
    </div>
  );
}