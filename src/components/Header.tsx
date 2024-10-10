import { Link, useNavigate } from "react-router-dom";
// import { getAuth, signOut } from "firebase/auth";

const Header = (
  // { pageName }: { pageName: string }
) => {
  const navigate = useNavigate();
  // const auth = getAuth();

  const clickHandler = () => {
    // signOut(auth)
    //   .then(() => {
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <nav className="bg-teal-300 p-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-white text-2xl font-bold">
            Tada!
          </Link>
        </div>
        {/* <div className="ml-6 space-x-4 text-center text-white text-2xl font-bold">
          {pageName}
        </div> */}
        <div className="flex row space-x-8">
          <div className=" text-white text-2xl font-bold">
            <Link to="/characters">Characters</Link>
          </div>
          <div className="flex items-center">
            <button
              className="bg-teal-500 transition duration-100 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => clickHandler()}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;