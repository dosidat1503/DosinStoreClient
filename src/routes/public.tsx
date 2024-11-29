import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import routes from "@/configs/routes";

import UserLayout from "@/components/Layouts/UserLayout";
const Home = lazy(() => import("@/pages/User/Home/home"));
const Collection = lazy(() => import("@/pages/User/Collection/collection"));
const ProductDetail = lazy(() => import("@/pages/User/ProductDetail/product-detail"));
const Authentication = lazy(() => import("@/pages/User/Authentication/authentication"));

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routes.collection,
        element: <Collection />,
      },
      {
        path: routes.productDetail,
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: routes.authenticate,
    element: <Authentication />,
  },
];
