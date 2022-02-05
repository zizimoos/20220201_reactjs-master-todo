import { atom, selector } from "recoil";

export enum Categories {
  TODO = "TODO",
  DOIN = "DOIN",
  DONE = "DONE",
}

////////////////////////////////////////////////////////////
const localStorageData = localStorage.getItem("todoList");
const localStorageTodoList = localStorageData
  ? JSON.parse(localStorageData)
  : [];

const localStorageTODO = localStorage.getItem(Categories.TODO);
const localStorageDOIN = localStorage.getItem(Categories.DOIN);
const localStorageDONE = localStorage.getItem(Categories.DONE);
///////////////////////////////////////////////////////////

export interface IToDo {
  text: string;
  id: number;
  category: "TODO" | "DOIN" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: localStorageTodoList,
});

interface ITodoStateObject {
  [key: string]: IToDo[];
}

export const todoStateObject = atom<ITodoStateObject>({
  key: "todoStateObject",
  default: {
    TODO: localStorageTODO ? JSON.parse(localStorageTODO) : [],
    DOIN: localStorageDOIN ? JSON.parse(localStorageDOIN) : [],
    DONE: localStorageDONE ? JSON.parse(localStorageDONE) : [],
  },
});

export const categoryState = atom<Categories>({
  key: "categoryStatekey",
  default: Categories.TODO,
});

export const todoStateSelector = selector({
  key: "todoStateSelector",
  get: ({ get }) => {
    const todos = get(toDoState);
    const category = get(categoryState);

    return [
      todos.filter((todo) => todo.category === Categories.TODO),
      todos.filter((todo) => todo.category === Categories.DOIN),
      todos.filter((todo) => todo.category === Categories.DONE),
    ];
  },
});
