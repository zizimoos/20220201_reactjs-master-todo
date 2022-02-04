import styled from "styled-components";
import CreateTodo from "./CreateTodo/CreateTodo";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

function ToDoApp() {
  return (
    <Container>
      <CreateTodo />
    </Container>
  );
}
export default ToDoApp;
