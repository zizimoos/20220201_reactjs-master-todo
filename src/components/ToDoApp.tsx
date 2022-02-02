import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, todoState, todoStateSelector } from "../atoms";
import CreateTodoForm from "./CreateTodoForm";
import ShowTodoList from "./ShowTodoList";
import { Categories } from "../atoms";

interface ITodoForm {
  todo: string;
}

function ToDoApp() {
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <div>Write ToDo</div>
      <form>
        <select value={category} onInput={onInput}>
          <option value={Categories.TODO}>to_do</option>
          <option value={Categories.PROGRESS}>In_progress</option>
          <option value={Categories.DONE}>done</option>
        </select>
      </form>

      <CreateTodoForm></CreateTodoForm>
      <div>ToDo List</div>
      <ShowTodoList></ShowTodoList>
    </div>
  );
}
export default ToDoApp;
