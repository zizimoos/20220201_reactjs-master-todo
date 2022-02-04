import { useRecoilState } from "recoil";
import { toDoState } from "../../atoms";

const DeleteButton = ({ id }: any) => {
  const [todoList, setTodoList] = useRecoilState(toDoState);
  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTodoList((oldToDos) => {
      const copyTodos = [...oldToDos];
      const targetIndex = copyTodos.findIndex((todo) => todo.id === id);
      copyTodos.splice(targetIndex, 1);
      return [...copyTodos];
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };
  return <button onClick={onDelete}>DEL</button>;
};
export default DeleteButton;
