import deleteIcon from "../asset/images/Close.png";
import styles from "./modal.module.css";

const DeleteProductModal = ({ close, id, setDeleteItem }) => {
  return (
    <div className={styles.blurDiv}>
      <div className={styles.containerDelete}>
        <img src={deleteIcon} alt="deleteIcon" />
        <div className={styles.containerDeleteDivBtn}>
          <p>Are you sure about deleting the product ?</p>
          <button className={styles.btnDeleteCancel}>Delete</button>
          <button
            className={styles.btnDelete}
            onClick={() => close(setDeleteItem)}
          >
            Cancellation{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
