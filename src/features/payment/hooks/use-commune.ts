import { useQuery } from "@tanstack/react-query";
import { paymentKeys } from "../constants";
import { paymentApi } from "../api";
import { IdDistrict } from "../types";

export const useCommune = (idDistrict: IdDistrict) => {
  const query = useQuery({
    queryKey: paymentKeys.commune(idDistrict),
    queryFn: () => paymentApi.getCommune(idDistrict),
    enabled: !!idDistrict,
  });

  return query;
};
