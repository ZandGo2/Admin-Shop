export const validate = (data) => {
  const { username, password, confirmPassword } = data;
  const error = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  if (username.length < 5)
    error.username = "username should upper than 5 letter";

  if (password.length < 8)
    error.password = "password should be upper than 8 letter";

  if (data.type == "signUp")
    if (confirmPassword !== password || confirmPassword.length < 8)
      error.confirmPassword = "The passwords are not the same";

  return error;
};
