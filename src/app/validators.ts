const validatePassword = (password: string) => {
  if (password === "") return "Укажите пароль";
  if (password.length < 5) return "Используйте не менее 5 символов";

  return false;
};

const validatePasswordRepeat = (passwordRepeat: string, password: string = "") => {
  if (passwordRepeat === "") return "Укажите пароль";
  if (passwordRepeat !== password) return "Пароли не совпадают";

  return false;
};

const validateEmail = (email: string) => {
  if (email === "") return "Укажите E-mail";

  const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email.match(validEmailRegex)) return "Неверный E-mail";

  return false;
};

export { validatePassword, validatePasswordRepeat, validateEmail };
