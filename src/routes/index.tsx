import { RouteObject, useRoutes } from "react-router-dom";

import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { NotFound } from "@/components/ui";
export * from "./protected";

export const AppRoutes = () => {
  let routes: RouteObject[] = [...publicRoutes, ...protectedRoutes, { path: "*", element: <NotFound /> }];

  const element = useRoutes(routes);

  return <>{element}</>;
};
