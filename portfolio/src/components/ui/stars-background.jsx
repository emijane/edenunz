"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, useCallback } from "react";

export const StarsBackground = ({ className }) => {
  const canvasRef = useRef(null);

  // Star layer configuration
  const layers = [
    { density: 0.00010, speed: 0.15, size: 0.7 },
    { density: 0.00006, speed: 0.25, size: 1.0 },
    { density: 0.00003, speed: 0.40, size: 1.5 },
  ];

  // Generate stars
  const generateLayer = useCallback((width, height, density, sizeMult) => {
    const num = Math.floor(width * height * density);

    const colors = [
      "rgba(200,220,255",
      "rgba(220,200,255",
      "rgba(255,210,230",
      "rgba(255,255,255"
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
      glow: Math.random() < 0.10 ? 40 : 12,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  const [stars, setStars] = useState([]);

  // Handle canvas resize & star regen
  useEffect(() => {
    const update = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      setStars(
        layers.map((layer) =>
          generateLayer(width, height, layer.density, layer.size)
        )
      );
    };

    update();
    const obs = new ResizeObserver(update);
    obs.observe(canvasRef.current);

    return () => obs.disconnect();
  }, [generateLayer]);

  // Draw ✦ anime star shape
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

  // Animation loop — ONLY stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || stars.length === 0) return;

    const ctx = canvas.getContext("2d");
    let frame;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now();

      stars.forEach((layerStars, i) => {
        const depth = layers[i].speed;

        layerStars.forEach((star) => {
          // twinkle
          const fade =
            Math.sin(time * star.fadeSpeed + star.fadePhase) * 0.5 + 0.5;
          const twinkle =
            Math.sin(time * star.twinkleSpeed + star.phase) * 0.4 + 0.6;

          const opacity = star.baseOpacity * fade + twinkle * 0.5;

          // slight drift
          star.x += depth * 0.15;
          star.y += depth * 0.05;

          if (star.x > canvas.width) star.x = 0;
          if (star.y > canvas.height) star.y = 0;

          ctx.shadowBlur = star.glow;
          ctx.shadowColor = `${star.color}, ${opacity})`;
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
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
    />
  );
};
