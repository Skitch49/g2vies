import { Outlet } from "react-router-dom";
import AsideMenu from "../../components/AsideMenu/AsideMenu";

function Profile() {
  return (
    <div className="d-flex flex-row flex-fill">
      <AsideMenu />
      <div className="d-flex flex-fill justify-content-center align-items-center">
        <Outlet />
      </div>
    </div>
  );
}
export default Profile;
