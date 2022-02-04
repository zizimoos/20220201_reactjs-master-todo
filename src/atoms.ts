import { atom, selector } from "recoil";

export enum Categories {
  TODO = "TO_DO",
  PROGRESS = "DOING",
  DONE = "DONE",
}

export interface IForm {
  todo: string;
}

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: [],
});

const localStorageData = localStorage.getItem("todoList");
const localStorageTodoList = localStorageData
  ? JSON.parse(localStorageData)
  : [];
const todoListWithLocalStorage = [...localStorageTodoList];

export const todoStateObject = atom({
  key: "todoStateObject",
  default: {
    to_do: [
      {
        text: "TODO ONE",
        category: "to_do",
        id: 1643977420510,
      },
      {
        text: "one for the God",
        category: "to_do",
        id: 1643977303656,
      },
      {
        text: "two for the J",
        category: "to_do",
        id: 1643977310968,
      },
    ],
    In_progress: [
      {
        text: "three for the M",
        category: "In_progress",
        id: 1643977321059,
      },
      {
        text: "PROGRESS TWO",
        category: "In_progress",
        id: 1643977355518,
      },
      {
        text: "PROGRESS THREE",
        category: "In_progress",
        id: 1643977586763,
      },
    ],
    done: [
      {
        text: "DONE TWO",
        category: "done",
        id: 1643977382676,
      },
      {
        text: "DONE ONE",
        category: "done",
        id: 1643977378727,
      },
    ],
  },
});

export const categoryState = atom<Categories>({
  key: "categoryStatekey",
  default: Categories.TODO,
});

export const todoStateSelector = selector({
  key: "todoStateSelector",
  get: ({ get }) => {
    const todos = get(todoStateObject);
    const category = get(categoryState);

    return [todos];
  },
});
