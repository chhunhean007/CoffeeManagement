import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders";
import { Menu } from "./pages/Menu";
import { Inventory } from "./pages/Inventory";
import { Reports } from "./pages/Reports";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: "orders", Component: Orders },
      { path: "menu", Component: Menu },
      { path: "inventory", Component: Inventory },
      { path: "reports", Component: Reports },
    ],
  },
]);