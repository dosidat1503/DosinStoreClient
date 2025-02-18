import { useQuery } from "@tanstack/react-query";
import { cartKeys } from "../constants";
import { cartApi } from "../api";
import { useSelector } from "react-redux";

export interface AuthStateProps {
  auth: {
    isSignIn: boolean;
  };
}

export const useCartInfo = () => {
  const isSignIn = useSelector((state: AuthStateProps) => state.auth.isSignIn);
  const query = isSignIn
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useQuery({
        queryKey: cartKeys.cart,
        queryFn: cartApi.getCartInfo,
      })
    : { data: null, isLoading: false, error: null };

  return query;
};
