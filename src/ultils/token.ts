import routes from "@/configs/routes";
import { Tokens } from "@/features/authentication/types";
import Cookies from "js-cookie";

export const setTokens = (tokens: Tokens[]) => {
  tokens.forEach(({ token, expiresIn, type }) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    Cookies.set(type, token, {
      expires: expirationDate,
      secure: true,
      sameSite: "strict",
    });
  });
};

export const logout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
  window.location.href = routes.authenticate;
};
