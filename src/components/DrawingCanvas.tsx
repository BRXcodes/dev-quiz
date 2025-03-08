'use client';

import { useEffect, useRef } from 'react';
import { Canvas as FabricCanvas, PencilBrush, TPointerEventInfo, TPointerEvent } from 'fabric';

interface FabricPointer {
  x: number;
  y: number;
}

interface PathCreatedEvent {
  path: any;
  e: PointerEvent;
}

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current || fabricCanvasRef.current) return;

    // Initialize Fabric canvas
    const canvas = new FabricCanvas(canvasRef.current, {
      isDrawingMode: true,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Configure drawing brush
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.color = '#3b82f6';

    // Store canvas reference
    fabricCanvasRef.current = canvas;

    // Handle window resize
    const handleResize = () => {
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight);
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    // Prevent drawing in quiz area
    canvas.on('mouse:down', (options: TPointerEventInfo<TPointerEvent>) => {
      const quizContainer = document.querySelector('.quiz-container');
      if (!quizContainer) return;

      const rect = quizContainer.getBoundingClientRect();
      const pointer = canvas.getPointer(options.e) as FabricPointer;

      if (
        pointer.x >= rect.left &&
        pointer.x <= rect.right &&
        pointer.y >= rect.top &&
        pointer.y <= rect.bottom
      ) {
        canvas.isDrawingMode = false;
      } else {
        canvas.isDrawingMode = true;
      }
    });

    // Handle pressure sensitivity for Apple Pencil
    canvas.on('path:created', (options: PathCreatedEvent) => {
      const path = options.path;
      if (path && 'pressure' in options.e) {
        const pressure = options.e.pressure || 0.5;
        path.strokeWidth = Math.max(1, pressure * 4);
        canvas.renderAll();
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -1, pointerEvents: 'auto' }}>
      <canvas ref={canvasRef} />
    </div>
  );
} 