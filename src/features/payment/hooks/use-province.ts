import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "../api";
import { paymentKeys } from "../constants";

export const useProvince = () => {
  const query = useQuery({
    queryKey: paymentKeys.province,
    queryFn: paymentApi.getProvince,
  });

  return query;
};
