import request from "@/ultils/request";
import { ProductCardResponse } from "../types";

export const homeApi = {
  getProductAtHome() {
    return request.get<any, ProductCardResponse>("/getProductAtHome").then((res) => res);
  },
};
