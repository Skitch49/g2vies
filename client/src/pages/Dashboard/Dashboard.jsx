import { Outlet } from "react-router-dom";
import AsideMenu from "./components/AsideMenu/AsideMenu";
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import styles from "./Dashboard.module.scss";
function Dashboard() {
  const [openMenu, setOpenMenu] = useState(() => window.innerWidth >= 800);
  const ref = useRef(null);

  function handleMenu() {
    if (window.innerWidth < 800) {
      return;
    }
    setOpenMenu(!openMenu);
  }

  useEffect(() => {
    function checkFunc() {
      const width = window.innerWidth;
      if (width < 800) {
        setOpenMenu(false);
      }
    }
    window.addEventListener("resize", checkFunc);
    checkFunc();
    return () => {
      window.removeEventListener("resize", checkFunc);
    };
  }, []);

  return (
    <div className="d-flex flex-row flex-fill">
      <CSSTransition in={openMenu} nodeRef={ref} timeout={600}>
        <AsideMenu ref={ref} handleMenu={handleMenu} openMenu={openMenu} />
      </CSSTransition>
      <div
        className={`d-flex flex-fill justify-content-center align-items-center m-10 ${styles.containerAlerts}`}
      >
        <Outlet />
      </div>
    </div>
  );
}
export default Dashboard;
