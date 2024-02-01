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
  const todos: Object[] = useRecoilValue(Todos);
  const username: string = useRecoilValue(getUsername);
  const mustStyle = `rounded-md relative top-[10.1dvh] lg:top-[15dvh] h-[79.5dvh] lg:h-[75dvh] w-[100dvw]`;
  return (
    <>
      {todos.length === 0 ? (
        <div className={mustStyle}>
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
        <div className={mustStyle}>
          <ScrollArea className="h-full w-[100dvw]">
            <Table>
              <TableHeader>
                <TableRow id="my-grid-col-sm" className="grid my-grid-col pt-4 lg:pt-2">
                  <TableHead className="self-center">Title</TableHead>
                  <TableHead className="self-center">Description</TableHead>
                  <TableHead className="self-center">Done!?</TableHead>
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
