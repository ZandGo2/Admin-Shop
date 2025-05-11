import { useReducer } from "react";
import { Link, useNavigate } from "react-router";
import { validate } from "../utils/validate";
import { signUPApi } from "../services/api";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils/notify";

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
          }, 3000);
        }
      } catch (error) {
        const status = await error.status;
        const messageError = await error.response.data.message;
        if (status == 400) {
          notify("error", messageError);
        } else {
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
    <div>
      <div>
        <div>
          <img />
          <span>Sign Up</span>
        </div>
        <div>
          <form onSubmit={submitHandler}>
            <input
              className=""
              value={username}
              type="text"
              name="username"
              placeholder="Username"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            {state.touch.username && state.validate.username && (
              <span>{state.validate.username}</span>
            )}
            <input
              className=""
              value={password}
              type="password"
              name="password"
              placeholder="Password"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            {state.touch.password && state.validate.password && (
              <span>{state.validate.password}</span>
            )}
            <input
              className=""
              value={confirmPassword}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            {state.touch.confirmPassword && state.validate.confirmPassword && (
              <span>{state.validate.confirmPassword}</span>
            )}
            <div>
              <button>Sign Up</button>
              <Link to="/login">Do you have Account ?</Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
