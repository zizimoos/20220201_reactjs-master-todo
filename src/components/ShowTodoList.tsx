import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ITodo, todoState, todoStateSelector } from "../atoms";
import { Categories } from "../atoms";

const ShowTodoList = () => {
  const [todoList, setTodoList] = useRecoilState(todoState);
  const todoStateS = useRecoilValue(todoStateSelector);

  const onClick = (todo: ITodo, newCategory: ITodo["category"]) => {
    setTodoList((current) => {
      const targetIndex = current.findIndex((item) => item.id === todo.id);
      const oldTodo = current[targetIndex];
      const newTodo = { ...oldTodo, category: newCategory };
      const newTodoList = [...current]; //새로운 배열을 만들어서 새로운 값을 넣어줘야만 한다.
      newTodoList.splice(targetIndex, 1, newTodo);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      return newTodoList;
    });
  };

  const onDelete = (todo: ITodo) => {
    setTodoList((current) => {
      const targetIndex = current.findIndex((item) => item.id === todo.id);
      const newTodoList = [...current];
      newTodoList.splice(targetIndex, 1);
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      return newTodoList;
    });
  };

  return (
    <ul>
      {todoStateS.map((todo: ITodo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          {todo.category !== Categories.TODO && (
            <button onClick={() => onClick(todo, Categories.TODO)}>TODO</button>
          )}
          {todo.category !== Categories.PROGRESS && (
            <button onClick={() => onClick(todo, Categories.PROGRESS)}>
              PROGRESS
            </button>
          )}
          {todo.category !== Categories.DONE && (
            <button onClick={() => onClick(todo, Categories.DONE)}>DONE</button>
          )}
          <button onClick={() => onDelete(todo)}>DEL</button>
        </li>
      ))}
    </ul>
  );
};

export default ShowTodoList;
