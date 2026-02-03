import { useContext } from "react";
import styles from "./ProfileInfos.module.scss";
import { AuthContext } from "../../../../../../context";

function ProfileInfos() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("fr-FR")
    : "";

  return (
    <div className={`${styles.profileContainer} card p-20`}>
      <h3 className="mb-20">Page de profil</h3>
      <ul>
        <li>Prénom : {user.firstname}</li>
        <li>Nom : {user.lastname}</li>
        <li>Email : {user.email}</li>
        {formattedDate && <li>Date de creation : {formattedDate}</li>}
      </ul>
    </div>
  );
}

export default ProfileInfos;
