import { useQuery } from "@tanstack/react-query";
import { accountInfoKeys } from "../constants";
import { accountInfoApi } from "../api";

export const useBaseInfo = () => {
  const query = useQuery({
    queryKey: accountInfoKeys.accountInfo,
    queryFn: accountInfoApi.getAccountInfo,
  });

  return query;
};
