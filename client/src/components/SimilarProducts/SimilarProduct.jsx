import { useState } from "react";
import { useEffect } from "react";
import { getProducts, getSimilarProducts } from "../../api";
import styles from "./SimilarProduct.module.scss";
import { NavLink } from "react-router-dom";
function SimilarProduct({ productID = "undefined" }) {
  const [products, setProducts] = useState(null);
  console.log(productID);
  useEffect(() => {
    if (productID) {
      async function fetchSimilarProducts(productID) {
        const data = await getSimilarProducts(productID);
        setProducts(data);
      }
      fetchSimilarProducts(productID);
    } else {
      async function fetchProducts() {
        const data = await getProducts(0, 4);
        setProducts(data);
      }
      fetchProducts();
    }
  }, [productID]);
  return (
    <div
      className={`${styles.SimilarProductWrapper} d-flex flex-row flex-wrap justify-space-between my-10`}
    >
      {products &&
        products.map((product, index) => (
          <div key={index} className="d-flex flex-column">
            <NavLink
              to={`/boutique/${product?._id}`}
              className={styles.productContainer}
            >
              <figure>
                <img src={product?.images[0]?.url} alt={product?.name} />
              </figure>
              <div className={styles.wrapperInfos}>
                <h2>{product?.name}</h2>
                <h3>{product?.price} €</h3>
              </div>
            </NavLink>
            <div className="d-flex justify-space-around align-items-center">
              <button type="button" className="btn btn-primary">
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
export default SimilarProduct;
