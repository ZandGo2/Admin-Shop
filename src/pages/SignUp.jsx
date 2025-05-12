import { useReducer } from "react";
import { Link, useNavigate } from "react-router";
import { validate } from "../utils/validate";
import { signUPApi } from "../services/api";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils/notify";
import logo from "../asset/images/Union.png";
import styles from "../components/SignUp.module.css";

const initialState = {
  data: {
    username: "",
    password: "",
    confirmPassword: "",
  },
  touch: {
    username: false,
    password: false,
    confirmPassword: false,
  },
  validate: {
    username: "",
    password: "",
    confirmPassword: "",
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

const SignUp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password, confirmPassword } = state.data;

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch({ type: "FILLING", payload: { name, value } });
  };

  const validateData = () => {
    return validate({
      type: "signUp",
      username,
      password,
      confirmPassword,
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
        const data = await signUPApi({ username, password });
        const status = await data.status;
        const messageSuccess = await data.data.message;
        if (status == 201) {
          notify("success", messageSuccess);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
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
        <span>Sign Up</span>
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
          <input
            value={confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          <div className={styles.divError}>
            {state.touch.confirmPassword && state.validate.confirmPassword && (
              <span className={styles.error}>
                {state.validate.confirmPassword}
              </span>
            )}
          </div>
          <div className={styles.btnDiv}>
            <button>Sign Up</button>
            <Link to="/login">Do you have Account ?</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
