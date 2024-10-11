import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notFoundImage from "@/assets/not-found.svg";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-600">
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <p className="text-xl text-gray-200 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <img
        src={notFoundImage}
        alt="Not Found"
        className="w-64 h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-lg text-gray-200">
        You will be redirected to the home page in {countdown} seconds.
      </p>
    </div>
  );
};

export default NotFound;
