import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, toDoState, todoStateSelector } from "../../atoms";

interface IForm {
  todo: string;
}

const InputTodoForm = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [todoList, setTodoList] = useRecoilState(toDoState);
  const [TODO, DOIN, DONE] = useRecoilValue(todoStateSelector);

  const handleValid = ({ todo }: IForm) => {
    setTodoList((oldToDos) => [
      { id: Date.now(), text: todo, category: "TODO" },
      ...oldToDos,
    ]);
    setValue("todo", "");
  };
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem(Categories.TODO, JSON.stringify(TODO));
  localStorage.setItem(Categories.DOIN, JSON.stringify(DOIN));
  localStorage.setItem(Categories.DONE, JSON.stringify(DONE));
  return (
    <div
      style={{
        backgroundColor: "tomato",
        display: "flex",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("todo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </div>
  );
};
export default InputTodoForm;
