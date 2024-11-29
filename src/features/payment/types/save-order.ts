export interface SaveOrderBody {
  address: string;
  city: string;
  deliveryFee: number;
  district: string;
  ghichu: string;
  hinhthucthanhtoan: string;
  infoProductJSON: string;
  matk: string | null;
  mattgh: number | string;
  mavoucher: string;
  name: string;
  ngayorder: string;
  numberPhone: string;
  tongtien_SP: number;
  tongtiendonhang: number;
  trangthaidonhang: string;
  trangthaithanhtoan: string;
  vouchergiam: number;
  ward: string;
}

export interface SaveOrderResponse {
  message: string;
  code?: string;
  vnp_Url?: string;
  product_quantity_error?: [];
}
