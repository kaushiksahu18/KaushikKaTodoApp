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
        (todo: {
          _id: number | string | any;
          title: string;
          description: string;
        }) => (
          <TableRow key={todo._id} id="my-grid-col-sm" className="w-[100dvw] overflow-y-auto overflow-x-hidden grid my-grid-col">
            <TableCell className="text-white max-w[40%]">
              <p className="overflow-wrap-bw">{todo.title}</p>
            </TableCell>
            <TableCell className="text-white max-w[40%]">
              <p className="overflow-wrap-bw">{todo.description}</p>
            </TableCell>
            <TableCell>
              <Button
                id={todo._id}
                onClick={(e) => {
                  deleteTodoById(e.currentTarget.id, setTodos);
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

const deleteTodoById = async (id: string, setTodos: Function) => {
  const url = BaseURL;
  try {
    const response = await fetch(`${url}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
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
