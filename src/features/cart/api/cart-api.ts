import request from "@/ultils/request";
import { CartInfoRessponse, DeleteBody } from "../types";
import { UpdatePopupBody } from "../types";

export const cartApi = {
  getCartInfo() {
    const data = { matk: localStorage.getItem("userId") };

    return request.get<any, CartInfoRessponse>("/cartInfo", { params: data }).then((res) => res);
  },
  updateQuantity(body: UpdatePopupBody) {
    return request.post<any, { status: number }>("/updateQuantityProductInCart", body).then((res) => res);
  },
  addProduct(body: UpdatePopupBody) {
    return request.post<any, { status_code: number }>("/addToCart", body).then((res) => res);
  },
  deleteProduct(body: DeleteBody) {
    return request.post<any, { message: number }>("/deleteItemCart", body).then((res) => res);
  },
  selectProduct(body: UpdatePopupBody) {
    return request.post<any, { message: number }>("/updateSelectedProperty", body).then((res) => res);
  },
};
