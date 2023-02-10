import React from "react";
import clsx from "clsx";
import st from "./checkbox.module.scss";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  checkBoxLabel?: string;
  wrapperStyle?: React.CSSProperties;
}

export const Checkbox: React.FC<Props> = ({ label, checkBoxLabel, wrapperStyle, ...rest }) => {
  return (
    <div className={clsx(st["wrapper"])} style={{ ...wrapperStyle }}>
      <label className={st["label"]} htmlFor={label}>
        {label}
      </label>

      <label className={st["label-container"]}>
        <input id={label} type="checkbox" className={clsx("hidden", st["checkbox"])} {...rest} />
        <div className={st["checkmark"]} />
        {checkBoxLabel}
      </label>
    </div>
  );
};
