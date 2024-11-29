import style from "../styles/relative-product.module.scss";
import Slider from "react-slick";
import { useRelativeProduct } from "../hooks";
import { NEW } from "@/features/home/constants";
import { ProductCard } from "@/features/home/components";
import { Row } from "antd";
import "../styles/product-image.css";

interface RelativeProductProps {
  masp: string;
}

interface Arrows {
  currentSlide: number;
  slideCount: number;
  onClick: () => void;
}

const RelativeProduct = (props: RelativeProductProps) => {
  const { masp } = props;

  const { data } = useRelativeProduct(masp);

  const GalleryPrevArrow = ({ currentSlide, slideCount, ...props }: Arrows) => {
    const { onClick } = props;

    return (
      <div {...props} className={style.customPrevArrow} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
      </div>
    );
  };

  const GalleryNextArrow = ({ currentSlide, slideCount, ...props }: Arrows) => {
    const { onClick } = props;

    return (
      <div {...props} className={style.customNextArrow} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
        </svg>
      </div>
    );
  };

  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    slidesToScroll: 2,
    swipeToSlide: true,
    nextArrow: (
      <GalleryNextArrow
        currentSlide={0}
        slideCount={0}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    prevArrow: (
      <GalleryPrevArrow
        currentSlide={0}
        slideCount={0}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  };

  return (
    <div className={style.container}>
      <h1>SẢN PHẨM LIÊN QUAN</h1>
      <div className="align-items-center">
        <Slider {...settings}>
          <Row>
            <ProductCard products={data?.data_relativeProduct || []} type={NEW} />
          </Row>
        </Slider>
      </div>
    </div>
  );
};

export default RelativeProduct;
