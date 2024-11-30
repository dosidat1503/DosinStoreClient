import { useNavigate } from "react-router-dom";
import { statusList } from "../constants";
import useQueryParams from "@/hooks/useQueryParams";
import { Status } from "../types";

const OrderNavigation = () => {
  const navigate = useNavigate();
  const params = useQueryParams();
  const statusName = params.get("statusName") || statusList[0].name;

  const handleClickNavState = (item: Status) => {
    params.set("statusName", item.name);
    params.set("page", "1");
    navigate(`?${params}`);
  };

  return (
    <ul className="nav nav-underline justify-content-center">
      {statusList.map((item, index) => (
        <li className={`nav-item col-auto p-2`} key={index}>
          <button
            className={`nav-link ${statusName === item.name ? "active" : ""}`}
            aria-current="page"
            onClick={() => handleClickNavState(item)}
            style={{ color: "black" }}
          >
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default OrderNavigation;
