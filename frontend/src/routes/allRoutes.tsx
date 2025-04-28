import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Logout from "../components/Auth/Logout";

const protectedRoutes = [
  {
    path: "/",
    exact: true,
    element: <Home />,
  },
  { path: "/home", element: <Home /> },
  { path: "/logout", element: <Logout /> },
];

const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

export { publicRoutes, protectedRoutes };
