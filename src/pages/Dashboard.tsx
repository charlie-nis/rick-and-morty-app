import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Navigation } from "../components";

export const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigation("/");
    }
  }, [user, navigation]);

  return (
    <>
      <Navigation pageName="Dashboard" />
      <div className="container mx-auto m-5">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-6 shadow-md mb-5 mt-5 transition duration-500 hover:shadow-xl rounded">
            <h2>
              Welcome:{" "}
              <span className="text-lg font-bold">{user?.displayName}</span>
            </h2>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <h3>You are logged IN!!🔥🔥🔥🔥🔥</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;