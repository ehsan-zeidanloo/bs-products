import { useState, useEffect } from "react";
import { useEditProduct } from "../services/mutaions.js";
import styles from "./EditProductForm.module.css";

function EditProductForm({ product, isEditModal, setIsEditModal }) {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });
  const { mutate } = useEditProduct(product.id);
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });
    }
  }, [product]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const editHandler = (event) => {
    event.preventDefault();
    console.log("Submitting edit:", form);
    mutate(form, {
      onSuccess: (data) => {
        console.log("Edit successful:", data);
        setIsEditModal(false);
      },
      onError: (error) => console.log("Edit error:", error),
    });
  };
  return (
    <div className={styles.modalOverlay} onClick={() => setIsEditModal(false)}>
      <form
        onSubmit={editHandler}
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={() => setIsEditModal(false)}>
          ×
        </button>
        <h2>ویرایش محصول</h2>
        <input
          type="text"
          placeholder="نام"
          name="name"
          value={form.name}
          onChange={changeHandler}
        />
        <input
          type="number"
          placeholder="قیمت"
          name="price"
          value={form.price}
          onChange={changeHandler}
        />
        <input
          type="number"
          placeholder="تعداد موجودی"
          name="quantity"
          value={form.quantity}
          onChange={changeHandler}
        />
        <div className={styles.buttonsContainer}>
          <button type="submit" className={styles.editBtn}>
            ویرایش محصول
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductForm;
