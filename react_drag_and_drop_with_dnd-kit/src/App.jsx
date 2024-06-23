import { useState } from 'react';
import './App.css';

import {DndContext, closestCorners} from "@dnd-kit/core"; 
import Column from './components/Column/Column';
import { arrayMove } from '@dnd-kit/sortable';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Next.js" },
    { id: 2, title: "TypeScript" },
    { id: 3, title: "Tailwind CSS" },
  ]); // 3つのタスクを初期状態として設定

  const getTaskPos = id => tasks.findIndex(task => task.id === id); 
  // 指定されたタスクのIDから、そのタスクが現在リストのどこにあるのかを見つけるための関数。
  // findIndexは、タスクリストの中でidと一致するタスクのインデックスを返す
  // 例:
  // getTaskPos(1) -> 0を返す (Next.jsの位置)
  // getTaskPos(2) -> 1を返す (TypeScriptの位置)

  const handleDragEnd = event => { // handleDragEnd: ドラッグ&ドロップが完了した時に呼び出される
    const {active, over} = event;

    if(active.id === over.id) return;

    setTasks(tasks => {
        const originalPos = getTaskPos(active.id);
        const newPos = getTaskPos(over.id);

        return arrayMove(tasks, originalPos, newPos);
    })
  }
  // event: ドラッグ&ドロップのイベントプロジェクト
  // eventからactive(ドラッグされたタスク)とover(ドロップされた場所のタスク)を取得する
  // active.id === over.idは、ドラッグしたタスクが元の位置にドロップされた場合、何もしないことを意味する
  // setTasks: タスクリストを更新するための関数
  // tasksは現在のタスクリスト
  // getTasksPos(active.id)はドラッグされたタスクの元の位置を見つける
  // getTasksPos(over.id)はドロップされた場所のタスクの位置を見つける
  // arrayMove(tasks, originalPos, newPos)は、tasks配列ないのタスクをoriginalPosからnewPosに移動させた新しい配列を返す



  return (
    <div className="App">
      <h1 className='title'>勉強中のプログラミング言語・フレームワーク ✅</h1>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Column tasks={tasks}></Column>
      </DndContext>
    </div>
  );
}

// collisionDetection={closestCorners}は、ドラッグされた要素とドロップされた要素の衝突検出方法を指定している
// onDragEnd={handleDragEnd}はドラッグ&ドロップ操作が完了した時に呼び出される関数を指定している
// DndContextを使ってドラッグ&ドロップのコンテキストを提供し、Columnコンポーネントにタスクリストを渡して表示する。
// <Column tasks={tasks}></Column>は、タスクリストを表示するカスタムコンポーネント
