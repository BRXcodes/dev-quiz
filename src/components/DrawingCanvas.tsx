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
      const scale = window.devicePixelRatio;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#3b82f6'; // Change to blue for better visibility
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    if (event.pointerType === 'touch') return; // Ignore touch events
    
    const point = getCoordinates(event.nativeEvent);
    if (isQuizArea(point)) return;

    setIsDrawing(true);
    setLastPoint(point);
    (event.target as HTMLCanvasElement).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!isDrawing || !lastPoint || event.pointerType === 'touch') return;

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
    if (event.pointerType === 'touch') return;
    
    setIsDrawing(false);
    setLastPoint(null);
    (event.target as HTMLCanvasElement).releasePointerCapture(event.pointerId);
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
      className="fixed inset-0 w-full h-full"
      style={{ 
        zIndex: -1,
        touchAction: 'pan-x pan-y',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none'
      }}
    />
  );
} 