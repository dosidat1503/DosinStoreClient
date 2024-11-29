import { useCartInfo } from "../hooks/use-cart-info";
import style from "../styles/cart-popup.module.scss";
import { formatPrice } from "@/helpers";
import routes from "@/configs/routes";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import clsx from "clsx";
import { useAppSelector } from "@/store";
import { useDeleteProduct } from "../hooks/use-delete-product";
import { CartInfoRessponse, CartItem, DeleteBody } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { cartKeys } from "../constants";
import { useDispatch } from "react-redux";
import { setIsClickPaymentAtCartPopup } from "@/store/slices/cartSlice";

const CartPopup = () => {
  const { data } = useCartInfo();
  const carts = data?.data || [];

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isShowPopup = useAppSelector((state) => state.cart.isShowPopup);

  const totalAmount = carts?.reduce((acc, item) => acc + item.GIABAN * item.SOLUONG, 0);

  const { mutate: deleteProduct } = useDeleteProduct();
  const queryClient = useQueryClient();

  const handleClickDelete = (item: CartItem) => {
    const data: DeleteBody = {
      matk: parseInt(localStorage.getItem("auth_matk") || "0"),
      masp: item.MASP,
      mamau: item.MAMAU,
      masize: item.MASIZE,
    };

    deleteProduct(data, {
      onSuccess: () => {
        queryClient.setQueryData(cartKeys.cart, (oldData: CartInfoRessponse) => {
          const newCart = oldData.data.filter(
            (i: CartItem) => i.MASP !== item.MASP || i.MAMAU !== item.MAMAU || i.MASIZE !== item.MASIZE,
          );

          return {
            data: newCart,
          };
        });
      },
    });
  };

  const CartList = () => {
    return carts?.map((item, index) => {
      if (carts !== null) {
        const url = `${routes.productDetail}?id=${item.MASP}`;
        return (
          <li className={style.item} key={index}>
            <div
              onClick={() => {
                navigate(`${url}`);
              }}
            >
              <img src={item.imgURL} alt="" className={style.image} />
            </div>
            <div className={style.baseinfo}>
              <div>
                <span className={style.name}>{item.TENSP}</span>
              </div>
              <div>
                <span className={style.typeContainer}>
                  Màu:
                  <span className={style.typeValue}>{item.TENMAU}</span>
                </span>
                <span className={style.typeContainer}>
                  Size:
                  <span className={style.typeValue}>{item.MASIZE}</span>
                </span>
              </div>
            </div>
            <div className={style.endItem}>
              <div className={style.price}>
                <span className={style.priceTotal}>{formatPrice(item.TONGGIA)}</span>
                <span className={style.priceTotal} style={{ fontSize: "1em" }}>
                  đ
                </span>
                <div className={style.quantity}>
                  <span className={style.multiply}>x</span>
                  <span className={style.quantity}>{item.SOLUONG}</span>
                </div>
              </div>
              <div className={style.delete}>
                <DeleteOutlineIcon className={style.deleteButton} onClick={() => handleClickDelete(item)} />
              </div>
            </div>
          </li>
        );
      }
    });
  };

  return (
    <div
      className={clsx(style.cartPopup, {
        [style.showPopup]: isShowPopup,
      })}
    >
      <header className={style.header}>
        <p className={style.headerText}>Sản phẩm đã thêm</p>
      </header>
      <ul className={style.body}>{CartList()}</ul>
      <div className={style.amountTotal}>
        Tổng tiền: <span className={style.amountTotalValue}> {formatPrice(totalAmount)} đ</span>
      </div>
      <footer className={style.footerContainer}>
        <button
          className={style.footerButton}
          onClick={() => {
            navigate(`${routes.payment}`);
            dispatch(setIsClickPaymentAtCartPopup(1));
          }}
        >
          THANH TOÁN
        </button>
        <button
          className={style.footerButton}
          onClick={() => {
            navigate(`${routes.cart}`);
          }}
        >
          XEM GIỎ HÀNG
        </button>
      </footer>
    </div>
  );
};

export default CartPopup;
