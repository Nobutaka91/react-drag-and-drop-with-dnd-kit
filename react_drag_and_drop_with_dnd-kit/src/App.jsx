import { useState } from 'react';
import './App.css';

import {DndContext, closestCorners} from "@dnd-kit/core"; 
import Column from './components/Column/Column';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Next.js" },
    { id: 2, title: "TypeScript" },
    { id: 3, title: "Tailwind CSS" },
  ])
  return (
    <div className="App">
      <h1>勉強中のプログラミング言語・フレームワーク ✅</h1>
      <DndContext collisionDetection={closestCorners}>
        <Column tasks={tasks}></Column>
      </DndContext>
    </div>
  );
}

