import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import AllProducts from "../pages/AllProducts/AllProducts";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import MyProducts from "../pages/MyProducts/MyProducts";
import MyBids from "../pages/MyBids/MyBids";
import CreateProduct from "../pages/CreateProduct/CreateProduct";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../components/ProductDetails/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
            path: "allProducts",
            Component: AllProducts,
        },
        {
          path: "login",
          Component: Login,
        },
        {
          path: "signup",
          Component: SignUp
        },
        {
          path: "myProducts",
          element: <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        },
        {
          path: "myBids",
          element: <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        },
        {
          path: "createProduct",
          element: <PrivateRoute>
            <CreateProduct></CreateProduct>
          </PrivateRoute>
        },
        {
          path: "product-details/:id",
          loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
          Component: ProductDetails,
        }
    ]
  },
]);