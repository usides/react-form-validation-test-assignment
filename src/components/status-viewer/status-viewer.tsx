import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import st from "./status-viewer.module.scss";
import { Button, ButtonVariant } from "src/components/button";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  statusValue: string;
  handleStatusChange: (value: string) => void;
}

export const StatusViewer: React.FC<Props> = ({
  className,
  statusValue,
  handleStatusChange,
}) => {
  const [isChangeMode, setIsChangeMode] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onStatusChangeClick = useCallback(() => {
    setIsChangeMode((prev) => !prev);

    if (isChangeMode && inputRef.current) {
      handleStatusChange(inputRef.current.value);
    }
  }, [handleStatusChange, isChangeMode]);

  useEffect(() => {
    if (isChangeMode) {
      inputRef.current?.focus();
    }
  }, [isChangeMode]);

  return (
    <div className={clsx(st["wrapper"], className)}>
      <p className={st["heading-left"]}>Здравствуйте,&nbsp;</p>
      <div className={st["right-block"]}>
        <div className={st["right-block__top"]}>
          <p className={st["heading-right"]}>Человек №3596941</p>
          <Button
            onClick={onStatusChangeClick}
            variant={ButtonVariant.Link}
            className={st["top__button"]}
          >
            {isChangeMode ? (
              <span>Сохранить&nbsp;статус</span>
            ) : (
              <span>Сменить&nbsp;статус</span>
            )}
          </Button>
        </div>
        <div className={st["right-block__bottom"]}>
          {isChangeMode ? (
            <input
              defaultValue={statusValue}
              ref={inputRef}
              className={st["bottom__input"]}
              type="text"
            />
          ) : (
            <p className={st["bottom__text-holder"]}>{statusValue}</p>
          )}
        </div>
      </div>
    </div>
  );
};