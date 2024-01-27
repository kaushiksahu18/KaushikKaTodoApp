import InputTodo from "./MyComponents/InputTodo";
import Topbar from "./MyComponents/Topbar";
import Hero from "./MyComponents/Hero";
import {
  RecoilRoot
} from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
    <div className="h-[100vh] w-[100vw] overflow-hidden bg-zinc-800">
      <Topbar />
      <Hero />
      <InputTodo />
    </div>
    </RecoilRoot>
  );
}
