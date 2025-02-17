/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import routes from "@/configs/routes";

import UserLayout from "@/components/Layouts/user-layout";
import { UnAuthenticated } from "@/features/authentication/components";
const AccountInfo = lazy(() => import("@/pages/user/account-info/account-info"));
const Cart = lazy(() => import("../pages/user/cart/cart"));
const Payment = lazy(() => import("@/pages/user/payment/payment"));
const PaymentResult = lazy(() => import("@/features/payment/components/payment-result"));
const MyOder = lazy(() => import("@/pages/user/my-order/my-order"));
const MyOrderDetail = lazy(() => import("@/features/my-order/components/order-detail"));

export const protectedRoutes = [
  {
    path: "/",
    element: (
      <UnAuthenticated>
        <UserLayout />
      </UnAuthenticated>
    ),
    children: [
      {
        path: routes.accountInfo,
        element: <AccountInfo />,
      },
      {
        path: routes.cart,
        element: <Cart />,
      },
      {
        path: routes.payment,
        element: <Payment />,
      },
      {
        path: routes.paymentResult,
        element: <PaymentResult />,
      },
      {
        path: routes.myOrder,
        element: <MyOder />,
      },
      {
        path: routes.myOrderDetail,
        element: <MyOrderDetail />,
      },
    ],
  },
];
