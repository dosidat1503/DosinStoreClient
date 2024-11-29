import { InfoToSaveOrder } from "./payment";

export interface APIAddressList {
  commune: APIAddress[];
  districts: APIAddress[];
  province: APIAddress[];
}

export interface APIAddress {
  full_name: string;
  full_name_en: string;
  id: string;
  latitude: string;
  longitude: string;
  name: string;
  name_en: string;
}

export interface DeliveryInfoProps {
  shipInformation: ShipInformation;
  setShipInformation: (shipInformation: ShipInformation) => void;
  infoToSaveOrder: InfoToSaveOrder;
  setInfoToSaveOrder: (infoToSaveOrder: InfoToSaveOrder) => void;
}

export interface ShipInformation {
  name: string;
  numberPhone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}
