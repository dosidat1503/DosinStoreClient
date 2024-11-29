import { useMutation } from "@tanstack/react-query";
import { UpdatePopupBody } from "../types";
import { cartApi } from "../api";

export const useUpdateQuantityPopup = () => {
  return useMutation({
    mutationFn: (body: UpdatePopupBody) => cartApi.updateQuantity(body),
  });
};
