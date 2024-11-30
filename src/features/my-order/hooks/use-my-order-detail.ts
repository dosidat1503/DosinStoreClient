import { useQuery } from "@tanstack/react-query";
import { myOrderKeys } from "../constants";
import { myOrderApi } from "../api";

export const useMyOrderDetail = (orderCode: number) => {
  const query = useQuery({
    queryKey: myOrderKeys.myOrderDetail(orderCode),
    queryFn: () => myOrderApi.getMyOrderDetail(orderCode),
  });

  return query;
};
