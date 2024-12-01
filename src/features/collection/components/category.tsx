import { Button, Col, Flex, Row, Skeleton, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import useQueryParams from "@/hooks/useQueryParams";

import { useCategory } from "../hooks";
import style from "../styles/sort-by.module.scss";

const { Title } = Typography;

const Category = () => {
  const params = useQueryParams();

  const category = parseInt(params.get("category") || "1");
  const fashionType = parseInt(params.get("fashionType") || "1");

  const navigate = useNavigate();
  const { data, isLoading, isError } = useCategory(fashionType);

  const handleClickCategory = (id: number) => {
    params.set("category", id.toString());
    navigate(`?${params.toString()}`);
  };

  const CategoryList = data?.categoryList?.map((item) => (
    <Col xs={24} sm={12} md={8} lg={8} key={item.MAPL2}>
      <Button
        color="default"
        variant={item.MAPL2 === category ? "solid" : "outlined"}
        onClick={() => handleClickCategory(item.MAPL2)}
        className={style.buttonFont}
      >
        {item.TENPL2}
      </Button>
    </Col>
  ));

  if (isError) return <Title level={5}>Không thể load danh mục</Title>;
  else if (isLoading)
    return (
      <Skeleton
        active
        title={{ width: "70%", style: { height: "20px" } }}
        paragraph={{ rows: 3, style: { height: "15px", marginBottom: "10px" } }}
        style={{ borderRadius: "8px" }}
      />
    );

  return (
    <Flex gap="middle" className={style.filterContainer}>
      <Title level={4}>Danh mục: </Title>
      <Row gutter={[16, 10]}>{CategoryList}</Row>
    </Flex>
  );
};

export default Category;
