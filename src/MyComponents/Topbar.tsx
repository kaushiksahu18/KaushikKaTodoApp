import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Log_Sign_Button from "./Log_Sign_Button";
import { useRecoilState, useSetRecoilState } from "recoil";
import { User } from "@/store/atoms/User";
import { Todos } from "@/store/atoms/Todos";

function Topbar() {
  const [user, setUser] = useRecoilState(User);
  const setTodos = useSetRecoilState(Todos);

  return (
    <div className="bg-zinc-600 w-full h-[10dvh] flex fixed top-0 left-0 justify-between items-center px-2 py-2">
      <div className="flex justify-between items-center gap-4">
        <Avatar>
          <AvatarImage src="https://img.icons8.com/papercut/60/bookmark.png" />
          <AvatarFallback>LOGO</AvatarFallback>
        </Avatar>
        <h1 className="text-white lg:text-2xl">BANK the TodoApp</h1>
      </div>
      {user.username ? (
        <div className="flex gap-4 justify-between items-center">
          <div className="flex flex-col-reverse gap-2 items-center justify-center my-4">
            <Badge className="max-w-32 overflow-hidden" variant="default">
              {user.username.split("@")[0]}
            </Badge>
            <Avatar>
              <AvatarImage
                className="bg-white bg-cover bg-center"
                src="https://img.icons8.com/ios/50/gender-neutral-user--v1.png"
              />
              <AvatarFallback>LOGO</AvatarFallback>
            </Avatar>
          </div>
          <Button
            onClick={() => {
              setUser({ username: "", password: "" });
              setTodos([]);
            }}
          >
            LogOut
          </Button>
        </div>
      ) : (
        <div className="flex gap-8 justify-between items-center">
          <Log_Sign_Button ButtonType="Login" />
          <Log_Sign_Button ButtonType="Signin" />
        </div>
      )}
    </div>
  );
}

export default Topbar;
