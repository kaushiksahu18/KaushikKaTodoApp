import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/store/atoms/User";
import { Todos } from "@/store/atoms/Todos";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { BaseURL } from "@/env";

function InputTodo() { 
  const setTodos = useSetRecoilState(Todos);
  const user = useRecoilValue(User);
  let title = "";
  let description = "";

  return (
    <>
    {user.username && <div className="bg-zinc-600 w-full h-[10dvh] flex gap-4 fixed bottom-0 left-0 justify-between items-center px-4">
      <div className="flex gap-4 justify-between items-center">
        <Input
          id="title"
          placeholder="Title"
          className="placeholder:text-zinc-800 text-zinc-800 col-span-3"
          onChange={(e) => title = e.target.value}
        />
        <Input
          id="description"
          placeholder="Description"
          className="placeholder:text-zinc-800 text-zinc-800 col-span-3"
          onChange={(e) => description = e.target.value}
        />
      </div>
      <Button
        onClick={() => {
          addTodosToDb(setTodos, title, description, user);
        }}
        type="submit"
      >
        Add
      </Button>
    </div>}
    </>
  );
}

const addTodosToDb = async (
  setTodos: Function,
  title: string,
  description: string,
  user: Record<string, string>
) => {
  const url = BaseURL;
  try {
    const response = await fetch(`${url}/addTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...user,
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    if (response.ok) {
      const todos = await response.json();
      setTodos(todos);
    } else {
      console.log(`Error while adding todo ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export default InputTodo;
