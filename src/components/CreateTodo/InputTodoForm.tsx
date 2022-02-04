import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { toDoState } from "../../atoms";

interface IForm {
  todo: string;
}

const InputTodoForm = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [_, setTodoList] = useRecoilState(toDoState);

  const handleValid = ({ todo }: IForm) => {
    setTodoList((oldToDos) => [
      { id: Date.now(), text: todo, category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("todo", "");
  };
  return (
    <div style={{ backgroundColor: "tomato" }}>
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
