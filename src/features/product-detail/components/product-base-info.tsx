import clsx from "clsx";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStarRegular } from "@fortawesome/free-regular-svg-icons";

import { formatPrice } from "@/helpers";

import style from "../styles/base-info.module.scss";
import { BaseInfoProps } from "../types";
import { useProductReview } from "../hooks/use-product-review";

const { infoContainer, priceContainer, sellPrice, originPrice, space, notHasRate, solidStarStyle, regularStar } = style;

const BaseInfo = (props: BaseInfoProps) => {
  const { masp, productDetail } = props;

  let Stars = [];
  const TENSP = productDetail?.TENSP;
  const GIABAN = productDetail?.GIABAN;
  const GIAGOC = productDetail?.GIAGOC;

  const { data: productReview } = useProductReview(masp);
  const { solidStar } = productReview.showStarQuantity;

  for (let i = 1; i <= 5; i++)
    if (i <= productReview.showStarQuantity.solidStar)
      Stars.push(<FontAwesomeIcon key={i} icon={faStar} className={solidStarStyle}></FontAwesomeIcon>);
    else Stars.push(<FontAwesomeIcon key={i} icon={farStarRegular} className={regularStar}></FontAwesomeIcon>);

  return (
    <>
      <div style={{ padding: "16px 16px 0 16px" }} className={infoContainer}>
        <h4>{TENSP}</h4>
      </div>
      <div className={infoContainer}>
        <div className={priceContainer}>
          <span className={clsx(sellPrice, space)}>{formatPrice(GIABAN || 0)}₫</span>
          <span className={clsx(originPrice, space)}>{formatPrice(GIAGOC || 0)}₫</span>
        </div>
        <div>
          {Stars}
          <span className={notHasRate}>{solidStar === 0 ? "(Chưa có đánh giá)" : ""}</span>
        </div>
      </div>
    </>
  );
};
export default BaseInfo;
