import { Droppable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, IToDo } from "../../atoms";
import DraggableCard from "./DraggableCard";

const Board = styled.div`
  width: 300px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 5px;
  padding: 20px;
  border-radius: 5px;
  background-color: tomato;
`;

const BoardTitle = styled.div`
  font-weight: bold;
`;

interface IBoardProps {
  todos: IToDo[];
  boardId: string;
}

const BoardBox = ({ todos, boardId }: IBoardProps) => {
  return (
    <>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Board ref={provided.innerRef} {...provided.droppableProps}>
            <BoardTitle>{boardId}</BoardTitle>
            {todos.map((todoItem, index) => (
              <DraggableCard
                todoItem={todoItem}
                index={index}
                key={todoItem.id}
              />
            ))}
            {provided.placeholder}
          </Board>
        )}
      </Droppable>
    </>
  );
};
export default BoardBox;
