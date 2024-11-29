import { useQuery } from "@tanstack/react-query";
import { paymentKeys } from "../constants";
import { paymentApi } from "../api";
import { useAppSelector } from "@/store";

export const useInfoForPayment = () => {
  const isClickPaymentAtCartPopup = useAppSelector((state) => state.cart.isClickPaymentAtCartPopup);

  const body = {
    matk: localStorage.getItem("auth_matk"),
    selected: 1,
    clickPaymentFromCart: isClickPaymentAtCartPopup,
  };

  const query = useQuery({
    queryKey: paymentKeys.payment,
    queryFn: () => paymentApi.getInfoForPayment(body),
    staleTime: 0,
  });

  return query;
};
