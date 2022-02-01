import React from "react";
import { useRecoilState } from "recoil";
import { ITodo, todoState } from "../atoms";

const ShowTodoList = ({ todoList }: any) => {
  const [_, setTodoList] = useRecoilState(todoState);
  const onClick = (todo: ITodo, newCategory: ITodo["category"]) => {
    setTodoList((current) => {
      const targetIndex = current.findIndex((item) => item.id === todo.id);
      const oldTodo = current[targetIndex];
      const newTodo = { ...oldTodo, category: newCategory };
      const newTodoList = [...current]; //새로운 배열을 만들어서 새로운 값을 넣어줘야만 한다.
      newTodoList.splice(targetIndex, 1, newTodo);
      return newTodoList;
    });
  };
  return (
    <ul>
      {todoList.map((todo: ITodo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          {todo.category !== "to_do" && (
            <button onClick={() => onClick(todo, "to_do")}>TODO</button>
          )}
          {todo.category !== "In_progress" && (
            <button onClick={() => onClick(todo, "In_progress")}>
              PROGRESS
            </button>
          )}
          {todo.category !== "done" && (
            <button onClick={() => onClick(todo, "done")}>DONE</button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ShowTodoList;
