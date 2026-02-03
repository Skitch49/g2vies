import { useEffect, useState } from "react";
import styles from "./ShopMenu.module.scss";
import { FaArrowDown } from "react-icons/fa";

function ShopMenu({ products, filters, onFilterChange }) {
  const [toggleShopMenu, setToggleShopMenu] = useState(true);

  function handleToggle() {
    if (window.innerWidth > 500) return;

    setToggleShopMenu(!toggleShopMenu);
  }
  useEffect(() => {
    function checkWidth() {
      const width = window.innerWidth;
      if (width > 500) {
        setToggleShopMenu(true);
      }
    }
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);
  const getUniqueValues = (field) => {
    if (!products) return [];
    return products
      .map((product) => {
        if (field === "storage") return product.storage;
        return product[field];
      })
      .filter((value, index, array) => {
        if (!value) return false;
        if (field === "storage") {
          return (
            array.findIndex(
              (v) => v.capacity === value.capacity && v.unit === value.unit,
            ) === index
          );
        }
        return array.indexOf(value) === index;
      })
      .sort((a, b) => {
        if (field === "storage") {
          return a.capacity - b.capacity;
        }
        return a - b;
      });
  };

  const conditions = getUniqueValues("condition");
  const cpusFamilies = getUniqueValues("cpuFamily");
  const rams = getUniqueValues("ram");
  const storages = getUniqueValues("storage");
  const screensSizes = getUniqueValues("screenSize");
  const categories = getUniqueValues("category");

  const renderCheckboxes = (title, values, filterName) =>
    values.length === 0 ? null : (
      <div className={`${styles.item} mb-10`}>
        <h3>{title}</h3>
        {values.map((value, index) => (
          <div key={index} className="d-flex flex-row align-items-center mb-5">
            <input
              type="checkbox"
              onChange={(e) =>
                onFilterChange(filterName, value, e.target.checked)
              }
              id={`${title}-${index}`}
              checked={filters?.[filterName]?.includes(
                filterName === "storage"
                  ? `${value.capacity}${value.unit}`
                  : value,
              )}
            />
            <label htmlFor={`${title}-${index}`}>
              {title === "RAM"
                ? `${value} Go`
                : title === "Stockage"
                  ? `${value.capacity} ${value.unit}`
                  : title === "Taille d'écran"
                    ? `${value} pouces`
                    : value}
            </label>
          </div>
        ))}
      </div>
    );

  return (
    <div className={styles.wrapperShopMenu}>
      <form className={`${styles.ShopMenu} card`}>
        <h1>Boutique</h1>
        <FaArrowDown
          className={`${styles.arrowIcon} ${toggleShopMenu ? "" : styles.arrowIconUp}`}
          onClick={handleToggle}
        />

        <div
          className={`${styles.wrapperItem} ${toggleShopMenu ? "" : styles.wrapperItemClose}`}
        >
          {renderCheckboxes("Catégorie", categories, "category")}
          {renderCheckboxes("Condition", conditions, "condition")}
          {renderCheckboxes("Processeur", cpusFamilies, "cpuFamily")}
          {renderCheckboxes("RAM", rams, "ram")}
          {renderCheckboxes("Stockage", storages, "storage")}
          {renderCheckboxes("Taille d'écran", screensSizes, "screenSize")}
        </div>
      </form>
    </div>
  );
}
export default ShopMenu;
