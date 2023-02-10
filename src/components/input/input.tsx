import React from "react";
import clsx from "clsx";
import st from "./input.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  errorMessage?: string | null;
  wrapperStyle?: React.CSSProperties;
}

export const Input: React.FC<Props> = ({ label, hint, errorMessage, wrapperStyle, type = "text", ...rest }) => {
  return (
    <div className={clsx(st["wrapper"])} style={{ ...wrapperStyle }}>
      <label className={st["label"]} htmlFor={label}>
        {label}
      </label>
      <div className={st["right-block"]}>
        <div className={st["input-wrapper"]}>
          <input
            id={label}
            className={clsx(st["input-element"], {
              [st["input-element_error"]]: errorMessage,
            })}
            type={type}
            {...rest}
          />
          {errorMessage && <p className={st["error-message"]}>{errorMessage}</p>}
        </div>
        <p className={st["hint"]}>{hint}</p>
      </div>
    </div>
  );
};
