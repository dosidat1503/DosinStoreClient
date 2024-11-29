import { InfoToSaveOrder } from "./payment";

export interface PaymentInfoProps {
  infoToSaveOrder: InfoToSaveOrder;
  setInfoToSaveOrder: (infoToSaveOrder: InfoToSaveOrder) => void;
}
