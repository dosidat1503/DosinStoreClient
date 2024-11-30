import request from "@/ultils/request";
import { GetMyOrderBody, MyOrderDetailResponse, MyOrderResponse } from "../types";

export const myOrderApi = {
  getMyOrder(body: GetMyOrderBody) {
    const data = { params: body };
    return request.get<any, MyOrderResponse>("/getInfoMyOrder", data).then((res) => res.orderList);
  },
  getMyOrderDetail(orderCode: number) {
    const data = { params: { madh: orderCode } };
    return request.get<any, MyOrderDetailResponse>("/infoOrderDetail", data).then((res) => res);
  },
};
