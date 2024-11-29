import { ShipInformation } from "./delivery-info";
import { InfoToSaveOrder } from "./payment";

export interface PerformPaymentProps {
  shipInformation: ShipInformation;
  infoToSaveOrder: InfoToSaveOrder;
  setIsInputShipInformationValidated: (isInputShipInformationValidated: boolean) => void;
}
