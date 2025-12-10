"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, useCallback } from "react";

// Make layers stable across renders
const LAYERS = [
    { density: 0.00010, speed: 0.15, size: 0.7 },
    { density: 0.00006, speed: 0.25, size: 1.0 },
    { density: 0.00003, speed: 0.40, size: 1.5 },
];

export const StarsBackground = ({ className }) => {
    const canvasRef = useRef(null);
    const nebulaCanvasRef = useRef(null); // offscreen buffer

    // Generate star layers
    const generateLayer = useCallback((width, height, density, sizeMult) => {
        const num = Math.floor(width * height * density);

        const colors = [
            "rgba(200,220,255",
            "rgba(220,200,255",
            "rgba(255,210,230",
            "rgba(255,255,255",
        ];

        return Array.from({ length: num }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size:
                Math.random() < 0.08
                    ? (Math.random() * 1.5 + 1.5) * sizeMult
                    : (Math.random() * 0.8 + 0.4) * sizeMult,
            baseOpacity: Math.random() * 0.4 + 0.3,
            twinkleSpeed: Math.random() * 0.003 + 0.001,
            fadeSpeed: Math.random() * 0.002 + 0.001,
            phase: Math.random() * Math.PI * 2,
            fadePhase: Math.random() * Math.PI * 2,
            glow: Math.random() < 0.1 ? 40 : 12,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
    }, []);

    const [stars, setStars] = useState([]);

    // Resize handler — regenerates stars + nebula on viewport size change
    useEffect(() => {
        const update = () => {
            const canvas = canvasRef.current;
            const nebulaCanvas = nebulaCanvasRef.current;
            if (!canvas || !nebulaCanvas) return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            canvas.width = width;
            canvas.height = height;

            nebulaCanvas.width = width;
            nebulaCanvas.height = height;

            // regenerate stars
            setStars(
                LAYERS.map((layer) =>
                    generateLayer(width, height, layer.density, layer.size)
                )
            );

            // redraw nebula ONCE per resize
            const nctx = nebulaCanvas.getContext("2d");
            nctx.clearRect(0, 0, width, height);

            nctx.globalCompositeOperation = "lighter";

            const paintNebula = (cxInner, cyInner, cxOuter, cyOuter, outerRadius) => {
                const g = nctx.createRadialGradient(
                    cxInner,
                    cyInner,
                    0,
                    cxOuter,
                    cyOuter,
                    outerRadius
                );

                g.addColorStop(0, "rgba(251,207,232,0.04)"); // soft pink core
                g.addColorStop(0.5, "rgba(212,109,191,0.08)");
                g.addColorStop(1, "rgba(0,0,0,0)");

                nctx.fillStyle = g;
                nctx.fillRect(0, 0, width, height);
            };

            const isMobile = width < 768;

            if (isMobile) {
                // Left nebula (top-left-ish)
                paintNebula(
                    width * 0.15,
                    height * 0.25,
                    width * 0.30,
                    height * 0.22,
                    width * 0.7
                );
                // Right nebula (top-right-ish)
                paintNebula(
                    width * 0.80,
                    height * 0.30,
                    width * 0.90,
                    height * 0.26,
                    width * 0.7
                );
            } else {
                // Desktop left nebula
                paintNebula(
                    width * 0.10,
                    height * 0.28,
                    width * 0.28,
                    height * 0.18,
                    width * 0.55
                );
                // Desktop right nebula
                paintNebula(
                    width * 0.80,
                    height * 0.22,
                    width * 0.60,
                    height * 0.16,
                    width * 0.55
                );
            }

            nctx.globalCompositeOperation = "source-over";
        };

        update();
        window.addEventListener("resize", update);

        return () => window.removeEventListener("resize", update);
    }, [generateLayer]);

    // Draw ✦ shape
    const drawStarShape = (ctx, x, y, size) => {
        ctx.save();
        ctx.translate(x, y);

        ctx.beginPath();
        ctx.moveTo(0, -size * 2);
        ctx.lineTo(0, size * 2);
        ctx.moveTo(-size * 2, 0);
        ctx.lineTo(size * 2, 0);

        ctx.stroke();
        ctx.restore();
    };

    // Animation loop — ONLY stars animate
    useEffect(() => {
        const canvas = canvasRef.current;
        const nebulaCanvas = nebulaCanvasRef.current;
        if (!canvas || !nebulaCanvas || stars.length === 0) return;

        const ctx = canvas.getContext("2d");

        let frame;

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(nebulaCanvas, 0, 0);

            const time = Date.now();

            stars.forEach((layerStars, i) => {
                const depth = LAYERS[i].speed;

                layerStars.forEach((star) => {
                    const fade =
                        Math.sin(time * star.fadeSpeed + star.fadePhase) * 0.5 + 0.5;
                    const twinkle =
                        Math.sin(time * star.twinkleSpeed + star.phase) * 0.4 + 0.6;

                    const opacity = star.baseOpacity * fade + twinkle * 0.5;

                    star.x += depth * 0.15;
                    star.y += depth * 0.05;

                    if (star.x > canvas.width) star.x = 0;
                    if (star.y > canvas.height) star.y = 0;

                    ctx.shadowBlur = star.glow;
                    ctx.shadowColor = `${star.color}, 0.25)`;
                    ctx.strokeStyle = `${star.color}, ${opacity})`;
                    ctx.lineWidth = star.size * 0.6;

                    drawStarShape(ctx, star.x, star.y, star.size);
                });
            });

            frame = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(frame);
    }, [stars]);

    return (
        <>
            {/* static glow buffer */}
            <canvas
                ref={nebulaCanvasRef}
                className="fixed inset-0 w-screen h-screen pointer-events-none"
            />

            {/* star animation */}
            <canvas
                ref={canvasRef}
                className={cn(
                    "fixed inset-0 w-screen h-screen pointer-events-none",
                    className
                )}
            />
        </>
    );
};
