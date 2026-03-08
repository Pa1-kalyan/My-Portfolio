"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// Animated data packet that travels along a path
function DataPacket({ delay, duration, color }: { delay: number; duration: number; color: string }) {
    return (
        <motion.circle
            r="3"
            fill={color}
            filter="url(#glow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            <animate attributeName="opacity" values="0;1;1;0" dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
        </motion.circle>
    )
}

export function BackendWorkflowAnimation() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="w-full h-[280px]" />

    return (
        <div className="w-full relative -mx-4 px-4" style={{ overflow: "visible" }}>
            <svg
                viewBox="0 0 700 280"
                className="w-full h-auto"
                style={{ overflow: "visible" }}
            >
                <defs>
                    {/* Neon glow filter */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Gradient for data lines */}
                    <linearGradient id="dataLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1e3a5f" />
                        <stop offset="100%" stopColor="#0f2337" />
                    </linearGradient>
                    <linearGradient id="serverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(30,58,95,0.8)" />
                        <stop offset="100%" stopColor="rgba(15,35,55,0.9)" />
                    </linearGradient>
                </defs>

                {/* === DEVELOPER SECTION (Left) === */}
                <g transform="translate(30, 60)">
                    {/* Desk */}
                    <rect x="20" y="165" width="180" height="8" rx="2" fill="rgba(50,65,85,0.7)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />
                    <rect x="50" y="173" width="8" height="40" rx="1" fill="rgba(40,55,75,0.7)" />
                    <rect x="160" y="173" width="8" height="40" rx="1" fill="rgba(40,55,75,0.7)" />
                    <rect x="35" y="213" width="150" height="5" rx="2" fill="rgba(40,55,75,0.5)" />

                    {/* Monitor */}
                    <rect x="40" y="85" width="140" height="80" rx="6" fill="rgba(15,25,40,0.9)" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
                    {/* Screen glow */}
                    <rect x="47" y="91" width="126" height="62" rx="3" fill="url(#screenGrad)" opacity="0.9" />
                    {/* Code lines on screen */}
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
                        <rect x="55" y="100" width="40" height="3" rx="1" fill="#3b82f6" opacity="0.7">
                            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
                        </rect>
                        <rect x="100" y="100" width="25" height="3" rx="1" fill="#22d3ee" opacity="0.5">
                            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
                        </rect>
                        <rect x="55" y="108" width="55" height="3" rx="1" fill="#14b8a6" opacity="0.6">
                            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.8s" repeatCount="indefinite" />
                        </rect>
                        <rect x="65" y="116" width="35" height="3" rx="1" fill="#3b82f6" opacity="0.5">
                            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite" />
                        </rect>
                        <rect x="105" y="116" width="48" height="3" rx="1" fill="#818cf8" opacity="0.4">
                            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
                        </rect>
                        <rect x="65" y="124" width="60" height="3" rx="1" fill="#22d3ee" opacity="0.5">
                            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.8s" repeatCount="indefinite" />
                        </rect>
                        <rect x="55" y="132" width="30" height="3" rx="1" fill="#14b8a6" opacity="0.4">
                            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                        </rect>
                        <rect x="55" y="140" width="50" height="3" rx="1" fill="#3b82f6" opacity="0.5">
                            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2.4s" repeatCount="indefinite" />
                        </rect>
                    </motion.g>
                    {/* Monitor stand */}
                    <rect x="95" y="165" width="30" height="5" rx="1" fill="rgba(40,55,75,0.8)" />
                    <rect x="105" y="158" width="10" height="8" rx="1" fill="rgba(40,55,75,0.8)" />

                    {/* Keyboard */}
                    <rect x="70" y="170" width="80" height="8" rx="2" fill="rgba(30,45,65,0.7)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" />
                    {/* Key dots */}
                    <g opacity="0.4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <rect key={`key-${i}`} x={76 + i * 9} y="172" width="6" height="3" rx="0.5" fill="rgba(59,130,246,0.3)">
                                <animate attributeName="fill" values="rgba(59,130,246,0.2);rgba(34,211,238,0.5);rgba(59,130,246,0.2)" dur={`${1.5 + i * 0.3}s`} begin={`${i * 0.15}s`} repeatCount="indefinite" />
                            </rect>
                        ))}
                    </g>

                    {/* Developer figure */}
                    {/* Head */}
                    <circle cx="110" cy="45" r="18" fill="rgba(45,65,90,0.8)" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />
                    {/* Hair */}
                    <path d="M92 42 Q95 25 110 22 Q125 25 128 42" fill="rgba(30,45,65,0.9)" />
                    {/* Glasses */}
                    <circle cx="103" cy="46" r="5" fill="none" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
                    <circle cx="117" cy="46" r="5" fill="none" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
                    <line x1="108" y1="46" x2="112" y2="46" stroke="rgba(59,130,246,0.3)" strokeWidth="0.8" />
                    {/* Body */}
                    <path d="M95 63 Q110 70 125 63 L130 100 Q110 105 90 100 Z" fill="rgba(30,50,80,0.8)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" />
                    {/* Arms reaching to keyboard */}
                    <path d="M90 75 Q70 110 85 160" fill="none" stroke="rgba(45,65,90,0.8)" strokeWidth="6" strokeLinecap="round" />
                    <path d="M130 75 Q150 110 135 160" fill="none" stroke="rgba(45,65,90,0.8)" strokeWidth="6" strokeLinecap="round" />
                </g>

                {/* === DATA FLOW LINES (Middle) === */}
                <g>
                    {/* Main flow path (top) - Request */}
                    <path
                        d="M245 120 C300 100, 380 90, 460 115"
                        fill="none"
                        stroke="url(#dataLineGrad)"
                        strokeWidth="1.5"
                        strokeDasharray="6 4"
                        opacity="0.5"
                    >
                        <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.5s" repeatCount="indefinite" />
                    </path>

                    {/* Main flow path (middle) - Data stream */}
                    <path
                        d="M245 145 C320 135, 400 135, 460 145"
                        fill="none"
                        stroke="url(#dataLineGrad)"
                        strokeWidth="2"
                        strokeDasharray="8 4"
                        opacity="0.6"
                    >
                        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.2s" repeatCount="indefinite" />
                    </path>

                    {/* Main flow path (bottom) - Response */}
                    <path
                        d="M460 175 C400 190, 320 185, 245 170"
                        fill="none"
                        stroke="url(#dataLineGrad)"
                        strokeWidth="1.5"
                        strokeDasharray="6 4"
                        opacity="0.4"
                    >
                        <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.8s" repeatCount="indefinite" />
                    </path>

                    {/* Animated data packets along the paths */}
                    {/* Request packets */}
                    {[0, 1.2, 2.4].map((delay, i) => (
                        <circle key={`req-${i}`} r="4" fill="#3b82f6" filter="url(#glow)">
                            <animateMotion dur="2s" begin={`${delay}s`} repeatCount="indefinite" path="M245 120 C300 100, 380 90, 460 115" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
                        </circle>
                    ))}

                    {/* Data stream packets */}
                    {[0.4, 1.0, 1.6, 2.2].map((delay, i) => (
                        <circle key={`data-${i}`} r="3" fill="#22d3ee" filter="url(#glow)">
                            <animateMotion dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" path="M245 145 C320 135, 400 135, 460 145" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
                        </circle>
                    ))}

                    {/* Response packets */}
                    {[0.3, 1.5, 2.7].map((delay, i) => (
                        <circle key={`res-${i}`} r="3.5" fill="#14b8a6" filter="url(#glow)">
                            <animateMotion dur="2.2s" begin={`${delay}s`} repeatCount="indefinite" path="M460 175 C400 190, 320 185, 245 170" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" begin={`${delay}s`} repeatCount="indefinite" />
                        </circle>
                    ))}

                    {/* Labels */}
                    <text x="330" y="88" textAnchor="middle" fill="rgba(59,130,246,0.5)" fontSize="9" fontFamily="monospace">
                        API REQUEST
                        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
                    </text>
                    <text x="350" y="130" textAnchor="middle" fill="rgba(34,211,238,0.5)" fontSize="9" fontFamily="monospace">
                        DATA STREAM
                        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
                    </text>
                    <text x="340" y="205" textAnchor="middle" fill="rgba(20,184,166,0.5)" fontSize="9" fontFamily="monospace">
                        RESPONSE
                        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.5s" repeatCount="indefinite" />
                    </text>

                    {/* Small upload/download icons */}
                    {/* Upload arrow */}
                    <g transform="translate(290, 105)" opacity="0.5">
                        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                        <polygon points="0,6 4,0 8,6" fill="#3b82f6" />
                        <rect x="2.5" y="6" width="3" height="5" fill="#3b82f6" />
                    </g>
                    {/* Download arrow */}
                    <g transform="translate(380, 185)" opacity="0.5">
                        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                        <polygon points="0,4 4,10 8,4" fill="#14b8a6" />
                        <rect x="2.5" y="0" width="3" height="5" fill="#14b8a6" />
                    </g>
                </g>

                {/* === SERVER RACKS (Right) === */}
                {/* Server Rack 1 */}
                <g transform="translate(470, 50)">
                    <rect x="0" y="0" width="70" height="195" rx="5" fill="url(#serverGrad)" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />
                    {/* Glass effect overlay */}
                    <rect x="2" y="2" width="66" height="40" rx="3" fill="rgba(59,130,246,0.03)" />

                    {/* Server units */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <g key={`srv1-${i}`} transform={`translate(8, ${12 + i * 36})`}>
                            <rect x="0" y="0" width="54" height="28" rx="3" fill="rgba(15,25,40,0.8)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" />
                            {/* Ventilation lines */}
                            <line x1="18" y1="4" x2="18" y2="24" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" />
                            <line x1="24" y1="4" x2="24" y2="24" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" />
                            <line x1="30" y1="4" x2="30" y2="24" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" />
                            <line x1="36" y1="4" x2="36" y2="24" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" />
                            {/* Blinking status LEDs */}
                            <circle cx="8" cy="8" r="2" fill="#22d3ee">
                                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" />
                            </circle>
                            <circle cx="8" cy="16" r="2" fill="#14b8a6">
                                <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.5 + i * 0.4}s`} begin={`${i * 0.2}s`} repeatCount="indefinite" />
                            </circle>
                            <circle cx="8" cy="22" r="1.5" fill="#3b82f6" opacity="0.4">
                                <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2 + i * 0.2}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
                            </circle>
                            {/* Activity bar */}
                            <rect x="42" y="6" width="8" height="3" rx="1" fill="rgba(59,130,246,0.3)">
                                <animate attributeName="width" values="3;8;5;8;3" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                                <animate attributeName="fill" values="rgba(59,130,246,0.3);rgba(34,211,238,0.5);rgba(59,130,246,0.3)" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                            </rect>
                            <rect x="42" y="14" width="6" height="3" rx="1" fill="rgba(20,184,166,0.3)">
                                <animate attributeName="width" values="6;3;8;4;6" dur={`${2.5 + i * 0.3}s`} begin={`${i * 0.15}s`} repeatCount="indefinite" />
                            </rect>
                        </g>
                    ))}
                </g>

                {/* Server Rack 2 */}
                <g transform="translate(560, 70)">
                    <rect x="0" y="0" width="65" height="160" rx="5" fill="url(#serverGrad)" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />

                    {/* Server units */}
                    {[0, 1, 2, 3].map((i) => (
                        <g key={`srv2-${i}`} transform={`translate(7, ${10 + i * 36})`}>
                            <rect x="0" y="0" width="51" height="28" rx="3" fill="rgba(15,25,40,0.8)" stroke="rgba(34,211,238,0.12)" strokeWidth="0.5" />
                            <line x1="18" y1="4" x2="18" y2="24" stroke="rgba(34,211,238,0.06)" strokeWidth="0.5" />
                            <line x1="25" y1="4" x2="25" y2="24" stroke="rgba(34,211,238,0.06)" strokeWidth="0.5" />
                            <line x1="32" y1="4" x2="32" y2="24" stroke="rgba(34,211,238,0.06)" strokeWidth="0.5" />
                            {/* LEDs */}
                            <circle cx="8" cy="9" r="2" fill="#3b82f6">
                                <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.3 + i * 0.4}s`} begin={`${0.5 + i * 0.2}s`} repeatCount="indefinite" />
                            </circle>
                            <circle cx="8" cy="18" r="2" fill="#22d3ee">
                                <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${1.6 + i * 0.3}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
                            </circle>
                            {/* Activity bars */}
                            <rect x="38" y="8" width="7" height="3" rx="1" fill="rgba(34,211,238,0.3)">
                                <animate attributeName="width" values="4;7;3;7;4" dur={`${1.8 + i * 0.4}s`} begin={`${i * 0.2}s`} repeatCount="indefinite" />
                            </rect>
                            <rect x="38" y="16" width="5" height="3" rx="1" fill="rgba(59,130,246,0.25)">
                                <animate attributeName="width" values="5;2;7;3;5" dur={`${2.2 + i * 0.3}s`} repeatCount="indefinite" />
                            </rect>
                        </g>
                    ))}
                </g>

                {/* Server Rack 3 (small, behind) */}
                <g transform="translate(640, 90)" opacity="0.6">
                    <rect x="0" y="0" width="45" height="120" rx="4" fill="url(#serverGrad)" stroke="rgba(20,184,166,0.15)" strokeWidth="0.8" />
                    {[0, 1, 2].map((i) => (
                        <g key={`srv3-${i}`} transform={`translate(6, ${10 + i * 36})`}>
                            <rect x="0" y="0" width="33" height="24" rx="2" fill="rgba(15,25,40,0.7)" stroke="rgba(20,184,166,0.1)" strokeWidth="0.5" />
                            <circle cx="7" cy="9" r="1.5" fill="#14b8a6">
                                <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${1.4 + i * 0.5}s`} begin={`${0.3 + i * 0.25}s`} repeatCount="indefinite" />
                            </circle>
                            <circle cx="7" cy="17" r="1.5" fill="#3b82f6" opacity="0.5">
                                <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" />
                            </circle>
                        </g>
                    ))}
                </g>

                {/* Ambient glow behind servers */}
                <ellipse cx="555" cy="160" rx="120" ry="80" fill="rgba(59,130,246,0.04)" filter="url(#softGlow)" />
                <ellipse cx="120" cy="160" rx="80" ry="60" fill="rgba(34,211,238,0.03)" filter="url(#softGlow)" />
            </svg>
        </div>
    )
}
