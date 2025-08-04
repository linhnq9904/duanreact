import ProductList from "./components/ProductList";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import OrderList from "./components/Order";
import OrderProduct from "./components/OrderProduct";
import ProductCreate from "./components/ProductCreate";
import UserList from "./components/UserList";
import EditProduct from "./components/EditProduct";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import UserProfile from "./components/UserProfile";
import { CartProvider } from "./contexts/CartContext";

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
        {
            path: "/Users",
            element: <UserList />,
        },
        {
            path: "/product/edit/:id",
            element: <EditProduct />,
        },
        {
            path: "/resigter",
            element: <Register />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/product/detail/:id",
            element: <ProductDetail />,
        },
        {
            path: "/cart",
            element: <Cart />,
        },
        {
            path: "/checkout",
            element: <Checkout />,
        },
        {
            path: "/profile",
            element: <UserProfile />,
        },
    ]);
    return (
        <CartProvider>
            <RouterProvider router={router} />
        </CartProvider>
    );
}

export default App;