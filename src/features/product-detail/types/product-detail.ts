export interface ProductDetailResponse {
  data_hinhanh: Image[];
  data_mamau: Color[];
  data_sanpham: ProductDetail;
  data_size: Size[];
  data_tungloaisanpham: ProductType[];
  data_xacDinhSoLuong: DefineQuantity[];
}

export interface Image {
  MAHINHANH: string;
  imgURL: string;
}

export interface Color {
  HEX: string;
  MAMAU: number;
  TENMAU: string;
}

export interface ProductType {
  MAMAU: number;
  MASIZE: string;
  MASP: number;
  MAXDSP: number;
  SOLUONG: number;
}

export interface ProductDetail {
  GIABAN: number;
  GIAGOC: number;
  MAPL_SP: number;
  MAPL_SP2: number;
  MASP: number;
  MOTA: string;
  TENSP: string;
  created_at: string;
  updated_at: string;
}

export interface Size {
  MASIZE: string;
}

export interface DefineQuantity {
  MASIZE: string;
  MAMAU: number;
  SOLUONG: number;
}

export interface PropertyDefineProductType {
  colorCode: number;
  sizeCode: string;
  quantity: number;
}
