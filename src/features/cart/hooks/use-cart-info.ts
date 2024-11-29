import { useQuery } from "@tanstack/react-query";
import { cartKeys } from "../constants";
import { cartApi } from "../api";

export const useCartInfo = () => {
  const query = useQuery({
    queryKey: cartKeys.cart,
    queryFn: cartApi.getCartInfo,
  });

  return query;
};
