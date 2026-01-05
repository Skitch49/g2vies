import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { rootLoader } from "./loaders/rootLoader";

// lazy loading
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const Signin = lazy(() => import("./pages/Signin/Signin"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ProfileInfos = lazy(() =>
  import("./pages/Profile/pages/ProfileInfos/ProfileInfos")
);
const ProfileEdit = lazy(() =>
  import("./pages/Profile/pages/ProfileEdit/ProfileEdit")
);
const ProfilePasswordEdit = lazy(() =>
  import("./pages/Profile/pages/ProfilePasswordEdit/ProfilePasswordEdit")
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
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <ProfileInfos /> },
          { path: "edit-profile", element: <ProfileEdit /> },
          { path: "edit-password", element: <ProfilePasswordEdit /> },
        ],
      },
    ],
  },
]);
