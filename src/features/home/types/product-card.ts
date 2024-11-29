export interface Product {
  GIABAN: number;
  GIAGOC: number;
  MAPL_SP: number;
  MASP: number;
  TENSP: string;
  imgURL: string;
}

export interface ProductCardProps {
  products: Product[];
  type: string;
}

export interface ProductCardResponse {
  dataHotProduct: Product[];
  dataNewProduct: Product[];
}
