import { useMutation } from "@tanstack/react-query";
import { paymentApi } from "../api";
import { SaveOrderBody } from "../types";

export const useSaveOrder = () => {
  return useMutation({
    mutationFn: (body: SaveOrderBody) => paymentApi.saveOrder(body),
  });
};
