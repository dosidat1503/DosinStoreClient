import style from "../styles/cart-footer.module.scss";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { formatPrice } from "@/helpers";
import routes from "@/configs/routes";

const {
  btnContinue,
  boxPayment,
  linePayment,
  boxPaymentTongTien,
  total,
  boxPaymentButton,
  btnPaymentCart,
  contentBottom,
} = style;

const CartFooter = (props: { totalAmount: number }) => {
  const { totalAmount } = props;
  const Navigate = useNavigate();

  const handleClickPayment = () => {
    Navigate(`${routes.payment}`);
  };

  const handleContinuelyBuy = () => {
    Navigate(`${routes.home}`);
  };

  return (
    <div className={clsx("container mt-5", contentBottom)}>
      <div>
        <button className={btnContinue} onClick={handleContinuelyBuy}>
          Tiếp tục mua sắm
        </button>
      </div>
      <div className={boxPayment}>
        <hr className={linePayment} />
        <div className={boxPaymentTongTien}>
          <p>
            <b>Tổng tiền</b>
          </p>
          <p className={total}>
            <b>{formatPrice(totalAmount)}đ</b>
          </p>
        </div>
        <div className={boxPaymentButton}>
          <button className={btnPaymentCart} onClick={handleClickPayment}>
            THANH TOÁN
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
