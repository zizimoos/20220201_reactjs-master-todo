import { atom } from "recoil";

export interface ITodo {
  text: string;
  id: number;
  category: "to_do" | "In_progress" | "done";
}

export const todoState = atom<ITodo[]>({
  key: "todoStatekey",
  default: [],
});
