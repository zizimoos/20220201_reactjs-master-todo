import { IToDo } from "../../atoms";
import styled from "styled-components";

import Buttons from "./Buttons";

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f5f5f5;
`;

const TodoText = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  color: #333;
`;

const TodoCard = ({ text, category, id }: IToDo) => {
  return (
    <Container>
      <TodoText>
        <div>{text}</div>
      </TodoText>
      <Buttons id={id} category={category} text={text} />
    </Container>
  );
};
export default TodoCard;
