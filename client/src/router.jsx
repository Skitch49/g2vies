import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { rootLoader } from "./loaders/rootLoader";

// lazy loading
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
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
  import("./components/ProtectedRoute/ProtectedRoute")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,
    children: [
      { index: true, element: <Homepage /> },
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
        ],
      },
    ],
  },
]);
