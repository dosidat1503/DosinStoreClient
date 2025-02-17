import style from "@/features/cart/styles/cart.module.scss";

import { useEffect } from "react";
import { CartFooter, CartBody, CartHeader } from "@/features/cart/components";
import clsx from "clsx";
import { useCartInfo } from "@/features/cart/hooks";
import { totalAmount } from "@/helpers";
import { Skeleton } from "antd";

const { containerContent, textHeaderContent, tbodyTableCart } = style;

const Cart = () => {
  useEffect(() => {
    document.title = "DosiIn | Giỏ hàng";
  }, []);

  const { data, isLoading } = useCartInfo();
  const carts = data?.data.reverse() || [];

  if (isLoading) return <Skeleton />;

  return (
    <div className={clsx("container", "mt-3", containerContent)}>
      <h1 className={textHeaderContent}>GIỎ HÀNG</h1>
      <div className={tbodyTableCart}>
        <table className="table table-hover">
          <CartHeader carts={carts} />
          <CartBody carts={carts} />
        </table>
      </div>
      <CartFooter totalAmount={totalAmount(carts)} />
    </div>
  );
};
export default Cart;
