import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, toDoState, todoStateSelector } from "../../atoms";
import InputTodoForm from "./InputTodoForm";
import TodoCard from "./TodoCard";

const Container = styled.div`
  width: 80%;
  height: 100%;
  margin-top: 50px;
  padding: 30px;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: teal;
`;
const Boards = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin: 20px 0;
`;

const Board = styled.div`
  width: 600px;
  margin: 20px 5px;
  padding: 20px;
  border-radius: 10px;
  background-color: tomato;
`;

function CreateTodo() {
  const [todoList, _] = useRecoilState(toDoState);
  const [TODO, DOIN, DONE] = useRecoilValue(todoStateSelector);
  return (
    <Container>
      <InputTodoForm />
      <Boards>
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
      </Boards>
    </Container>
  );
}

export default CreateTodo;
