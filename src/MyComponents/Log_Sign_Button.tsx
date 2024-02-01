import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Log_Sign_ButtonContent from "./Log_Sign_ButtonContent";
import { User } from "@/store/atoms/User";
import { Todos } from "@/store/atoms/Todos";
import { useSetRecoilState } from "recoil";
import { BaseURL } from "@/env";
import { useEffect } from "react";

const onlyfetchTodos = async (setTodos: Function, setUser: Function) => {
  const username: string = localStorage.getItem("username");
  const password: string = localStorage.getItem("password");
  const url = BaseURL;
  try {
    const response = await axios.get(`${url}/todos`, {
      headers: {
        "Content-Type": "application/json",
        username,
        password,
      },
    });
    if (response.status === 200 || response.status === 201) {
      setUser({ username, password });
      setTodos(response.data);
    } else {
      console.log(`Error while fetching todos: ${response.statusText}`);
    }
  } catch (error) {
    console.log("Error while fetching todos:\n");
    if (
      error.response.data ==
      "Invalid username or password: Not found user in DataBase"
    ) {
      console.log(
        "Deleting your user data from your localstorage Because we can't find your user data in DataBase Creat new user and try again"
      );
      localStorage.setItem("username", "");
      localStorage.setItem("password", "");
    }
    console.log(error);
  }
};

function Log_Sign_Button({ ButtonType }: { ButtonType: string }) {
  const setTodos = useSetRecoilState(Todos);
  const setUser = useSetRecoilState(User);

  useEffect(() => {
    if (localStorage.getItem("username") !== "") {
      onlyfetchTodos(setTodos, setUser);
    }
  }, []);

  let password = "";
  let username = "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{ButtonType}</Button>
      </DialogTrigger>
      <DialogContent
        id="logsignPOP"
        className="sm:max-w-[425px] bg-zinc-950 text-white"
      >
        <DialogHeader>
          <DialogTitle>
            {ButtonType == "Login" ? "Wellcome Back" : "Wellcome"}
          </DialogTitle>
          <DialogDescription className="flex justify-between items-center">
            <Log_Sign_ButtonContent ButtonType={ButtonType} />
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              className="placeholder:text-zinc-800 text-zinc-800 col-span-3"
              onChange={(e) => (username = e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              className="placeholder:text-zinc-800 text-zinc-800 col-span-3"
              onChange={(e) => (password = e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between items-center gap-2">
          <p>Click! and go to HOME:</p>
          <DialogClose asChild>
            <Button onClick={() => window.location.assign("/")}>Close</Button>
          </DialogClose>
          <Button
            onClick={() => {
              account(ButtonType, setUser, setTodos, password, username);
            }}
            type="submit"
          >
            {ButtonType}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const account = async (
  ButtonType: string,
  setUser: Function,
  setTodos: Function,
  password: string,
  username: string
) => {
  const url = BaseURL;
  const fUrs = ButtonType === "Login" ? `${url}/login` : `${url}/signup`;
  try {
    const response = await axios.post(fUrs, {
      password,
      username,
    });
    if (response.status === 200 || response.status === 201) {
      const user = response.data;
      setUser(user);
      localStorage.setItem("username", user.username);
      localStorage.setItem("password", user.password);
      setTodos(user.todos);
    } else {
      console.log(`Error while ${ButtonType}: ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export default Log_Sign_Button;
