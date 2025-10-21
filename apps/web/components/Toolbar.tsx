import {
  MoveUpRight,
  Pencil,
  Square,
  Circle,
  Type,
  Eraser,
  Undo2,
  Redo2,
} from "lucide-react";
import { Tool } from "../app/hooks/useDraw";

interface ToolProps {
  setTool: (tool: Tool) => void;
}

const Toolbar = ({ setTool }: ToolProps) => {
  const tools = [
    // { id: "select" as Tool, icon: MousePointer2 },
    { id: "pencil" as Tool, icon: Pencil },
    { id: "rectangle" as Tool, icon: Square },
    { id: "ellipse" as Tool, icon: Circle },
    { id: "line" as Tool, icon: MoveUpRight },
    { id: "text" as Tool, icon: Type },
    { id: "eraser" as Tool, icon: Eraser },
    { id: "undo" as Tool, icon: Undo2 },
    { id: "redo" as Tool, icon: Redo2 },
  ];

  return (
    <div className="absolute m-2 bg-white">
      <div className="border flex flex-col gap-2 px-2 py-2 rounded shadow-lg">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              onClick={() => setTool(tool.id)}
              key={tool.id}
              className={`p-2 rounded transition-all duration-500 cursor-pointer bg-gray-100`}
            >
              <Icon
                className={`w-5 h-5 transition-all duration-500 text-gray-700`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Toolbar;
