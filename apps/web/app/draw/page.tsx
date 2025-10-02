"use client";
import React, { useState, useRef, useEffect, use } from "react";
import { drawShape } from "../utils/drawshape";

const page = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [shape, setShape] = useState<string>("line");

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      drawShape(canvas, shape);
    }
  }, [canvasRef, shape]);

  return (
    <div>
      <div className="p-4 flex gap-2">
        <button
          onClick={() => setShape("react")}
          className="px-2 py-1 bg-gray-500 rounded"
        >
          React
        </button>
        <button
          onClick={() => setShape("arc")}
          className="px-2 py-1 bg-gray-500 rounded"
        >
          Arc
        </button>
        <button
          onClick={() => setShape("line")}
          className="px-2 py-1 bg-gray-500 rounded"
        >
          Line
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={700}
        height={1380}
        className="rgba(0, 0, 0)"
      ></canvas>
    </div>
  );
};

export default page;
