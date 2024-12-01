import style from "../styles/cart-body.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "@/helpers";
import { CartItem } from "../types";
import { useDeleteProduct, useUpdateQuantityPopup } from "../hooks";
import { useQueryClient } from "@tanstack/react-query";
import { cartKeys } from "../constants";
import { useSelectedProduct } from "../hooks/use-selected-product";
import { ChangeEvent } from "react";

const { row1, boxRow1Column1, row1Column1Item, imgRow1, boxRow1, inputNumber, btnDeleteCart, row1Item } = style;

const CartBody = ({ carts }: { carts: CartItem[] }) => {
  const queryClient = useQueryClient();
  const { mutate: updateSelected } = useSelectedProduct();
  const { mutate: updateQuantity } = useUpdateQuantityPopup();
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleClickCheckbox = (index1: number, item: CartItem) => {
    const newCarts = carts.map((item, index2) =>
      index2 === index1 ? (item.SELECTED === 0 ? { ...item, SELECTED: 1 } : { ...item, SELECTED: 0 }) : item,
    );
    queryClient.setQueryData(cartKeys.cart, { data: newCarts });
    const selcted = item.SELECTED === 0 ? 1 : 0;
    const data = {
      matk: localStorage.getItem("userId"),
      masp: item.MASP,
      mamau: item.MAMAU,
      masize: item.MASIZE,
      selected: selcted,
    };

    updateSelected(data);
  };

  const handleInputQuantity = (index1: number, event: ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(event.target.value === "" ? "0" : event.target.value);

    const newCarts = carts.map((item, index2) => {
      if (index2 === index1) {
        return {
          ...item,
          SOLUONG: quantity,
          TONGGIA: item.GIABAN * quantity,
        };
      }
      return item;
    });

    queryClient.setQueryData(cartKeys.cart, { data: newCarts });

    const item = carts[index1];
    const data = {
      matk: localStorage.getItem("userId"),
      masp: item.MASP,
      mamau: item.MAMAU,
      masize: item.MASIZE,
      soluong: quantity,
      tonggia: quantity * item.GIABAN,
    };

    updateQuantity(data);
  };

  const handleClickDelete = (index: number) => {
    const data = {
      matk: parseInt(localStorage.getItem("userId") || "0"),
      masp: carts[index].MASP,
      mamau: carts[index].MAMAU,
      masize: carts[index].MASIZE,
    };

    deleteProduct(data);

    carts.splice(index, 1);
    queryClient.setQueryData(cartKeys.cart, { data: carts });
  };
  return (
    <tbody>
      {carts.map((item, index) => (
        <tr className={row1} key={index}>
          <td>
            <input
              type="checkbox"
              name="checkboxProductInCart"
              checked={item.SELECTED === 1}
              onChange={() => handleClickCheckbox(index, item)}
            />
          </td>

          <td>
            <div className={boxRow1Column1}>
              <div className={row1Column1Item}>
                <img className={imgRow1} src={item.imgURL} alt="" />
              </div>
              <div className={row1Column1Item}>
                <p>
                  {item.TENSP} <br />
                  Màu: {item.TENMAU} <br />
                  Size: {item.MASIZE}
                </p>
              </div>
            </div>
          </td>

          <td>
            <div className={`${boxRow1} $`}>
              <b className={row1Item}>{formatPrice(item.GIABAN)} đ</b>
            </div>
          </td>

          <td>
            <div className={`${boxRow1} `}>
              <input
                type="number"
                min={1}
                value={item.SOLUONG}
                onChange={(event) => handleInputQuantity(index, event)}
                className={`${inputNumber} ${row1Item}`}
              />
            </div>
          </td>

          <td>
            <div className={`${boxRow1} `}>
              <b className={row1Item}>{formatPrice(item.TONGGIA)} đ</b>
            </div>
          </td>

          <td>
            <div className={`${boxRow1} `}>
              <button className={btnDeleteCart} onClick={() => handleClickDelete(index)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default CartBody;
