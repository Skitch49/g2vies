import { useEffect, useRef, useState } from "react";
import { getProducts } from "../../api";
import ShopCard from "./components/ShopCard/ShopCard";
import ShopMenu from "./components/ShopMenu/ShopMenu";
import SearchBar from "./components/SearchBar/SearchBar";

function Shop() {
  const PRODUCTS_PER_LOAD = 12;
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD);
  const [searchBar, setSearchBar] = useState("");
  const [filters, setFilters] = useState({});

  const loaderRef = useRef(null);

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

  function searchProduct(event) {
    setSearchBar(event.target.value.toLowerCase());
  }

  const filteredProducts = products.filter((product) => {
    // --- SEARCH BAR ---
    if (searchBar) {
      const productText = `
        ${product.category}
        ${product.name}
        ${product.condition}
        ${product.description}
        ${product.brand}
        ${product.cpu}
        ${product.gpu}
        ${product.ram}go
        ${product.color}
        ${product.model}
        ${product.screenSize}pouces
        ${product.operatingSystem}
        ${product.storage?.capacity}${product.storage?.unit}
      `.toLowerCase();

      const searchWords = searchBar.split(" ").filter(Boolean);

      if (!searchWords.every((word) => productText.includes(word))) {
        return false;
      }
    }

    // --- FILTERS MENU ---
    if (
      filters.condition?.length &&
      !filters.condition.includes(product.condition)
    )
      return false;

    if (filters.cpu?.length && !filters.cpu.includes(product.cpu)) return false;

    if (filters.ram?.length && !filters.ram.includes(product.ram)) return false;

    if (
      filters.storage?.length &&
      !filters.storage.includes(
        `${product.storage?.capacity}${product.storage?.unit}`
      )
    )
      return false;

    if (
      filters.screenSize?.length &&
      !filters.screenSize.includes(product.screenSize)
    )
      return false;
    if (
      filters.category?.length &&
      !filters.category.includes(product.category)
    )
      return false;

    return true;
  });
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  function onFilterChange(name, value, checked) {

    setFilters((prev) => {
      const values = prev[name] || [];
      if (name === "storage") {
        const valueStr = `${value.capacity}${value.unit}`;
        return {
          ...prev,
          [name]: checked
            ? [...values, valueStr]
            : values.filter((v) => v !== valueStr),
        };
      }
      return {
        ...prev,
        [name]: checked
          ? [...values, value]
          : values.filter((v) => v !== value),
      };
    });
  }

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (
          firstEntry.isIntersecting &&
          visibleCount < filteredProducts.length
        ) {
          setVisibleCount((prev) => prev + PRODUCTS_PER_LOAD);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [visibleCount, filteredProducts.length]);

  return (
    <div className="container ">
      <SearchBar
        value={searchBar}
        onInput={searchProduct}
        count={filteredProducts.length}
      />
      <main className="flex-fill d-flex flex-row gap-10">
        <ShopMenu products={products} onFilterChange={onFilterChange} />
        <div className="container-cards">
          <div className="wrapper-cards d-flex flex-row flex-wrap gap-10 mb-20">
            {products &&
              visibleProducts.map((product) => (
                <ShopCard key={product._id} product={product} />
              ))}
            <div ref={loaderRef} style={{ height: "1px" }}></div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Shop;
