import { useMutation } from "@tanstack/react-query";
import { RecoverPasswordBody } from "../types";
import { authenticationApi } from "../api";

export const useRecoverPassword = () => {
  return useMutation({
    mutationFn: (body: RecoverPasswordBody) => authenticationApi.sendMailRecoverPassword(body),
  });
};
