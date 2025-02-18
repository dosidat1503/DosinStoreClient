import clsx from "clsx";
import style from "../styles/payment.module.scss";
import routes from "@/configs/routes";
import { PerformPaymentProps, SaveOrderResponse } from "../types";
import { useInfoForPayment, useSaveOrder } from "../hooks";
import {
  defaultDeliveryFee,
  HCMDeliveryFee,
  paying,
  payWhenReceive,
  prepareProduct,
  uncompletePayment,
} from "../constants";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";

const PerformPayment = (props: PerformPaymentProps) => {
  const { shipInformation, infoToSaveOrder, setIsInputShipInformationValidated } = props;
  const { data: infoForPayment } = useInfoForPayment();
  const { mutateAsync: SaveOrderMutate, isPending, isSuccess } = useSaveOrder();
  const navigate = useNavigate();

  if (isPending) return <Skeleton active />;
  if (isSuccess) return <></>;

  const handleSaveInfoForPayment = () => {
    const phoneRegex = /^0\d{9}$/;
    const {
      deliveryFee,
      discountVoucher,
      totalProductAmount,
      deliveryFeeBeforeApplyVoucher,
      paymentMethod,
      inputVoucher,
      oldAddressCode,
    } = infoToSaveOrder;

    if (shipInformation.numberPhone !== "") {
      if (!phoneRegex.test(shipInformation.numberPhone)) {
        alert("Số điện thoại không đúng định dạng");
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
    }
    const isEmpty = Object.values(shipInformation).some((value) => value === "");

    if (isEmpty) {
      setIsInputShipInformationValidated(true);

      alert("Vui lòng điền đầy đủ thông tin giao hàng");
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (infoForPayment?.products.length === 0) {
      alert("Không có sản phẩm nào để đặt hàng");
    } else {
      const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      };

      let voucherGiam = 0;
      if (deliveryFee === defaultDeliveryFee || deliveryFee === HCMDeliveryFee) {
        if (discountVoucher > 0) voucherGiam = totalProductAmount * discountVoucher;
        else voucherGiam = 0;
      } else voucherGiam = deliveryFeeBeforeApplyVoucher - deliveryFee;

      let totalPayable = 0;
      if ((deliveryFee === defaultDeliveryFee || deliveryFee === HCMDeliveryFee) && discountVoucher > 0) {
        totalPayable = totalProductAmount - totalProductAmount * discountVoucher + deliveryFee;
      } else {
        totalPayable = totalProductAmount + deliveryFee;
      }

      let orderStatus = paymentMethod === payWhenReceive ? prepareProduct : paying;

      let voucherCode = discountVoucher > 0 ? inputVoucher : "";

      const infoForOrder = {
        matk: localStorage.getItem("userId"),
        ngayorder: getCurrentDate(),
        tongtien_SP: totalProductAmount,
        vouchergiam: voucherGiam,
        tongtiendonhang: totalPayable,
        deliveryFee: deliveryFee,
        hinhthucthanhtoan: paymentMethod,
        trangthaithanhtoan: uncompletePayment,
        trangthaidonhang: orderStatus,
        mavoucher: voucherCode,
        mattgh: oldAddressCode,
        ghichu: "",
      };
      const infoProductJSON = JSON.stringify(infoForPayment?.products);
      const allDataForSaveInfoPayment = {
        ...shipInformation,
        // ...infoForPayment?.products,
        ...infoForOrder,
        infoProductJSON,
      };
      SaveOrderMutate(allDataForSaveInfoPayment).then((res: SaveOrderResponse) => {
        if ((res.product_quantity_error?.length ?? 0) > 0) {
          const contentString = res?.product_quantity_error?.join("\n");

          alert("Số lượng sản phẩm còn lại không đủ đáp ứng" + contentString);
        } else if (res.vnp_Url) window.location.href = res.vnp_Url;
        else {
          alert("Đơn hàng đã được tạo thành công Chuyển đến trang quản lý đơn hàng trong 3s");

          setTimeout(() => {
            navigate(`${routes.myOrder}`);
          }, 1500);
        }
      });
    }
  };

  return (
    <div className="  row justify-content-center" style={{ marginTop: "30px" }}>
      <div className="col-4">
        <button className={clsx(style.buttonConfirm, "float-start")} onClick={handleSaveInfoForPayment}>
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default PerformPayment;
