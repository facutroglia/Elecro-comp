import { lazy } from "react";
import { createBrowserRouter } from "react-router";
// Layouts
import Main from "./layouts/Main";
import User from "./layouts/User";
import Admin from "./layouts/Admin";
// Components
import Loader from "./components/Loader";
// Pages
const Home = lazy(() => import("./pages/Home"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Nosotros = lazy(() => import("./pages/AboutUs"));
const Products = lazy(() => import("./pages/Products"));
const Category = lazy(() => import("./pages/Category"));
const Detail = lazy(() => import("./pages/Detail"));
const Acceso = lazy(() => import("./pages/Acceso"));
const Register = lazy(() => import("./pages/Register"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const Orders = lazy(() => import("./pages/Orders"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
export const App = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: (
          <Loader>
            <Home />
          </Loader>
        ),
        loader: async () => {},
      },
      {
        path: "contacto",
        element: (
          <Loader>
            <Contacto />
          </Loader>
        ),
        loader: async () => {},
      },
      {
        path: "nosotros",
        element: (
          <Loader>
            <Nosotros />
          </Loader>
        ),
        loader: async () => {},
      },
      {
        path: "productos",
        element: (
          <Loader>
            <Products />
          </Loader>
        ),
        loader: async () => {},
        children: [
          {
            path: ":categoria",
            element: (
              <Loader>
                <Category />
              </Loader>
            ),
            loader: async ({ params }) => {},
          },
          {
            path: ":id",
            element: (
              <Loader>
                <Detail />
              </Loader>
            ),
            loader: async ({ params }) => {},
          },
        ],
      },

      {
        path: "acceso",
        element: (
          <Loader>
            <Acceso />
          </Loader>
        ),
      },
      {
        path: "registro",
        element: (
          <Loader>
            <Register />
          </Loader>
        ),
      },
      {
        path: "carrito",
        element: (
          <Loader>
            <Cart />
          </Loader>
        ),
      },
      {
        path: "usuario",
        element: <User />,
        children: [
          {
            index: true,
            element: (
              <Loader>
                <Profile />
              </Loader>
            ),
          },
          {
            path: "compras",
            element: (
              <Loader>
                <Orders />
              </Loader>
            ),
          },
          {
            path: "checkout",
            element: (
              <Loader>
                <Checkout />
              </Loader>
            ),
          },
        ],
      },
      {
        path: "panel",
        element: <Admin />,
        children: [
          {
            index: true,
            element: (
              <Loader>
                <Dashboard />
              </Loader>
            ),
          },
        ],
      },
    ],
  },
]);
