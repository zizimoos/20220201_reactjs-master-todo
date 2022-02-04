import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, todoStateSelector, categoryState } from "../../atoms";
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

const Board = styled.div`
  width: 300px;
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
  // const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);

  return (
    <Cointainer>
      <SelectOption />
      <InputTodoForm />
      <BoardWrapper>
        <Board>
          <BoardTitle>{Categories.TODO}</BoardTitle>
          {TODO.map((todoItem) => (
            <TodoCard key={todoItem.id} {...todoItem} />
          ))}
        </Board>
        <Board>
          <BoardTitle>IN PROGRESS</BoardTitle>
          {DOIN.map((todoItem) => (
            <TodoCard key={todoItem.id} {...todoItem} />
          ))}
        </Board>
        <Board>
          <BoardTitle>{Categories.DONE}</BoardTitle>
          {DONE.map((todoItem) => (
            <TodoCard key={todoItem.id} {...todoItem} />
          ))}
        </Board>
      </BoardWrapper>
    </Cointainer>
  );
}

export default CreateTodo;
