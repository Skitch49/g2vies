import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { AuthContext, CartContext } from "../../context";
import { useContext } from "react";
import { IoCartOutline, IoCart } from "react-icons/io5";
import { FaUser, FaRegUser } from "react-icons/fa";

function Header() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const cartCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <header className={`d-flex flex-row align-items-center ${styles.header}`}>
      <div className="flex-fill">
        <NavLink to="/">
          <img src="/icone.svg" alt="" />
        </NavLink>
      </div>
      {user ? (
        <ul
          className={`${styles.headerList} d-flex flex-row align-items-center`}
        >
          <NavLink to="/boutique" className="mr-15">
            Catalogue
          </NavLink>
          <NavLink to="/cart" className="mr-15">
            {({ isActive }) => (
              <div className={styles.cartWrapper}>
                {isActive ? (
                  <IoCart className={`${styles.cartIcon} icones cart active`} />
                ) : (
                  <IoCartOutline className={`${styles.cartIcon} icones cart`} />
                )}

                {cartCount > 0 && (
                  <span className={styles.cartBadge}>{cartCount}</span>
                )}
              </div>
            )}
          </NavLink>

          <NavLink to="/dashboard/profile" className="mr-15">
            {({ isActive }) =>
              isActive ? (
                <FaUser className="icones" />
              ) : (
                <FaRegUser className="icones" />
              )
            }
          </NavLink>
        </ul>
      ) : (
        <ul
          className={`${styles.headerList} d-flex flex-row align-items-center`}
        >
          <NavLink to="/boutique" className="mr-15">
            Catalogue
          </NavLink>
          <NavLink to="/cart" className="mr-15">
            <IoCartOutline className="icones cart" />
          </NavLink>
          <NavLink to="/signin" className="mr-15">
            <FaRegUser className="icones" />{" "}
          </NavLink>
        </ul>
      )}
    </header>
  );
}

export default Header;
