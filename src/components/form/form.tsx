import React from "react";
import st from "./form.module.scss";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {}

export const Form: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <form className={st["form"]} {...rest}>
      {children}
    </form>
  );
};
