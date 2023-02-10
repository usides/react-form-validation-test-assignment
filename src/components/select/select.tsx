import React from "react";
import clsx from "clsx";
import st from "./select.module.scss";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Record<string, string | number>[];
  labelKey: string;
  valueKey: string;
  wrapperStyle?: React.CSSProperties;
}

export const Select: React.FC<Props> = ({
  label,
  options = [],
  labelKey,
  valueKey,
  wrapperStyle,
  ...rest
}) => {
  return (
    <div className={clsx(st["wrapper"])} style={{ ...wrapperStyle }}>
      <label className={st["label"]} htmlFor={label}>
        {label}
      </label>
      <div className={st["select-box"]}>
        <select className={st["select-element"]} id={label} {...rest}>
          {options.map((option) => (
            <option key={option[valueKey]} value={option[valueKey]}>
              {option[labelKey]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
