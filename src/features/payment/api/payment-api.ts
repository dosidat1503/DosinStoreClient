import request from "@/ultils/request";
import {
  APIAddress,
  BodyGetInfoForPayment,
  IdDistrict,
  IdProvince,
  InfoForPaymentResponse,
  SaveOrderBody,
  SaveOrderResponse,
} from "../types";
import axios from "axios";

const URL_APIAdsress = "https://esgoo.net/api-tinhthanh/";

export const paymentApi = {
  getInfoForPayment(body: BodyGetInfoForPayment) {
    return request.get<any, InfoForPaymentResponse>("/infoForPayment", { params: body }).then((res) => res);
  },
  getProvince() {
    return axios.get<any, { data: { data: APIAddress[] } }>(`${URL_APIAdsress}/1/0.htm`).then((res) => res.data.data);
  },
  getDistrict(idProvince: IdProvince) {
    return axios
      .get<any, { data: { data: APIAddress[] } }>(`${URL_APIAdsress}/2/${idProvince}.htm`)
      .then((res) => res.data.data);
  },
  getCommune(idDistrict: IdDistrict) {
    return axios
      .get<any, { data: { data: APIAddress[] } }>(`${URL_APIAdsress}/3/${idDistrict}.htm`)
      .then((res) => res.data.data);
  },
  saveOrder(body: SaveOrderBody) {
    return request.post<any, SaveOrderResponse>("/saveOrderInfo", body).then((res) => res);
  },
};
