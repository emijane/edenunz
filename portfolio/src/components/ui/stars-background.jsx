"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, useCallback } from "react";

export const StarsBackground = ({ className }) => {
  const canvasRef = useRef(null);

  // CONFIG
  const layers = [
    { density: 0.00010, speed: 0.15, size: 0.7 },  // FAR stars
    { density: 0.00006, speed: 0.25, size: 1.0 },  // MID stars
    { density: 0.00003, speed: 0.40, size: 1.5 },  // NEAR stars
  ];

  // Slow nebula pulse speed
  const NEBULA_PULSE_SPEED = 0.00003; // lower = slower
  const nebulaAlpha = useRef(0.12);    // base opacity reference

  // Generate star layers
  const generateLayer = useCallback((width, height, density, sizeMult) => {
    const num = Math.floor(width * height * density);

    const colors = [
      "rgba(200,220,255",
      "rgba(220,200,255",
      "rgba(255,210,230",
      "rgba(255,255,255"
    ];

    return Array.from({ length: num }, () => {
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
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
        color,
      };
    });
  }, []);

  const generateNebula = useCallback((width, height) => {
    return {
      x: 0,
      y: 0,
      w: width,
      h: height,
    };
  }, []);

  const [stars, setStars] = useState([]);
  const [nebula, setNebula] = useState(null);

  // Resize and regenerate
  useEffect(() => {
    const update = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      const generatedLayers = layers.map((layer) =>
        generateLayer(width, height, layer.density, layer.size)
      );

      setStars(generatedLayers);
      setNebula(generateNebula(width, height));
    };

    update();
    const obs = new ResizeObserver(update);
    obs.observe(canvasRef.current);

    return () => obs.disconnect();
  }, [generateLayer, generateNebula]);

  // Draw ✦ star shape
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

  // MAIN RENDER LOOP
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || stars.length === 0) return;
    const ctx = canvas.getContext("2d");

    let frame;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now();

      //  NEBULA — static, slow opacity pulse (no movement)
      if (nebula) {
        nebulaAlpha.current =
          0.06 + Math.sin(time * NEBULA_PULSE_SPEED) * 0.01;
        // base 0.06, +/- 0.03 variation

        const grad = ctx.createRadialGradient(
          nebula.w * 0.9,
          nebula.h * 0.3,
          50,
          nebula.w * 0.1,
          nebula.h * 0.1,
          nebula.w
        );

        grad.addColorStop(0,   `rgba(90,130,255,${nebulaAlpha.current})`);          // blue
        grad.addColorStop(0.5, `rgba(160,90,255,${nebulaAlpha.current * 0.9})`);    // purple
        grad.addColorStop(0.2, `rgba(255,110,180,${nebulaAlpha.current * 0.2})`);   // pink
        grad.addColorStop(1,   "rgba(20,20,60,0)");                                  // fade out


        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // ⭐ STAR LAYERS (parallax)
      stars.forEach((layerStars, i) => {
        const depth = layers[i].speed;

        layerStars.forEach((star) => {
          const fade =
            Math.sin(time * star.fadeSpeed + star.fadePhase) * 0.5 + 0.5;

          const twinkle =
            Math.sin(time * star.twinkleSpeed + star.phase) * 0.4 + 0.6;

          const opacity = Math.min(
            1,
            star.baseOpacity * fade + twinkle * 0.5
          );

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

      frame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frame);
  }, [stars, nebula]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
    />
  );
};
