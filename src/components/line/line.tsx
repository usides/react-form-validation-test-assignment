import React from "react";
import st from "./line.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  mt?: string;
  mb?: string;
}

export const Line: React.FC<Props> = ({ mt, mb, style, ...rest }) => {
  return (
    <div
      className={st["line"]}
      style={{ marginBottom: mb, marginTop: mt, ...style }}
      {...rest}
    />
  );
};
