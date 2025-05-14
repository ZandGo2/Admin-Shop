import { useState } from "react";
import deleteIcon from "../asset/images/trash.png";
import editIcon from "../asset/images/edit.png";
import styles from "./Dashboard.module.css";
import DeleteProductModal from "./DeleteProductModal";
import MakeProduct from "./MakeProduct";

const Product = ({ data: { id, name, price, quantity } }) => {
  const [deleteItem, setDeleteItem] = useState(false);
  const [make, setMake] = useState(false);
  const open = (state) => state(true);
  const close = (state) => state(false);

  return (
    <>
      <div className={styles.ProductContainer}>
        <div className={styles.ProductSpanDiv}>
          <span>{name}</span>
          <span>{quantity}</span>
          <span>{price}</span>
          <span>{id}</span>
        </div>
        <div className={styles.ProductBtn}>
          <button>
            <img
              src={deleteIcon}
              alt="deleteIcon"
              onClick={() => open(setDeleteItem)}
            />
          </button>
          <button>
            <img src={editIcon} alt="editIcon" onClick={() => setMake(true)} />
          </button>
        </div>
      </div>
      {deleteItem && (
        <DeleteProductModal
          close={close}
          id={id}
          setDeleteItem={setDeleteItem}
        />
      )}
      {make && (
        <MakeProduct
          setMake={setMake}
          type="EditProduct"
          data={{ id, name, price, quantity }}
        />
      )}
    </>
  );
};

export default Product;
