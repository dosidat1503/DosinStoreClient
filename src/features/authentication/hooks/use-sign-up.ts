import { useMutation } from "@tanstack/react-query";
import { SignUpBody } from "../types";
import { authenticationApi } from "../api";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (body: SignUpBody) => authenticationApi.signUp(body),
  });
};
