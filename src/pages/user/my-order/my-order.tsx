import { statusList } from "@/features/my-order/constants";
import useQueryParams from "@/hooks/useQueryParams";
import { useLocation } from "react-router-dom";
import "@/features/my-order/styles/my-order.css";
import { useEffect, useState } from "react";
import { useMyOrder } from "@/features/my-order/hooks/use-my-order";
import { numberOrderEachPage } from "@/features/my-order/constants";
import { OrderList, OrderNavigation } from "@/features/my-order/components";
import { Skeleton } from "antd";
import { ParamsGetMyOrder } from "@/features/my-order/types";

const MyOder = () => {
  const params = useQueryParams();
  const matk = localStorage.getItem("userId") || "";

  const statusName = params.get("statusName") || statusList[0].name;
  const currentPage = params.get("currentPage") || "1";
  const [paramsGetMyOrder, setParamsGetMyOrder] = useState<ParamsGetMyOrder>({
    start: numberOrderEachPage * (parseInt(currentPage) - 1),
    tenTrangThai: statusList[0].name,
    numberOrderEachPage: numberOrderEachPage,
    matk: matk,
  });

  const { data: myOrders, isLoading, isError } = useMyOrder(paramsGetMyOrder);

  useEffect(() => {
    setParamsGetMyOrder({
      start: numberOrderEachPage * (parseInt(currentPage) - 1),
      tenTrangThai: statusName,
      numberOrderEachPage: numberOrderEachPage,
      matk: matk,
    });
  }, [useLocation().search]);

  if (isLoading) return <Skeleton active />;
  if (isError) return <h1>Không thể load đơn hàng</h1>;

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
