import { useQuery } from "@tanstack/react-query";
import { myOrderKeys } from "../constants";
import { myOrderApi } from "../api";
import { GetMyOrderBody } from "../types";

export const useMyOrder = (body: GetMyOrderBody) => {
  const query = useQuery({
    queryKey: myOrderKeys.myOrder(body),
    queryFn: () => myOrderApi.getMyOrder(body),
  });

  return query;
};
