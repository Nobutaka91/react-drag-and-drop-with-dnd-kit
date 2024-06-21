import "./Column.css";

import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";


const Column = ({ tasks }) => {
  return (
    <div className='column'>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <div key={task.id}>{task.title}</div>
          ))}
      </SortableContext>
    </div>
  )
}

export default Column
