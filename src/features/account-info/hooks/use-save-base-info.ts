import { useMutation } from "@tanstack/react-query";
import { accountInfoApi } from "../api";
import { BaseInfoBody } from "../types";

export const useSaveBaseInfo = () => {
  return useMutation({
    mutationFn: (body: BaseInfoBody) => accountInfoApi.saveAccountInfo(body),
  });
};
