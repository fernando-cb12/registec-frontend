import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductList from "../components/productList";
import ErrorPage from "../components/errorPage";


const router = createBrowserRouter([
    {
    path: "/",
    element: <App />,
    children: [
    {
    path: "/products",
    element: <ProductList/>,
    errorElement: <ErrorPage />,
    }
    ],
    errorElement: <ErrorPage />,
    },
    ]);
    export default router;