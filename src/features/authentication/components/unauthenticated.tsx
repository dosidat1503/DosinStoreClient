import routes from "@/configs/routes";
import { useAppSelector } from "@/store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const UnAuthenticated = ({ children }: { children: ReactNode }) => {
  const isSignIn = useAppSelector((state) => state.auth.isSignIn);

  if (!isSignIn) {
    return <Navigate to={routes.authenticate} replace />;
  }

  return <>{children}</>;
};

export default UnAuthenticated;
