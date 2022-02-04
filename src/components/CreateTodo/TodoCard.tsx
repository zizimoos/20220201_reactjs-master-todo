import { IToDo } from "../../atoms";

const TodoCard = ({ text, category, id }: IToDo) => {
  return (
    <div
      style={{
        marginTop: "10px",
        width: "600px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        {category} : {text} : {id}
      </div>
      <div>
        <button>TODO</button>
        <button>DOIN</button>
        <button>DONE</button>
        <button>DEL</button>
      </div>
    </div>
  );
};
export default TodoCard;
