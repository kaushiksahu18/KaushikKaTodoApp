import Log_Sign_Button from "./Log_Sign_Button";

function Log_Sign_ButtonContent({ ButtonType }: { ButtonType: string }) {
  if (ButtonType === "Signin") {
    return (
      <>
        Already have an Account
        <Log_Sign_Button ButtonType="Login" />
      </>
    );
  } else {
    return (
      <>
        Create a new Account
        <Log_Sign_Button ButtonType="Signin" />
      </>
    );
  }
}

export default Log_Sign_ButtonContent;
