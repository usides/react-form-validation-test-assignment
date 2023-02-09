import React from "react";
import st from "./form.module.scss";

export const Form = ({ children }: React.PropsWithChildren) => {
  return <form className={st["form"]}>{children}</form>;
};
