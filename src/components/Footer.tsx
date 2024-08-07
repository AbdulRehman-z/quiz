import { ReactNode } from "react";

type FooterProps = {
  children: ReactNode;
};

function Footer({ children }: FooterProps) {
  return (
    <div className="flex justify-between items-center mt-20">{children}</div>
  );
}

export default Footer;
