import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@/providers/Auth";
import FullScreenLoader from "@/components/FullScreenLoader";
import Header from "./Header";

const ProtectedLayout = () => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);

  const isLoading = authCtx?.currentState?.isLoading;
  const isLoggedIn = authCtx?.currentState?.token;

  if (isLoading) return <FullScreenLoader />;

  if (isLoggedIn)
    return (
      <>
        <Header />
        <div className="container mx-auto m-5 ">
          <div className="grid grid-cols-1 gap-4">
            <div className=" p-6  mb-5 mt-5 transition duration-500  rounded">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    );

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedLayout;
