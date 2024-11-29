import { useRef, useState } from "react";
import { Carousel, Row, Col, Image } from "antd";
import { CarouselRef } from "antd/es/carousel";

import { DetailProductImageProps } from "../types";
import "../styles/product-image.css";

const DetailProductImage = (props: DetailProductImageProps) => {
  const { images } = props;
  const carouselRef = useRef<CarouselRef>(null);

  const [previewVisible, setPreviewVisible] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const previewImageConfig = (index: number) => ({
    visible: previewVisible === index,
    onVisibleChange: (visible: boolean) => {
      if (!visible) setPreviewVisible(null);
    },
    mask: "",
    zIndex: 9999,
  });

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    carouselRef.current?.goTo(index);
  };

  const handlePreview = (index: number) => {
    setPreviewVisible(index);
  };

  return (
    <>
      <Row gutter={16} align="top">
        <Col span={4}>
          <Row gutter={[20, 4]} className="mini-image-list">
            {images?.map((image, index) => (
              <Col key={index} span={24} style={{ marginBottom: "2px" }}>
                <img
                  src={image.imgURL}
                  alt={image.MAHINHANH}
                  onClick={() => handleThumbnailClick(index)}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    border: selectedIndex === index ? "2px solid gray" : "",
                  }}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={20}>
          <Carousel arrows infinite={true} className={"product-carousel-container"} ref={carouselRef}>
            {images?.map((image, index) => (
              <Image
                key={index}
                src={image.imgURL}
                alt={image.MAHINHANH}
                onClick={() => handlePreview(index)}
                preview={previewImageConfig(index)}
              />
            ))}
          </Carousel>
        </Col>
      </Row>
    </>
  );
};

export default DetailProductImage;
