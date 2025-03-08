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
  const [isEnabled, setIsEnabled] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      ctx.strokeStyle = '#3b82f6';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    // Update quiz container z-index when drawing is enabled/disabled
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
      (quizContainer as HTMLElement).style.zIndex = isEnabled ? '1' : '2';
    }
  }, [isEnabled]);

  const getCanvasPoint = (e: React.PointerEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, pressure: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      pressure: e.pressure || 1
    };
  };

  const startDrawing = (e: React.PointerEvent) => {
    if (!isEnabled) return;
    e.preventDefault();
    
    const point = getCanvasPoint(e);
    setIsDrawing(true);
    setLastPoint(point);

    // Capture pointer to ensure we get all events
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.setPointerCapture(e.pointerId);
    }
  };

  const draw = (e: React.PointerEvent) => {
    if (!isEnabled || !isDrawing || !lastPoint) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const point = getCanvasPoint(e);
    
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(point.x, point.y);
    
    // Adjust line width based on pressure
    const width = Math.max(2, point.pressure * 6);
    ctx.lineWidth = width;
    
    ctx.stroke();
    setLastPoint(point);
  };

  const stopDrawing = (e: React.PointerEvent) => {
    if (!isEnabled) return;
    setIsDrawing(false);
    setLastPoint(null);

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 flex gap-2 z-[100]">
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isEnabled
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {isEnabled ? 'Stop Drawing' : 'Start Drawing'}
        </button>
        {isEnabled && (
          <button
            onClick={clearCanvas}
            className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
          >
            Clear
          </button>
        )}
      </div>
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ 
          zIndex: isEnabled ? 10 : -1,
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerOut={stopDrawing}
          onPointerCancel={stopDrawing}
          className="w-full h-full touch-none"
          style={{ 
            pointerEvents: isEnabled ? 'auto' : 'none',
            cursor: isEnabled ? 'crosshair' : 'default',
            touchAction: 'none'
          }}
        />
      </div>
    </>
  );
} 