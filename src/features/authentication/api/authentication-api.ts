import request from "@/ultils/request";
import {
  SignUpResponse,
  SignUpBody,
  SignInBody,
  SignInResponse,
  RecoverPasswordBody,
  RecoverPasswordResponse,
} from "../types";

export const authenticationApi = {
  async signUp(body: SignUpBody) {
    const res = await request.post<unknown, SignUpResponse>("/signUp", body);
    return res;
  },
  async signIn(body: SignInBody) {
    const res = await request.post<unknown, SignInResponse>("/signIn", body);
    return res;
  },
  async sendMailRecoverPassword(body: RecoverPasswordBody) {
    const res = await request.post<unknown, RecoverPasswordResponse>("/sendMailRecoverPassword", body);
    return res;
  },
};
