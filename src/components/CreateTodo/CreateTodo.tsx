import { useRecoilState } from "recoil";
import { toDoState } from "../../atoms";
import InputTodoForm from "./InputTodoForm";
import TodoCard from "./TodoCard";

function CreateTodo() {
  const [todoList, _] = useRecoilState(toDoState);
  return (
    <div style={{ padding: "50px", backgroundColor: "teal" }}>
      <InputTodoForm />
      <div style={{ marginTop: "50px", backgroundColor: "tomato" }}>
        {todoList.map((todoItem) => (
          <TodoCard key={todoItem.id} {...todoItem} />
        ))}
      </div>
    </div>
  );
}

export default CreateTodo;
