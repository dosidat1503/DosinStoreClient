import { Col, Row, Skeleton } from "antd";

import useQueryParams from "@/hooks/useQueryParams";
import { useProductDetail } from "@/features/product-detail/hooks";
import { ProductDetail, Color, Size, Image, DefineQuantity } from "@/features/product-detail/types";
import { BaseInfo, DetailProductImage, ProductDescribe } from "@/features/product-detail/components";
import style from "@/features/product-detail/styles/product-detail.module.scss";
import ProductSelect from "@/features/product-detail/components/product-select";
import Review from "@/features/product-detail/components/product-review";

const ProductDetailInfo = () => {
  const params = useQueryParams();
  const idProductParams = params.get("id") || "";
  const idProduct = parseInt(idProductParams);

  const { data, isLoading } = useProductDetail(idProduct);

  const images = data?.data_hinhanh as Image[];
  const productDetail = data?.data_sanpham as ProductDetail;
  const colors = data?.data_mamau as Color[];
  const sizes = data?.data_size as Size[];
  const defineQuantity = data?.data_xacDinhSoLuong as DefineQuantity[];
  const descriptionContent = data?.data_sanpham?.MOTA || "";
  const GIABAN = data?.data_sanpham?.GIABAN || 0;

  if (isLoading) return <Skeleton active />;

  return (
    <Row gutter={[16, 16]} className={style.mainContainer}>
      <Col span={12}>
        <DetailProductImage images={images} />
      </Col>
      <Col span={12}>
        <BaseInfo masp={idProduct} productDetail={productDetail} />
        <ProductSelect
          colors={colors}
          sizes={sizes}
          defineQuantity={defineQuantity}
          idProduct={idProduct}
          sellPrice={GIABAN}
        />
      </Col>
      <Col span={12}>
        <Review idProduct={idProduct} />
      </Col>
      <Col span={12}>
        <ProductDescribe content={descriptionContent} />
      </Col>
    </Row>
  );
};

export default ProductDetailInfo;
