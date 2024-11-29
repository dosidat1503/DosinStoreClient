import clsx from "clsx";
import { useInfoForPayment } from "../hooks";
import style from "../styles/product-list.module.scss";
import { formatPrice } from "@/helpers";
import { Divider } from "antd";

const ProductList = () => {
  const { data: infoForPayment } = useInfoForPayment();
  const products = infoForPayment?.products;

  if (products?.length === 0) return <></>;
  return (
    <div className={style.productContainer}>
      <Divider variant="solid" />
      <table>
        <thead>
          <tr>
            <th className="ps-5" colSpan={2}>
              Sản phẩm
            </th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="col-2">
                  <img className={clsx(style.productImage, "rounded", "mx-auto", "d-block")} src={item.imgURL} alt="" />
                </td>
                <td className="col-4">
                  <span className="fw-bold">{item.TENSP}</span>
                  <br />
                  <span>
                    {item.TENMAU}, {item.MASIZE}
                  </span>
                </td>
                <td className="col-2">{formatPrice(item.GIABAN)}</td>
                <td className="col-2">{item.SOLUONG}</td>
                <td className="col-2">{formatPrice(item.TONGGIA)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
