import { Categories, IToDo, toDoState } from "../../atoms";
import styled from "styled-components";
import React from "react";
import { useRecoilState } from "recoil";
import DeleteButton from "./DeleteButton";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Buttons = ({ id, text, category }: IToDo) => {
  const [_, setNewCategory] = useRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setNewCategory((oldToDos) => {
      const copyTodos = [...oldToDos];
      const targetIndex = copyTodos.findIndex((todo) => todo.id === id);
      const newTodo = {
        id,
        text,
        category: name as Categories,
      };
      copyTodos.splice(targetIndex, 1, newTodo);
      return [...copyTodos];
    });
  };

  return (
    <Container>
      {category !== Categories.TODO && (
        <button name={Categories.TODO} onClick={onClick}>
          TODO
        </button>
      )}
      {category !== Categories.DOIN && (
        <button name={Categories.DOIN} onClick={onClick}>
          DOIN
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          DONE
        </button>
      )}
      <DeleteButton id={id} />
    </Container>
  );
};

export default Buttons;
