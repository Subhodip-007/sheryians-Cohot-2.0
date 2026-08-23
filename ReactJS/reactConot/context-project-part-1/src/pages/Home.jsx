import React from 'react'
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import baguette from "../assets/img/baguette.png";
import blueberryTart from "../assets/img/blueberry-tart.png";
import breadRoll from "../assets/img/bread-roll.png";
import cakeCube from "../assets/img/cake-cube.png";
import cakeSlice from "../assets/img/cake-slice-top.png";
import cakeStand from "../assets/img/cake-stand.png";
import carrot from "../assets/img/carrot.png";
import cherry from "../assets/img/cherry.png";
import cinnamonRoll from "../assets/img/cinnamon-roll.png";
import cookieSmall from "../assets/img/cookie-small-right.png";
import cookieStack from "../assets/img/cookie-stack.png";
import cookieTop from "../assets/img/cookie-top.png";
import cracker from "../assets/img/cracker-top.png";
import croissantLeft from "../assets/img/croissant-bottom-left.png";
import croissantRight from "../assets/img/croissant-bottom-right.png";
import croissantTop from "../assets/img/croissant-top.png";
import cupcake from "../assets/img/cupcake.png";
import donutRight from "../assets/img/donut-right.png";
import donutLeft from "../assets/img/donut-top-left.png";
import flowerDonut from "../assets/img/flower-donut.png";
import flowerTop from "../assets/img/flower-top.png";
import macarons from "../assets/img/macarons-top.png";
import pastryRoll from "../assets/img/pastry-roll-top.png";
import pie from "../assets/img/pie.png";
import pretzel from "../assets/img/pretzel.png";
import strawberryCake from "../assets/img/strawberry-cake.png";
import BakedLogo from "../assets/img/bakedlogo.png";
import Navbar from '../components/Navbar';
const FloatingItem = ({
  src,
  className,
  animate,
  transition,
  strength = 1,
}) => {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 120,
    damping: 15,
  });

  const springY = useSpring(mouseY, {
    stiffness: 120,
    damping: 15,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const distance = Math.sqrt(
        distanceX * distanceX +
        distanceY * distanceY
      );

      const radius = 300;

      if (distance < radius) {
        const power = 1 - distance / radius;

        mouseX.set(
          distanceX * power * 0.08 * strength
        );

        mouseY.set(
          distanceY * power * 0.08 * strength
        );
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, [mouseX, mouseY, strength]);

  return (
    <motion.div
  ref={ref}
  className={`absolute select-none ${className}`}
  style={{
    x: springX,
    y: springY,
  }}
>
  <motion.img
    src={src}
    alt=""
    draggable={false}
    className="h-full w-full select-none object-contain"
    animate={animate}
    transition={transition}
  />
</motion.div>
  );
};
const Home = () => {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#faf9f5] select-none draggable">
      <Navbar/>
      {/* TOP LEFT */}

      <FloatingItem
        src={donutLeft}
        className="left-[3%] top-[5%] w-24 md:w-36"
        strength={1}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={croissantTop}
        className="left-[15%] top-[5%] w-28 md:w-44"
        strength={1}
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          rotate: [-10, 5, -10],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={cookieTop}
        className="left-[38%] top-[4%] w-24 md:w-32"
        strength={0.7}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <FloatingItem
        src={cakeSlice}
        className="left-[50%] top-[4%] w-24 md:w-36"
        strength={0.8}
        animate={{
          y: [0, -15, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={donutRight}
        className="right-[5%] top-[8%] w-28 md:w-40"
        strength={1}
        animate={{
          y: [0, 18, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* LEFT SIDE */}

      <FloatingItem
        src={cakeCube}
        className="left-[5%] top-[30%] w-28 md:w-44"
        strength={0.7}
        animate={{
          y: [0, -18, 0],
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={cakeStand}
        className="bottom-[5%] left-[4%] w-44 md:w-72"
        strength={0.5}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={croissantLeft}
        className="bottom-[8%] left-[25%] w-32 md:w-48"
        strength={0.8}
        animate={{
          x: [0, 20, 0],
          y: [0, -12, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* RIGHT SIDE */}

      <FloatingItem
        src={cookieSmall}
        className="right-[8%] top-[28%] w-24 md:w-36"
        strength={1}
        animate={{
          rotate: [0, -360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <FloatingItem
        src={cupcake}
        className="bottom-[12%] right-[8%] w-28 md:w-44"
        strength={0.7}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={croissantRight}
        className="bottom-[5%] right-[25%] w-32 md:w-48"
        strength={0.8}
        animate={{
          x: [0, -18, 0],
          y: [0, -10, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* CENTER DECORATION */}

      <FloatingItem
        src={pretzel}
        className="left-[40%] bottom-[20%] w-24 md:w-36"
        strength={1}
        animate={{
          rotate: [0, 10, -10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={cookieStack}
        className="right-[35%] top-[38%] w-24 md:w-36"
        strength={0.7}
        animate={{
          y: [0, 15, 0],
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={flowerDonut}
        className="left-[18%] top-[35%] w-20 md:w-28"
        strength={1.5}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <FloatingItem
        src={macarons}
        className="right-[18%] top-[12%] w-24 md:w-36"
        strength={0.8}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={pie}
        className="left-[32%] bottom-[5%] w-28 md:w-44"
        strength={0.8}
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={blueberryTart}
        className="right-[35%] bottom-[5%] w-28 md:w-40"
        strength={0.8}
        animate={{
          y: [0, 15, 0],
          rotate: [0, 6, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SMALL DECORATIVE ITEMS */}

      <FloatingItem
        src={cherry}
        className="left-[8%] top-[55%] w-12 md:w-16"
        strength={1.8}
        animate={{
          y: [0, -25, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={flowerTop}
        className="left-[43%] top-[20%] w-10 md:w-16"
        strength={2}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <FloatingItem
        src={carrot}
        className="right-[2%] top-[45%] w-16 md:w-28"
        strength={1}
        animate={{
          x: [0, -12, 0],
          y: [0, -18, 0],
          rotate: [15, 25, 15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={cracker}
        className="right-[12%] top-[45%] w-20 md:w-28"
        strength={1.3}
        animate={{
          rotate: [0, 8, -8, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={breadRoll}
        className="right-[20%] bottom-[30%] w-24 md:w-36"
        strength={0.8}
        animate={{
          x: [0, 15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingItem
        src={pastryRoll}
        className="left-[28%] top-[12%] w-24 md:w-36"
        strength={1}
        animate={{
          y: [0, -18, 0],
          rotate: [0, -6, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* MAIN LOGO */}

      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <img
          src={BakedLogo}
          alt="baked"
          className="h-auto w-full object-contain"
        />
      </div>
    </main>
  )
}

export default Home
