import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  Categories,
  todoStateSelector,
  categoryState,
  toDoState,
  todoStateObject,
  IToDo,
} from "../../atoms";
import BoardBox from "../Draggable/BoardBox";
import DraggableCard from "../Draggable/DraggableCard";
import InputTodoForm from "./InputTodoForm";
import SelectOption from "./SelectOption";
import TodoCard from "./TodoCard";

const Cointainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 50px;
  background-color: teal;
`;

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Boards = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;
`;

const Board = styled.div`
  width: 300px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 5px;
  padding: 20px;
  border-radius: 5px;
  background-color: tomato;
`;

const BoardTitle = styled.div`
  font-weight: bold;
`;

function CreateTodo() {
  const [TODO, DOIN, DONE] = useRecoilValue(todoStateSelector);
  const [todoList, setTodoList] = useRecoilState(toDoState);
  const [todoListObject, setTodoListObject] = useRecoilState(todoStateObject);
  // const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    console.log("/////////////////////////////////////////////////////");
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      const newTodoList = [...todoListObject[source.droppableId]];
      const [removed] = newTodoList.splice(source.index, 1);
      newTodoList.splice(destination?.index, 0, removed);
      console.log(newTodoList);
      console.log(removed);

      setTodoListObject((prev) => {
        const newTodoList = [...prev[source.droppableId]];
        const [removed] = newTodoList.splice(source.index, 1);
        newTodoList.splice(destination?.index, 0, removed);
        return { ...prev, [source.droppableId]: newTodoList };
      });

      localStorage.setItem(
        source.droppableId,
        JSON.stringify(todoListObject[source.droppableId])
      );
    }
    if (destination?.droppableId !== source.droppableId) {
      // const sourceList = [...todoListObject[source.droppableId]];
      // const destinationTodoList = [...todoListObject[destination.droppableId]];

      // const [removed] = sourceList.splice(source?.index, 1);
      // console.log(removed);
      // const newRemoved = { ...removed, category: destination.droppableId };
      // destinationTodoList.splice(destination?.index, 0, newRemoved as IToDo);
      // console.log(newRemoved);
      // console.log(destinationTodoList);

      setTodoListObject((prev) => {
        const sourceList = [...prev[source.droppableId]];
        const destinationList = [...prev[destination.droppableId]];
        const [removed] = sourceList.splice(source?.index, 1);
        const newRemoved = { ...removed, category: destination.droppableId };
        destinationList.splice(destination?.index, 0, newRemoved as IToDo);
        return {
          ...prev,
          [source.droppableId]: sourceList,
          [destination.droppableId]: destinationList,
        };
      });

      localStorage.setItem(
        source.droppableId,
        JSON.stringify(todoListObject[source.droppableId])
      );
      localStorage.setItem(
        destination.droppableId,
        JSON.stringify(todoListObject[destination.droppableId])
      );
    }
  };

  return (
    <Cointainer>
      <SelectOption />
      <InputTodoForm />
      <BoardWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <Boards>
            {Object.keys(todoListObject).map((boardId) => (
              <BoardBox
                boardId={boardId}
                key={boardId}
                todos={todoListObject[boardId]}
              />
            ))}
          </Boards>
        </DragDropContext>
      </BoardWrapper>
    </Cointainer>
  );
}

export default CreateTodo;
