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
  signUp(body: SignUpBody) {
    return request.post<any, SignUpResponse>("/signUp", body).then((res) => res);
  },
  signIn(body: SignInBody) {
    return request.post<any, SignInResponse>("/signIn", body).then((res) => res);
  },
  sendMailRecoverPassword(body: RecoverPasswordBody) {
    return request.post<any, RecoverPasswordResponse>("/sendMailRecoverPassword", body).then((res) => res);
  },
};
