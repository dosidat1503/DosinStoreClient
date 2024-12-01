import { useMutation } from "@tanstack/react-query";
import { SignInBody } from "../types";
import { authenticationApi } from "../api";

export const useSignIn = () => {
  return useMutation({
    mutationFn: (body: SignInBody) => authenticationApi.signIn(body),
  });
};
