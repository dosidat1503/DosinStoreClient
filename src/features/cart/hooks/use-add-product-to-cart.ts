import { useMutation } from "@tanstack/react-query";
import { UpdatePopupBody } from "../types";
import { cartApi } from "../api";

export const useAddProductToCart = () => {
  return useMutation({
    mutationFn: (body: UpdatePopupBody) => cartApi.addProduct(body),
  });
};
