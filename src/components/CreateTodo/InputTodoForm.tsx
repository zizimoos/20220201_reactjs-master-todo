import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  Categories,
  toDoState,
  todoStateSelector,
  categoryState,
} from "../../atoms";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  border-radius: 5px;
  background-color: teal;
`;

const InputTo = styled.input`
  width: 70vw;
  padding: 10px;
  margin-right: 15px;
  border-radius: 5px;
  border: none;
`;

interface IForm {
  todo: string;
}

const InputTodoForm = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [todoList, setTodoList] = useRecoilState(toDoState);
  const [TODO, DOIN, DONE] = useRecoilValue(todoStateSelector);
  const [selectedCategory, _] = useRecoilState(categoryState);

  const handleValid = ({ todo }: IForm) => {
    setTodoList((oldToDos) => [
      { id: Date.now(), text: todo, category: selectedCategory },
      ...oldToDos,
    ]);
    setValue("todo", "");
  };
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem(Categories.TODO, JSON.stringify(TODO));
  localStorage.setItem(Categories.DOIN, JSON.stringify(DOIN));
  localStorage.setItem(Categories.DONE, JSON.stringify(DONE));

  return (
    <Container>
      <form onSubmit={handleSubmit(handleValid)}>
        <InputTo
          {...register("todo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        {/* <button>Add</button> */}
      </form>
    </Container>
  );
};
export default InputTodoForm;
