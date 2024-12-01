import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import routes from "@/configs/routes";

import UserLayout from "@/components/Layouts/user-layout";
const Home = lazy(() => import("@/pages/user/home/home"));
const Collection = lazy(() => import("@/pages/user/collection/collection"));
const ProductDetail = lazy(() => import("@/pages/user/product-detail/product-detail"));
const Authentication = lazy(() => import("@/pages/user/authentication/authentication"));
const SignUpSuccess = lazy(() => import("@/features/authentication/components/sign-up-success"));

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
  {
    path: routes.signUpSuccess,
    element: <SignUpSuccess />,
  },
];
