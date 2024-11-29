import { useMutation } from "@tanstack/react-query";
import { UpdatePopupBody } from "../types";
import { cartApi } from "../api";

export const useSelectedProduct = () => {
  return useMutation({
    mutationFn: (body: UpdatePopupBody) => cartApi.selectProduct(body),
  });
};
