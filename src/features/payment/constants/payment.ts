import { IdDistrict, IdProvince } from "../types";

export const paymentKeys = {
  payment: ["payment"],
  province: ["province"],
  districts: ["districts"],
  district: (idProvince: IdProvince) => [paymentKeys.districts, { idProvince }],
  communes: ["communes"],
  commune: (idDistrict: IdDistrict) => [paymentKeys.communes, { idDistrict }],
};

export const defaultDeliveryFee = 25000;
export const HCMDeliveryFee = 20000;
export const HCMCity = "Hồ Chí Minh";
export const uncompletePayment = "Chưa thanh toán";
export const paying = "Đang thanh toán";
export const prepareProduct = "Chuẩn bị hàng";
export const payWhenReceive = "Thanh toán khi nhận hàng";
export const payOnline = "Chuyển khoản";
export const transportVoucher = "Vận chuyển";
export const wrongVoucher = "Nhập sai mã voucher";
export const outOfUseVoucher = "Voucher hết lượt sử dụng";
export const notEnoughMin = "Giá trị đơn hàng không đạt tối thiểu";

export const shipInformationInitial = {
  name: "",
  numberPhone: "",
  address: "",
  city: "",
  district: "",
  ward: "",
};
export const infoToSaveOrderInitial = {
  inputVoucher: "",
  discountVoucher: 0,
  oldAddressCode: "",
  paymentMethod: "Thanh toán khi nhận hàng",
  deliveryFee: defaultDeliveryFee,
  totalPayable: 0,
  totalProductAmount: 0,
  deliveryFeeBeforeApplyVoucher: 0,
};
