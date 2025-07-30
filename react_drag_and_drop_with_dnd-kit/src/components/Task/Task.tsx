import React from "react"
import "./Task.css";
import { useSortable } from "@dnd-kit/sortable"; // ドラッグ&ドロップの機能を与える
import { CSS } from "@dnd-kit/utilities"; // いろいろ変換するためのCSSスタイルを生成する

interface TaskProps {
  id: number;
  title: string;
}

export const Task: React.FC<TaskProps> = ({id, title}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id});

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="task">
      <input type="checkbox" className="checkbox" />
      {title}
    </div>
  )
}
