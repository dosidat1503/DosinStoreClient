import request from "@/ultils/request";
import { AccountInfoResponse, BaseInfoBody, PasswordChangeBody, PasswordChangeResponse } from "../types";

export const accountInfoApi = {
  getAccountInfo() {
    const data = { matk: localStorage.getItem("userId") };

    return request.get<any, AccountInfoResponse>("/getAccountInfo", { params: data }).then((res) => res.accountInfo);
  },
  saveAccountInfo(body: BaseInfoBody) {
    return request.post<any, { statuscode: number }>("/saveAccountInfo", body).then((res) => res);
  },
  saveChangePassword(body: PasswordChangeBody) {
    return request.post<any, PasswordChangeResponse>("/changePassword", body).then((res) => res);
  },
};
