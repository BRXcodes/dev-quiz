'use client';

import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.strokeStyle = '#94a3b8'; // Slate-400 for a subtle color
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const isQuizArea = (point: Point): boolean => {
    // Get the quiz container element
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return false;

    const rect = quizContainer.getBoundingClientRect();
    return (
      point.x >= rect.left &&
      point.x <= rect.right &&
      point.y >= rect.top &&
      point.y <= rect.bottom
    );
  };

  const getCoordinates = (event: TouchEvent | MouseEvent | PointerEvent): Point | null => {
    if (!canvasRef.current) return null;

    if ('touches' in event) {
      return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    } else {
      return {
        x: event.clientX,
        y: event.clientY
      };
    }
  };

  const startDrawing = (event: React.TouchEvent | React.MouseEvent | React.PointerEvent) => {
    event.preventDefault();
    const point = getCoordinates(event.nativeEvent);
    if (!point) return;
    
    if (isQuizArea(point)) return;

    setIsDrawing(true);
    setLastPoint(point);
  };

  const draw = (event: React.TouchEvent | React.MouseEvent | React.PointerEvent) => {
    event.preventDefault();
    if (!isDrawing) return;

    const newPoint = getCoordinates(event.nativeEvent);
    if (!newPoint || !lastPoint || !canvasRef.current) return;
    
    if (isQuizArea(newPoint)) {
      stopDrawing();
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(newPoint.x, newPoint.y);
    ctx.stroke();

    setLastPoint(newPoint);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      onPointerDown={startDrawing}
      onPointerMove={draw}
      onPointerUp={stopDrawing}
      className="fixed inset-0 w-full h-full pointer-events-auto touch-none"
      style={{ 
        touchAction: 'none', 
        zIndex: -1,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none'
      }}
    />
  );
} 