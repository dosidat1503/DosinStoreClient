import { useQuery } from "@tanstack/react-query";
import { productDetailKeys } from "../constants";
import { productDetailApi } from "../api";
import { ProductReview } from "../types";
import { maxStar } from "../constants";

const calculateTotalStar = (productReview: ProductReview[]) => {
  return productReview.reduce((acc, item) => acc + item.SOLUONG_SAO, 0);
};

const calculateStarQuantity = (totalStar: number, reviewQuantity: number) => {
  if (reviewQuantity === 0) return { solidStar: 0, regularStar: maxStar };

  const solidStar = Math.ceil(totalStar / reviewQuantity);
  const regularStar = maxStar - solidStar;

  return { solidStar, regularStar };
};

export const useProductReview = (masp: number) => {
  const query = useQuery({
    queryKey: productDetailKeys.productReview(masp),
    queryFn: () => productDetailApi.getProductReviews(masp),
  });

  const infoReviewProduct = query.data?.infoReviewProduct ?? [];
  const reviewQuantity = infoReviewProduct.length;

  const totalStar = calculateTotalStar(infoReviewProduct);
  const showStarQuantity = calculateStarQuantity(totalStar, reviewQuantity);

  return { ...query, data: { infoReviewProduct, showStarQuantity } };
};
