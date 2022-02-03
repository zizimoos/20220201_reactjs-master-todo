import { useRecoilState, useRecoilValue } from "recoil";
import { ITodo, todoState, todoStateSelector } from "../atoms";
import { Categories } from "../atoms";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { MdChecklist, MdDone, MdPlaylistPlay } from "react-icons/md";

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

const ShowTodoList = ({ todoList: todoListProps, droppableId }: any) => {
  const [todoList, setTodoList] = useRecoilState(todoState);

  const onClick = (todo: ITodo, newCategory: ITodo["category"]) => {
    setTodoList((current) => {
      const targetIndex = current.findIndex((item) => item.id === todo.id);
      const oldTodo = current[targetIndex];
      const newTodo = { ...oldTodo, category: newCategory };
      const newTodoList = [...current]; //새로운 배열을 만들어서 새로운 값을 넣어줘야만 한다.
      newTodoList.splice(targetIndex, 1, newTodo);
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
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

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    setTodoList((oldToDos) => {
      const toDosCopy = [...oldToDos];

      //선택된 카드를 지운다.
      const [removed] = toDosCopy.splice(source.index, 1);

      // 선택된 카드를 새로운 위치에 넣는다.
      toDosCopy.splice(destination?.index, 0, removed);

      return toDosCopy;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId={droppableId}>
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {todoListProps.map((todo: ITodo, index: number) => (
                  <Draggable // key와 draggableId가 같아야 합니다.
                    draggableId={todo.text}
                    key={todo.text}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        key={todo.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div style={{ minWidth: "250px" }}>{todo.text}</div>
                        <div>
                          {todo.category !== Categories.TODO && (
                            <button
                              onClick={() => onClick(todo, Categories.TODO)}
                            >
                              <MdChecklist />
                            </button>
                          )}
                          {todo.category !== Categories.PROGRESS && (
                            <button
                              onClick={() => onClick(todo, Categories.PROGRESS)}
                            >
                              <MdPlaylistPlay />
                            </button>
                          )}
                          {todo.category !== Categories.DONE && (
                            <button
                              onClick={() => onClick(todo, Categories.DONE)}
                            >
                              <MdDone />
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
