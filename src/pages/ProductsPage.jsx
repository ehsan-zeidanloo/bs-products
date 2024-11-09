import React from "react";
import { useState } from "react";
import { useGetAllProducts } from "../services/queries";
import { RotatingLines } from "react-loader-spinner";
import ProductCard from "./../components/ProductCard";
import pmanagement from "../assets/setting-3.jpg";
import styles from "./ProductsPage.module.css";
import AddProductForm from "./../components/AddProductForm";
import SearchBar from "./../components/SearchBar";

function ProductsPage() {
  const [serachTerm, setSearchTerm] = useState("");

  const [isAddModal, setIsAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const { data, error, isPending } = useGetAllProducts(page, serachTerm);
  const filteredProducts = data?.data?.filter((product) =>
    product.name.toLowerCase().includes(serachTerm)
  );
  // console.log(data);
  console.log(data?.data);
  if (isPending)
    return (
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  if (error) return <p>some thing went wrong...</p>;
  return (
    <div dir="rtl" className={styles.container}>
      <div className={styles.searchbox}>
        <SearchBar
          serachTerm={serachTerm}
          setSearchTerm={setSearchTerm}
          // onSearch={handleSearch}
        />
      </div>
      <div className={styles.header}>
        <div>
          <img src={pmanagement} alt="" />
          <h3>مدیریت کالا</h3>
        </div>
        <button onClick={() => setIsAddModal(true)}>افزودن محصول</button>
      </div>

      <table dir="rtl">
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan={5} className={styles.noResults}>
                محصولی با این جستجو یافت نشد
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </tbody>
      </table>
      {isAddModal ? (
        <AddProductForm
          // product={product}
          isAddModal={isAddModal}
          setIsAddModal={setIsAddModal}
        />
      ) : null}
    </div>
  );
}

export default ProductsPage;
