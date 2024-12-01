import routes from "@/configs/routes";
import style from "../styles/cart-popup.module.scss";
import { CartInfoRessponse, CartItem, DeleteBody } from "../types";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/helpers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDeleteProduct } from "../hooks";
import { useQueryClient } from "@tanstack/react-query";
import { cartKeys } from "../constants";

const CartList = ({ carts }: { carts: CartItem[] }) => {
  const navigate = useNavigate();
  const { mutate: deleteProduct, isError } = useDeleteProduct();
  const queryClient = useQueryClient();

  const handleClickDelete = (item: CartItem) => {
    const data: DeleteBody = {
      matk: parseInt(localStorage.getItem("userId") || "0"),
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

  if (isError) return <h1>Không thể xóa sản phẩm</h1>;

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

export default CartList;
