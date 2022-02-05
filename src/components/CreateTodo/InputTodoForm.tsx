import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  toDoState,
  todoStateSelector,
  categoryState,
} from "../../atoms";
import styled from "styled-components";

interface IForm {
  todo: string;
}

const Container = styled.div`
  width: 80%;
  height: 100%;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: tomato;
`;

const InputDiv = styled.input`
  width: 70%;
  height: 20px;
  margin-left: 10px;
  padding: 5px;
  padding-left: 15px;
  border-radius: 20px;
  background-color: #f5f5f5;
  border: none;
  &:focus {
    outline: none;
  }
`;

const FormStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InputTodoForm = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [todoList, setTodoList] = useRecoilState(toDoState);
  const [TODO, DOIN, DONE] = useRecoilValue(todoStateSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const handleValid = ({ todo }: IForm) => {
    setTodoList((oldToDos) => [
      { id: Date.now(), text: todo, category: category },
      ...oldToDos,
    ]);
    setValue("todo", "");
  };
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem(Categories.TODO, JSON.stringify(TODO));
  localStorage.setItem(Categories.DOIN, JSON.stringify(DOIN));
  localStorage.setItem(Categories.DONE, JSON.stringify(DONE));

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as Categories);
  };

  return (
    <Container>
      <select onInput={onInput}>
        <option value="TODO">TODO</option>
        <option value="DOIN">DOIN</option>
        <option value="DONE">DONE</option>
      </select>

      <FormStyled onSubmit={handleSubmit(handleValid)}>
        <InputDiv
          {...register("todo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        {/* <div>
          <button>Add</button>
        </div> */}
      </FormStyled>
    </Container>
  );
};
export default InputTodoForm;
