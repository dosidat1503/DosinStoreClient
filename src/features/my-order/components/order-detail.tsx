import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/order-detail.module.scss";
import clsx from "clsx";
import { formatPrice } from "@/helpers";
import { useNavigate } from "react-router-dom";
import useQueryParams from "@/hooks/useQueryParams";
import { useMyOrderDetail } from "../hooks";

const MyOrderDetail = () => {
  const navigate = useNavigate();
  const params = useQueryParams();
  const handleTurnBack = () => {
    navigate(-1);
  };

  const orderCode = parseInt(params.get("orderCode") || "0");
  const { data: infoOrderDetail } = useMyOrderDetail(orderCode);

  const {
    TEN,
    SDT,
    DIACHI,
    PHUONG_XA,
    QUAN_HUYEN,
    TINH_TP,
    MADH,
    NGAYORDER,
    TRANGTHAI_DONHANG,
    TRANGTHAI_THANHTOAN,
    HINHTHUC_THANHTOAN,
    TONGTIEN_SP,
    PHIVANCHUYEN,
    TONGTIENDONHANG,
    VOUCHERGIAM,
  } = infoOrderDetail?.relate_order[0] || {};

  const ProductList = () => {
    return infoOrderDetail?.relate_order_detail.map((item, index) => (
      <tbody className="table-group-divider">
        <tr className="" key={index}>
          <td data-label="Order-code">{item.TENSP}</td>
          <td data-label="Name">{item.TENMAU}</td>
          <td data-label="Phone-number"> {item.MASIZE} </td>
          <td data-label="Phone-number">{formatPrice(item.TONGTIEN / item.SOLUONG)} </td>
          <td data-label="Phone-number"> {item.SOLUONG} </td>
        </tr>{" "}
      </tbody>
    ));
  };

  return (
    <div>
      <div className={style.iconTurnBack}>
        <span onClick={handleTurnBack} className={style.faCircleChevronLeft}>
          <FontAwesomeIcon
            className={clsx(style.faCircleChevronLeft, style.faSolid)}
            icon={faCircleChevronLeft}
          ></FontAwesomeIcon>
        </span>
      </div>
      <h1>Chi tiết đơn hàng</h1>
      <div className={style.deliveryInfoContainer}>
        <h3 className={style.deliveryInfo}>Thông tin giao hàng</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">SĐT</th>
              <th scope="col">Địa chỉ</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <td data-label="Order-code">{TEN !== null ? TEN : ""}</td>
              <td data-label="Name">{SDT}</td>
              <td data-label="Phone-number">
                {DIACHI ? DIACHI + ", " : ""}
                {PHUONG_XA ? PHUONG_XA + ", " : ""}
                {QUAN_HUYEN ? QUAN_HUYEN + ", " : ""}
                {TINH_TP ? TINH_TP : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={style.deliveryInfoContainer}>
        <h3 className={style.deliveryInfo}>Thông tin Đơn hàng</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Mã đơn hàng</th>
              <th scope="col">Ngày đặt hàng</th>
              <th scope="col">Trạng thái đơn hàng</th>
              <th scope="col">Trạng thái thanh toán</th>
              <th scope="col">Hình thức thanh toán</th>
              <th scope="col">Tiền sản phẩm</th>
              <th scope="col">Phí vận chuyển</th>
              <th scope="col">Tổng tiền hoá đơn</th>
              <th scope="col">Giá trị Voucher giảm</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <td data-label="Order-code">{MADH}</td>
              <td data-label="Name">{NGAYORDER}</td>
              <td data-label="Phone-number"> {TRANGTHAI_DONHANG} </td>
              <td data-label="Phone-number"> {TRANGTHAI_THANHTOAN} </td>
              <td data-label="Phone-number"> {HINHTHUC_THANHTOAN} </td>
              <td data-label="Phone-number"> {formatPrice(TONGTIEN_SP || 0)} </td>
              <td data-label="Phone-number"> {formatPrice(PHIVANCHUYEN || 0)} </td>
              <td data-label="Phone-number"> {formatPrice(TONGTIENDONHANG || 0)} </td>
              <td data-label="Phone-number"> {VOUCHERGIAM === 0 ? 0 : formatPrice(VOUCHERGIAM || 0)} </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={style.deliveryInfoContainer}>
        <h3 className={style.deliveryInfo}>Thông tin các sản phẩm</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Tên màu</th>
              <th scope="col">Size</th>
              <th scope="col">Giá bán</th>
              <th scope="col">Số lượng</th>
            </tr>
          </thead>
          <ProductList></ProductList>
        </table>
      </div>
    </div>
  );
};

export default MyOrderDetail;
