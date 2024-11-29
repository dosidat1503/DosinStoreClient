export interface CartInfoRessponse {
  data: CartItem[];
}

export interface CartItem {
  GIABAN: number;
  MAMAU: number;
  MASIZE: string;
  MASP: number;
  MATK: number;
  SELECTED: number;
  SOLUONG: number;
  TENMAU: string;
  TENSP: string;
  TONGGIA: number;
  imgURL: string;
}

export interface UpdatePopupBody {
  matk: string | null;
  masp: number;
  mamau: number;
  masize: string;
  soluong?: number;
  tonggia?: number;
  selected?: number;
}

export interface DeleteBody {
  matk: number | null;
  masp: number;
  mamau: number;
  masize: string;
}

export interface CartHeaderProps {
  carts: CartItem[];
}
