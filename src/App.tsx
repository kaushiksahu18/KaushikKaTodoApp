import InputTodo from "./MyComponents/InputTodo";
import Topbar from "./MyComponents/Topbar";
import Hero from "./MyComponents/Hero";
import {
  RecoilRoot
} from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
    <div className="h-[100dvh] w-[100dvw] overflow-x-hidden overflow-y-auto bg-zinc-800">
      <Topbar />
      <Hero />
      <InputTodo />
    </div>
    </RecoilRoot>
  );
}
