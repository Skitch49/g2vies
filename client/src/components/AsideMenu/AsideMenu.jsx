import { useContext, useState } from "react";
import styles from "./AsideMenu.module.scss";
import { AuthContext } from "../../context";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { IoCartOutline, IoCart } from "react-icons/io5";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { FaUserEdit, FaUser, FaRegUser } from "react-icons/fa";

function AsideMenu() {
  const { signout } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(true);

  function handleMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <aside
      className={`${styles.asidebar} d-flex flex-column align-items-center p-10`}
    >
      <div className="icon-menu">
        <FaBars className={styles.iconMenu} onClick={handleMenu} />
      </div>
      <ul className="d-flex flex-column">
        {openMenu ? (
          <>
            <h2 className="mb-10">Profile</h2>
            <NavLink to="/profile" className="navlink-secondary">
              Infos Profile
            </NavLink>
            <NavLink to="/profile/edit-profile" className="navlink-secondary">
              Modifier mon Profile
            </NavLink>
            <NavLink to="/profile/edit-password" className="navlink-secondary">
              Modifier mot de passe
            </NavLink>
            <NavLink className="navlink-secondary"> Voir mon panier</NavLink>
            <NavLink className="navlink-secondary"> Voir mes commandes</NavLink>
            <NavLink onClick={() => signout()} className="navlink-secondary">
              Me déconnecter
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profile" end className="navlink-secondary">
              {({ isActive }) =>
                isActive ? (
                  <FaUser className="icones" />
                ) : (
                  <FaRegUser className="icones" />
                )
              }
            </NavLink>
            <NavLink to="/profile/edit-profile" className="navlink-secondary">
              {" "}
              <FaUserEdit />
            </NavLink>
            <NavLink to="/profile/edit-password" className="navlink-secondary">
              {({ isActive }) =>
                isActive ? <RiLockPasswordFill /> : <RiLockPasswordLine />
              }
            </NavLink>
            <NavLink className="navlink-secondary">
              {" "}
              {({ isActive }) =>
                isActive ? (
                  <IoCart className="icones cart active" />
                ) : (
                  <IoCartOutline className="icones cart" />
                )
              }{" "}
            </NavLink>
            <NavLink className="navlink-secondary">
              {" "}
              <GiCardboardBoxClosed />
            </NavLink>
            <NavLink onClick={() => signout()} className="navlink-secondary">
              <TbLogout />
            </NavLink>
          </>
        )}
      </ul>
    </aside>
  );
}

export default AsideMenu;
