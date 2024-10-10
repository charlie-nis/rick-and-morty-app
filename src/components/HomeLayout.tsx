import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@/providers/Auth";
import FullScreenLoader from "@/components/FullScreenLoader";

const HomeLayout = () => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);

  const isLoading = authCtx?.currentState?.isLoading;
  const isLoggedIn = authCtx?.currentState?.token;

  if (isLoading) return <FullScreenLoader />;

  if (isLoggedIn)
    return <Navigate to="/characters" state={{ from: location }} replace />;

  return <Outlet />;
};

export default HomeLayout;
