import { memo, useContext } from "react";
import styles from "./AsideMenu.module.scss";
import { AuthContext } from "../../../../context";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { IoCartOutline, IoCart } from "react-icons/io5";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { FaUserEdit, FaUser, FaRegUser } from "react-icons/fa";

function AsideMenu({ handleMenu, openMenu, ref }) {
  const { signout } = useContext(AuthContext);

  return (
    <aside
      ref={ref}
      className={`${styles.asidebar} d-flex flex-column align-items-center p-10`}
    >
      <div className={styles.wrapperAside}>
        <div className={styles.iconMenu}>
          <FaBars className={styles.iconMenu} onClick={handleMenu} />
        </div>
        <ul className="d-flex flex-column">
          {openMenu ? (
            <>
              <h2 className="mb-10">Profile</h2>
              <NavLink
                to="/dashboard/profile"
                end
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlink} ${styles.active}`
                    : styles.navlink
                }
              >
                Infos Profile
              </NavLink>
              <NavLink
                to="/dashboard/profile/edit-profile"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlink} ${styles.active}`
                    : styles.navlink
                }
              >
                Modifier mon Profile
              </NavLink>
              <NavLink
                to="/dashboard/profile/edit-password"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlink} ${styles.active}`
                    : styles.navlink
                }
              >
                Modifier mot de passe
              </NavLink>
              <NavLink
                to="/dashboard/cart"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlink} ${styles.active}`
                    : styles.navlink
                }
              >
                {" "}
                Voir mon panier
              </NavLink>
              <NavLink
                to="/dashboard/order"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlink} ${styles.active}`
                    : styles.navlink
                }
              >
                {" "}
                Voir mes commandes
              </NavLink>
              <NavLink
                to="/signin"
                onClick={() => signout()}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlink} ${styles.active}`
                    : styles.navlink
                }
              >
                Me déconnecter
              </NavLink>
            </>
          ) : (
            <div className={styles.xsMenu}>
              <NavLink
                to="/dashboard/profile"
                end
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlinkXs} ${styles.activeXs}`
                    : styles.navlinkXs
                }
              >
                {({ isActive }) =>
                  isActive ? (
                    <FaUser
                      className={`${styles.xsIcons} ${styles.userIcon} `}
                    />
                  ) : (
                    <FaRegUser
                      className={`${styles.xsIcons} ${styles.userIcon}`}
                    />
                  )
                }
              </NavLink>
              <NavLink
                to="/dashboard/profile/edit-profile"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlinkXs} ${styles.activeXs}`
                    : styles.navlinkXs
                }
              >
                <FaUserEdit className={`${styles.xsIcons}`} />
              </NavLink>
              <NavLink
                to="/dashboard/profile/edit-password"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlinkXs} ${styles.activeXs}`
                    : styles.navlinkXs
                }
              >
                {({ isActive }) =>
                  isActive ? (
                    <RiLockPasswordFill className={`${styles.xsIcons}`} />
                  ) : (
                    <RiLockPasswordLine className={`${styles.xsIcons}`} />
                  )
                }
              </NavLink>
              <NavLink
                to="/dashboard/profile/cart"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlinkXs} ${styles.activeXs}`
                    : styles.navlinkXs
                }
              >
                {({ isActive }) =>
                  isActive ? (
                    <IoCart className={`${styles.xsIcons} cart`} />
                  ) : (
                    <IoCartOutline className={`${styles.xsIcons} cart`} />
                  )
                }
              </NavLink>
              <NavLink
                to="/dashboard/profile/order"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlinkXs} ${styles.activeXs}`
                    : styles.navlinkXs
                }
              >
                <GiCardboardBoxClosed className={`${styles.xsIcons}`} />
              </NavLink>
              <NavLink
                to="/signin"
                onClick={() => signout()}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlinkXs} ${styles.activeXs}`
                    : styles.navlinkXs
                }
              >
                <TbLogout className={`${styles.xsIcons}`} />
              </NavLink>
            </div>
          )}
        </ul>
      </div>
    </aside>
  );
}

export default memo(AsideMenu);
