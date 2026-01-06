import { Outlet } from "react-router-dom";
import AsideMenu from "./components/AsideMenu/AsideMenu";
import { CSSTransition } from "react-transition-group";
import { useRef, useState } from "react";
import styles from "./Dashboard.module.scss";
function Dashboard() {
  const [openMenu, setOpenMenu] = useState(true);
  const ref = useRef(null);

  function handleMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <div className="d-flex flex-row flex-fill">
      <CSSTransition in={openMenu} nodeRef={ref} timeout={600}>
        <AsideMenu ref={ref} handleMenu={handleMenu} openMenu={openMenu} />
      </CSSTransition>
      <div
        className={`d-flex flex-fill justify-content-center align-items-center ${styles.containerAlerts}`}
      >
        <Outlet />
      </div>
    </div>
  );
}
export default Dashboard;
