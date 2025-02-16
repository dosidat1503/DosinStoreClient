import clsx from "clsx";
import style from "../styles/payment-info.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "@/helpers";
import { useState } from "react";

import {
  defaultDeliveryFee,
  HCMDeliveryFee,
  wrongVoucher,
  outOfUseVoucher,
  notEnoughMin,
  transportVoucher,
  payWhenReceive,
  payOnline,
} from "../constants";
import { PaymentInfoProps } from "../types/payment-info";
import { useInfoForPayment } from "../hooks";

const PaymentInfo = (props: PaymentInfoProps) => {
  const { infoToSaveOrder, setInfoToSaveOrder } = props;
  const vouchers = useInfoForPayment().data?.vouchers;
  const {
    deliveryFee,
    totalProductAmount,
    discountVoucher,
    totalPayable,
    deliveryFeeBeforeApplyVoucher,
    paymentMethod,
    inputVoucher,
  } = infoToSaveOrder;

  const [voucherError, setVoucherError] = useState("");
  console.log(voucherError);
  const isDisableApplyVoucher =
    discountVoucher > 0 || (deliveryFee !== defaultDeliveryFee && deliveryFee !== HCMDeliveryFee);
  const voucherDiscountPercent =
    deliveryFee === defaultDeliveryFee || deliveryFee === HCMDeliveryFee
      ? formatPrice(discountVoucher * totalProductAmount)
      : formatPrice(deliveryFeeBeforeApplyVoucher - deliveryFee);

  const handleChooseMethodPayment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInfoToSaveOrder({ ...infoToSaveOrder, paymentMethod: e.currentTarget.value });
  };

  const handleInputVoucher = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoToSaveOrder({ ...infoToSaveOrder, inputVoucher: e.currentTarget.value });
  };

  const handleApplyVoucher = () => {
    const item = vouchers?.find((item) => item.MAVOUCHER === inputVoucher) || null;
    if (item === null) {
      setVoucherError(wrongVoucher);
      alert(wrongVoucher);
    } else {
      const voucherCase = {
        outOfUse: item.SOLUONG_CONLAI === 0,
        transportVoucher: item.PHANLOAI_VOUCHER === transportVoucher,
      };

      if (voucherCase.outOfUse) {
        setVoucherError(outOfUseVoucher);
        alert(outOfUseVoucher);
      } else if (voucherCase.transportVoucher) {
        if (totalProductAmount < item.GIATRI_DH_MIN) {
          setVoucherError(notEnoughMin);
          alert(notEnoughMin);
        } else {
          const deliveryFeeCaculated = deliveryFee - item.GIATRIGIAM * deliveryFee;

          const totalPayableCaculated = totalProductAmount + deliveryFee - item.GIATRIGIAM * deliveryFee;

          const discountVoucherCaculated = item.GIATRIGIAM;

          setInfoToSaveOrder({
            ...infoToSaveOrder,
            discountVoucher: discountVoucherCaculated,
            deliveryFee: deliveryFeeCaculated,
            totalPayable: totalPayableCaculated,
            deliveryFeeBeforeApplyVoucher: deliveryFee,
          });
        }
      } else if (!voucherCase.transportVoucher) {
        if (totalProductAmount < item.GIATRI_DH_MIN) {
          setVoucherError(notEnoughMin);
          alert(notEnoughMin);
        } else {
          if (totalProductAmount * item.GIATRIGIAM > item.GIATRI_GIAM_MAX) {
            const discountVoucherCaculated = item.GIATRI_GIAM_MAX / totalProductAmount;
            const totalPayableCaculated =
              totalProductAmount + deliveryFee - totalProductAmount * discountVoucherCaculated;

            setInfoToSaveOrder({
              ...infoToSaveOrder,
              discountVoucher: discountVoucherCaculated,
              totalPayable: totalPayableCaculated,
            });
          } else {
            const discountVoucherCaculated = item.GIATRIGIAM;
            const totalPayableCaculated = totalProductAmount + deliveryFee - totalProductAmount * item.GIATRIGIAM;

            setInfoToSaveOrder({
              ...infoToSaveOrder,
              discountVoucher: discountVoucherCaculated,
              totalPayable: totalPayableCaculated,
            });
          }
        }
      }
    }
  };

  return (
    <div>
      <div className={clsx(style.voucherContainer, "row", "justify-content-end")}>
        <div className={clsx("col-3", style.verticalCenter)}>
          <span>Mã Voucher:</span>
        </div>
        <div className="col-4">
          <input
            type="text"
            className="form-control"
            value={inputVoucher}
            onChange={handleInputVoucher}
            disabled={discountVoucher > 0}
          />
        </div>
        <div className={clsx("col-2", style.verticalCenter)}>
          {!isDisableApplyVoucher && (
            <button onClick={handleApplyVoucher} className={clsx(style.applyVoucherButton)}>
              Áp dụng
            </button>
          )}
          {isDisableApplyVoucher && (
            <FontAwesomeIcon icon={faCheckCircle} className={clsx(style.iconApplyVoucherSuccess)} />
          )}
        </div>
      </div>
      <div className="row justify-content-end" style={{ marginTop: "10px" }}>
        <div className={clsx("col-3", style.verticalCenter)}>
          <span>Số tiền Voucher giảm:</span>
        </div>
        <div className="col-4">
          <span className={style.discountPriceText}>
            {discountVoucher === 0 ? discountVoucher : `-${voucherDiscountPercent} đ`}
          </span>
        </div>
        <div className="col-2 text-start"></div>
      </div>
      <div className="row justify-content-end">
        <div className={clsx("col-3", style.verticalCenter)}>
          <span>Tổng tiền sản phẩm:</span>
        </div>
        <div className="col-4">
          <span className={style.discountPriceText}>{formatPrice(totalProductAmount || 0)} đ</span>
        </div>
        <div className="col-2 text-start"></div>
      </div>
      <div className="row justify-content-end">
        <div className={clsx("col-3", style.verticalCenter)}>
          <span>Phí vận chuyển:</span>
        </div>
        <div className="col-4">
          <span>{formatPrice(deliveryFee)} đ</span>
        </div>
        <div className={clsx("col-2", "text-start")}></div>
      </div>
      <div className="row justify-content-end">
        <div className={clsx("col-3", style.verticalCenter)}>
          <span>Tổng số tiền thanh toán:</span>
        </div>
        <div className="col-4">
          <span className={clsx("fw-bold", style.discountPriceText)}>
            {totalPayable === "" ? "" : formatPrice(parseInt(totalPayable.toString()))}đ
          </span>
        </div>
        <div className={clsx("col-2", "text-start")}></div>
      </div>
      <div className="row justify-content-end" style={{ marginTop: "10px" }}>
        <div className={clsx("col-3", style.verticalCenter)}>
          <span>Phương thức thanh toán</span>
        </div>
        <div className="col-4">
          <select
            className={clsx("form-select", style.selectContainer)}
            required
            name="paymentMethod"
            onChange={handleChooseMethodPayment}
            value={paymentMethod}
          >
            <option value={`${payWhenReceive}`}>{payWhenReceive}</option>
            <option value={`${payOnline}`}>{payOnline}</option>
          </select>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default PaymentInfo;
