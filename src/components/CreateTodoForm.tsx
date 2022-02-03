import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, ITodo, todoState } from "../atoms";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
`;

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
    setTodoList((current) => {
      const newTodoList = [
        { text: todo, category: category, id: Date.now() },
        ...current,
      ];

      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      return newTodoList;
    });
    setValue("todo", "");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("todo", { required: "write todo here" })}
          type={"text"}
          placeholder="write your todo"
          style={{ width: "100%", borderRadius: "5px" }}
        />
        <span>{errors?.todo?.message}</span>
        <button>submit</button>
      </form>
    </Container>
  );
};
export default CreateTodoForm;
