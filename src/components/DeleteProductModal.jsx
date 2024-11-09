import React from "react";
import { useDeleteProduct } from "../services/mutaions";
import styles from "./DeleteProductModal.module.css";

function DeleteProductModal({ product, isDeleteModal, setIsDeleteModal }) {
  const { mutate } = useDeleteProduct();

  const deleteHandler = (id) => {
    const data = {
      ids: [id],
    };
    console.log(data);
    mutate(
      { data },
      {
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error, error.message),
      }
    );
  };
  return (
    <div
      className={styles.modalOverlay}
      onClick={() => setIsDeleteModal(false)}
    >
      <div className={styles.modalContent}>
        <h3>آیا از حذف محصول {product.name} اطمینان دارید؟</h3>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteHandler(product?.id)}
          >
            حذف
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setIsDeleteModal(false)}
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
