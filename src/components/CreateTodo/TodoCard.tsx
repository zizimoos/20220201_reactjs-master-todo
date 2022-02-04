import { Categories, IToDo, toDoState } from "../../atoms";
import styled from "styled-components";
import React from "react";
import { useRecoilState } from "recoil";

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
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
  return (
    <Container>
      <div>
        {category} : {text} : {id}
      </div>
      <div>
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
        <button>DEL</button>
      </div>
    </Container>
  );
};
export default TodoCard;
