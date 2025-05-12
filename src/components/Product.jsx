import React from "react";
import deleteIcon from "../asset/images/trash.png";
import editIcon from "../asset/images/edit.png";
import styles from "./Dashbord.module.css";

const Product = () => {
  return (
    <div className={styles.ProductContainer}>
      <div className={styles.ProductSpanDiv}>
        <span>T-shirt</span>
        <span>293</span>
        <span>90 million</span>
        <span>90uf9g9h7895467g974</span>
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
