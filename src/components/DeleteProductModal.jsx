import deleteIcon from "../asset/images/Close.png";
import styles from "./modal.module.css";
import { DeleteProductApi } from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "../utils/notify";

const DeleteProductModal = ({ close, id, setDeleteItem }) => {
  const queryClient = useQueryClient();

  const mutationFn = async (id) => {
    DeleteProductApi(id);
  };

  const { mutate } = useMutation({ mutationFn });

  const clickHandler = () => {
    mutate(id, {
      onSuccess: (data) => {
        notify("success", "Deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["ListProduct"] });
        setTimeout(() => {
          close(setDeleteItem);
        }, 1000);
      },
      onError: (error) => {
        notify("error", error.response?.data.message);
        console.log(error);
      },
    });
  };

  return (
    <div className={styles.blurDiv}>
      <div className={styles.containerDelete}>
        <img src={deleteIcon} alt="deleteIcon" />
        <div className={styles.containerDeleteDivBtn}>
          <p>Are you sure about deleting the product ?</p>
          <button className={styles.btnDeleteCancel} onClick={clickHandler}>
            Delete
          </button>
          <button
            className={styles.btnDelete}
            onClick={() => close(setDeleteItem)}
          >
            Cancellation
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
