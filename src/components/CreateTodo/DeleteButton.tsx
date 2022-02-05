import { useRecoilState } from "recoil";
import { todoStateObject } from "../../atoms";

const DeleteButton = ({ id, category }: any) => {
  const [todoListObject, setTodoListObject] = useRecoilState(todoStateObject);

  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetIndex = todoListObject[category].findIndex(
      (todo) => todo.id === id
    );
    const copyTodoList = [...todoListObject[category]];
    copyTodoList.splice(targetIndex, 1);
    setTodoListObject({
      ...todoListObject,
      [category]: [...copyTodoList],
    });
    localStorage.setItem(category, JSON.stringify(todoListObject[category]));
  };
  return <button onClick={onDelete}>DEL</button>;
};
export default DeleteButton;
