import styles from "./ShopMenu.module.scss";
function ShopMenu({ products, onFilterChange }) {
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
              (v) => v.capacity === value.capacity && v.unit === value.unit
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
  const cpus = getUniqueValues("cpu");
  const rams = getUniqueValues("ram");
  const storages = getUniqueValues("storage");
  const screensSizes = getUniqueValues("screenSize");
  const categories = getUniqueValues("category");

  const renderCheckboxes = (title, values, filterName) =>
    values.length === 0 ? null : (
      <div className="mb-10">
        <h3>{title}</h3>
        {values.map((value, index) => (
          <div key={index} className="d-flex flex-row align-items-center mb-5">
            <input
              type="checkbox"
              onChange={(e) =>
                onFilterChange(filterName, value, e.target.checked)
              }
              id={`${title}-${index}`}
              value={
                title === "Stockage" ? `${value.capacity}${value.unit}` : value
              }
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
        {renderCheckboxes("Catégorie", categories, "category")}
        {renderCheckboxes("Condition", conditions, "condition")}
        {renderCheckboxes("Processeur", cpus, "cpu")}
        {renderCheckboxes("RAM", rams, "ram")}
        {renderCheckboxes("Stockage", storages, "storage")}
        {renderCheckboxes("Taille d'écran", screensSizes, "screenSize")}
      </form>
    </div>
  );
}
export default ShopMenu;
