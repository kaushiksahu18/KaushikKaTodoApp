import { atom } from "recoil";

export const User = atom({
  key: "user", // unique ID (with respect to other atoms/selectors)
  default: {
    username: "",
    password: "",
  }, // default value (aka initial value)
});
