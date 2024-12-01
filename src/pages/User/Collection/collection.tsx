import { Pagination, Row, Skeleton, Typography, Flex } from "antd";
import { useEffect, useState } from "react";

import useQueryParams from "@/hooks/useQueryParams";

import { NEW } from "../home/home";
import ProductCard from "@/features/home/components/product-card";

import { Filter } from "@/features/collection/components";
import { ContentTitleProps, ParamsGetCollection } from "@/features/collection/types";
import { useCollection } from "@/features/collection/hooks/useCollection";
import { fashionTypeList, numberProductEachPage, sortTypeList } from "@/features/collection/constants";

const { Title } = Typography;

const ContenTitle = ({ query, fashionType }: ContentTitleProps) => {
  const item = fashionTypeList.find((item) => item.id === fashionType);
  const title = query ? "SẢN PHẨM TÌM THẤY" : `THỜI TRANG ${item?.title}`;

  return <Title level={1}>{title}</Title>;
};

const Collection = () => {
  const params = useQueryParams();

  const query = params.get("query") || "";
  const category = parseInt(params.get("category") || "1");
  const fashionType = parseInt(params.get("fashionType") || "1");
  const sortBy = params.get("sortBy") || sortTypeList[0].id;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paramsGetCollection, setParamsGetCollection] = useState<ParamsGetCollection>({
    start: numberProductEachPage * (currentPage - 1),
    numberProductEachPage: numberProductEachPage,
    fashionType: fashionType,
    category: category,
    sortBy: sortBy,
    query_data: query,
  });

  const { data, isLoading, isError } = useCollection(paramsGetCollection);

  useEffect(() => {
    setCurrentPage(1);
    setParamsGetCollection({
      start: numberProductEachPage * (currentPage - 1),
      numberProductEachPage: numberProductEachPage,
      fashionType: fashionType,
      category: category,
      sortBy: sortBy,
      query_data: query,
    });
  }, [location.search]);

  if (isError) return <Title level={5}>Không thể load sản phẩm</Title>;

  return (
    <>
      <Flex justify="center" style={{ width: "100%", marginTop: "20px" }}>
        <ContenTitle query={query} fashionType={fashionType} />
      </Flex>

      <Filter query={query} hasProduct={data?.productList?.length || isLoading ? true : false}></Filter>

      {isLoading ? (
        <Skeleton active style={{ marginTop: "20px" }} />
      ) : (
        <>
          <Row gutter={[32, 32]} style={{ marginTop: "30px" }}>
            <ProductCard products={data?.productList || []} type={NEW} />
          </Row>
          <Pagination
            align="center"
            defaultCurrent={1}
            pageSize={numberProductEachPage}
            total={data?.quantity[0].SL_MASP}
            onChange={(page) => {
              setCurrentPage(page);
              setParamsGetCollection({
                ...paramsGetCollection,
                start: numberProductEachPage * (page - 1),
              });
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
            current={currentPage}
            style={{ marginTop: "20px" }}
          />
        </>
      )}
    </>
  );
};

export default Collection;
