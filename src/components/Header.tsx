import React from "react";
import { ReactComponent as Logo } from "../svgs/logo.svg";

type HeaderProps = {
  text: string;
};

const Header = ({ text }: HeaderProps) => (
  <>
    <Logo />
    <div>{text}</div>
  </>
);

export default Header;
