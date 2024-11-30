export interface MyOrderResponse {
  orderList: OrderDetails[];
}

export interface OrderDetails {
  DANGSUDUNG: number;
  DIACHI: string;
  HINHTHUC_THANHTOAN: string;
  MADH: number;
  NGAYORDER: string;
  PHUONG_XA: string;
  QUAN_HUYEN: string;
  SDT: string;
  TEN: string;
  TINH_TP: string;
  TONGTIENDONHANG: number;
  TONGTIEN_SP: number;
  TRANGTHAI_THANHTOAN: string;
}

export interface Status {
  name: string;
  path: string;
}

export interface GetMyOrderBody {
  start: number;
  tenTrangThai: string;
  numberOrderEachPage: number;
  matk: string;
}
