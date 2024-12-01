import style from "../styles/header-navigation.module.scss";
import { NavLink } from "react-router-dom";
import routes from "@/configs/routes";
import { MenuList } from "../constants";

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
