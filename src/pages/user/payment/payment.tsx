import { DeliveryInfo, PaymentInfo } from "@/features/payment/components";
import { useInfoForPayment } from "@/features/payment/hooks";
import { InfoToSaveOrder, ShipInformation } from "@/features/payment/types";
import { setIsClickPaymentAtCartPopup } from "@/store/slices/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { shipInformationInitial, infoToSaveOrderInitial } from "@/features/payment/constants";
import ProductList from "@/features/payment/components/product-list";
import style from "@/features/payment/styles/payment.module.scss";
import clsx from "clsx";
import { Divider, Skeleton } from "antd";
import PerformPayment from "@/features/payment/components/perform-payment";

const Payment = () => {
  useEffect(() => {
    document.title = "DosiIn | Thanh toán";
  }, []);
  const dispatch = useDispatch();
  const { data: infoForPayment, isLoading, isError } = useInfoForPayment();

  const [isInputShipInformationValidated, setIsInputShipInformationValidated] = useState<boolean>(false);

  const [shipInformation, setShipInformation] = useState<ShipInformation>(shipInformationInitial);
  const [infoToSaveOrder, setInfoToSaveOrder] = useState<InfoToSaveOrder>(infoToSaveOrderInitial);

  useEffect(() => {
    if (infoForPayment) {
      const total = infoForPayment.products.reduce((acc, item) => (acc += item.TONGGIA), 0);

      setInfoToSaveOrder({
        ...infoToSaveOrder,
        totalPayable: total + infoToSaveOrder.deliveryFee,
        totalProductAmount: total,
      });
      dispatch(setIsClickPaymentAtCartPopup(0));
    }
  }, [infoForPayment]);

  if (isLoading) return <Skeleton active style={{ marginTop: "20px" }} />;
  if (isError) return <h1>Không thể load thông tin thanh toán</h1>;

  return (
    <div>
      <div
        className={clsx("container col-lg-7 needs-validation", style.bodyBox, {
          ["was-validated"]: isInputShipInformationValidated,
        })}
      >
        <DeliveryInfo
          shipInformation={shipInformation}
          setShipInformation={setShipInformation}
          infoToSaveOrder={infoToSaveOrder}
          setInfoToSaveOrder={setInfoToSaveOrder}
        />
        <ProductList />
        <div>
          <Divider variant="solid" style={{ borderColor: "gray" }} />
          <PaymentInfo infoToSaveOrder={infoToSaveOrder} setInfoToSaveOrder={setInfoToSaveOrder} />
          <PerformPayment
            infoToSaveOrder={infoToSaveOrder}
            shipInformation={shipInformation}
            setIsInputShipInformationValidated={setIsInputShipInformationValidated}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
