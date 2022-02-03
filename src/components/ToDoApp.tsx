import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, todoState, todoStateSelector } from "../atoms";
import CreateTodoForm from "./CreateTodoForm";
import ShowTodoList from "./ShowTodoList";
import { Categories } from "../atoms";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

interface ITodoForm {
  todo: string;
}

function ToDoApp() {
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const [todo, progress, done] = useRecoilValue(todoStateSelector);

  return (
    <div>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "30px",
            marginBottom: "10px",
          }}
        >
          <div>SELECT YOUR CATEGOFY</div>
          <form>
            <select
              value={category}
              onInput={onInput}
              style={{
                border: "0px solid black",
                width: "200px",
                borderRadius: "20px",
                padding: "5px 20px",
              }}
            >
              <option value={Categories.TODO}>to_do</option>
              <option value={Categories.PROGRESS}>In_progress</option>
              <option value={Categories.DONE}>done</option>
            </select>
          </form>
        </div>
        <CreateTodoForm></CreateTodoForm>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ShowTodoList
            todoList={todo}
            droppableId={Categories.TODO}
          ></ShowTodoList>
          {/* <ShowTodoList
            todoList={progress}
            droppableId={Categories.PROGRESS}
          ></ShowTodoList>
          <ShowTodoList
            todoList={done}
            droppableId={Categories.DONE}
          ></ShowTodoList> */}
        </div>
      </Container>
    </div>
  );
}
export default ToDoApp;
