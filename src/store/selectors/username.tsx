import { selector } from "recoil";
import { User } from "../atoms/User";

export const getUsername = selector({
  key: "getUsername", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const data = get(User);

    return data.username;
  },
});
