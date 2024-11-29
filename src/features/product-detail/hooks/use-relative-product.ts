import { useQuery } from "@tanstack/react-query";
import { productDetailKeys } from "../constants";
import { productDetailApi } from "../api";

export const useRelativeProduct = (masp: string) => {
  const query = useQuery({
    queryKey: productDetailKeys.relativeProduct(masp),
    queryFn: () => productDetailApi.getRelativeProduct(masp),
  });

  return query;
};
