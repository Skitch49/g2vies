import { useContext, useMemo } from "react";
import { AuthContext, CartContext } from "../../context";
import { NavLink } from "react-router-dom";
import styles from "./Cart.module.scss";
import Loader from "../../components/Loader/Loader";

function Cart() {
  const { user } = useContext(AuthContext);
  const { cart, isLoading, deleteFromCart, updateQuantity, clearAllFromCart } =
    useContext(CartContext);

  async function deleteItemFromCart(productID) {
    deleteFromCart(productID);
  }

  async function changeQuantity(index, value) {
    const productID = cart.items[index].product._id;
    const oldQuantity = cart.items[index].quantity;

    const maxQuantity = cart.items[index].product.quantity;
    let newQuantity = Math.max(1, Math.min(oldQuantity + value, maxQuantity));

    updateQuantity(productID, newQuantity);
  }
  const total = useMemo(() => {
    return cart?.items?.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  }, [cart]);

  return (
    <div
      className={`container d-flex flex-column justify-content-center flex-fill `}
    >
      {isLoading && (
        <div
          className={`card d-flex align-items-center justify-content-center flex-row m-10 ${styles.cardCartLoading}`}
        >
          <Loader />
        </div>
      )}
      {cart && cart.items.length < 1 && !isLoading && (
        <div className={`card d-flex flex-row m-10 ${styles.cardCart}`}>
          <figure className={styles.CartLogo}>
            <img src="cart_empty.png" alt="Panier vide" />
          </figure>
          <div className="content d-flex flex-column flex-wrap">
            <h1>Votre panier est vide !</h1>
            {!user && (
              <div className={styles.wrapperBtn}>
                <NavLink to="/signin" className="btn btn-primary">
                  Connectez vous à votre compte
                </NavLink>
                <NavLink to="/signup" className="btn btn-primary-reverse">
                  Inscrivez-vous maintenant
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
      {cart && cart.items.length > 0 && !isLoading && (
        <div className={`card d-flex flex-row m-10 ${styles.cardCart}`}>
          <div className="content d-flex flex-column flex-wrap flex-fill">
            <div className="d-flex justify-space-between flex-wrap">
              <div
                className={`${styles.wrapperCartTitleAndClearCart} d-flex gap-10  mb-10`}
              >
                <h1>Voici votre panier</h1>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={async () => clearAllFromCart()}
                >
                  Supprimer le panier
                </button>
              </div>
              <h3 className={styles.titlePrice}>Prix</h3>
            </div>
            {!user && (
              <div className={styles.wrapperBtn}>
                <NavLink to="/signin" className="btn btn-primary">
                  Connectez vous à votre compte
                </NavLink>
                <NavLink to="/signup" className="btn btn-primary-reverse">
                  Inscrivez-vous maintenant
                </NavLink>
              </div>
            )}
            <ul>
              {cart.items.map((item, index) => (
                <li key={index} className={`${styles.productItem} flex-fill`}>
                  <NavLink to={`/boutique/${item?.product?._id}`}>
                    <figure>
                      <img
                        src={item?.product?.images[0].url}
                        alt={item?.product?.name}
                      />
                    </figure>
                  </NavLink>
                  <div className="d-flex flex-column flex-fill">
                    <div
                      className={`${styles.wrapperNameAndPrice} d-flex justify-space-between`}
                    >
                      <NavLink to={`/boutique/${item?.product?._id}`}>
                        <h2>{item?.product?.name}</h2>
                      </NavLink>
                      <h3 className={styles.priceItem}>
                        {item?.product?.price} €
                      </h3>
                    </div>

                    <div className="d-flex align-items-center flex-row gap-10">
                      <label htmlFor="quantity">
                        Quantité*
                        <div className={styles.wrapperQuantity}>
                          <button
                            type="button"
                            onClick={() => changeQuantity(index, -1)}
                            disabled={item.quantity <= 1 || isLoading}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            id="quantity"
                            readOnly
                            value={item?.quantity}
                          />
                          <button
                            type="button"
                            onClick={() => changeQuantity(index, 1)}
                            disabled={
                              item.quantity >= item.product.quantity ||
                              isLoading
                            }
                          >
                            +
                          </button>
                        </div>
                      </label>
                      <button
                        type="button"
                        className={styles.btnSecondary}
                        onClick={() =>
                          deleteItemFromCart(item.product._id, index)
                        }
                      >
                        Supprimé
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div
              className={`${styles.wrapperTotal} d-flex justify-space-between mt-10`}
            >
              <NavLink to="/payment" className="btn btn-primary">
                Passer au paiement
              </NavLink>
              <h4>
                Sous-total ({cart.items.length} article
                {cart.items.length > 1 ? "s" : ""}) {total.toFixed(2)} €
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;
