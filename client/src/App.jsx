import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AuthProvider from "./providers/AuthProvider/AuthProvider";
import { AlertProvider } from "./providers/AlertProvider/AlertProvider";
import DisplayAlerts from "./components/DisplayAlerts/DisplayAlerts";
import CartProvider from "./providers/CartProvider/CartProvider";

function App() {
  return (
    <div className={` ${styles.appContainer}`}>
      <AuthProvider>
        <AlertProvider>
          <CartProvider>
            <Header />
            <div className={` flex-fill flex-column ${styles.main}`}>
              <DisplayAlerts />

              <Suspense>
                <Outlet />
              </Suspense>
            </div>
            <Footer />
          </CartProvider>
        </AlertProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
