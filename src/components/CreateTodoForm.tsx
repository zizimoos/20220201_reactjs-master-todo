import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { todoState } from "../atoms";

interface ITodoForm {
  todo: string;
}

const CreateTodoForm = () => {
  const [todoList, setTodoList] = useRecoilState(todoState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<ITodoForm>({});

  const handleValid = ({ todo }: ITodoForm) => {
    setTodoList((current) => [
      { text: todo, category: "to_do", id: Date.now() },
      ...current,
    ]);
    setValue("todo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("todo", { required: "write todo here" })}
        type={"text"}
        placeholder="write your todo"
      />
      <span>{errors?.todo?.message}</span>
      <button>submit</button>
    </form>
  );
};
export default CreateTodoForm;
