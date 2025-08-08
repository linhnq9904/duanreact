import ProductList from "./components/ProductList";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import OrderList from "./components/order";
import ProductCreate from "./components/ProductCreate";
import UserList from "./components/UserList";
import EditProduct from "./components/EditProduct";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetail from "./components/ProductDetail";
import Register from "./components/Register";
import Profile from "./components/Profile";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <PrivateRoute>
                    <ProductList />
                </PrivateRoute>
            ),
        },
        {
            path: "/products",
            element: (
                <PrivateRoute>
                    <ProductList />
                </PrivateRoute>
            ),
        },
        {
            path: "/categories",
            element: (
                <PrivateRoute>
                    <CategoryList />
                </PrivateRoute>
            ),
        },
        {
            path: "/orders",
            element: (
                <PrivateRoute>
                    <OrderList />
                </PrivateRoute>
            ),
        },
        {
            path: "/productCreate",
            element: (
                <PrivateRoute>
                    <ProductCreate />
                </PrivateRoute>
            ),
        },
        {
            path: "/users",
            element: (
                <PrivateRoute>
                    <UserList />
                </PrivateRoute>
            ),
        },
        {
            path: "/product/edit/:id",
            element: (
                <PrivateRoute>
                    <EditProduct />
                </PrivateRoute>
            ),
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/product/detail/:id",
            element: (
                <PrivateRoute>
                    <ProductDetail />
                </PrivateRoute>
            ),
        },
        {
            path: "/Profile",
            element: (
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            ),
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;