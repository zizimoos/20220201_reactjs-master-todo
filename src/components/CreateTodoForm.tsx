import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, ITodo, todoState } from "../atoms";

interface ITodoForm {
  todo: string;
}

const CreateTodoForm = () => {
  const category = useRecoilValue(categoryState);
  const [_, setTodoList] = useRecoilState(todoState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<ITodoForm>({});

  const handleValid = ({ todo }: ITodoForm) => {
    setTodoList((current) => [
      { text: todo, category: category, id: Date.now() },
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
