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

    // Prevent scrolling on the entire document when using Apple Pencil
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const isQuizArea = (point: Point): boolean => {
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

  const getCoordinates = (event: PointerEvent): Point => {
    return {
      x: event.clientX,
      y: event.clientY
    };
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    const point = getCoordinates(event.nativeEvent);
    
    if (isQuizArea(point)) return;

    setIsDrawing(true);
    setLastPoint(point);

    // Capture the pointer to ensure all events go to the canvas
    (event.target as HTMLCanvasElement).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    event.preventDefault();
    if (!isDrawing || !lastPoint) return;

    const newPoint = getCoordinates(event.nativeEvent);
    if (isQuizArea(newPoint)) {
      handlePointerUp(event);
      return;
    }

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(newPoint.x, newPoint.y);
    ctx.stroke();

    setLastPoint(newPoint);
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    event.preventDefault();
    setIsDrawing(false);
    setLastPoint(null);
    
    // Release the pointer capture
    (event.target as HTMLCanvasElement).releasePointerCapture(event.pointerId);
  };

  return (
    <>
      <style jsx global>{`
        body, html {
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        className="fixed inset-0 w-full h-full pointer-events-auto touch-none"
        style={{ 
          touchAction: 'none',
          zIndex: -1,
          userSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none'
        }}
      />
    </>
  );
} 