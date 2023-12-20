import { useRoutes } from "react-router-dom";
import { Homepage } from "../features/home";

const publicRoutes = [{ path: "/", element: <Homepage /> }];
export const AppRoutes = () => {
  const element = useRoutes([...publicRoutes]);
  return <>{element}</>;
};
