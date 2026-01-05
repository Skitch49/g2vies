import styles from "./Profile.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { NavLink } from "react-router-dom";

function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="d-flex flex-row flex-fill">
      <aside
        className={`${styles.asidebar} d-flex flex-column align-items-center p-10`}
      >
        <ul className="d-flex flex-column">
          <h2 className="mb-10">Profile</h2>
          <NavLink className="navlink-secondary"> Infos Profile</NavLink>
          <NavLink className="navlink-secondary"> Modifier mon Profile</NavLink>
          <NavLink className="navlink-secondary">Modifier mot de passe</NavLink>
          <NavLink className="navlink-secondary"> Voir mon panier</NavLink>
          <NavLink className="navlink-secondary"> Voir mes commandes</NavLink>
          <NavLink className="navlink-secondary"> Me déconnecter</NavLink>
        </ul>
      </aside>
      <div className="d-flex flex-fill justify-content-center align-items-center">
        <div className={`${styles.profileContainer} card p-20`}>
          <h3 className="mb-20">Page de profil</h3>
          <ul>
            <li>Prénom : {user.firstname}</li>
            <li>Nom : {user.lastname}</li>
            <li>Email : {user.email}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Profile;
