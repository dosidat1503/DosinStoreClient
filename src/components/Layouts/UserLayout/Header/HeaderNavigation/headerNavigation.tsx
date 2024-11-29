import style from "./headerNavigation.module.scss";
import { NavLink } from "react-router-dom";
import routes from "@/configs/routes";
import images from "@/assets/images";

export const MenuList = [
  {
    title: "Nam",
    to: "?fashionType=1",
    img: images.male,
  },
  {
    title: "Nữ",
    to: "?fashionType=2",
    img: images.female,
  },
  {
    title: "Trẻ em",
    to: "?fashionType=3",
    img: images.female,
  },
];

const Navigation = () => {
  return (
    <nav className={style.headerNavigation}>
      {MenuList.map((item, index) => {
        return (
          <div className={style.textContainer} key={index}>
            <NavLink to={routes.collection + item.to} className={style.text}>
              {item.title}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;
