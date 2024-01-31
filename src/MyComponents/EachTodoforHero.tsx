import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { Todos } from "@/store/atoms/Todos";
import { BaseURL } from "@/env";

function EachTodoforHero() {
  const [todos, setTodos] = useRecoilState(Todos);

  return (
    <>
      {todos.map(
        (todo: { id: number|string|any; title: string; description: string }) => (
          <TableRow className="w-[100dvw]">
            <TableCell className="text-white overflow-hidden w-[30dvw] h-auto">{todo.title}</TableCell>
            <TableCell className="text-white overflow-hidden w-[30dvw] h-auto">{todo.description}</TableCell>
            <TableCell>
              <Button
                id={todo.id}
                onClick={(e) => {
                  deleteTodonyId(e.currentTarget.id, setTodos);
                }}
                className="text-white"
              >
                Done
              </Button>
            </TableCell>
          </TableRow>
        )
      )}
    </>
  );
}

const deleteTodonyId = async (id:string, setTodos: Function) => {
  const url = BaseURL;
  try {
    const response = await fetch(`${url}/todos/${Number(id)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        username:localStorage.getItem("username"),
        password:localStorage.getItem("password"),
      },
    });
    if (response.ok) {
      const todos = await response.json();
      setTodos(todos);
    } else {
      console.log(`Error while Deleting todo: ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export default EachTodoforHero;
