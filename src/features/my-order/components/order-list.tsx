import clsx from "clsx";
import style from "../styles/order-list.module.scss";
import { useNavigate } from "react-router-dom";
import routes from "@/configs/routes";
import { OrderDetails } from "../types";
import { formatPrice } from "@/helpers";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderList = ({ myOrders }: { myOrders?: OrderDetails[] }) => {
  const navigate = useNavigate();
  const handleWatchOrderDetail = (orderCode: number) => {
    navigate(`${routes.myOrderDetail}?orderCode=${orderCode}`);
  };

  return (
    <div className={clsx(style.orderListContent)}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Tên khách hàng</th>
            <th scope="col">SĐT</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Ngày đặt hàng</th>
            <th scope="col">Hình thức thanh toán</th>
            <th scope="col">Trạng thái thanh toán</th>
            <th scope="col">Tổng tiền đơn hàng</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {myOrders?.map((product, index) => {
            return (
              <tr key={index}>
                <td data-label="Order-code">{product.MADH}</td>
                <td data-label="Name">{product.TEN}</td>
                <td data-label="Phone-number">{product.SDT}</td>
                <td data-label="Address">
                  {product.DIACHI}, {product.PHUONG_XA}, {product.QUAN_HUYEN}, {product.TINH_TP}
                </td>
                <td data-label="Day">{product.NGAYORDER}</td>
                <td> {product.HINHTHUC_THANHTOAN} </td>
                <td> {product.TRANGTHAI_THANHTOAN} </td>
                <td data-label="Subtotal">{formatPrice(product.TONGTIENDONHANG)}</td>
                <td data-label="update">
                  <div className={style.iconContainer}>
                    <span onClick={() => handleWatchOrderDetail(product.MADH)}>
                      <FontAwesomeIcon icon={faEye} className={clsx(style.faEye, style.faSolid)}></FontAwesomeIcon>
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
