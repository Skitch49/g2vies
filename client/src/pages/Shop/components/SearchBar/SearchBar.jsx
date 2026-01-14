import { useRef } from "react";
import styles from "./SearchBar.module.scss";
import { IoIosSearch } from "react-icons/io";

function SearchBar({ value, onInput, count }) {
  const inputRef = useRef(null);
  function focus() {
    inputRef.current?.focus();
  }
  return (
    <div className={styles.headerSearch}>
      <div className={styles.wrapperInput}>
        <input
          value={value}
          type="search"
          onInput={(event) => onInput(event)}
          placeholder="Rechercher un produit..."
          ref={inputRef}
        />
        <IoIosSearch onClick={focus} />
      </div>

      <span>
        Nombre{count > 1 ? "s" : ""} d'article{count > 1 ? "s" : ""} {count}
      </span>
    </div>
  );
}
export default SearchBar;
