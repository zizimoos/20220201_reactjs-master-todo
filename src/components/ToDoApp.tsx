import styled from "styled-components";
import CreateTodo from "./CreateTodo/CreateTodo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

function ToDoApp() {
  return (
    <div>
      <Container>
        <CreateTodo />
      </Container>
    </div>
  );
}
export default ToDoApp;
