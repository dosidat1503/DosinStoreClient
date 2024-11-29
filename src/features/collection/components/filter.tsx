import Category from "./category";
import SortBy from "./sort-by";

interface FilterProps {
  query: string;
  hasProduct: boolean;
}

const Filter = (props: FilterProps) => {
  const { query, hasProduct } = props;

  return (
    <>
      {query === "" && <Category />}
      {hasProduct && <SortBy />}
    </>
  );
};

export default Filter;
