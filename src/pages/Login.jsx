import { useReducer } from "react";
import { Link, useNavigate } from "react-router";
import { validate } from "../utils/validate";
import { loginApi } from "../services/api";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils/notify";
import logo from "../asset/images/Union.png";
import styles from "../components/SignUp.module.css";

const initialState = {
  data: {
    username: "",
    password: "",
  },
  touch: {
    username: false,
    password: false,
  },
  validate: {
    username: "",
    password: "",
  },
};

const reducer = (state, action) => {
  const { name, value } = action.payload;
  switch (action.type) {
    case "FILLING":
      return {
        ...state,
        data: { ...state.data, [name]: value },
        validate: { ...state.validate, [name]: true },
      };
    case "VALIDATE":
      return {
        ...state,
        touch: { ...state.touch, [name]: true },
        validate: value,
      };
    case "SUBMITFALSE":
      return {
        ...state,
        touch: { username: true, password: true, confirmPassword: true },
        validate: value,
      };
    default:
      throw new Error("Type is not a true!");
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password } = state.data;

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch({ type: "FILLING", payload: { name, value } });
  };

  const validateData = () => {
    return validate({
      username,
      password,
    });
  };

  const focusHandler = (e) => {
    const name = e.target.name;
    const value = validateData();
    dispatch({ type: "VALIDATE", payload: { name, value } });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      username &&
      password &&
      !state.validate.username &&
      !state.validate.password
    ) {
      try {
        //
        const data = await loginApi({ username, password });
        console.log(data);
        const status = await data.status;
        const token = await data.data.token;
        localStorage.setItem("token", token);
        if (status == 200) {
          notify("success", "Login successfully!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        const status = await error.status;
        const messageError = await error.response.data.message;
        if (status == 400) {
          notify("error", messageError);
        }
      }
    } else {
      notify("error", "Invalid data !");
      const value = validateData();
      dispatch({ type: "SUBMITFALSE", payload: { value } });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgDiv}>
        <img src={logo} alt="logo" />
        <span>Login</span>
      </div>
      <div className={styles.formDiv}>
        <form onSubmit={submitHandler}>
          <input
            value={username}
            type="text"
            name="username"
            placeholder="Username"
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          <div className={styles.divError}>
            {state.touch.username && state.validate.username && (
              <span className={styles.error}>{state.validate.username}</span>
            )}
          </div>
          <input
            value={password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          <div className={styles.divError}>
            {state.touch.password && state.validate.password && (
              <span className={styles.error}>{state.validate.password}</span>
            )}
          </div>
          <div className={styles.btnDiv}>
            <button>Login</button>
            <Link to="/sign-up">Do you want make Account ?</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
