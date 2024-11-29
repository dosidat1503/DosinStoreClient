import { useQuery } from "@tanstack/react-query";
import { collectionKeys } from "../constants";
import { collectionApi } from "../api";
import { ParamsGetCollection } from "../types";

export const useCollection = (paramsGetCollection: ParamsGetCollection) => {
  const query = useQuery({
    queryKey: collectionKeys.collectionList(paramsGetCollection),
    queryFn: () => collectionApi.getCollection(paramsGetCollection),
  });
  return query;
};
