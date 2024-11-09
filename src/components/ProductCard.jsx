import { useState } from "react";
import trashIcon from "../assets/trash.png";
import editIcon from "../assets/edit.jpg";
import { useDeleteProduct } from "../services/mutaions.js";
import styles from "./ProductCard.module.css";
import EditProductForm from "./EditProductForm";
import DeleteProductModal from "./DeleteProductModal";

function ProductCard({ product }) {
  // console.log(product);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  return (
    <>
      <tr>
        <td>{product?.name}</td>
        <td>{product?.quantity}</td>
        <td>{product?.price}</td>
        <td>{product?.id}</td>
        <td>
          <button
            className={styles.deletebtn}
            onClick={() => setIsDeleteModal(true)}
          >
            <img
              src={trashIcon}
              alt=""
              style={{ width: "35px", heigth: "35px" }}
            />
          </button>
          <button className={styles.editBtn} onClick={() => setIsEditModal(true)}>
            <img src={editIcon} style={{ width: "35px", height: "35px" }} />
          </button>
        </td>
      </tr>

      {isDeleteModal && (
        <DeleteProductModal
          product={product}
          isDeleteModal={isDeleteModal}
          setIsDeleteModal={setIsDeleteModal}
        />
      )}

      {isEditModal && (
        <tr>
          <td>
            <EditProductForm
              product={product}
              isEditModal={isEditModal}
              setIsEditModal={setIsEditModal}
            />
          </td>
        </tr>
      )}
    </>
  );
}

export default ProductCard;
