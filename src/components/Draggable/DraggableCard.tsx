import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { IToDo } from "../../atoms";
import TodoCard from "../CreateTodo/TodoCard";

interface IDraggableCardProps {
  todoItem: IToDo;
  index: number;
}

const DraggableCard = ({ todoItem, index }: IDraggableCardProps) => {
  return (
    <Draggable draggableId={todoItem.text} key={todoItem.text} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TodoCard {...todoItem} />
        </div>
      )}
    </Draggable>
  );
};
export default DraggableCard;
