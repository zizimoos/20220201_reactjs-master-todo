import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, toDoState, todoStateSelector } from "../../atoms";
import InputTodoForm from "./InputTodoForm";
import TodoCard from "./TodoCard";

const Board = styled.div`
  margin: 20px auto;
  padding: 20px;
  width: 600px;
  background-color: tomato;
`;

function CreateTodo() {
  const [todoList, _] = useRecoilState(toDoState);
  const [TODO, DOIN, DONE] = useRecoilValue(todoStateSelector);
  return (
    <div style={{ padding: "50px", backgroundColor: "teal" }}>
      <InputTodoForm />
      <Board>
        <div>{Categories.TODO}</div>
        {TODO.map((todoItem) => (
          <TodoCard key={todoItem.id} {...todoItem} />
        ))}
      </Board>
      <Board>
        <div>{Categories.DOIN}</div>
        {DOIN.map((todoItem) => (
          <TodoCard key={todoItem.id} {...todoItem} />
        ))}
      </Board>
      <Board>
        <div>{Categories.DONE}</div>
        {DONE.map((todoItem) => (
          <TodoCard key={todoItem.id} {...todoItem} />
        ))}
      </Board>
    </div>
  );
}

export default CreateTodo;
