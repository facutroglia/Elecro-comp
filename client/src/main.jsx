import { RouterProvider } from "react-router/dom";
import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { App } from "./App.jsx";
import { UserProvider } from "./context/useUser.jsx";
import { CartProvider } from "./context/useCart.jsx";
import { MobileProvider } from "./context/useMobile.jsx";
const $ = (selector) => document.getElementById(selector);
const $root = $("root");
const root = createRoot($root);
root.render(
  <Fragment>
    <UserProvider>
      <CartProvider>
        <MobileProvider>
          <RouterProvider router={App} />
        </MobileProvider>
      </CartProvider>
    </UserProvider>
  </Fragment>,
);
