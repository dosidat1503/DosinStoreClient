import { Col, Row, Skeleton } from "antd";

import useQueryParams from "@/hooks/useQueryParams";
import { useProductDetail } from "@/features/product-detail/hooks";
import { ProductDetail, Color, Size, Image, DefineQuantity } from "@/features/product-detail/types";
import { BaseInfo, DetailProductImage, ProductDescribe } from "@/features/product-detail/components";
import style from "@/features/product-detail/styles/product-detail.module.scss";
import ProductSelect from "@/features/product-detail/components/product-select";
import Review from "@/features/product-detail/components/product-review";
import { useEffect } from "react";

const ProductDetailInfo = () => {
  const params = useQueryParams();

  const idProductParams = params.get("id") || "";
  const idProduct = parseInt(idProductParams);

  const { data, isLoading, isError } = useProductDetail(idProduct);

  const images = data?.data_hinhanh as Image[];
  const productDetail = data?.data_sanpham as ProductDetail;
  const colors = data?.data_mamau as Color[];
  const sizes = data?.data_size as Size[];
  const defineQuantity = data?.data_xacDinhSoLuong as DefineQuantity[];
  const descriptionContent = data?.data_sanpham?.MOTA || "";
  const GIABAN = data?.data_sanpham?.GIABAN || 0;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  }, []);
  if (isLoading) return <Skeleton active />;
  if (isError) return <h1>Không thể load sản phẩm</h1>;

  return (
    <Row gutter={[16, 16]} className={style.mainContainer}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <DetailProductImage images={images} />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <BaseInfo masp={idProduct} productDetail={productDetail} />
        <ProductSelect
          colors={colors}
          sizes={sizes}
          defineQuantity={defineQuantity}
          idProduct={idProduct}
          sellPrice={GIABAN}
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Review idProduct={idProduct} />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <ProductDescribe content={descriptionContent} />
      </Col>
    </Row>
  );
};

export default ProductDetailInfo;
