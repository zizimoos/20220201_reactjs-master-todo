import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  Categories,
  toDoState,
  todoStateSelector,
  categoryState,
  todoStateObject,
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
  margin-right: 30px;
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
  const [todoListObject, setTodoListObject] = useRecoilState(todoStateObject);

  const handleValid = ({ todo }: IForm) => {
    const newTodo = { id: Date.now(), text: todo, category: selectedCategory };
    const Target = [...todoListObject[selectedCategory]];

    setTodoListObject({
      ...todoListObject,
      [selectedCategory]: [...Target, newTodo],
    });
    setValue("todo", "");
  };

  localStorage.setItem(
    selectedCategory,
    JSON.stringify(todoListObject[selectedCategory])
  );

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
