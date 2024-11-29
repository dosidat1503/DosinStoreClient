import request from "@/ultils/request";
import { useEffect } from "react";

const PaymentResult = () => {
  useEffect(() => {
    document.title = "DosiIn | Thanh toán thành công";
  }, []);
  const urlParams = new URLSearchParams(window.location.search);
  const infoPaymentResult = {
    vnp_Amount: urlParams.get("vnp_Amount"),
    vnp_BankCode: urlParams.get("vnp_BankCode"),
    vnp_BankTranNo: urlParams.get("vnp_BankTranNo"),
    vnp_OrderInfo: urlParams.get("vnp_OrderInfo"),
    vnp_PayDate: urlParams.get("vnp_PayDate"),
    vnp_ResponseCode: urlParams.get("vnp_ResponseCode"),
    vnp_TxnRef: urlParams.get("vnp_TxnRef"),
    vnp_TransactionStatus: urlParams.get("vnp_TransactionStatus"),
    vnp_SecureHash: urlParams.get("vnp_SecureHash"),
    vnp_TransactionNo: urlParams.get("vnp_TransactionNo"),
  };

  const handlePaymentResult = () => {
    request.post(`/processPaymentResult`, infoPaymentResult);
  };

  useEffect(() => {
    handlePaymentResult();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h6>Số tiền thanh toán: {infoPaymentResult.vnp_Amount ? Number(infoPaymentResult.vnp_Amount) / 100 : 0}</h6>
        <h6>Mã ngân hàng thanh toán: {infoPaymentResult.vnp_BankCode}</h6>
        <h6>Mã giao dịch: {infoPaymentResult.vnp_BankTranNo}</h6>
        <h6>Nội dung thanh toán: {infoPaymentResult.vnp_OrderInfo}</h6>
        <h6>Trạng thái thanh toán: {infoPaymentResult.vnp_ResponseCode == "00" ? "Thành công" : "Không thành công"}</h6>
        <h6>Mã đơn hàng: {infoPaymentResult.vnp_TxnRef}</h6>
      </div>
    </div>
  );
};

export default PaymentResult;
