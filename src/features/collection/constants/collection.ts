import { ParamsGetCollection } from "../types";

export const collectionKeys = {
  collection: ["collection"],
  collectionList: (paramsGetCollection: ParamsGetCollection) => [...collectionKeys.collection, paramsGetCollection],
};

export const fashionTypeList = [
  {
    id: 1,
    title: "NAM",
  },
  {
    id: 2,
    title: "NỮ",
  },
  {
    id: 3,
    title: "TRẺ EM",
  },
];

export const numberProductEachPage = 20;
