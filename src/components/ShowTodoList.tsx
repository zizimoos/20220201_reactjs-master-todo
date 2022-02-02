import { useRecoilState, useRecoilValue } from "recoil";
import { ITodo, todoState, todoStateSelector } from "../atoms";
import { Categories } from "../atoms";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.colors.cardColor};
`;

const ShowTodoList = () => {
  const [todoList, setTodoList] = useRecoilState(todoState);
  const todoStateS = useRecoilValue(todoStateSelector);

  const onClick = (todo: ITodo, newCategory: ITodo["category"]) => {
    setTodoList((current) => {
      const targetIndex = current.findIndex((item) => item.id === todo.id);
      const oldTodo = current[targetIndex];
      const newTodo = { ...oldTodo, category: newCategory };
      const newTodoList = [...current]; //새로운 배열을 만들어서 새로운 값을 넣어줘야만 한다.
      newTodoList.splice(targetIndex, 1, newTodo);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      return newTodoList;
    });
  };

  const onDelete = (todo: ITodo) => {
    setTodoList((current) => {
      const targetIndex = current.findIndex((item) => item.id === todo.id);
      const newTodoList = [...current];
      newTodoList.splice(targetIndex, 1);
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      return newTodoList;
    });
  };

  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="droppable_TODO">
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {todoStateS.map((todo: ITodo, index) => (
                  <Draggable
                    draggableId={"Draggable" + String(todo.id)}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        key={todo.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div>{todo.text}</div>
                        <div>
                          {todo.category !== Categories.TODO && (
                            <button
                              onClick={() => onClick(todo, Categories.TODO)}
                            >
                              TODO
                            </button>
                          )}
                          {todo.category !== Categories.PROGRESS && (
                            <button
                              onClick={() => onClick(todo, Categories.PROGRESS)}
                            >
                              PROGRESS
                            </button>
                          )}
                          {todo.category !== Categories.DONE && (
                            <button
                              onClick={() => onClick(todo, Categories.DONE)}
                            >
                              DONE
                            </button>
                          )}
                          <button onClick={() => onDelete(todo)}>DEL</button>
                        </div>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
};

export default ShowTodoList;
