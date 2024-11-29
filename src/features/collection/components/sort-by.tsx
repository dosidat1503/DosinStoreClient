import { Button, Col, Dropdown, Flex, MenuProps, Row, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import useQueryParams from "@/hooks/useQueryParams";
import { useAppSelector } from "@/store";

import { sortTypeList } from "../constants";
import { SortByItem } from "../types";
import style from "../styles/sort-by.module.scss";

const { Title } = Typography;

const SortBy = () => {
  const params = useQueryParams();
  const sortBy = useAppSelector((state) => state.collection.sortBy);

  const navigate = useNavigate();

  const handleClickSort = (sortby: string) => {
    params.set("sortBy", sortby);
    navigate(`?${params.toString()}`);
  };

  const items: MenuProps["items"] = sortTypeList.slice(2).map((item) => ({
    label: <span className={style.buttonFont}>{item.name}</span>,
    key: item.id,
    icon: <></>,
    onClick: () => handleClickSort(item.id),
  }));

  const menuProps = { items };

  const SortByList = sortTypeList.slice(0, 2).map((item: SortByItem) => (
    <Col xs={24} sm={12} md={8} lg={8} key={item.id}>
      <Button
        color="default"
        variant={item.id === sortBy ? "solid" : "outlined"}
        onClick={() => handleClickSort(item.id)}
        className={style.buttonFont}
      >
        {item.name}
      </Button>
    </Col>
  ));

  return (
    <Flex gap="middle" className={style.filterContainer} align="center">
      <Title level={4}>Sắp xếp theo: </Title>
      <Row gutter={[16, 10]}>
        {SortByList}

        <Col xs={24} sm={12} md={8} lg={8}>
          <Dropdown menu={menuProps}>
            <Button className={style.buttonFont}>
              <Space>
                Giá
                <DownOutlined style={{ fontSize: "16px" }} />
              </Space>
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </Flex>
  );
};

export default SortBy;
