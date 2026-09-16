import {
    useEffect
} from "react";

import Lenis from "lenis";

import gsap from "gsap";

import {
    ScrollTrigger
} from "gsap/ScrollTrigger";


gsap.registerPlugin(
    ScrollTrigger
);


const SmoothScroll = () => {

    useEffect(() => {

        const lenis =
            new Lenis({
                duration: 1.15,

                smoothWheel: true,

                touchMultiplier: 1.2,

                wheelMultiplier: 0.9
            });


        // Make Lenis accessible to
        // landing-page navigation.
        window.__lenis = lenis;


        const updateScrollTrigger = (
            time
        ) => {

            lenis.raf(
                time * 1000
            );
        };


        lenis.on(
            "scroll",
            ScrollTrigger.update
        );


        gsap.ticker.add(
            updateScrollTrigger
        );


        gsap.ticker.lagSmoothing(
            0
        );


        return () => {

            gsap.ticker.remove(
                updateScrollTrigger
            );


            lenis.destroy();


            delete window.__lenis;
        };

    }, []);


    return null;
};


export default SmoothScroll;