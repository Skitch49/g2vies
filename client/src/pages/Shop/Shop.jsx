import { useEffect, useState } from "react";
import { getProducts } from "../../api";
import ShopCard from "./components/ShopCard/ShopCard";
import ShopMenu from "./components/ShopMenu/ShopMenu";
import SearchBar from "./components/SearchBar/SearchBar";
import { Outlet, useMatch } from "react-router-dom";
import styles from "./Shop.module.scss";
function Shop() {
  const PRODUCTS_PER_LOAD = 12;
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD);
  const [searchBar, setSearchBar] = useState("");
  const [filters, setFilters] = useState({
    category: [],
    condition: [],
    cpuFamily: [],
    ram: [],
    storage: [],
    screenSize: [],
  });

  const isCategoryPage = useMatch("/boutique/categorie-produit/:nameCategory");
  const categoryFromUrl = isCategoryPage?.params?.nameCategory;

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const response = await getProducts();

        setProducts(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchAllProducts();
  }, []);

  useEffect(() => {
    function changeFilter() {
      setFilters({
        category: categoryFromUrl ? [categoryFromUrl] : [],
        condition: [],
        cpuFamily: [],
        ram: [],
        storage: [],
        screenSize: [],
      });
    }
    changeFilter();
  }, [categoryFromUrl]);

  function searchProduct(event) {
    setSearchBar(event.target.value.toLowerCase());
  }

  const filteredProducts = products.filter((product) => {
    // SEARCH BAR
    if (searchBar) {
      const text = `
      ${product.category}
      ${product.name}
      ${product.condition}
      ${product.description}
      ${product.brand}
      ${product.cpuFamily}
      ${product.cpuModel}
      ${product.gpu}
      ${product.ram}go
      ${product.color}
      ${product.model}
      ${product.screenSize}pouces
      ${product.operatingSystem}
      ${product.storage?.capacity}${product.storage?.unit}
    `.toLowerCase();

      const words = searchBar.split(" ").filter(Boolean);
      if (!words.every((word) => text.includes(word))) return false;
    }

    // FILTERS
    for (const key in filters) {
      if (!filters[key]?.length) continue;

      let productValue = product[key];

      // cas spécial stockage
      if (key === "storage") {
        productValue = `${product.storage?.capacity}${product.storage?.unit}`;
      }

      if (!filters[key].includes(productValue)) {
        return false;
      }
    }

    return true;
  });
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  function onFilterChange(name, value, checked) {
    setFilters((prev) => {
      const current = prev[name] || [];
      const finalValue =
        name === "storage" ? `${value.capacity}${value.unit}` : value;

      return {
        ...prev,
        [name]: checked
          ? [...current, finalValue]
          : current.filter((v) => v !== finalValue),
      };
    });
  }

  function addMoreVisibilityProduct() {
    setVisibleCount((prev) => prev + PRODUCTS_PER_LOAD);
  }

  const isProductPage = useMatch("/boutique/:idProduct");

  return (
    <div className="container ">
      {isProductPage ? (
        <Outlet />
      ) : (
        <>
          <SearchBar
            value={searchBar}
            onInput={searchProduct}
            count={filteredProducts.length}
          />
          <main className={`${styles.wrapperShop} flex-fill d-flex gap-10`}>
            <ShopMenu
              products={products}
              filters={filters}
              onFilterChange={onFilterChange}
            />
            <div className=" flex-fill">
              <div
                className={`${styles.wrapperCard} d-flex flex-wrap gap-10 mb-20 flex-fill`}
              >
                {products && filteredProducts.length ? (
                  visibleProducts.map((product) => (
                    <ShopCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="d-flex flex-fill align-items-center justify-content-center p-20 mt-20">
                    <p>Aucun article trouvé</p>
                  </div>
                )}
                {filteredProducts.length > visibleProducts.length && (
                  <div className="d-flex flex-fill align-items-center justify-content-center">
                    <button
                      className="btn btn-secondary"
                      onClick={addMoreVisibilityProduct}
                    >
                      Charger plus
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
export default Shop;
