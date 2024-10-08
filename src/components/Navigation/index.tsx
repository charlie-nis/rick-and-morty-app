import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export const Navigation = ({ pageName }: { pageName: string }) => {
  const [signedIn, setSignedIn] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  const clickHandler = () => {
    setSignedIn(!signedIn);
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="bg-teal-300 p-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard" className="text-white text-2xl font-bold">
            Tada!
          </Link>
        </div>
        <div className="ml-6 space-x-4 text-center text-white text-2xl font-bold">
          {pageName}
        </div>
        <div className="flex items-center">
          <button
            className="bg-teal-500 transition duration-100 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => clickHandler()}
          >
            {signedIn ? "Sign out" : "Sign in"}
          </button>
        </div>
      </div>
    </nav>
  );
};