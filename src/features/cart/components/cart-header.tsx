import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles/cart-header.module.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { CartHeaderProps } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { cartKeys } from "../constants";

const {
  tableHeaderRow,
  headerColumn0,
  headerColumn1,
  headerColumn2,
  headerColumn3,
  headerColumn4,
  headerColumn5,
  btnDeleteCart,
} = style;

const CartHeader = (props: CartHeaderProps) => {
  const { carts } = props;
  const queryClient = useQueryClient();

  const isCheckedAll = carts?.every((item) => item.SELECTED === 1);
  const handleClickCheckboxAll = () => {
    const newCarts = carts?.map((item) => (isCheckedAll ? { ...item, SELECTED: 0 } : { ...item, SELECTED: 1 }));

    queryClient.setQueryData(cartKeys.cart, { data: newCarts });
  };
  return (
    <thead className="table-header">
      <tr className={tableHeaderRow}>
        <th className={headerColumn0}>
          <input
            type="checkbox"
            name="checkboxProductInCart"
            checked={isCheckedAll}
            onChange={handleClickCheckboxAll}
          />
        </th>
        <th className={headerColumn1}>Sản phẩm</th>
        <th className={headerColumn2}>Giá</th>
        <th className={headerColumn3}>Số lượng</th>
        <th className={headerColumn4}>Thành tiền</th>
        <th className={headerColumn5}>
          <button className={btnDeleteCart}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </th>
      </tr>
    </thead>
  );
};

export default CartHeader;
