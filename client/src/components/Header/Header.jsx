import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { AuthContext, CartContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import { IoCartOutline, IoCart } from "react-icons/io5";
import { FaUser, FaRegUser, FaBars } from "react-icons/fa";
import HeaderXsMenu from "./component/HeaderXsMenu";

function Header() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const [showMenu, setShowMenu] = useState(false);

  const cartCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  useEffect(() => {
    if (showMenu) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "initial";
    }
  }, [showMenu]);

  return (
    <header className={`d-flex flex-row align-items-center ${styles.header}`}>
      <div className="flex-fill">
        <NavLink to="/">
          <img src="/icone.svg" alt="" />
        </NavLink>
      </div>
      {user ? (
        <>
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
                    <IoCart
                      className={`${styles.cartIcon} icones cart active`}
                    />
                  ) : (
                    <IoCartOutline
                      className={`${styles.cartIcon} icones cart`}
                    />
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
          <FaBars
            className={styles.headerXs}
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <>
              <div className="calc" onClick={() => setShowMenu(false)}></div>
              <HeaderXsMenu setShowMenu={setShowMenu} />
            </>
          )}
        </>
      ) : (
        <>
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
          <FaBars
            className={styles.headerXs}
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <>
              <div className="calc" onClick={() => setShowMenu(false)}></div>

              <HeaderXsMenu setShowMenu={setShowMenu} />
            </>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
