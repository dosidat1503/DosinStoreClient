import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "../api";
import { paymentKeys } from "../constants";
import { IdProvince } from "../types";

export const useDistrict = (idProvince: IdProvince) => {
  const query = useQuery({
    queryKey: paymentKeys.district(idProvince),
    queryFn: () => paymentApi.getDistrict(idProvince),
    enabled: !!idProvince,
  });

  return query;
};
