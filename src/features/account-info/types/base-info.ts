import { NoticeType } from "antd/es/message/interface";

export interface AccountInfoResponse {
  accountInfo: AccountInfo;
}

export interface AccountInfo {
  DIACHI: string;
  EMAIL: string;
  SDT: string;
  TEN: string;
  gioitinh: "Nam" | "Nữ" | "Khác";
}

export interface BaseInfoBody {
  name: string;
  email: string;
  gender: string;
  numberPhone: string;
  address: string;
  matk: string | null;
}

export interface Message {
  type: NoticeType;
  content: string;
}

export interface AccountInfoInput {
  name: string;
  email: string;
  gender: string;
  numberPhone: string;
  address: string;
}
