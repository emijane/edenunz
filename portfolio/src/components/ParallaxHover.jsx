"use client";
import { useRef } from "react";

export default function ParallaxHover({
    children,
    scale = 1.008,       // tiny scale for premium feel
    maxTilt = 2          // <-- THIS controls subtle corner movement
}) {
    const ref = useRef(null);
    const frameRef = useRef(null);

    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // normalized [-1, 1]
        const dx = (x / rect.width) * 2 - 1;
        const dy = (y / rect.height) * 2 - 1;

        // SUPER subtle tilt
        const rotateY = dx * maxTilt;
        const rotateX = -dy * maxTilt;

        if (frameRef.current) cancelAnimationFrame(frameRef.current);

        frameRef.current = requestAnimationFrame(() => {
            el.style.transform = `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(${scale})
            `;
        });
    };

    const reset = () => {
        const el = ref.current;
        if (!el) return;

        if (frameRef.current) cancelAnimationFrame(frameRef.current);

        el.style.transform = `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            className="transition-transform duration-300 will-change-transform"
            style={{
                transformStyle: "preserve-3d",
                isolation: "isolate",
                backfaceVisibility: "hidden"
            }}
        >
            {children}
        </div>
    );
}
