import React from "react";
import deleteIcon from "../asset/images/trash.png";
import editIcon from "../asset/images/edit.png";
import styles from "./Dashboard.module.css";

const Product = ({ data: { id, name, price, quantity } }) => {
  return (
    <div className={styles.ProductContainer}>
      <div className={styles.ProductSpanDiv}>
        <span>{name}</span>
        <span>{quantity}</span>
        <span>{price}</span>
        <span>{id}</span>
      </div>
      <div className={styles.ProductBtn}>
        <button>
          <img src={deleteIcon} alt="deleteIcon" />
        </button>
        <button>
          <img src={editIcon} alt="editIcon" />
        </button>
      </div>
    </div>
  );
};

export default Product;
