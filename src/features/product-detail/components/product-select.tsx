import clsx from "clsx";
import style from "../styles/product-select.module.scss";
import { Color, DefineQuantity, PropertyDefineProductType, Size } from "../types";
import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { message, Spin } from "antd";
import React from "react";
import { NoticeType } from "antd/es/message/interface";
import { useCartInfo } from "@/features/cart/hooks/use-cart-info";
import { useAddProductToCart, useUpdateQuantityPopup } from "@/features/cart/hooks";
import { setIsShowPopup } from "@/store/slices/cartSlice";
import { useQueryClient } from "@tanstack/react-query";
import { cartKeys } from "@/features/cart/constants";
import { useDispatch } from "react-redux";
import { Message } from "@/features/account-info/types";

const choseType = {
  colorCode: "colorCode",
  sizeCode: "sizeCode",
  quantity: "quantity",
};

interface ProductSelectProps {
  colors: Color[];
  sizes: Size[];
  defineQuantity: DefineQuantity[];
  idProduct: number;
  sellPrice: number;
}

const Context = React.createContext({ quantity: "Default" });
message.config({
  maxCount: 1, // Số lượng tối đa của các message hiện tại
});

const ProductSelect = (props: ProductSelectProps) => {
  const { colors, sizes, defineQuantity, idProduct, sellPrice } = props;

  // const [api, contextHolder] = notification.useNotification();
  const [messageApi, contextHolderMessage] = message.useMessage();
  const { data } = useCartInfo();
  const carts = data?.data || [];

  const buttonAddToCartRef = useRef(null);
  const [notifyQuantity, setNotifyQuantity] = useState<number>(0);
  const [propertyDefineProductType, setPropertyDefineProductType] = useState<PropertyDefineProductType>({
    colorCode: 0,
    sizeCode: "",
    quantity: 1,
  });
  const [messageSetting, setMessageSetting] = useState<Message>({
    type: "info",
    content: "",
  });

  const { quantity, colorCode, sizeCode } = propertyDefineProductType as PropertyDefineProductType;

  const { mutate: updateProduct } = useUpdateQuantityPopup();
  const { mutate: addProductToCart, isPending } = useAddProductToCart();
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const handleOpenMessage = () => {
    message.destroy();
    messageApi.open({
      type: messageSetting.type,
      content: messageSetting.content,
      duration: 3,
      style: { marginTop: 220 },
    });
  };

  // const handleOpenNotification = (placement: NotificationPlacement) => {
  //   api.info({
  //     message: `Số lượng sản phẩm`,
  //     description: <Context.Consumer>{({ quantity }) => `Còn ${quantity} sản phẩm!`}</Context.Consumer>,
  //     placement,
  //   });
  // };

  const handleChangeQuantity = (e: React.MouseEvent<HTMLInputElement>) => {
    let newQuantity = quantity;
    let target = e.target as HTMLInputElement;

    if (target.value === "-" && quantity > 1) {
      newQuantity = quantity - 1;
    } else if (target.value === "+") {
      newQuantity = quantity + 1;
    }

    setPropertyDefineProductType({
      ...propertyDefineProductType,
      quantity: newQuantity,
    });
  };

  const handleChoseProductType = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setPropertyDefineProductType({
      ...propertyDefineProductType,
      [name]: name === choseType.sizeCode ? value : parseInt(value as string),
    });
  };

  const handleInputQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) {
      return;
    }
    setPropertyDefineProductType({
      ...propertyDefineProductType,
      quantity: parseInt(value),
    });
  };

  const handleAdjustSuccess = (type: NoticeType, message: string) => {
    queryClient.invalidateQueries({ queryKey: cartKeys.cart }).then(() => {
      dispatch(setIsShowPopup(true));
      setTimeout(() => {
        dispatch(setIsShowPopup(false));
      }, 3000);
    });

    setMessageSetting({
      type: type,
      content: message,
    });
  };

  const handleAddToCart = () => {
    const item = defineQuantity.find((item) => item.MAMAU === colorCode && item.MASIZE === sizeCode);
    if (colorCode === 0 || sizeCode === "") {
      setMessageSetting({
        type: "warning",
        content: "Vui lòng chọn màu sắc và kích thước sản phẩm",
      });
    } else if (item && item.SOLUONG < quantity) {
      setMessageSetting({
        type: "warning",
        content: "Số lượng sản phẩm còn lại không đủ để thêm vào giỏ hàng",
      });
    } else {
      const data = {
        matk: localStorage.getItem("userId"),
        masp: idProduct,
        mamau: colorCode,
        masize: sizeCode,
        soluong: quantity,
        tonggia: quantity * sellPrice,
      };

      const itemInCart = carts?.find(
        (item) => item.MASP === idProduct && item.MAMAU === colorCode && item.MASIZE === sizeCode,
      );
      if (itemInCart) {
        updateProduct(data, {
          onSuccess: () => {
            handleAdjustSuccess("success", "Số lượng sản phẩm đã được cập nhật");
          },
          onError: () => {
            setMessageSetting({
              type: "error",
              content: "Có lỗi xảy ra, vui lòng thử lại",
            });
          },
        });
      } else {
        addProductToCart(data, {
          onSuccess: () => {
            handleAdjustSuccess("success", "Sản phẩm đã được thêm vào giỏ hàng");
          },
          onError: () => {
            setMessageSetting({
              type: "error",
              content: "Có lỗi xảy ra, vui lòng thử lại",
            });
          },
        });
      }
    }
  };

  useEffect(() => {
    if (colorCode !== 0 && sizeCode !== "") {
      const item = defineQuantity.find((item) => item.MAMAU === colorCode && item.MASIZE === sizeCode);
      setNotifyQuantity(item?.SOLUONG || 0);
    }
  }, [propertyDefineProductType]);

  useEffect(() => {
    if (messageSetting.type !== "info") handleOpenMessage();
  }, [messageSetting]);

  const contextValue = useMemo(() => ({ quantity: notifyQuantity.toString() }), [notifyQuantity]);

  return (
    <>
      <Context.Provider value={contextValue}>
        {/* {contextHolder} */}
        {contextHolderMessage}
        <div className={clsx(style.container, style.colorContainer)}>
          <div className={style.headerText}>
            <span>Màu sắc</span>
          </div>
          <div className={style.choseList}>
            {colors?.map((item, index) => {
              return (
                <div className={style.colorItem} key={index}>
                  <input
                    type="radio"
                    className={style.inputColor}
                    id={"color_" + index}
                    name={choseType.colorCode}
                    onChange={handleChoseProductType}
                    value={item.MAMAU}
                  />
                  <label
                    htmlFor={"color_" + index}
                    className={clsx(style.labelColor, {
                      [style.chooseColorBorder]: colorCode === item.MAMAU,
                    })}
                    style={{ backgroundColor: item.HEX }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.container}>
          <div className={style.headerText}>Kích thước</div>
          <div className={style.choseList}>
            {sizes?.map((item, index) => {
              return (
                <div className={style.sizeItem} key={index}>
                  <input
                    type="radio"
                    className={style.inputSize}
                    id={"size_" + index}
                    name={choseType.sizeCode}
                    onChange={handleChoseProductType}
                    value={item.MASIZE}
                  />
                  <label
                    htmlFor={"size_" + index}
                    className={clsx(style.labelSize, {
                      [style.chooseColorBorder]: sizeCode === item.MASIZE,
                    })}
                  >
                    <span className={style.text}>{item.MASIZE}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.container}>
          <div className={style.headerText}>Số lượng</div>
          <div className={style.quantityChange}>
            <input type="button" value="-" className={style.changeByButton} onClick={handleChangeQuantity} />
            <input
              type="text"
              onChange={handleInputQuantity}
              value={quantity}
              min={1}
              name={choseType.quantity}
              className={style.changeByInput}
            />
            <input type="button" value="+" className={style.changeByButton} onClick={handleChangeQuantity} />
          </div>
        </div>
        <div className={style.container}>
          {isPending ? (
            <Spin size="default" />
          ) : (
            <>
              <button className={style.cardAdditionButton} ref={buttonAddToCartRef} onClick={handleAddToCart}>
                <FontAwesomeIcon icon={faCartShopping} className={style.cartIcon}></FontAwesomeIcon>
                <p className={style.cartText}>THÊM VÀO GIỎ</p>
              </button>
              {notifyQuantity > 0 ? <p style={{ fontWeight: "bold" }}>Còn {`${notifyQuantity} sản phẩm`}</p> : ""}
            </>
          )}
        </div>
      </Context.Provider>
    </>
  );
};

export default ProductSelect;
