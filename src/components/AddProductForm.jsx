import { useState } from "react";
import { useCreateProduct } from "../services/mutaions";
import styles from "./AddProductForm.module.css";

function AddProductForm({ setIsAddModal }) {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });
  const { mutate } = useCreateProduct();
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const addHandler = (event) => {
    event.preventDefault();

    const { name, price } = form;
    if (!name || !price) return;
    mutate(form, {
      onSuccess: (data) => {
        console.log(data);
        setIsAddModal(false);
      },
      onError: (error) => console.log(error),
    });
  };
  return (
    <div className={styles.modalOverlay} onClick={() => setIsAddModal(false)}>
      <form className={styles.modalContent} onSubmit={addHandler} onClick={(e) => e.stopPropagation()}>
        <h3>افزودن محصول</h3>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={form.name}
          onChange={changeHandler}
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          value={form.price}
          onChange={changeHandler}
        />
        <input
          type="number"
          placeholder="quantity"
          name="quantity"
          value={form.quantity}
          onChange={changeHandler}
        />
        <div className={styles.buttonsContainer}>
          <button className={styles.addBtn} type="submit">
            افزودن محصول
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setIsAddModal(false)}
          >
            انصراف{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;
