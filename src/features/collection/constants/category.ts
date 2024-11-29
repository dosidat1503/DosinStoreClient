export const categoryKeys = {
  category: ["collectionCategory"],
  categoryByFashionType: (fashionType: number) => [...categoryKeys.category, fashionType],
};
