import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todos } from "@/store/atoms/Todos";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BaseURL } from "@/env";
import { getUsername } from "@/store/selectors/username";

function InputTodo() {
  const setTodos = useSetRecoilState(Todos);
  const username = useRecoilValue(getUsername);
  let title = "";
  let description = "";

  return (
    <>
      {username && (
        <div className="z-[99] bg-zinc-600 w-full h-[10dvh] flex gap-4 fixed bottom-0 left-0 justify-between items-center px-4">
          <div className="flex gap-4 justify-between items-center">
            <Input
              required
              id="title"
              placeholder="Title"
              className="placeholder:text-zinc-800 text-zinc-800 col-span-3"
              onChange={(e) => (title = e.target.value)}
            />
            <Input
              required
              id="description"
              placeholder="Description"
              className="placeholder:text-zinc-800 text-zinc-800 col-span-3"
              onChange={(e) => (description = e.target.value)}
            />
          </div>
          <Button
            onClick={() => {
              addTodosToDb(setTodos, title, description);
              let titleInput = document.getElementById(
                "title"
              ) as HTMLInputElement;
              let descriptionInput = document.getElementById(
                "description"
              ) as HTMLInputElement;

              // Reset input values
              if (titleInput && descriptionInput) {
                titleInput.value = "";
                descriptionInput.value = "";
              }
            }}
            type="submit"
          >
            Add
          </Button>
        </div>
      )}
    </>
  );
}

const addTodosToDb = async (
  setTodos: Function,
  title: string,
  description: string
) => {
  const url = BaseURL;
  try {
    const response = await fetch(`${url}/addTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
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
