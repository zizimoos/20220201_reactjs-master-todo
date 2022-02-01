import { useRecoilState } from "recoil";
import { todoState } from "../atoms";
import CreateTodoForm from "./CreateTodoForm";
import ShowTodoList from "./ShowTodoList";

interface ITodoForm {
  todo: string;
}

function ToDoApp() {
  const [todoList, _] = useRecoilState(todoState);
  return (
    <div>
      <div>ToDo List</div>
      <CreateTodoForm></CreateTodoForm>
      <ShowTodoList todoList={todoList}></ShowTodoList>
    </div>
  );
}
export default ToDoApp;
