import { Tool } from "../hooks/useDraw";
import { Color, Size, Stroke } from "../hooks/useDraw";

interface Pencil {
  x: number;
  y: number;
}

type ExistingShape =
  | {
      type: "rect";
      color: string;
      stroke: number;
      startX: number;
      startY: number;
      width: number;
      height: number;
    }
  | {
      type: "arc";
      color: string;
      stroke: number;
      startX: number;
      startY: number;
      radius: number;
    }
  | {
      type: "line";
      color: string;
      stroke: number;
      startX: number;
      startY: number;
      moveX: number;
      moveY: number;
    }
  | {
      type: "pencil";
      color: string;
      stroke: number;
      path: Pencil[];
    };

const existingShape: ExistingShape[] = [];

export const drawShape = (
  canvas: HTMLCanvasElement,
  tool: Tool,
  color: Color,
  stroke: Stroke,
  socket: WebSocket
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  console.log(`Selected tool is ${tool}`);
  // ctx.fillStyle = "rgb(255, 255, 255)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  let startX: number = 0;
  let startY: number = 0;
  let height: number = 0;
  let width: number = 0;
  let clicked: boolean = false;
  let pencilPath: Pencil[] = [];

  canvas.addEventListener("mousedown", (event: MouseEvent) => {
    clicked = true;
    const rect = canvas.getBoundingClientRect();
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
  });

  canvas.addEventListener("mouseup", (event: MouseEvent) => {
    clicked = false;
    pencilPath = [];
    const rect = canvas.getBoundingClientRect();

    // socket logic to send messages to the backend server
    // console.log(`Hello from my side broh`);
    socket.send('{ "message" : "checking the server" }');
    socket.onmessage = (event) => {
      console.log(`#333333 ${event.data}`);
    };

    // socket logic to send messages to the backend server ;

    if (tool == "rectangle") {
      existingShape.push({
        type: "rect",
        color: color,
        stroke: stroke,
        startX: startX,
        startY: startY,
        width: width,
        height: height,
      });
    } else if (tool == "ellipse") {
      const radius = Math.sqrt(width ** 2 + height ** 2);
      existingShape.push({
        type: "arc",
        color: color,
        stroke: stroke,
        startX: startX,
        startY: startY,
        radius: radius,
      });
    } else if (tool == "line") {
      existingShape.push({
        type: "line",
        color: color,
        stroke: stroke,
        startX: startX,
        startY: startY,
        moveX: event.clientX - rect.left,
        moveY: event.clientY - rect.top,
      });
    } else if (tool == "pencil") {
      existingShape.push({
        type: "pencil",
        color: color,
        stroke: stroke,
        path: pencilPath,
      });
    }

    socket.send(
      JSON.stringify({
        type: "rect",
        color: color,
        stroke: stroke,
        startX: startX,
        startY: startY,
        width: width,
        height: height,
      })
    );

    socket.onmessage = (event) => {
      existingShape.push(JSON.parse(event.data));
      console.log(JSON.parse(event.data));
      drawShapesBeforeClear(ctx, canvas, existingShape);
    };
  });

  canvas.addEventListener("mousemove", (event: MouseEvent) => {
    if (clicked) {
      const rect = canvas.getBoundingClientRect();
      width = event.clientX - startX - rect.left;
      height = event.clientY - startY - rect.top;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.fillStyle = "rgb(255, 255, 255)";
      // ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawShapesBeforeClear(ctx, canvas, existingShape);

      if (tool == "rectangle") {
        ctx.lineWidth = stroke;
        ctx.strokeStyle = color;
        ctx.strokeRect(startX, startY, width, height);
      } else if (tool == "ellipse") {
        const radius = Math.sqrt(width ** 2 + height ** 2);
        ctx.beginPath();
        ctx.lineWidth = stroke;
        ctx.strokeStyle = color;
        ctx.strokeStyle = color;
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (tool == "line") {
        ctx.beginPath();
        ctx.lineWidth = stroke;
        ctx.strokeStyle = color;
        ctx.moveTo(startX, startY);
        ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
        ctx.strokeStyle = color;
        ctx.stroke();
      } else if (tool == "pencil") {
        const currentX = event.clientX - rect.left;
        const currentY = event.clientY - rect.top;
        pencilPath.push({ x: currentX, y: currentY });

        ctx.beginPath();

        for (let i = 1; i < pencilPath.length; i++) {
          const prev = pencilPath[i - 1];
          const curr = pencilPath[i];
          if (prev !== undefined && curr !== undefined) {
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.lineWidth = stroke;
            ctx.strokeStyle = color;
          }
        }
        ctx.stroke();
      } else {
        console.log(`We are working to create ${tool} tool`);
      }
    }
  });
};

const drawShapesBeforeClear = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  existingShape: ExistingShape[]
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgb(255, 255, 255)"
  // ctx.fillRect = (0, 0, canvas.width, canvas.height)
  existingShape.map((shape: ExistingShape) => {
    if (shape.type == "rect") {
      ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
    } else if (shape.type == "arc") {
      ctx.beginPath();
      ctx.arc(shape.startX, shape.startY, shape.radius, 0, 2 * Math.PI); // Circle centered at (100, 100) with radius 50
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.stroke;
      ctx.stroke();
    } else if (shape.type == "line") {
      ctx.beginPath();
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.moveX, shape.moveY);
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.stroke;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.stroke;

      for (let i = 1; i < shape.path.length; i++) {
        const prev = shape.path[i - 1];
        const curr = shape.path[i];
        if (prev !== undefined && curr !== undefined) {
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
        }
      }
      ctx.stroke();
    }
  });
};
