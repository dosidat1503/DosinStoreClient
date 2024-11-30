import { useMutation } from "@tanstack/react-query";
import { accountInfoApi } from "../api";
import { PasswordChangeBody } from "../types";

export const usePasswordChange = () => {
  return useMutation({
    mutationFn: (body: PasswordChangeBody) => accountInfoApi.saveChangePassword(body),
  });
};
