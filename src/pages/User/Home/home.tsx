import { Row, Skeleton } from "antd";

import style from "@/features/home/styles/home.module.scss";
import { useProductAtHome } from "@/features/home/hooks";
import { Banner, ProductCard } from "@/features/home/components";

export const NEW = "new";
const HOT = "hot";

const { productContainer, title, productList } = style;

const Home = () => {
  const { data: products, isLoading, isError } = useProductAtHome();

  if (isLoading) return <Skeleton />;
  if (isError) return <h1>Không thể load sản phẩm</h1>;

  return (
    <div>
      <Banner />
      <div className={productContainer}>
        <h1 className={title}>SẢN PHẨM MỚI</h1>
        <div className={productList}>
          <Row gutter={[32, 32]}>
            <ProductCard products={products?.dataNewProduct || []} type={NEW} />
          </Row>
        </div>
      </div>
      <div className={productContainer}>
        <h1 className={title}>SẢN PHẨM HOT</h1>
        <div className={productList}>
          <Row gutter={[32, 32]}>
            <ProductCard products={products?.dataHotProduct || []} type={HOT} />
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
