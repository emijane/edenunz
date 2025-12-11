"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, useCallback } from "react";

const LAYERS = [
    { density: 0.00010, speed: 0.15, size: 0.7 },
    { density: 0.00006, speed: 0.25, size: 1.0 },
    { density: 0.00003, speed: 0.40, size: 1.5 },
];

export const StarsBackground = ({ className }) => {
    const canvasRef = useRef(null);
    const nebulaCanvasRef = useRef(null);

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

    // COLOR PALETTES
    const LEFT_NEBULA_COLORS = {
        inner: "rgba(187, 84, 255,0.01)",   // soft pink / lavender
        mid:   "rgba(255, 128, 179,0.2)",   // violet
        outer: "rgba(0,0,0,0)",
    };

    const RIGHT_NEBULA_COLORS = {
        inner: "rgba(22, 16, 1455,0.01)",   // baby blue
        mid:   "rgba(120,180,255,0.1)",   // sky blue
        outer: "rgba(0,0,0,0)",
    };

    // Paint nebula with configurable colors
    const paintNebula = (ctx, cxInner, cyInner, cxOuter, cyOuter, radius, colors) => {
        const g = ctx.createRadialGradient(
            cxInner,
            cyInner,
            0,
            cxOuter,
            cyOuter,
            radius
        );

        g.addColorStop(0, colors.inner);
        g.addColorStop(0.5, colors.mid);
        g.addColorStop(1, colors.outer);

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    // Resize → generate stars + nebulas
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

            setStars(
                LAYERS.map((layer) =>
                    generateLayer(width, height, layer.density, layer.size)
                )
            );

            const nctx = nebulaCanvas.getContext("2d");
            nctx.clearRect(0, 0, width, height);
            nctx.globalCompositeOperation = "lighter";

            const isMobile = width < 768;

            if (isMobile) {
                // left
                paintNebula(
                    nctx,
                    width * 0.15,
                    height * 0.25,
                    width * 0.30,
                    height * 0.22,
                    width * 0.7,
                    LEFT_NEBULA_COLORS
                );
                // right
                paintNebula(
                    nctx,
                    width * 0.80,
                    height * 0.30,
                    width * 0.90,
                    height * 0.26,
                    width * 0.7,
                    RIGHT_NEBULA_COLORS
                );
            } else {
                // Desktop left (pink/purple)
                paintNebula(
                    nctx,
                    width * 0.10,
                    height * 0.05,
                    width * 0.28,
                    height * 0.22,
                    width * 0.55,
                    LEFT_NEBULA_COLORS
                );

                // Desktop right (blue)
                paintNebula(
                    nctx,
                    width * 0.90,
                    height * 0.82,
                    width * 0.60,
                    height * 0.16,
                    width * 0.55,
                    RIGHT_NEBULA_COLORS
                );
            }

            // vignette burn
            nctx.globalCompositeOperation = "multiply";

            const vignette = nctx.createRadialGradient(
                width / 2,
                height / 2,
                0,
                width / 2,
                height / 2,
                width * 0.9
            );

            vignette.addColorStop(0, "rgba(0,0,0,0)");
            vignette.addColorStop(0.6, "rgba(0,0,0,0.25)");
            vignette.addColorStop(1, "rgba(0,0,0,0.75)");

            nctx.fillStyle = vignette;
            nctx.fillRect(0, 0, width, height);

            nctx.globalCompositeOperation = "source-over";
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [generateLayer]);

    // stars animate
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

                    let opacity = (star.baseOpacity * fade + twinkle * 0.5) * 1.15;
                    if (opacity > 1) opacity = 1;

                    star.x += depth * 0.15;
                    star.y += depth * 0.05;

                    if (star.x > canvas.width) star.x = 0;
                    if (star.y > canvas.height) star.y = 0;

                    ctx.shadowBlur = star.glow;
                    ctx.shadowColor = `${star.color}, 0.25)`;
                    ctx.strokeStyle = `${star.color}, ${opacity})`;
                    ctx.lineWidth = star.size * 0.6;

                    ctx.beginPath();
                    ctx.moveTo(star.x, star.y - star.size * 2);
                    ctx.lineTo(star.x, star.y + star.size * 2);
                    ctx.moveTo(star.x - star.size * 2, star.y);
                    ctx.lineTo(star.x + star.size * 2, star.y);
                    ctx.stroke();
                });
            });

            frame = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(frame);
    }, [stars]);

    return (
        <>
            <canvas
                ref={nebulaCanvasRef}
                className="fixed inset-0 w-screen h-screen pointer-events-none"
            />
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
