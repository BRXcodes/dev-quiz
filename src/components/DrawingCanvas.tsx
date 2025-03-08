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
  const [isPencil, setIsPencil] = useState(false);

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
      ctx.lineWidth = 2;
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
    // Check if it's an Apple Pencil (or other stylus)
    if (event.pointerType === 'pen') {
      setIsPencil(true);
    } else if (event.pointerType === 'touch') {
      setIsPencil(false);
      return; // Allow normal touch scrolling
    }
    
    const point = getCoordinates(event.nativeEvent);
    if (isQuizArea(point)) return;

    setIsDrawing(true);
    setLastPoint(point);
    
    // Only capture pointer for pencil events
    if (event.pointerType === 'pen') {
      (event.target as HTMLCanvasElement).setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    // Only draw if using pencil and isDrawing is true
    if (!isDrawing || !lastPoint || !isPencil) return;

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
    if (event.pointerType === 'pen') {
      setIsPencil(false);
      setIsDrawing(false);
      setLastPoint(null);
      (event.target as HTMLCanvasElement).releasePointerCapture(event.pointerId);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="fixed inset-0 w-full h-full"
      style={{ 
        zIndex: -1,
        touchAction: 'auto', // Allow normal touch behavior
        userSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none'
      }}
    />
  );
} 