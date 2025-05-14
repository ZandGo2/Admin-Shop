export const validate = (data) => {
  if (data.type == "makeProduct") {
    const { name, price, quantity } = data;
    const error = {
      name: "",
      price: "",
      quantity: "",
    };

    if (name.length < 3) error.name = "name should upper than 3 letter";

    if (price.length < 1) error.price = "price should upper than 1 dolor $";

    if (quantity.length < 1)
      error.quantity = "quantity should upper than 1 product";

    return error;
  }

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
