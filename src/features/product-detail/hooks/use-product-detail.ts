import { useQuery } from "@tanstack/react-query";
import { productDetailKeys } from "../constants";
import { productDetailApi } from "../api";

export const useProductDetail = (id: number) => {
  const query = useQuery({
    queryKey: productDetailKeys.productDetail(id),
    queryFn: () => productDetailApi.getProductDetail(id),
  });

  return query;
};
