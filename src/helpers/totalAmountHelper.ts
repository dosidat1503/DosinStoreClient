import { CartItem } from "@/features/cart/types";

const totalAmount = (carts: CartItem[]) => {
  return carts.reduce((total, item) => (item.SELECTED === 1 ? total + item.GIABAN * item.SOLUONG : total), 0);
};

export { totalAmount };
