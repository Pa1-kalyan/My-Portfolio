"use client"

import { useEffect, useRef } from "react"

export function FloatingParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const colors = [
            "59, 130, 246",  // blue-500
            "34, 211, 238",  // cyan-400
            "20, 184, 166",  // teal-500
            "99, 102, 241",  // indigo-500
        ]

        // Each amoeba has control points that wobble independently
        const amoebas: {
            x: number
            y: number
            vx: number
            vy: number
            baseRadius: number
            opacity: number
            color: string
            lobes: number
            phase: number
            phaseSpeed: number
            wobbleAmplitudes: number[]
            wobbleSpeeds: number[]
            rotation: number
            rotationSpeed: number
        }[] = []

        for (let i = 0; i < 25; i++) {
            const lobes = Math.floor(Math.random() * 4) + 4 // 4-7 lobes
            const wobbleAmplitudes: number[] = []
            const wobbleSpeeds: number[] = []
            for (let j = 0; j < lobes; j++) {
                wobbleAmplitudes.push(Math.random() * 0.35 + 0.15)
                wobbleSpeeds.push((Math.random() * 0.8 + 0.4) * (Math.random() > 0.5 ? 1 : -1))
            }

            amoebas.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                baseRadius: Math.random() * 20 + 8,
                opacity: Math.random() * 0.15 + 0.05,
                color: colors[Math.floor(Math.random() * colors.length)],
                lobes,
                phase: Math.random() * Math.PI * 2,
                phaseSpeed: (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
                wobbleAmplitudes,
                wobbleSpeeds,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.005,
            })
        }

        let animationId: number
        let scrollY = 0
        let time = 0

        const handleScroll = () => {
            scrollY = window.scrollY
        }
        window.addEventListener("scroll", handleScroll, { passive: true })

        // Draw a smooth amoeba shape using bezier curves
        function drawAmoeba(
            ctx: CanvasRenderingContext2D,
            cx: number,
            cy: number,
            amoeba: typeof amoebas[0],
            t: number
        ) {
            const { baseRadius, lobes, wobbleAmplitudes, wobbleSpeeds, rotation } = amoeba
            const points: { x: number; y: number }[] = []
            const numPoints = lobes * 3 // More points for smoother curves

            for (let i = 0; i < numPoints; i++) {
                const angle = (i / numPoints) * Math.PI * 2 + rotation
                const lobeIndex = Math.floor((i / numPoints) * lobes) % lobes

                // Each lobe wobbles at its own speed/amplitude
                const wobble = 1 + wobbleAmplitudes[lobeIndex] *
                    Math.sin(t * wobbleSpeeds[lobeIndex] + (lobeIndex * Math.PI * 2) / lobes + amoeba.phase)

                // Add secondary wobble for more organic feel
                const secondaryWobble = 1 + 0.08 * Math.sin(t * 1.3 + angle * 3 + amoeba.phase * 2)

                const r = baseRadius * wobble * secondaryWobble
                points.push({
                    x: cx + Math.cos(angle) * r,
                    y: cy + Math.sin(angle) * r,
                })
            }

            // Draw smooth closed curve through points using quadratic bezier
            ctx.beginPath()
            ctx.moveTo(
                (points[0].x + points[numPoints - 1].x) / 2,
                (points[0].y + points[numPoints - 1].y) / 2
            )

            for (let i = 0; i < numPoints; i++) {
                const next = (i + 1) % numPoints
                const midX = (points[i].x + points[next].x) / 2
                const midY = (points[i].y + points[next].y) / 2
                ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY)
            }

            ctx.closePath()

            // Gradient fill for depth
            const gradient = ctx.createRadialGradient(
                cx - baseRadius * 0.2, cy - baseRadius * 0.2, 0,
                cx, cy, baseRadius * 1.5
            )
            gradient.addColorStop(0, `rgba(${amoeba.color}, ${amoeba.opacity * 2})`)
            gradient.addColorStop(0.6, `rgba(${amoeba.color}, ${amoeba.opacity})`)
            gradient.addColorStop(1, `rgba(${amoeba.color}, 0)`)
            ctx.fillStyle = gradient
            ctx.fill()
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            time += 0.016 // ~60fps

            amoebas.forEach((a, i) => {
                // Parallax offset based on scroll
                const parallaxOffset = scrollY * (0.02 + i * 0.002)

                a.x += a.vx
                a.y += a.vy
                a.phase += a.phaseSpeed * 0.016
                a.rotation += a.rotationSpeed

                // Wrap around edges with margin
                const margin = a.baseRadius * 2
                if (a.x < -margin) a.x = canvas.width + margin
                if (a.x > canvas.width + margin) a.x = -margin
                if (a.y < -margin) a.y = canvas.height + margin
                if (a.y > canvas.height + margin) a.y = -margin

                const drawY = ((a.y - parallaxOffset) % (canvas.height + margin * 2) + canvas.height + margin * 2) % (canvas.height + margin * 2) - margin

                drawAmoeba(ctx, a.x, drawY, a, time)
            })

            animationId = requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        window.addEventListener("resize", handleResize)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.7 }}
        />
    )
}
