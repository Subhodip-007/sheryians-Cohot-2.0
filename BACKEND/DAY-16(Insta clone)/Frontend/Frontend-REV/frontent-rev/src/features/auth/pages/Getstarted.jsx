import React from 'react'
import { Link } from 'react-router';

const Getstarted = () => {
  return (
<div className="min-h-screen bg-[#f5f5f3] flex items-center justify-center px-6">

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* LEFT — Animated SVG */}
                <div className="flex items-center justify-center">

                    <svg
                        viewBox="0 0 500 500"
                        className="w-full max-w-[520px] h-auto"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >

                        {/* Background Circle */}
                        <circle
                            cx="250"
                            cy="250"
                            r="190"
                            stroke="#111"
                            strokeWidth="1"
                            opacity="0.12"
                        />

                        <circle
                            cx="250"
                            cy="250"
                            r="140"
                            stroke="#111"
                            strokeWidth="1"
                            opacity="0.12"
                        />

                        {/* Rotating Ring */}
                        <g className="origin-center animate-[spin_18s_linear_infinite]">

                            <circle
                                cx="250"
                                cy="250"
                                r="175"
                                stroke="#111"
                                strokeWidth="1.5"
                                strokeDasharray="8 14"
                            />

                            <circle
                                cx="250"
                                cy="75"
                                r="7"
                                fill="#111"
                            />

                        </g>

                        {/* Floating Dots */}
                        <circle
                            cx="130"
                            cy="170"
                            r="6"
                            fill="#111"
                            className="animate-pulse"
                        />

                        <circle
                            cx="370"
                            cy="160"
                            r="5"
                            fill="#111"
                            className="animate-pulse"
                        />

                        <circle
                            cx="390"
                            cy="330"
                            r="7"
                            fill="#111"
                            className="animate-pulse"
                        />

                        <circle
                            cx="120"
                            cy="340"
                            r="5"
                            fill="#111"
                            className="animate-pulse"
                        />

                        {/* Main Shape */}
                        <g className="animate-[bounce_5s_ease-in-out_infinite]">

                            <rect
                                x="170"
                                y="170"
                                width="160"
                                height="160"
                                rx="35"
                                fill="#111"
                            />

                            {/* Inner Shape */}
                            <rect
                                x="195"
                                y="195"
                                width="110"
                                height="110"
                                rx="25"
                                fill="#f5f5f3"
                            />

                            {/* Plus */}
                            <path
                                d="M250 220V280"
                                stroke="#111"
                                strokeWidth="7"
                                strokeLinecap="round"
                            />

                            <path
                                d="M220 250H280"
                                stroke="#111"
                                strokeWidth="7"
                                strokeLinecap="round"
                            />

                        </g>

                        {/* Connecting Lines */}
                        <path
                            d="M130 170L170 200"
                            stroke="#111"
                            strokeWidth="1"
                            opacity="0.25"
                        />

                        <path
                            d="M370 160L330 200"
                            stroke="#111"
                            strokeWidth="1"
                            opacity="0.25"
                        />

                        <path
                            d="M390 330L330 300"
                            stroke="#111"
                            strokeWidth="1"
                            opacity="0.25"
                        />

                        <path
                            d="M120 340L170 300"
                            stroke="#111"
                            strokeWidth="1"
                            opacity="0.25"
                        />

                    </svg>

                </div>


                {/* RIGHT — Content */}
                <div className="max-w-md">

                    {/* Small Label */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 bg-white mb-6">

                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>

                        <span className="text-xs font-medium text-gray-600">
                            Welcome
                        </span>

                    </div>


                    {/* Heading */}
                    <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-[#111] leading-[1.05]">
                        Start building
                        <br />
                        something great.
                    </h1>


                    {/* Description */}
                    <p className="mt-6 text-base leading-7 text-gray-500 max-w-sm">
                        Create your account and start exploring everything
                        we have built for you.
                    </p>


                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">

                        <button className="h-12 px-7 rounded-xl bg-[#111] text-white text-sm font-medium hover:bg-black/80 transition">
                            <Link to={"/register"}>Get Started</Link>
                        </button>

                        <button className="h-12 px-7 rounded-xl border border-black/10 bg-white text-[#111] text-sm font-medium hover:bg-gray-50 transition">
                            Learn More
                        </button>

                    </div>


                    {/* Bottom Information */}
                    <div className="mt-10 pt-6 border-t border-black/10">

                        <div className="flex items-center gap-8">

                            <div>
                                <p className="text-xl font-semibold text-[#111]">
                                    Simple
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    Easy to use
                                </p>
                            </div>

                            <div className="w-px h-8 bg-black/10"></div>

                            <div>
                                <p className="text-xl font-semibold text-[#111]">
                                    Fast
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    Built for speed
                                </p>
                            </div>

                            <div className="w-px h-8 bg-black/10"></div>

                            <div>
                                <p className="text-xl font-semibold text-[#111]">
                                    Secure
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    Your data matters
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
  )
}

export default Getstarted
