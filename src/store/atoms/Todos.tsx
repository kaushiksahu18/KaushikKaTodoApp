import { atom } from "recoil";

export const Todos = atom({
  key: "todos", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
