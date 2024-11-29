import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "../constants";
import { collectionApi } from "../api";

export const useCategory = (fashionType: number) => {
  const query = useQuery({
    queryKey: categoryKeys.categoryByFashionType(fashionType),
    queryFn: () => collectionApi.getCategory(fashionType),
  });
  return query;
};
