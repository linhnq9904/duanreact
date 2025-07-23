import ProductList from "./components/ProductList";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import OrderList from "./components/Order";
import OrderProduct from "./components/OrderProduct";
import ProductCreate from "./components/ProductCreate";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductList />,
    },
    {
      path: "/products",
      element: <ProductList />,
    },
    {
      path: "/categories",
      element: <CategoryList />,
    },
    {
      path: "/Orders",
      element: <OrderList />,
    },
    {
      path: "/OrderProduct",
      element: <OrderProduct />,
    },
    {
      path: "/ProductCreate",
      element: <ProductCreate />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;