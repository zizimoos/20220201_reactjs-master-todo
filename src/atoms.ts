import { atom, selector } from "recoil";

export enum Categories {
  TODO = "to_do",
  PROGRESS = "In_progress",
  DONE = "done",
}

export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

const localStorageData = localStorage.getItem("todoList");
const localStorageTodoList = localStorageData
  ? JSON.parse(localStorageData)
  : [];
const todoListWithLocalStorage = [...localStorageTodoList];

export const todoState = atom<ITodo[]>({
  key: "todoStatekey",
  default: todoListWithLocalStorage,
});

export const categoryState = atom<Categories>({
  key: "categoryStatekey",
  default: Categories.TODO,
});

export const todoStateSelector = selector({
  key: "todoStateSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);

    return todos.filter((todo) => todo.category === category);
  },
});
