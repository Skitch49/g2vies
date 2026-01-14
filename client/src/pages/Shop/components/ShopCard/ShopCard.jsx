import styles from "./ShopCard.module.scss";
function ShopCard({ product }) {
  return (
    <div
      className={`${styles.ShopCard} card d-flex flex-column justify-space-between`}
    >
      <figure>
        <img src={product.images[0]?.url} alt={product.name} />
      </figure>
      <section>
        <div className="wrapper-info d-flex flex-column flex-wrap gap-5">
          <div className="d-flex flex-row align-items-center justify-space-between">
            <div>
              <p className={`${styles.originalPrice} mb-5`}>
                Prix neuf
                <span>{product.originalPrice} €</span>
              </p>
              <h3 className={styles.price}>{product.price} €</h3>
            </div>
            <h3 className={styles.condition}>{product.condition}</h3>
          </div>
          <h2>{product.name}</h2>
          <div className={styles.wrapperInfo}>
            <strong>{product.cpu}</strong>
            {product.screenSize && <strong>{product.screenSize} pouces</strong>}
            <strong>RAM {product.ram} Go</strong>
            <strong>
              {product.storage.capacity} {product.storage.unit} en{" "}
              {product.storage.type}
            </strong>
          </div>
        </div>
        <button type="button" className="btn btn-primary">
          Ajouter au panier
        </button>
      </section>
    </div>
  );
}
export default ShopCard;
