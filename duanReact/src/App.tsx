import ProductList from "./components/ProductList";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import OrderList from "./components/order";
import OrderProduct from "./components/OrderProduct";

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
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;