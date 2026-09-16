import {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import {
    AnimatePresence,
    motion
} from "framer-motion";

import {
    useNavigate
} from "react-router-dom";

import gsap from "gsap";

import {
    ScrollTrigger
} from "gsap/ScrollTrigger";


import HeroIllustration
    from "../components/HeroIllustration";

import truck
    from "../assets/setu/truck.png";

import deliveryVan
    from "../assets/setu/delivery-van.png";

import drone
    from "../assets/setu/drone.png";

import forklift
    from "../assets/setu/forklift.png";
import footerBG
    from "../assets/setu/footer-BG.png";
import sectionBg from "../assets/setu/section.png";
import service1gif from "../assets/setu/service1gif.gif";
import service2gif from "../assets/setu/service2.gif";
import service3gif from "../assets/setu/service3.gif";
import service4gif from "../assets/setu/service4.gif";
import "./landing.scss";
import { i } from "framer-motion/client";


gsap.registerPlugin(
    ScrollTrigger
);


/* =========================================================
   CONSTANTS
========================================================= */

const NAVIGATION_ITEMS = [
    {
        label: "Services",
        target: "platform"
    },
    {
        label: "Process",
        target: "process"
    },
    {
        label: "Network",
        target: "network"
    },
    {
        label: "Intelligence",
        target: "intelligence"
    },
    {
        label: "About",
        target: "about"
    },
    {
        label: "Contact",
        target: "contact"
    }
];


const HERO_REVEAL = {
    hidden: {
        opacity: 0,
        y: 28
    },

    visible: {
        opacity: 1,
        y: 0
    }
};


const MENU_TRANSITION = {
    duration: 0.7,
    ease: [
        0.76,
        0,
        0.24,
        1
    ]
};


/* =========================================================
   LANDING
========================================================= */

const Landing = () => {

    const navigate =
        useNavigate();

    const pageRef =
        useRef(null);

    const [
        menuOpen,
        setMenuOpen
    ] = useState(false);


    /* =====================================================
       SCROLL ANIMATIONS
    ===================================================== */

    useEffect(() => {

        const context =
            gsap.context(() => {

                /* ---------------------------------------------
                   Generic reveal animations
                --------------------------------------------- */

                const revealElements =
                    gsap.utils.toArray(
                        ".js-reveal"
                    );


                revealElements.forEach(
                    (element) => {

                        gsap.fromTo(
                            element,

                            {
                                opacity: 0,
                                y: 50
                            },

                            {
                                opacity: 1,
                                y: 0,

                                duration: 0.9,

                                ease:
                                    "power3.out",

                                scrollTrigger: {
                                    trigger:
                                        element,

                                    start:
                                        "top 84%",

                                    once: true
                                }
                            }
                        );

                    }
                );


                /* ---------------------------------------------
                   Left / right slide animations
                --------------------------------------------- */

                const slideAnimations = [
                    {
                        selector:
                            ".js-slide-left",

                        x:
                            -70
                    },

                    {
                        selector:
                            ".js-slide-right",

                        x:
                            70
                    }
                ];


                slideAnimations.forEach(
                    ({
                        selector,
                        x
                    }) => {

                        gsap.utils
                            .toArray(
                                selector
                            )
                            .forEach(
                                (element) => {

                                    gsap.fromTo(
                                        element,

                                        {
                                            opacity: 0,
                                            x
                                        },

                                        {
                                            opacity: 1,
                                            x: 0,

                                            duration:
                                                0.95,

                                            ease:
                                                "power3.out",

                                            scrollTrigger: {
                                                trigger:
                                                    element,

                                                start:
                                                    "top 82%",

                                                once: true
                                            }
                                        }
                                    );

                                }
                            );

                    }
                );


                /* ---------------------------------------------
                   Service cards
                --------------------------------------------- */

                gsap.fromTo(
                    ".service-card",
                    {
                        opacity: 0,
                        y: 28
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.08,
                        ease:
                            "power3.out",

                        scrollTrigger: {
                            trigger:
                                ".service-grid",

                            start:
                                "top 80%",

                            once: true
                        }
                    }
                );


                /* ---------------------------------------------
                   Why items
                --------------------------------------------- */

                gsap.fromTo(
                    ".why-item",

                    {
                        opacity: 0,
                        x: 35
                    },

                    {
                        opacity: 1,
                        x: 0,

                        duration: 0.65,

                        stagger: 0.12,

                        ease:
                            "power3.out",

                        scrollTrigger: {
                            trigger:
                                ".why-list",

                            start:
                                "top 80%",

                            once: true
                        }
                    }
                );


                /* ---------------------------------------------
                   FAQ
                --------------------------------------------- */

                gsap.fromTo(
                    ".faq-item",

                    {
                        opacity: 0,
                        y: 20
                    },

                    {
                        opacity: 1,
                        y: 0,

                        duration: 0.55,

                        stagger: 0.08,

                        ease:
                            "power3.out",

                        scrollTrigger: {
                            trigger:
                                ".faq-list",

                            start:
                                "top 82%",

                            once: true
                        }
                    }
                );


                /* ---------------------------------------------
                   Quote
                --------------------------------------------- */

                gsap.fromTo(
                    ".quote-card",

                    {
                        opacity: 0,
                        y: 45,
                        scale: 0.96
                    },

                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,

                        duration: 0.95,

                        ease:
                            "power3.out",

                        scrollTrigger: {
                            trigger:
                                ".quote-section",

                            start:
                                "top 80%",

                            once: true
                        }
                    }
                );


                /* ---------------------------------------------
                   Emergency section
                --------------------------------------------- */

                gsap.fromTo(
                    ".emergency-drone",

                    {
                        opacity: 0,
                        y: 80,
                        rotate: 4
                    },

                    {
                        opacity: 1,
                        y: 0,
                        rotate: 0,

                        duration: 1.1,

                        ease:
                            "power3.out",

                        scrollTrigger: {
                            trigger:
                                ".emergency-section",

                            start:
                                "top 78%",

                            once: true
                        }
                    }
                );


                /* ---------------------------------------------
                   Contact section
                --------------------------------------------- */

                gsap.fromTo(
                    ".contact-card",

                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.97
                    },

                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,

                        duration: 0.95,

                        ease:
                            "power3.out",

                        scrollTrigger: {
                            trigger:
                                ".contact-section",

                            start:
                                "top 82%",

                            once: true
                        }
                    }
                );
                /* ---------------------------------------------
   Hero viewport parallax
--------------------------------------------- */

/* ---------------------------------------------
   Hero viewport parallax
--------------------------------------------- */

gsap.to(
    ".hero-viewport-visual",
    {
        yPercent: -6,

        ease: "none",

        scrollTrigger: {
            trigger: ".landing-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2
        }
    }
);

gsap.to(
    ".hero-animation-wrapper",
    {
        yPercent: 4,

        ease: "none",

        scrollTrigger: {
            trigger: ".landing-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.4
        }
    }
);

                /* ---------------------------------------------
                   Feature image parallax
                --------------------------------------------- */

                gsap.to(
                    ".feature-visual img",

                    {
                        yPercent: -8,

                        ease:
                            "none",

                        scrollTrigger: {
                            trigger:
                                ".feature-section",

                            start:
                                "top bottom",

                            end:
                                "bottom top",

                            scrub: 1
                        }
                    }
                );


                /* ---------------------------------------------
                   Emergency drone parallax
                --------------------------------------------- */

                gsap.to(
                    ".emergency-drone",

                    {
                        yPercent: -10,

                        ease:
                            "none",

                        scrollTrigger: {
                            trigger:
                                ".emergency-section",

                            start:
                                "top bottom",

                            end:
                                "bottom top",

                            scrub: 1
                        }
                    }
                );


                /*
                    Images and dynamic layout can change
                    the trigger positions, so refresh once.
                */

                requestAnimationFrame(() => {
                    ScrollTrigger.refresh();
                });

            }, pageRef);


        return () => {
            context.revert();
        };

    }, []);


    /* =====================================================
       GLOBAL MAGNETIC BUTTON EFFECT

       Applies to EVERY button inside the landing page,
       including buttons rendered by child components.
    ===================================================== */

    useEffect(() => {

        const buttons =
            Array.from(
                pageRef.current?.querySelectorAll(
                    "button"
                ) || []
            );


        const handlePointerMove = (event) => {

            const button =
                event.currentTarget;

            const rect =
                button.getBoundingClientRect();


            const centerX =
                rect.left +
                rect.width / 2;

            const centerY =
                rect.top +
                rect.height / 2;


            const offsetX =
                (event.clientX - centerX) * 0.14;

            const offsetY =
                (event.clientY - centerY) * 0.14;


            button.style.setProperty(
                "--magnetic-x",
                `${offsetX}px`
            );

            button.style.setProperty(
                "--magnetic-y",
                `${offsetY}px`
            );

            button.classList.add(
                "magnetic-active"
            );

        };


        const handlePointerLeave = (event) => {

            const button =
                event.currentTarget;

            button.style.setProperty(
                "--magnetic-x",
                "0px"
            );

            button.style.setProperty(
                "--magnetic-y",
                "0px"
            );

            button.classList.remove(
                "magnetic-active"
            );

        };


        buttons.forEach((button) => {

            button.style.setProperty(
                "--magnetic-x",
                "0px"
            );

            button.style.setProperty(
                "--magnetic-y",
                "0px"
            );

            button.addEventListener(
                "pointermove",
                handlePointerMove
            );

            button.addEventListener(
                "pointerleave",
                handlePointerLeave
            );

        });


        return () => {

            buttons.forEach((button) => {

                button.removeEventListener(
                    "pointermove",
                    handlePointerMove
                );

                button.removeEventListener(
                    "pointerleave",
                    handlePointerLeave
                );

                button.style.removeProperty(
                    "--magnetic-x"
                );

                button.style.removeProperty(
                    "--magnetic-y"
                );

                button.classList.remove(
                    "magnetic-active"
                );

            });

        };

    }, [
        menuOpen
    ]);


    /* =====================================================
       BODY LOCK + ESCAPE KEY
    ===================================================== */

    useEffect(() => {

        document.body.style.overflow =
            menuOpen
                ? "hidden"
                : "";


        const handleEscape =
            (event) => {

                if (
                    event.key === "Escape"
                    && menuOpen
                ) {
                    setMenuOpen(false);
                }

            };


        document.addEventListener(
            "keydown",
            handleEscape
        );


        return () => {

            document.body.style.overflow =
                "";

            document.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, [menuOpen]);


    /* =====================================================
       SMOOTH SECTION NAVIGATION
    ===================================================== */

    const scrollToSection =
        useCallback(
            (id) => {

                const target =
                    document.getElementById(
                        id
                    );


                if (!target) {
                    return;
                }


                setMenuOpen(false);


                if (window.__lenis) {

                    window.__lenis.scrollTo(
                        target,
                        {
                            offset: -50,
                            duration: 1.2
                        }
                    );

                    return;
                }


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            },
            []
        );


    /* =====================================================
       LOGIN
    ===================================================== */

    const openLogin = useCallback(() => {

        setMenuOpen(false);

        navigate("/login");

    }, [navigate]);


    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <main
            ref={pageRef}
            className="landing-page"
        >

            {/* =================================================
                NAVIGATION
            ================================================= */}

            <nav
                className="landing-nav"
                aria-label="Primary navigation"
            >

                <button
                    className="landing-brand"
                    onClick={() =>
                        scrollToSection(
                            "top"
                        )
                    }
                    aria-label="Go to top"
                >
                    SETU.NER
                    <span>.</span>
                </button>


                <div className="landing-nav-right">

                    <button
                        className="landing-menu-button"

                        type="button"

                        aria-label={
                            menuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }

                        aria-expanded={
                            menuOpen
                        }

                        aria-controls="side-navigation"

                        onClick={() =>
                            setMenuOpen(
                                (current) =>
                                    !current
                            )
                        }
                    >

                        <span
                            className={
                                menuOpen
                                    ? "menu-line line-one open"
                                    : "menu-line line-one"
                            }
                        />

                        <span
                            className={
                                menuOpen
                                    ? "menu-line line-two open"
                                    : "menu-line line-two"
                            }
                        />

                    </button>

                </div>

            </nav>


            {/* =================================================
                SIDE NAVIGATION
            ================================================= */}

            <AnimatePresence>

                {menuOpen && (

                    <>

                        <motion.div
                            className="menu-overlay"

                            aria-hidden="true"

                            initial={{
                                opacity: 0
                            }}

                            animate={{
                                opacity: 1
                            }}

                            exit={{
                                opacity: 0
                            }}

                            transition={{
                                duration: 0.3
                            }}

                            onClick={() =>
                                setMenuOpen(false)
                            }
                        />


                        <motion.aside
                            id="side-navigation"

                            className="side-menu"

                            initial={{
                                x: "100%"
                            }}

                            animate={{
                                x: 0
                            }}

                            exit={{
                                x: "100%"
                            }}

                            transition={
                                MENU_TRANSITION
                            }

                            aria-label="Site navigation"
                        >

                            <header
                                className="side-menu-header"
                            >

                                <span>
                                    SETU
                                </span>


                                <button
                                    type="button"

                                    onClick={() =>
                                        setMenuOpen(
                                            false
                                        )
                                    }
                                >
                                    Close
                                </button>

                            </header>


                            <nav
                                className="side-menu-links"
                                aria-label="Landing sections"
                            >

                                {NAVIGATION_ITEMS.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <motion.button
                                            key={
                                                item.target
                                            }

                                            type="button"

                                            initial={{
                                                opacity: 0,
                                                x: 40
                                            }}

                                            animate={{
                                                opacity: 1,
                                                x: 0
                                            }}

                                            transition={{
                                                delay:
                                                    0.12 +
                                                    index *
                                                    0.055,

                                                duration:
                                                    0.55,

                                                ease:
                                                    [
                                                        0.76,
                                                        0,
                                                        0.24,
                                                        1
                                                    ]
                                            }}

                                            onClick={() =>
                                                scrollToSection(
                                                    item.target
                                                )
                                            }
                                        >

                                            <span>
                                                {String(
                                                    index + 1
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>


                                            <strong>
                                                {item.label}
                                            </strong>

                                        </motion.button>

                                    )
                                )}

                            </nav>


                            <footer
                                className="side-menu-footer"
                            >

                                <div>

                                    <span>
                                        Access
                                    </span>


                                    <button
                                        type="button"
                                        onClick={
                                            openLogin
                                        }
                                    >
                                        Login
                                        <span>
                                            ↗
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        onClick={
                                            openLogin
                                        }
                                    >
                                        Sign In
                                        <span>
                                            ↗
                                        </span>
                                    </button>

                                </div>


                                <div>

                                    <span>
                                        SETU.NER Network
                                    </span>


                                    <p>
                                        Intelligent routing
                                        for a changing world.
                                    </p>

                                </div>

                            </footer>

                        </motion.aside>

                    </>
                )}

            </AnimatePresence>


            {/* =================================================
                HERO
            ================================================= */}

           <section id="top" className="landing-hero">

                <div
                    className="hero-viewport-visual"
                    aria-hidden="true"
                >
                    <div className="hero-animation-wrapper">
                        <HeroIllustration />
                    </div>
                </div>

                <div className="hero-content-layer">

                    <motion.div
                        className="hero-copy"
                        initial="hidden"
                        animate="visible"
                        variants={HERO_REVEAL}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                    >

                        <div className="hero-actions">

                            <button
                                className="button-dark"
                                type="button"
                                onClick={openLogin}
                            >
                                Get Started
                            </button>

                            <button
                                className="hero-watch"
                                type="button"
                                onClick={() =>
                                    scrollToSection("process")
                                }
                            >
                                <span className="play-circle">
                                    ↘
                                </span>
                                See how it works
                            </button>

                        </div>

                    </motion.div>

                </div>

            </section>

            {/* =================================================
                SERVICES
            ================================================= */}

            <section
                className="services-section"
                id="platform"
            >

                <div className="section-container">

                    <div className="services-heading">
                        <div>
                            <p className="section-kicker">
                                OUR SERVICES
                            </p>

                            <h2>
                                Logistics built
                                <br />
                                for movement.
                            </h2>
                        </div>

                        <p>
                            A connected logistics network designed
                            to keep transportation visible,
                            responsive and resilient.
                        </p>
                    </div>

                    <div className="service-grid">

                        <ServiceCard
                            image={service1gif}
                            title="Road Transportation"
                        />

                        <ServiceCard
                            image={service2gif}
                            title="Shipment Tracking"
                        />

                        <ServiceCard
                            image={service3gif}
                            title="AI Intelligence"
                        />

                        <ServiceCard
                            image={service4gif}
                            title="Smart Logistics"
                        />

                    </div>

                </div>

            </section>

       <section
    className="trust-section"
    id="network"
    style={{
        backgroundImage: `url(${sectionBg})`,
    }}
>
    <div className="section-container">

        <p className="trust-heading">
            Built for real-world movement.
        </p>

        <div className="trust-row">

            {/* ROUTES */}
            <div className="trust-item">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M5 19c4-4 5-10 9-14" />
                    <path d="M14 5h5v5" />
                    <circle cx="5" cy="19" r="2" />
                </svg>

                <span>ROUTES</span>
            </div>

            {/* WEATHER */}
            <div className="trust-item">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M17.5 19H9a5 5 0 1 1 1-9.9A6 6 0 0 1 21 12.5" />
                    <path d="M7 19v2" />
                    <path d="M12 19v2" />
                    <path d="M17 19v2" />
                </svg>

                <span>WEATHER</span>
            </div>

            {/* NETWORKS */}
            <div className="trust-item">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="5" cy="19" r="2" />
                    <circle cx="19" cy="19" r="2" />
                    <path d="M12 7v5" />
                    <path d="M12 12 5 17" />
                    <path d="M12 12l7 5" />
                </svg>

                <span>NETWORKS</span>
            </div>

            {/* INTELLIGENCE */}
            <div className="trust-item">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="8" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                    <circle cx="12" cy="12" r="2" />
                </svg>

                <span>INTELLIGENCE</span>
            </div>

        </div>
    </div>
</section>

            {/* =================================================
                FEATURE
            ================================================= */}

            <section
                className="feature-section"
                id="intelligence"
            >

                <div className="section-container">

                    <div className="feature-grid">

                        <div
                            className="feature-title js-slide-left"
                        >

                            <p className="section-kicker">
                                NETWORK INTELLIGENCE
                            </p>

                            <h2>
                                Safe,
                                <br />
                                reliable
                                <br />
                                logistics.
                            </h2>

                        </div>


                        <div className="feature-visual">

                            <img
                                src={truck}
                                alt="Logistics truck"
                                loading="lazy"
                            />

                        </div>


                        <div
                            className="feature-copy js-slide-right"
                        >

                            <p>
                                Route intelligence designed
                                for changing road conditions,
                                incidents and environmental
                                disruptions.
                            </p>


                            <button
                                className="small-button"
                                type="button"
                            >
                                Learn More
                                <span>↗</span>
                            </button>

                        </div>

                    </div>


                    <div className="feature-divider" />

                </div>

            </section>


            {/* =================================================
                QUOTE
            ================================================= */}

            <section
                className="quote-section"
            >

                <div className="quote-card">

                    <div className="quote-mark">
                        “
                    </div>

                    <p className="quote-text">
                        The goal is simple:
                        make logistics more resilient
                        when the network becomes
                        unpredictable.
                    </p>


                    <div className="quote-author">

                        <div className="author-avatar">
                            N
                        </div>


                        <div>

                            <strong>
                                SETU.NER Logistics
                            </strong>

                            <span>
                                Intelligent Network
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                WHY
            ================================================= */}

            <section
                className="why-section"
                id="about"
            >

                <div className="section-container">

                    <div className="why-layout">

                        <div
                            className="why-intro js-slide-left"
                        >

                            <p className="section-kicker">
                                WHY CHOOSE US
                            </p>

                            <h2>
                                Reliable
                                <br />
                                decisions
                                <br />
                                under pressure.
                            </h2>


                            <p>
                                From shipment creation to
                                incident response, every
                                decision is built around
                                visibility and resilience.
                            </p>


                            <button
                                className="small-button"
                                type="button"
                            >
                                Learn More
                                <span>↗</span>
                            </button>

                        </div>


                        <div className="why-list">

                            <WhyItem
                                title="Order Tracking"
                                text="Know where every active shipment is."
                            />

                            <WhyItem
                                title="Online Support"
                                text="Keep operators connected to the network."
                            />

                            <WhyItem
                                title="Risk Intelligence"
                                text="Understand route conditions before they become critical."
                            />

                            <WhyItem
                                title="Cost Saving"
                                text="Avoid unnecessary delays and inefficient rerouting."
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                EMERGENCY
            ================================================= */}

            <section
                className="emergency-section"
                id="process"
            >

                <div className="section-container">

                    <div className="emergency-grid">

                        <div
                            className="emergency-copy js-slide-left"
                        >

                            <p className="section-kicker">
                                EMERGENCY RESPONSE
                            </p>

                            <h2>
                                Emergency
                                <br />
                                solutions
                                <br />
                                for delivery.
                            </h2>


                            <p>
                                When incidents appear,
                                routes can adapt before
                                the shipment reaches the
                                disruption zone.
                            </p>

                        </div>


                        <div
                            className="svg-slot"
                            aria-hidden="true"
                        />


                        <div className="emergency-drone">

                            <img
                                src={drone}
                                alt="Drone logistics"
                                loading="lazy"
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                FAQ
            ================================================= */}

            <section className="faq-section">

                <div className="faq-container">

                    <p className="section-kicker">
                        FAQ
                    </p>

                    <h2>
                        Frequently Asked
                        <br />
                        Questions
                    </h2>


                    <div className="faq-list">

                        <FAQItem
                            question="What happens when a route becomes unsafe?"
                        />

                        <FAQItem
                            question="How does the system detect disruptions?"
                        />

                        <FAQItem
                            question="Can operators approve rerouting?"
                        />

                        <FAQItem
                            question="What happens if connectivity is lost?"
                        />

                        <FAQItem
                            question="How does shipment tracking work?"
                        />

                    </div>

                </div>

            </section>


            {/* =================================================
                CONTACT
            ================================================= */}

            <section
                className="contact-section"
                id="contact"
            >

                <div className="contact-card">

                    <div
                        className="contact-copy js-slide-left"
                    >

                        <p className="section-kicker">
                            LET'S CONNECT
                        </p>

                        <h2>
                            Build a more
                            resilient network.
                        </h2>


                        <p>
                            Explore intelligent logistics
                            for the next generation of
                            transportation.
                        </p>


                        <div className="contact-form">

                            <input
                                type="email"
                                placeholder="Enter your email"
                                aria-label="Email address"
                            />


                            <button
                                type="button"
                            >
                                Subscribe
                            </button>

                        </div>

                    </div>


                    <div
                        className="contact-visual svg-slot"
                        aria-hidden="true"
                    />

                </div>

            </section>


            {/* =================================================
                FOOTER
            ================================================= */}

            <footer
                className="landing-footer"
                style={{
                    backgroundImage: `url(${footerBG})`
                }}
            >

                <div className="footer-brand">
                    SETU.NER
                </div>


                <div className="footer-grid">

                    <div>

                        <span>
                            Address
                        </span>

                        <p>
                            North East Region
                            <br />
                            India
                        </p>

                    </div>


                    <div>

                        <span>
                            Navigation
                        </span>

                        <FooterNavButton
                            label="Platform"
                            target="platform"
                            onNavigate={
                                scrollToSection
                            }
                        />

                        <FooterNavButton
                            label="Process"
                            target="process"
                            onNavigate={
                                scrollToSection
                            }
                        />

                        <FooterNavButton
                            label="Network"
                            target="network"
                            onNavigate={
                                scrollToSection
                            }
                        />

                    </div>


                    <div>

                        <span>
                            Services
                        </span>

                        <FooterNavButton
                            label="Route Intelligence"
                            target="intelligence"
                            onNavigate={
                                scrollToSection
                            }
                        />

                        <FooterNavButton
                            label="Tracking"
                            target="network"
                            onNavigate={
                                scrollToSection
                            }
                        />

                        <FooterNavButton
                            label="Incident Response"
                            target="process"
                            onNavigate={
                                scrollToSection
                            }
                        />

                    </div>


                    <div>

                        <span>
                            Contact
                        </span>

                        <a
                            href="mailto:hello@ner-logistics.com"
                        >
                            hello@ner-logistics.com
                        </a>

                        <p>
                            Intelligent Logistics
                        </p>

                    </div>

                </div>


                <div className="footer-bottom">

                    <span>
                        © 2026 SETU.SETU.NER Logistics
                    </span>

                    <span>
                        Move smarter.
                    </span>

                </div>

            </footer>

        </main>
    );
};


/* =========================================================
   SERVICE CARD
========================================================= */

const ServiceCard = ({
    image,
    title
}) => {

    const services = [
        "Road Transportation",
        "Shipment Tracking",
        "AI Intelligence",
        "Smart Logistics"
    ];

    const index =
        services.indexOf(title) + 1;

    return (

        <motion.article
            className="service-card"

            whileHover={{
                y: -4
            }}

            transition={{
                duration: 0.35,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            }}
        >

            <div className="service-image">

                <img
                    src={image}
                    alt=""
                    loading="lazy"
                />

            </div>

            <div className="service-info">

                <div>

                    <span className="service-index">
                        {String(index).padStart(2, "0")}
                    </span>

                    <h3>
                        {title}
                    </h3>

                </div>

                <span
                    className="service-arrow"
                    aria-hidden="true"
                >
                    ↗
                </span>

            </div>

        </motion.article>
    );
};


/* =========================================================
   WHY ITEM
========================================================= */

const WhyItem = ({
    title,
    text
}) => {

    return (

        <article className="why-item">

            <div
                className="why-icon"
                aria-hidden="true"
            >
                +
            </div>


            <div>

                <h3>
                    {title}
                </h3>

                <p>
                    {text}
                </p>

            </div>

        </article>
    );
};


/* =========================================================
   FAQ ITEM
========================================================= */

const FAQItem = ({
    question
}) => {

    return (

        <details className="faq-item">

            <summary>

                <span>
                    {question}
                </span>

                <span
                    aria-hidden="true"
                >
                    +
                </span>

            </summary>


            <p>
                This section will later connect
                to the actual SETU.NER workflow and
                explain the corresponding feature.
            </p>

        </details>
    );
};


/* =========================================================
   FOOTER NAV
========================================================= */

const FooterNavButton = ({
    label,
    target,
    onNavigate
}) => {

    return (

        <button
            type="button"
            className="footer-nav-button"

            onClick={() =>
                onNavigate(target)
            }
        >
            {label}
        </button>
    );
};


export default Landing;