import { useQuery } from "@tanstack/react-query";
import { productCardKeys } from "../constants";
import { homeApi } from "../api";

export const useProductAtHome = () => {
  const query = useQuery({
    queryKey: productCardKeys.productCard,
    queryFn: homeApi.getProductAtHome,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
