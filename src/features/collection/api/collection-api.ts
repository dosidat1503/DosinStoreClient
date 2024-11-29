import request from "@/ultils/request";
import { CategoryResponse, CollectionResponse, ParamsGetCollection } from "../types";

export const collectionApi = {
  getCategory(fashionType: number) {
    return request
      .get<any, CategoryResponse>("/getCategory", { params: { fashionType: fashionType } })
      .then((res) => res);
  },
  getCollection(paramsGetCollection: ParamsGetCollection) {
    return request
      .get<any, CollectionResponse>("/getProductCollection", { params: paramsGetCollection })
      .then((res) => res);
  },
};
