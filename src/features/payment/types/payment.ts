import { CartItem } from "@/features/cart/types";

export interface InfoForPaymentResponse {
  products: CartItem[];
  vouchers: Voucher[];
  address: Address[];
}

export interface Address {
  DANGSUDUNG: number;
  DIACHI: string;
  MATK: number;
  MATTGH: number;
  PHUONG_XA: string;
  QUAN_HUYEN: string;
  SDT: string;
  TEN: string;
  TINH_TP: string;
}

export interface Voucher {
  GIATRIGIAM: number;
  GIATRI_DH_MIN: number;
  GIATRI_GIAM_MAX: number;
  MAVOUCHER: string;
  PHANLOAI_VOUCHER: string;
  SOLUONG: number;
  SOLUONG_CONLAI: number;
}

export interface BodyGetInfoForPayment {
  matk: string | null;
  selected: number;
  clickPaymentFromCart: number;
}

export interface InfoToSaveOrder {
  inputVoucher: string;
  discountVoucher: number;
  oldAddressCode: number | string;
  paymentMethod: string;
  deliveryFee: number;
  totalPayable: number | string;
  totalProductAmount: number;
  deliveryFeeBeforeApplyVoucher: number;
}

export type IdProvince = string | null;
export type IdDistrict = string | null;
