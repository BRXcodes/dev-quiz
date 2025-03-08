'use client';

import { useEffect, useRef, useState } from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { BsEraser } from 'react-icons/bs';

interface Point {
  x: number;
  y: number;
  pressure: number;
}

type Tool = 'pen' | 'eraser';

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const [currentTool, setCurrentTool] = useState<Tool>('pen');
  const [currentColor, setCurrentColor] = useState('#3b82f6');
  const colors = ['#3b82f6', '#ef4444', '#22c55e', '#eab308', '#000000'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      ctx.strokeStyle = currentColor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [currentColor]);

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

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      canvas.setPointerCapture(e.pointerId);
      ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : currentColor;
      ctx.lineWidth = currentTool === 'eraser' ? 20 : 3;
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
    
    // Adjust line width based on pressure and tool
    const baseWidth = currentTool === 'eraser' ? 20 : 3;
    const width = Math.max(baseWidth, point.pressure * (currentTool === 'eraser' ? 30 : 6));
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
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg font-medium transition-all duration-200 z-[100] ${
          isEnabled
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        {isEnabled ? 'Stop Drawing' : 'Start Drawing'}
      </button>

      {isEnabled && (
        <div className="fixed bottom-20 right-4 flex flex-col gap-2 items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-[100]">
          <button
            onClick={() => setCurrentTool('pen')}
            className={`p-2 rounded-lg transition-all ${
              currentTool === 'pen'
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Pen"
          >
            <HiPencil className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentTool('eraser')}
            className={`p-2 rounded-lg transition-all ${
              currentTool === 'eraser'
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Eraser"
          >
            <BsEraser className="w-6 h-6" />
          </button>
          <button
            onClick={clearCanvas}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
            title="Clear Canvas"
          >
            <HiTrash className="w-6 h-6" />
          </button>
          <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-1" />
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setCurrentColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  currentColor === color
                    ? 'border-blue-500 scale-110'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
                title={`Color: ${color}`}
              />
            ))}
          </div>
        </div>
      )}

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