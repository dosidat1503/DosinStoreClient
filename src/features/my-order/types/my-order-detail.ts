export interface MyOrderDetailResponse {
  relate_order: RelativeOrder[];
  relate_order_detail: RelativeOrderDetail[];
}

export interface RelativeOrder {
  DIACHI: string;
  GHICHU: string;
  HINHTHUC_THANHTOAN: string;
  MADH: number;
  NGAYORDER: string;
  PHIVANCHUYEN: number;
  PHUONG_XA: string;
  QUAN_HUYEN: string;
  SDT: string;
  TEN: string;
  TINH_TP: string;
  TONGTIEN: number;
  TONGTIENDONHANG: number;
  TONGTIEN_SP: number;
  TRANGTHAI_DONHANG: string;
  TRANGTHAI_THANHTOAN: string;
  VOUCHERGIAM: number;
}

export interface RelativeOrderDetail {
  GIABAN: number;
  HEX: string;
  MASIZE: string;
  MASP: number;
  MAXDSP: number;
  SOLUONG: number;
  TENMAU: string;
  TENSP: string;
  TONGTIEN: number;
  imgURL: string;
}
