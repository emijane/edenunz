"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, useCallback } from "react";

// --------------------------------------------------
// THIS VERSION NEVER RE-DRAWS THE NEBULA AGAIN
// --------------------------------------------------

export const StarsBackground = ({ className }) => {
  const canvasRef = useRef(null);
  const nebulaCanvasRef = useRef(null); // offscreen buffer

  const layers = [
    { density: 0.00010, speed: 0.15, size: 0.7 },
    { density: 0.00006, speed: 0.25, size: 1.0 },
    { density: 0.00003, speed: 0.40, size: 1.5 },
  ];

  // Generate star layers
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

  // Resize handler — also regenerates nebula ONCE
  useEffect(() => {
    const update = () => {
      const canvas = canvasRef.current;
      const nebulaCanvas = nebulaCanvasRef.current;
      if (!canvas || !nebulaCanvas) return;

      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      nebulaCanvas.width = width;
      nebulaCanvas.height = height;

      // regenerate stars
      setStars(
        layers.map((layer) =>
          generateLayer(width, height, layer.density, layer.size)
        )
      );

      // redraw nebula ONCE only
      const nctx = nebulaCanvas.getContext("2d");
      nctx.clearRect(0, 0, width, height);

      if (width > 1024) {
        const g = nctx.createRadialGradient(
          width * 0.05,
          height * 0.10,
          0,
          width * 0.25,
          height * 0.15,
          width * 0.75
        );

        g.addColorStop(0, "rgba(251,207,232,0.12)"); // pink-200
        g.addColorStop(0.4, "rgba(212,109,191,0.06)");
        g.addColorStop(1, "rgba(0,0,0,0)");

        nctx.globalCompositeOperation = "lighter";
        nctx.fillStyle = g;
        nctx.fillRect(0, 0, width, height);
        nctx.globalCompositeOperation = "source-over";
      }
    };

    update();

    const obs = new ResizeObserver(update);
    obs.observe(canvasRef.current);

    return () => obs.disconnect();
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
      // draw static glow
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(nebulaCanvas, 0, 0);

      const time = Date.now();

      // draw stars ONLY
      stars.forEach((layerStars, i) => {
        const depth = layers[i].speed;

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
          ctx.shadowColor = `${star.color}, 0.25)`;  // static glow
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
      <canvas ref={nebulaCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      
      {/* star animation */}
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 w-full h-full pointer-events-none",
          className
        )}
      />
    </>
  );
};
