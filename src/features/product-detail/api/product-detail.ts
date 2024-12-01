import request from "@/ultils/request";
import { ProductDetailResponse } from "../types";
import { ProductReviewResponse } from "../types";
import { RelativeProductResponse } from "../types";

export const productDetailApi = {
  getProductDetail(id: number) {
    return request.get<any, ProductDetailResponse>(`/productDetail?id=${id}`).then((res) => res);
  },
  getProductReviews(masp: number) {
    return request.get<any, ProductReviewResponse>(`/getProductReviews?masp=${masp}`).then((res) => res);
  },
  getRelativeProduct(masp: string) {
    return request.get<any, RelativeProductResponse>(`/getRelativeProduct?masp=${masp}`).then((res) => res);
  },
};
