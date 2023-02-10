import React from "react";
import clsx from "clsx";
import st from "./button.module.scss";

export enum ButtonVariant {
  Link = "link",
  Default = "default",
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button: React.FC<Props> = ({
  children,
  type = "button",
  variant = ButtonVariant.Default,
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        {
          [st["button_default"]]: variant === ButtonVariant.Default,
          [st["button_link"]]: variant === ButtonVariant.Link,
        },
        className,
      )}
      type={type}
      {...rest}>
      {children}
    </button>
  );
};
