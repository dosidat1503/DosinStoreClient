import { useCartInfo } from "../hooks/use-cart-info";
import style from "../styles/cart-popup.module.scss";
import { formatPrice } from "@/helpers";
import routes from "@/configs/routes";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { setIsClickPaymentAtCartPopup } from "@/store/slices/cartSlice";
import CartList from "./cart-list";

const CartPopup = () => {
  const { data } = useCartInfo();
  const carts = data?.data || [];

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isShowPopup = useAppSelector((state) => state.cart.isShowPopup);

  const totalAmount = carts?.reduce((acc, item) => acc + item.GIABAN * item.SOLUONG, 0);

  return (
    <div
      className={clsx(style.cartPopup, {
        [style.showPopup]: isShowPopup,
      })}
    >
      <header className={style.header}>
        <p className={style.headerText}>Sản phẩm đã thêm</p>
      </header>
      <ul className={style.body}>
        <CartList carts={carts} />
      </ul>
      <div className={style.amountTotal}>
        Tổng tiền: <span className={style.amountTotalValue}> {formatPrice(totalAmount)} đ</span>
      </div>
      <footer className={style.footerContainer}>
        <button
          className={style.footerButton}
          onClick={() => {
            navigate(`${routes.payment}`);
            dispatch(setIsClickPaymentAtCartPopup(1));
          }}
        >
          THANH TOÁN
        </button>
        <button
          className={style.footerButton}
          onClick={() => {
            navigate(`${routes.cart}`);
          }}
        >
          XEM GIỎ HÀNG
        </button>
      </footer>
    </div>
  );
};

export default CartPopup;
