import { GetMyOrderBody } from "../types";

export const myOrderKeys = {
  myOrders: ["myOrder"],
  myOrder: (type: GetMyOrderBody) => [myOrderKeys.myOrders, type],
  myOrderDetails: ["myOrderDetail"],
  myOrderDetail: (orderCode: number) => [myOrderKeys.myOrderDetails, orderCode],
};

export const statusList = [
  {
    name: "Đã Giao",
    path: "delivered",
  },
  {
    name: "Đã Huỷ",
    path: "canceled",
  },
  {
    name: "Đang Giao",
    path: "shipping",
  },
  {
    name: "Chuẩn Bị Hàng",
    path: "preparing",
  },
];
export const numberOrderEachPage = 20;
