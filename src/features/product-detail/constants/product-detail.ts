export const productDetailKeys = {
  productDetails: ["productDetails"],
  productDetail: (id: number) => [...productDetailKeys.productDetails, id],
  productReviews: ["productReviews"],
  productReview: (masp: number) => [...productDetailKeys.productReviews, masp],
  relativeProducts: ["relativeProducts"],
  relativeProduct: (masp: string) => [...productDetailKeys.relativeProducts, masp],
};
