import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRecoilValue, useRecoilState } from "recoil";
import { Todos } from "@/store/atoms/Todos";
import { BaseURL } from "@/env";
import { User } from "@/store/atoms/User";

function EachTodoforHero() {
  const [todos, setTodos] = useRecoilState(Todos);
  const user = useRecoilValue(User);

  return (
    <>
      {todos.map(
        (todo: { id: number | any; title: string; description: string }) => (
          <TableRow>
            <TableCell className="text-white">{todo.title}</TableCell>
            <TableCell className="text-white">{todo.description}</TableCell>
            <TableCell>
              <Button
                id={todo.id}
                onClick={(e) => {
                  deleteTodonyId(e.currentTarget.id, setTodos, user);
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

const deleteTodonyId = async (id:string, setTodos: Function, user: Record<string, string>) => {
  const url = BaseURL;
  try {
    const response = await fetch(`${url}/todos/${Number(id)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...user,
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
