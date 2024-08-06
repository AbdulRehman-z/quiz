import { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

function Main({ children }: MainProps) {
  return <div>{children}</div>;
}

export default Main;
