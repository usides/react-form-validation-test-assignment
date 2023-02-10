import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import st from "./status-viewer.module.scss";
import { Button, ButtonVariant } from "src/components/button";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  statusValue: string;
  handleStatusChange: (value: string) => void;
  wrapperStyle?: React.CSSProperties;
}

export const StatusViewer: React.FC<Props> = ({ className, statusValue, handleStatusChange, wrapperStyle }) => {
  const [isChangeMode, setIsChangeMode] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onStatusChangeClick = useCallback(() => {
    setIsChangeMode(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    if (inputRef.current) {
      setIsChangeMode(false);
      handleStatusChange(inputRef.current.value);
    }
  }, [handleStatusChange]);

  useEffect(() => {
    if (isChangeMode) {
      inputRef.current?.focus();
    }
  }, [isChangeMode]);

  return (
    <div className={clsx(st["wrapper"], className)} style={{ ...wrapperStyle }}>
      <p className={st["heading-left"]}>Здравствуйте,&nbsp;</p>
      <div className={st["right-block"]}>
        <div className={st["right-block__top"]}>
          <p className={st["heading-right"]}>Человек №3596941</p>
          <Button onClick={onStatusChangeClick} variant={ButtonVariant.Link} style={{ alignSelf: "end" }}>
            {!isChangeMode && <span>Сменить&nbsp;статус</span>}
          </Button>
        </div>
        <div className={st["right-block__bottom"]}>
          {isChangeMode ? (
            <input
              onBlur={handleOnBlur}
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
