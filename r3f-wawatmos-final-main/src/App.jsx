import { ScrollControls, useScroll } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { useMemo, useEffect } from "react";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./contexts/Play";

function MobileSwipeNavigation() {
  const scroll = useScroll();

  useEffect(() => {
    let startY = 0;

    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      const endY = e.changedTouches[0].clientY;
      const delta = startY - endY;

      // Ignore tiny movements
      if (Math.abs(delta) < 50) return;

      scroll.el.scrollBy({
        top: delta > 0 ? window.innerHeight : -window.innerHeight,
        behavior: "smooth",
      });
    };

    window.addEventListener("touchstart", onTouchStart, {
      passive: true,
    });

    window.addEventListener("touchend", onTouchEnd, {
      passive: true,
    });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [scroll]);

  return null;
}

function App() {
  const { play, end } = usePlay();

  const effects = useMemo(
    () => (
      <EffectComposer>
        <Noise opacity={0.08} />
      </EffectComposer>
    ),
    []
  );

  return (
    <>
    
      <Canvas>
        <color attach="background" args={["#ececec"]} />

        <ScrollControls
          pages={play && !end ? 20 : 0}
          damping={0.2}
          style={{
            top: "10px",
            left: "0px",
            bottom: "10px",
            right: "10px",
            width: "auto",
            height: "auto",
            animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
            opacity: 0,
          }}
        >
          <MobileSwipeNavigation />
          <Experience />
        </ScrollControls>

        {effects}
      </Canvas>

      <Overlay />
    </>
  );
}

export default App;