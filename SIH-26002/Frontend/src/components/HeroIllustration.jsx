import {
    motion,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform
} from "framer-motion";

import {
    useEffect,
    useRef
} from "react";

import drone
    from "../assets/setu/drone.png";

import container
    from "../assets/setu/container.png";

import truck
    from "../assets/setu/truck.png";

import forklift
    from "../assets/setu/forklift.png";

import palletJack
    from "../assets/setu/pallet-jack.png";

import scooter
    from "../assets/setu/scooter.png";

import deliveryVan
    from "../assets/setu/delivery-van.png";

import background
    from "../assets/setu/setu-sketch-background.png";


const OBJECTS = [

    {
        key: "drone",
        src: drone,
        className: "hero-object hero-drone",
        duration: 6.2,
        floatY: 10,
        rotate: 1.2,
        mouseX: 8,
        mouseY: 7,
        scrollDepth: -10,
        delay: 0.1
    },

    {
        key: "container",
        src: container,
        className: "hero-object hero-container",
        duration: 7.2,
        floatY: 13,
        rotate: 1,
        mouseX: 5,
        mouseY: 5,
        scrollDepth: -18,
        delay: 0.25
    },

    {
        key: "truck",
        src: truck,
        className: "hero-object hero-truck",
        duration: 8.2,
        floatY: 6,
        rotate: 0.35,
        mouseX: 3,
        mouseY: 2,
        scrollDepth: -8,
        delay: 0.15
    },

    {
        key: "forklift",
        src: forklift,
        className: "hero-object hero-forklift",
        duration: 6.8,
        floatY: 8,
        rotate: 0.7,
        mouseX: 6,
        mouseY: 5,
        scrollDepth: -14,
        delay: 0.35
    },

    {
        key: "pallet",
        src: palletJack,
        className: "hero-object hero-pallet",
        duration: 5.8,
        floatY: 6,
        rotate: 0.8,
        mouseX: 9,
        mouseY: 6,
        scrollDepth: -16,
        delay: 0.4
    },

    {
        key: "scooter",
        src: scooter,
        className: "hero-object hero-scooter",
        duration: 7.4,
        floatY: 9,
        rotate: 1,
        mouseX: 10,
        mouseY: 7,
        scrollDepth: -20,
        delay: 0.55
    },

    {
        key: "van",
        src: deliveryVan,
        className: "hero-object hero-van",
        duration: 8,
        floatY: 5,
        rotate: 0.35,
        mouseX: 4,
        mouseY: 3,
        scrollDepth: -12,
        delay: 0.3
    }

];


const FloatingObject = ({
    object,
    reduceMotion,
    globalMouseX,
    globalMouseY,
    scrollYProgress
}) => {

    const scrollRawY =
        useTransform(
            scrollYProgress,
            [0, 0.45],
            [0, object.scrollDepth]
        );

    const scrollY =
        useSpring(
            scrollRawY,
            {
                stiffness: 75,
                damping: 22,
                mass: 0.8
            }
        );


    const objectMouseX =
        useTransform(
            globalMouseX,
            [-10, 10],
            [
                -object.mouseX,
                object.mouseX
            ]
        );


    const objectMouseY =
        useTransform(
            globalMouseY,
            [-10, 10],
            [
                -object.mouseY,
                object.mouseY
            ]
        );


    const smoothMouseX =
        useSpring(
            objectMouseX,
            {
                stiffness: 50,
                damping: 18,
                mass: 0.7
            }
        );


    const smoothMouseY =
        useSpring(
            objectMouseY,
            {
                stiffness: 50,
                damping: 18,
                mass: 0.7
            }
        );


    if (reduceMotion) {

        return (
            <img
                className={object.className}
                src={object.src}
                alt=""
                aria-hidden="true"
            />
        );

    }


    return (

        <motion.img
            className={object.className}

            src={object.src}

            alt=""

            aria-hidden="true"

            initial={{
                opacity: 0,
                scale: 0.94
            }}

            animate={{
                opacity: 1,

                scale: [
                    0.99,
                    1.015,
                    0.99
                ],

                y: [
                    -object.floatY,
                    object.floatY,
                    -object.floatY
                ],

                rotate: [
                    -object.rotate,
                    object.rotate,
                    -object.rotate
                ]
            }}

            style={{
                x: smoothMouseX,
                y: scrollY,

                filter:
                    "drop-shadow(0 18px 20px rgba(0,0,0,0.07))"
            }}

            transition={{

                opacity: {
                    duration: 0.8,
                    delay: object.delay
                },

                scale: {
                    duration: object.duration,
                    repeat: Infinity,
                    ease: "easeInOut"
                },

                y: {
                    duration: object.duration,
                    delay: object.delay,
                    repeat: Infinity,
                    ease: "easeInOut"
                },

                rotate: {
                    duration: object.duration,
                    delay: object.delay,
                    repeat: Infinity,
                    ease: "easeInOut"
                }

            }}

        />

    );

};


const HeroIllustration = () => {

    const reduceMotion =
        useReducedMotion();


    const containerRef =
        useRef(null);


    const {
        scrollYProgress
    } = useScroll({
        target: containerRef,

        offset: [
            "start end",
            "end start"
        ]
    });


    /*
    =========================================================
    BACKGROUND PARALLAX

    Much smaller movement.
    The image should remain fully visible.
    =========================================================
    */

    const backgroundRawY =
        useTransform(
            scrollYProgress,
            [0, 1],
            [0, -45]
        );


    const backgroundY =
        useSpring(
            backgroundRawY,
            {
                stiffness: 60,
                damping: 23,
                mass: 0.85
            }
        );


    /*
    No aggressive zoom.

    The previous 1.08 scale was contributing to
    the oversized / cropped visual.
    */

    const backgroundRawScale =
        useTransform(
            scrollYProgress,
            [0, 1],
            [1, 1]
        );


    const backgroundScale =
        useSpring(
            backgroundRawScale,
            {
                stiffness: 55,
                damping: 23,
                mass: 0.85
            }
        );


    /*
    =========================================================
    OBJECT LAYER PARALLAX
    =========================================================
    */

    const objectLayerRawY =
        useTransform(
            scrollYProgress,
            [0, 1],
            [0, -24]
        );


    const objectLayerY =
        useSpring(
            objectLayerRawY,
            {
                stiffness: 75,
                damping: 24,
                mass: 0.8
            }
        );


    /*
    =========================================================
    MOUSE
    =========================================================
    */

    const mouseX =
        useMotionValue(0);

    const mouseY =
        useMotionValue(0);


    const smoothMouseX =
        useSpring(
            mouseX,
            {
                stiffness: 50,
                damping: 18
            }
        );


    const smoothMouseY =
        useSpring(
            mouseY,
            {
                stiffness: 50,
                damping: 18
            }
        );


    useEffect(() => {

        if (reduceMotion) {
            return;
        }


        const element =
            containerRef.current;


        if (!element) {
            return;
        }


        const handleMouseMove =
            (event) => {

                const rect =
                    element.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height;


                mouseX.set(
                    (x - 0.5) * 20
                );


                mouseY.set(
                    (y - 0.5) * 14
                );

            };


        const handleMouseLeave =
            () => {

                mouseX.set(0);
                mouseY.set(0);

            };


        element.addEventListener(
            "mousemove",
            handleMouseMove
        );


        element.addEventListener(
            "mouseleave",
            handleMouseLeave
        );


        return () => {

            element.removeEventListener(
                "mousemove",
                handleMouseMove
            );


            element.removeEventListener(
                "mouseleave",
                handleMouseLeave
            );

        };

    }, [
        reduceMotion,
        mouseX,
        mouseY
    ]);


    /*
    =========================================================
    BACKGROUND MOUSE
    =========================================================
    */

    const backgroundMouseX =
        useTransform(
            smoothMouseX,
            [-10, 10],
            [-3, 3]
        );


    const backgroundMouseY =
        useTransform(
            smoothMouseY,
            [-10, 10],
            [-2, 2]
        );


    return (

        <motion.div

            ref={containerRef}

            className="hero-visual"

            initial={
                reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.99
                    }
            }

            animate={
                reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        scale: 1
                    }
            }

            transition={{
                duration: 1.1,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            }}

        >

            {/* BACKGROUND */}

            <motion.img
                src={background}

                className="hero-background"

                alt=""

                aria-hidden="true"

                style={{
                    y:
                        reduceMotion
                            ? 0
                            : backgroundY,

                    x:
                        reduceMotion
                            ? 0
                            : backgroundMouseX,

                    scale:
                        reduceMotion
                            ? 1
                            : backgroundScale
                }}
            />


            {/* LIGHT */}

            <motion.div
                className="hero-light"

                style={{
                    x:
                        reduceMotion
                            ? 0
                            : backgroundMouseX,

                    y:
                        reduceMotion
                            ? 0
                            : backgroundMouseY
                }}

            />


            {/* OBJECTS */}

            <motion.div
                className="hero-object-layer"

                style={{
                    y:
                        reduceMotion
                            ? 0
                            : objectLayerY
                }}

            >

                {OBJECTS.map(
                    (object) => (

                        <FloatingObject
                            key={
                                object.key
                            }

                            object={
                                object
                            }

                            reduceMotion={
                                reduceMotion
                            }

                            globalMouseX={
                                smoothMouseX
                            }

                            globalMouseY={
                                smoothMouseY
                            }

                            scrollYProgress={
                                scrollYProgress
                            }
                        />

                    )
                )}

            </motion.div>


            {/* VIGNETTE */}

            <div
                className="hero-vignette"
                aria-hidden="true"
            />

        </motion.div>

    );

};


export default HeroIllustration;