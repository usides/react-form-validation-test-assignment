import React, { useCallback, useState } from "react";
import st from "./app.module.scss";
import clsx from "clsx";
import cities from "src/data/cities.json";
import { Form } from "src/components/form";
import { StatusViewer } from "src/components/status-viewer";
import { Select } from "src/components/select";
import { Line } from "src/components/line";
import { Input } from "src/components/input";

const preparedCities = prepareCities(cities);

export const App: React.FC = () => {
  const [statusValue, setStatusValue] = useState(
    "Прежде чем действовать, надо понять"
  );
  const [selectedCity, setSelectedCity] = useState(preparedCities[0].city);

  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    null | string
  >(null);

  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordRepeatErrorMessage, setPasswordRepeatErrorMessage] = useState<
    null | string
  >(null);

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<null | string>(
    null
  );

  const handleStatusChange = useCallback((value: string) => {
    setStatusValue(value);
  }, []);

  const handleCityChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setSelectedCity(value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setPassword(value);
    },
    []
  );

  const handlePasswordRepeatChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setPasswordRepeat(value);
    },
    []
  );

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setEmail(value);
    },
    []
  );

  const handleSubmitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const passwordError = validatePassword(password);
      const passwordRepeatError = validatePasswordRepeat(
        passwordRepeat,
        password
      );
      const emailError = validateEmail(email);

      if (passwordError !== false) {
        setPasswordErrorMessage(passwordError);
      } else {
        setPasswordErrorMessage(null);
      }

      if (passwordRepeatError !== false) {
        setPasswordRepeatErrorMessage(passwordRepeatError);
      } else {
        setPasswordRepeatErrorMessage(null);
      }

      if (emailError !== false) {
        setEmailErrorMessage(emailError);
      } else {
        setEmailErrorMessage(null);
      }

      if (passwordError || passwordRepeatError || emailError) {
        console.log("Fail: The form has errors");
      } else {
        console.log("submit");
      }
    },
    [email, password, passwordRepeat]
  );

  return (
    <div className={st["layout"]}>
      <Form onSubmit={handleSubmitForm}>
        <StatusViewer
          statusValue={statusValue}
          handleStatusChange={handleStatusChange}
        />
        <Select
          label="Ваш город"
          options={preparedCities}
          labelKey="city"
          valueKey="city"
          value={selectedCity}
          onChange={handleCityChange}
          wrapperStyle={{ marginTop: "32px" }}
        />
        <Line mt="32px" />
        <Input
          onChange={handlePasswordChange}
          value={password}
          type="password"
          label="Пароль"
          errorMessage={passwordErrorMessage}
          hint="Ваш новый пароль должен содержать не менее 5 символов."
          wrapperStyle={{ marginTop: "32px" }}
        />
        <Input
          onChange={handlePasswordRepeatChange}
          value={passwordRepeat}
          type="password"
          label="Пароль еще раз"
          errorMessage={passwordRepeatErrorMessage}
          hint="Повторите пароль, пожалуйста, это обезопасит вас с нами
          на случай ошибки."
          wrapperStyle={{ marginTop: "16px" }}
        />
        <Line mt="32px" />
        <Input
          onChange={handleEmailChange}
          value={email}
          type="email"
          label="Электронная почта"
          errorMessage={emailErrorMessage}
          hint="Можно изменить адрес, указанный при регистрации. "
          wrapperStyle={{ marginTop: "32px" }}
        />
        <button>submit</button>
      </Form>
    </div>
  );
};

function prepareCities(cities: { city: string; population: string }[]) {
  const filteredCities = cities
    .map((elem) => ({ ...elem, population: Number(elem.population) }))
    .filter(
      (elem: { city: string; population: number }) =>
        Number(elem.population) > 50000
    )
    .sort((a, b) => a.city.localeCompare(b.city));

  const populations = filteredCities.map((elem) => elem.population);

  const biggestPopulationCityInx = filteredCities.findIndex(
    (elem) => elem.population === Math.max(...populations)
  );

  const biggestPopulationCity = filteredCities.splice(
    biggestPopulationCityInx,
    1
  );
  filteredCities.splice(0, 0, ...biggestPopulationCity);
  return filteredCities;
}

function validatePassword(password: string) {
  if (password === "") return "Укажите пароль";
  if (password.length < 5) return "Используйте не менее 5 символов";
  return false;
}

function validatePasswordRepeat(passwordRepeat: string, password: string) {
  if (passwordRepeat === "") return "Укажите пароль";
  if (passwordRepeat !== password) return "Пароли не совпадают";
  return false;
}

function validateEmail(email: string) {
  if (email === "") return "Укажите E-mail";

  const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email.match(validEmailRegex)) return "Неверный E-mail";

  return false;
}
