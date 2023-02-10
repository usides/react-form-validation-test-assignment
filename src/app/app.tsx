import React, { useCallback, useState } from "react";
import st from "./app.module.scss";
import cities from "src/data/cities.json";
import { Form } from "src/components/form";
import { StatusViewer } from "src/components/status-viewer";
import { Select } from "src/components/select";
import { Line } from "src/components/line";
import { Input } from "src/components/input";
import { Checkbox } from "src/components/checkbox";
import { Button } from "src/components/button";
import { useErrors } from "./use-errors";
import { validatePassword, validatePasswordRepeat, validateEmail } from "./validators";
import { formatDate, prepareCities } from "src/utils";

const preparedCities = prepareCities(cities);

export const App: React.FC = () => {
  const [statusValue, setStatusValue] = useState("Прежде чем действовать, надо понять");
  const [selectedCity, setSelectedCity] = useState(preparedCities[0].city);
  const [password, setPassword] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [email, setEmail] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const { validate, errors } = useErrors({
    password: { value: password, validatorFunction: validatePassword },
    passwordRepeat: { value: passwordRepeat, validatorFunction: validatePasswordRepeat },
    email: { value: email, validatorFunction: validateEmail },
  } as const);

  const handleStatusChange = useCallback((value: string) => {
    setStatusValue(value);
  }, []);

  const handleSubmitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const isValid = validate();

      if (!isValid) {
        console.log("Failed to send: The form has errors");
      } else {
        setTimestamp(`последние изменения ${formatDate(new Date())}`);
        console.log(
          JSON.stringify(
            {
              status: statusValue,
              city: selectedCity,
              password,
              passwordRepeat,
              email,
              isAccepted,
            },
            null,
            2,
          ),
        );
      }
    },
    [email, isAccepted, password, passwordRepeat, selectedCity, statusValue, validate],
  );

  return (
    <div className={st["layout"]}>
      <Form onSubmit={handleSubmitForm}>
        <StatusViewer statusValue={statusValue} handleStatusChange={handleStatusChange} />

        <Select
          onChange={(e) => setSelectedCity(e.target.value)}
          label="Ваш город"
          options={preparedCities}
          labelKey="city"
          valueKey="city"
          value={selectedCity}
          wrapperStyle={{ marginTop: "32px" }}
        />

        <Line mt="32px" />

        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          label="Пароль"
          errorMessage={errors.password}
          hint="Ваш новый пароль должен содержать не менее 5 символов."
          wrapperStyle={{ marginTop: "32px" }}
        />
        <Input
          onChange={(e) => setPasswordRepeat(e.target.value)}
          value={passwordRepeat}
          type="password"
          label="Пароль еще раз"
          errorMessage={errors.passwordRepeat}
          hint="Повторите пароль, пожалуйста, это обезопасит вас с нами
          на случай ошибки."
          wrapperStyle={{ marginTop: "16px" }}
        />

        <Line mt="32px" />

        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          label="Электронная почта"
          errorMessage={errors.email}
          hint="Можно изменить адрес, указанный при регистрации. "
          wrapperStyle={{ marginTop: "32px" }}
        />
        <Checkbox
          onChange={() => setIsAccepted((prev) => !prev)}
          label="Я согласен"
          checked={isAccepted}
          checkBoxLabel="принимать актуальную информацию на емейл"
          wrapperStyle={{ marginTop: "40px" }}
        />
        <div className={st["submit-button-wrapper"]}>
          <Button type="submit">Изменить</Button>
          {timestamp && <p className={st["timestamp"]}>{timestamp}</p>}
        </div>
      </Form>
    </div>
  );
};
