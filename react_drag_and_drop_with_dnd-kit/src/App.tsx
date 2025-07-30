import { useState } from 'react';

import './App.css';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Column } from './components/Column/Column';
import Input from './components/Input/Input';

interface Task {
  id: number;
  title: string;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "あああ" },
    { id: 2, title: "いいい" },
    { id: 3, title: "ううう" },
  ]); // 3つのタスクを初期状態として設定

  const addTask = (title: string): void => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
  }

  const getTaskPos = (id: number): number => tasks.findIndex(task => task.id === id);
  // 指定されたタスクのIDから、そのタスクが現在リストのどこにあるのかを見つけるための関数。
  // findIndexは、タスクリストの中でidと一致するタスクのインデックスを返す
  // 例:
  // getTaskPos(1) -> 0を返す
  // getTaskPos(2) -> 1を返す

  const handleDragEnd = (event: any): void => { // handleDragEnd: ドラッグ&ドロップが完了した時に呼び出される
    const { active, over } = event;

    if (active.id === over.id) return;

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  // useSensors: 複数のセンサーをまとめて設定するためのフック
  // useSensor: センサーを設定するためのフック
  // PointerSensor: マウスやペン入力デバイスでのドラッグ操作を処理する
  // TouchSensor: タッチデバイス(スマートフォンやタブレット)でのドラッグ操作を処理する
  // KeyboardSensor: キーボードでのドラッグ操作を処理する(アクセシビリティを向上させるために、キーボード操作でドラッグ&ドロップを行えるようにする)
  // sortableKeyboardCoordinates: キーボード操作でドラッグ&ドロップを行う際に、要素の位置を計算するための関数
  // keyboardSensorのcoordinateGetterプロパティに渡され、キーボード操作時の座標を計算する
  // PointerSensorとTouchSensorをデフォルトで使用。
  // KeyboardSensorに対して、coordinateGetterとしてsortableKeyboardCoordinatesを設定。これにより、キーボード操作時の　　座標計算が正確に行われるようにする



  return (
    <div className="App">
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Input onSubmit={addTask} />
        <Column tasks={tasks}></Column>
      </DndContext>
    </div>
  );
}

// collisionDetection={closestCorners}は、ドラッグされた要素がどの要素と最も近いのかを判定
// onDragEnd={handleDragEnd}はドラッグ&ドロップ操作が完了した時に呼び出される関数を指定している
// DndContextを使ってドラッグ&ドロップのコンテキストを提供し、Columnコンポーネントにタスクリストを渡して表示する。
// <Column tasks={tasks}></Column>は、タスクリストを表示するカスタムコンポーネント
