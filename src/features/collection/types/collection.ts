import { Product } from "../../home/types/product-card";

export interface CollectionResponse {
  productList: Product[];
  quantity: Quantity[];
}

interface Quantity {
  MAPL_SP: number;
  SL_MASP: number;
}

export interface ParamsGetCollection {
  start: number;
  numberProductEachPage: number;
  fashionType: number;
  category: number;
  sortBy: string;
  query_data: string;
}
