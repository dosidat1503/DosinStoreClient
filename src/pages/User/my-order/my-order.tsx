import { statusList } from "@/features/my-order/constants";
import useQueryParams from "@/hooks/useQueryParams";
import { useLocation } from "react-router-dom";
import "@/features/my-order/styles/my-order.css";
import { useEffect, useState } from "react";
import { useMyOrder } from "@/features/my-order/hooks/use-my-order";
import { numberOrderEachPage } from "@/features/my-order/constants";
import { OrderList, OrderNavigation } from "@/features/my-order/components";

const MyOder = () => {
  const params = useQueryParams();
  const matk = localStorage.getItem("auth_matk") || "";

  const statusName = params.get("statusName") || statusList[0].name;
  const currentPage = params.get("currentPage") || "1";
  const [paramsGetMyOrder, setParamsGetMyOrder] = useState({
    start: numberOrderEachPage * (parseInt(currentPage) - 1),
    tenTrangThai: statusList[0].name,
    numberOrderEachPage: numberOrderEachPage,
    matk: matk,
  });

  const { data: myOrders } = useMyOrder(paramsGetMyOrder);

  useEffect(() => {
    setParamsGetMyOrder({
      start: numberOrderEachPage * (parseInt(currentPage) - 1),
      tenTrangThai: statusName,
      numberOrderEachPage: numberOrderEachPage,
      matk: matk,
    });
  }, [useLocation().search]);

  return (
    <div className="container">
      <div className="heading text-uppercase text-center">
        <h1>Đơn hàng</h1>
      </div>
      <OrderNavigation />
      <OrderList myOrders={myOrders} />
    </div>
  );
};

export default MyOder;
