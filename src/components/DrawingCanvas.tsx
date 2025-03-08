'use client';

import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
  pressure: number;
}

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const scale = window.devicePixelRatio;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#3b82f6';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const isQuizArea = (x: number, y: number): boolean => {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return false;

    const rect = quizContainer.getBoundingClientRect();
    return (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    );
  };

  const startDrawing = (e: React.TouchEvent | React.PointerEvent) => {
    e.preventDefault();
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    let x: number, y: number, pressure: number;

    if ('touches' in e) {
      // Touch event
      const touch = e.touches[0];
      x = touch.clientX;
      y = touch.clientY;
      pressure = 1;
    } else {
      // Pointer event
      x = e.clientX;
      y = e.clientY;
      pressure = ('pressure' in e) ? e.pressure : 0.5;
    }

    if (isQuizArea(x, y)) return;

    setIsDrawing(true);
    setLastPoint({ x, y, pressure });
  };

  const draw = (e: React.TouchEvent | React.PointerEvent) => {
    e.preventDefault();
    
    if (!isDrawing || !lastPoint) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let x: number, y: number, pressure: number;

    if ('touches' in e) {
      // Touch event
      const touch = e.touches[0];
      x = touch.clientX;
      y = touch.clientY;
      pressure = 1;
    } else {
      // Pointer event
      x = e.clientX;
      y = e.clientY;
      pressure = ('pressure' in e) ? e.pressure : 0.5;
    }

    if (isQuizArea(x, y)) {
      stopDrawing();
      return;
    }

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(x, y);
    
    // Adjust line width based on pressure
    ctx.lineWidth = Math.max(1, pressure * 4);
    
    ctx.stroke();
    setLastPoint({ x, y, pressure });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={startDrawing}
      onPointerMove={draw}
      onPointerUp={stopDrawing}
      onPointerOut={stopDrawing}
      onPointerCancel={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      className="fixed inset-0 w-full h-full touch-none"
      style={{ 
        zIndex: -1,
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        cursor: 'crosshair'
      }}
    />
  );
} 