import { useMutation } from "@tanstack/react-query";
import { DeleteBody } from "../types";
import { cartApi } from "../api";

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (body: DeleteBody) => cartApi.deleteProduct(body),
  });
};
