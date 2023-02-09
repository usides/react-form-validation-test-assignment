import React, { useCallback, useState } from "react";
import st from "./app.module.scss";
import clsx from "clsx";
import { Form } from "src/components/form";
import { StatusViewer } from "src/components/status-viewer";

export const App: React.FC = () => {
  const [statusValue, setStatusValue] = useState(
    "Прежде чем действовать, надо понять"
  );

  const handleStatusChange = useCallback((value: string) => {
    setStatusValue(value);
  }, []);

  return (
    <div className={st["layout"]}>
      <Form>
        <StatusViewer
          statusValue={statusValue}
          handleStatusChange={handleStatusChange}
          className={clsx(st["test"])}
        />
      </Form>
    </div>
  );
};
