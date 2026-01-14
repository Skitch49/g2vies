import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { rootLoader } from "./loaders/rootLoader";

// lazy loading
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Shop = lazy(() => import("./pages/Shop/Shop"));

const Signup = lazy(() => import("./pages/Signup/Signup"));
const Signin = lazy(() => import("./pages/Signin/Signin"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("./pages/Dashboard/pages/Profile/Profile"));
const ProfileInfos = lazy(() =>
  import("./pages/Dashboard/pages/Profile/pages/ProfileInfos/ProfileInfos")
);
const ProfileEdit = lazy(() =>
  import("./pages/Dashboard/pages/Profile/pages/ProfileEdit/ProfileEdit")
);
const ProfilePasswordEdit = lazy(() =>
  import(
    "./pages/Dashboard/pages/Profile/pages/ProfilePasswordEdit/ProfilePasswordEdit"
  )
);
const ProtectedRoute = lazy(() =>
  import("./pages/Dashboard/components/ProtectedRoute/ProtectedRoute")
);
const ProtectedAdminRoute = lazy(() =>
  import("./pages/Dashboard/components/ProtectedAdminRoute/ProtectedAdminRoute")
);
const Admin = lazy(() => import("./pages/Dashboard/pages/Admin/Admin"));
const Product = lazy(() =>
  import("./pages/Dashboard/pages/Admin/pages/Product/Product")
);
const ProductList = lazy(() =>
  import(
    "./pages/Dashboard/pages/Admin/pages/Product/pages/ProductList/ProductList"
  )
);
const ProductAdd = lazy(() =>
  import(
    "./pages/Dashboard/pages/Admin/pages/Product/pages/ProductAdd/ProductAdd"
  )
);
const ProductEdit = lazy(() =>
  import(
    "./pages/Dashboard/pages/Admin/pages/Product/pages/ProductEdit/ProductEdit"
  )
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,
    children: [
      { index: true, element: <Homepage /> },
      { path: "boutique", element: <Shop /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
            children: [
              { index: true, element: <ProfileInfos /> },
              { path: "edit-profile", element: <ProfileEdit /> },
              { path: "edit-password", element: <ProfilePasswordEdit /> },
            ],
          },
          {
            path: "admin",
            element: (
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            ),
            children: [
              {
                path: "products",
                element: <Product />,
                children: [
                  { index: true, element: <ProductList /> },
                  { path: "add", element: <ProductAdd /> },
                  { path: "edit/:id", element: <ProductEdit /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
