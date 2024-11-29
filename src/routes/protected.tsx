import { lazy } from "react";
import routes from "@/configs/routes";

import UserLayout from "../components/Layouts/UserLayout";
const AccountInfo = lazy(() => import("@/pages/User/AccountInfo/accountInfo"));
const Cart = lazy(() => import("@/pages/User/Cart/cart"));
const Payment = lazy(() => import("@/pages/User/Payment/payment"));
const PaymentResult = lazy(() => import("@/features/payment/components/payment-result"));

export const protectedRoutes = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: routes.infoAccount,
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
    ],
  },
];
