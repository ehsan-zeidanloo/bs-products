import React from "react";
import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ serachTerm, setSearchTerm, handleSearch }) {
  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="جستجو ی محصول"
        value={serachTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase().trim())}
      />
    </div>
  );
}

export default SearchBar;
