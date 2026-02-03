import { NavLink } from "react-router-dom";
import styles from "./HeaderXsMenu.module.scss";
import { useEffect, useRef } from "react";
function HeaderXsMenu({ setShowMenu }) {
  const timeoutRef = useRef(null);

  function closeMenu() {
    timeoutRef.current = setTimeout(() => {
      setShowMenu(false);
    }, 100);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return (
    <nav className={styles.mobileMenu}>
      <ul>
        <li>
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.navlink} ${isActive ? styles.activeLink : ""}`
            }
          >
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/boutique"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.navlink} ${isActive ? styles.activeLink : ""}`
            }
          >
            Catalogue
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.navlink} ${isActive ? styles.activeLink : ""}`
            }
          >
            Pannier
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/profile"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.navlink} ${isActive ? styles.activeLink : ""}`
            }
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderXsMenu;
