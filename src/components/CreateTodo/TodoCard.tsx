import { Categories, IToDo, toDoState } from "../../atoms";
import styled from "styled-components";
import React from "react";
import { useRecoilState } from "recoil";

const Container = styled.div`
  width: 100%;
  min-width: 290px;
  max-width: 290px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f5f5f5;
`;
const TextBox = styled.div`
  width: 290px;
  height: 100%;
  text-align: start;
  padding: 5px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const TodoCard = ({ text, category, id }: IToDo) => {
  const [newCategory, setNewCategory] = useRecoilState(toDoState);

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

  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setNewCategory((oldToDos) => {
      const copyTodos = [...oldToDos];
      const targetIndex = copyTodos.findIndex((todo) => todo.id === id);
      copyTodos.splice(targetIndex, 1);

      return [...copyTodos];
    });
  };

  return (
    <Container>
      <TextBox>{text}</TextBox>
      <Buttons>
        {category !== "TODO" && (
          <button name="TODO" onClick={onClick}>
            TODO
          </button>
        )}
        {category !== "DOIN" && (
          <button name="DOIN" onClick={onClick}>
            DOIN
          </button>
        )}
        {category !== "DONE" && (
          <button name="DONE" onClick={onClick}>
            DONE
          </button>
        )}
        <button onClick={onDelete}>DEL</button>
      </Buttons>
    </Container>
  );
};
export default TodoCard;
