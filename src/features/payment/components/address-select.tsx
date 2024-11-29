import { APIAddress } from "../types";

interface Props {
  list: APIAddress[];
}

const ProvinceList = ({ list }: Props) => {
  return list.map((item, index) => (
    <option value={item.name} key={index}>
      {item.name}
    </option>
  ));
};

const DistrictList = ({ list }: Props) => {
  return list.map((item, index) => (
    <option value={item.name} key={index}>
      {item.name}
    </option>
  ));
};

const CommuneList = ({ list }: Props) => {
  return list.map((item, index) => (
    <option value={item.name} key={index}>
      {item.name}
    </option>
  ));
};

export { ProvinceList, DistrictList, CommuneList };
