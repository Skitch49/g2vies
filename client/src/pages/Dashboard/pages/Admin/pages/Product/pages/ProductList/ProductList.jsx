import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getProducts } from "../../../../../../../../api/product";
import Loader from "../../../../../../../../components/Loader/Loader";
import styles from "./ProductList.module.scss";
function ProductList() {
  const LIMIT_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProducts() {
      try {
        setErrors(null);
        const data = await getProducts(
          LIMIT_PER_PAGE * (page - 1),
          LIMIT_PER_PAGE
        );
        setProducts(data.products);

        setTotalProducts(data.totalProducts);
      } catch (error) {
        setErrors(error?.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [page]);
  const totalPages = Math.ceil(totalProducts / LIMIT_PER_PAGE);

  return (
    <div className="card">
      <div className="d-flex flex-row justify-space-between align-items-center mb-10">
        {" "}
        <h1>Liste des produits</h1>
        <NavLink to="add" className="btn btn-primary-reverse">
          Ajouter un produit
        </NavLink>
      </div>

      {error && (
        <div className="d-flex align-items-center justify-content-center m-20">
          <p className="form-error">{error}</p>
        </div>
      )}

      {loading && (
        <div
          className={`${styles.wrapperLoader} d-flex align-items-center justify-content-center m-20}`}
        >
          <Loader />
        </div>
      )}
      {products && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prix</th>
                <th>Catégorie</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price} €</td>
                  <td>{product.category}</td>
                  <td className={styles.cellCenter}>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            {totalPages <= 2 ? null : (
              <button
                className={`${styles.btnPagination} ${
                  page == 1 ? styles.btnDisabled : ""
                }`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                «
              </button>
            )}
            {Array.from({ length: totalPages }, (_, index) =>
              index + 1 >= page - 2 && index + 1 <= page + 2 ? (
                <button
                  className={`${styles.btnPagination} ${
                    page == index + 1 ? styles.activeBtnPagination : ""
                  }`}
                  key={index}
                  disabled={page === index + 1}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ) : null
            )}
            {totalPages <= 2 ? null : (
              <button
                disabled={totalPages === page}
                onClick={() => setPage(page + 1)}
                className={`${styles.btnPagination} ${
                  totalPages === page ? styles.btnDisabled : ""
                }`}
              >
                »
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default ProductList;
