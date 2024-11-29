import { Col } from "antd";
import { useNavigate } from "react-router-dom";

import { formatPrice } from "@/helpers";
import routes from "@/configs/routes";

import style from "../styles/product-card.module.scss";
import { ProductCardProps } from "../types";
import { NEW } from "../constants";

const { productOut, productIn, info, image, originPrice, salePrice, saleOff, text } = style;

const ProductCard = ({ products, type }: ProductCardProps) => {
  const Navigation = useNavigate();

  return products.map((item) => {
    const url = `${routes.productDetail}?id=${item.MASP}`;
    return (
      <Col xs={24} sm={12} md={8} lg={6} key={item.MASP}>
        <div
          onClick={() => {
            Navigation(`${url}`);
          }}
          className={productOut}
        >
          <div className={productIn}>
            <div>
              <img src={item.imgURL} alt="sản phẩm test" width="247.5" height="250" className={image} />
            </div>
            <div className={info}>
              <h6>{item.TENSP}</h6>
              <div>
                <span className={salePrice}>{formatPrice(item.GIABAN)}₫</span>
                <span className={originPrice}>
                  <del>{formatPrice(item.GIAGOC)}₫</del>
                </span>
              </div>
            </div>
            <div className={saleOff}>
              {type === NEW ? (
                <span className={text}>{formatPrice(Math.round(100 - (item.GIABAN / item.GIAGOC) * 100))}%</span>
              ) : (
                <span className={text}>HOT</span>
              )}
            </div>
          </div>
        </div>
      </Col>
    );
  });
};

export default ProductCard;
