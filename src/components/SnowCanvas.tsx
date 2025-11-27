"use client";

import { useEffect, useRef } from "react";

export default function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;
    let flakes: { x: number; y: number; r: number; d: number }[] = [];
    let animationFrameId: number;

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      flakes = [];
      for (let i = 0; i < 150; i++) {
        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 2.5 + 0.5, // radius
          d: Math.random() * 1 + 0.5, // density/speed
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
      animationFrameId = requestAnimationFrame(draw);
    };

    let angle = 0;
    const update = () => {
      angle += 0.01;
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        // Update coordinates
        f.y += Math.pow(f.d, 2) + 0.5; // fall speed
        f.x += Math.sin(angle) * 0.5; // sway effect

        // If flake hits bottom, send it back to top
        if (f.y > height) {
          flakes[i] = { x: Math.random() * width, y: 0, r: f.r, d: f.d };
        }
        // Wrap around edges
        if (f.x > width) {
          flakes[i] = { x: 0, y: f.y, r: f.r, d: f.d };
        }
        if (f.x < 0) {
          flakes[i] = { x: width, y: f.y, r: f.r, d: f.d };
        }
      }
    };

    init();
    draw();

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="snow-canvas"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
