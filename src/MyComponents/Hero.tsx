import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EachTodoforHero from "./EachTodoforHero";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRecoilValue } from "recoil";
import "./styles.css";
import { Todos } from "@/store/atoms/Todos";
import { getUsername } from "@/store/selectors/username";

function Hero() {
  const todos = useRecoilValue(Todos);
  const username = useRecoilValue(getUsername);
  let a:string;
  if (username === "") {
    a = "100dvh";
  } else {
    a = "0px";
  }
  const must = `rounded-md border relative top-[10.1dvh] h-[max(${a},79.5dvh)] w-full`;
  return (
    <>
      {todos.length === 0 ? (
        <div className={must}>
          <div className="selection:bg-zinc-900 tracking-[-0.5vw] text-white text-[6dvw] absolute left-12">
            <h1>Kaushik</h1>
          </div>
          <div className="selection:bg-zinc-900 tracking-[-0.5vw] text-white text-[6dvw] absolute right-12 top-20">
            <h1>Ka</h1>
          </div>
          <div className="selection:bg-zinc-900 tracking-[-0.5vw] text-white text-[6dvw] absolute left-32 top-60">
            <h1>Todo</h1>
          </div>
          <div className="selection:bg-zinc-900 tracking-[-0.5vw] text-white text-[6dvw] absolute right-60 top-[50dvh]">
            <h1>App</h1>
          </div>
        </div>
      ) : (
        <div className="rounded-md border relative top-[11dvh]">
          <ScrollArea className="h-[79.5dvh] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Done!?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <EachTodoforHero />
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}
    </>
  );
}

export default Hero;
