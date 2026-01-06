import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AuthProvider from "./providers/AuthProvider/AuthProvider";
import { AlertProvider } from "./providers/AlertProvider/AlertProvider";
import DisplayAlerts from "./components/DisplayAlerts/DisplayAlerts";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <AuthProvider>
        <AlertProvider>
          <Header />
          <div className="d-flex flex-fill flex-column">
            <DisplayAlerts />

            <Suspense>
              <Outlet />
            </Suspense>
          </div>
          <Footer />
        </AlertProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
