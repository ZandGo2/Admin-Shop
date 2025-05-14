import { useEffect, useReducer } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatedProductApi, UpdateProductApi } from "../services/api";
import { validate } from "../utils/validate";
import { notify } from "../utils/notify";
import { ToastContainer } from "react-toastify";
import styles from "./modal.module.css";

const initialState = {
  data: {
    name: "",
    price: "",
    quantity: "",
  },
  touch: {
    name: false,
    price: false,
    quantity: false,
  },
  validate: {
    name: "",
    price: "",
    quantity: "",
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
    case "MOUNTING":
      return {
        ...state,
        data: value,
      };
    default:
      throw new Error("Type is not a true!");
  }
};

const MakeProduct = ({ setMake, type, data }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, price, quantity } = state.data;
  const queryClient = useQueryClient();

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: "FILLING", payload: { name, value } });
  };

  const validateData = () => {
    return validate({
      name,
      price,
      quantity,
      type: "makeProduct",
    });
  };

  const focusHandler = (e) => {
    const name = e.target.name;
    const value = validateData();
    dispatch({ type: "VALIDATE", payload: { name, value } });
  };

  useEffect(() => {
    if (type == "EditProduct") {
      const value = {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
      };
      dispatch({ type: "MOUNTING", payload: { value } });
    }
  }, []);

  const mutationFn = async (productData) => {
    const id = data.id;
    if (type == "EditProduct") UpdateProductApi(productData, id);
    if (type == "MakeProduct") CreatedProductApi(productData);
  };

  const { mutate } = useMutation({ mutationFn });

  const clickHandler = (e) => {
    e.preventDefault();
    if (
      name &&
      price &&
      quantity &&
      !state.validate.name &&
      !state.validate.price &&
      !state.validate.quantity
    ) {
      mutate(
        { name, price, quantity },
        {
          onSuccess: (data) => {
            let message =
              type == "MakeProduct"
                ? "Product created successfully"
                : "Product update successfully";
            notify("success", message);
            queryClient.invalidateQueries({ queryKey: ["ListProduct"] });
            setTimeout(() => {
              setMake(false);
            }, 1000);
          },
          onError: (error) => {
            notify("error", error.response?.data.message);
            if (error.status == 404) {
              notify("error", "Product Not Found");
            }
          },
        }
      );
    } else {
      notify("error", "Invalid data !");
      const value = validateData();
      dispatch({ type: "SUBMITFALSE", payload: { value } });
    }
  };

  return (
    <div className={styles.blurDiv}>
      <div className={styles.containerMakeProduct}>
        <h3>Product creation</h3>
        <div>
          <form>
            <div className={styles.divInputMakeProduct}>
              <label>Product name</label>
              <input
                type="text"
                value={name}
                name="name"
                onChange={changeHandler}
                onFocus={focusHandler}
                placeholder="Product name"
              />
              {state.touch.name && state.validate.name && (
                <span className={styles.error}>{state.validate.name}</span>
              )}
            </div>
            <div className={styles.divInputMakeProduct}>
              <label>Inventory number</label>
              <input
                type="number"
                value={quantity}
                name="quantity"
                onChange={changeHandler}
                onFocus={focusHandler}
                placeholder="Inventory number"
              />
              {state.touch.quantity && state.validate.quantity && (
                <span className={styles.error}>{state.validate.quantity}</span>
              )}
            </div>
            <div className={styles.divInputMakeProduct}>
              <label>Price</label>
              <input
                type="number"
                min={0}
                value={price}
                name="price"
                onChange={changeHandler}
                onFocus={focusHandler}
                placeholder="Price"
              />
              {state.touch.price && state.validate.price && (
                <span className={styles.error}>{state.validate.price}</span>
              )}
            </div>
          </form>
        </div>
        <div className={styles.btnCreateDiv}>
          <button className={styles.btnDelete} onClick={() => setMake(false)}>
            Cancellation
          </button>
          <button className={styles.btnCreate} onClick={clickHandler}>
            {type == "MakeProduct" ? "Create" : "Update"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MakeProduct;
