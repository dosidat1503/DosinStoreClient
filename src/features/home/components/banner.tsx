import { Carousel, Image } from "antd";
import { useNavigate } from "react-router-dom";

import "../styles/banner.css";
import routes from "@/configs/routes";
import { MenuList } from "@/features/header/constants";

const Banner = () => {
  const navigate = useNavigate();

  const handleImageClick = (path: string) => {
    navigate(path);
  };

  return (
    <Carousel autoplay autoplaySpeed={2000} arrows infinite={false} className={"banner-carousel-container"}>
      {MenuList.map((item, index) => {
        return (
          <div key={index} onClick={() => handleImageClick(routes.collection + item.to)}>
            <Image src={item.img} alt={item.title} preview={false} />
          </div>
        );
      })}
    </Carousel>
  );
};
export default Banner;
