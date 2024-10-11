import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { AuthContext } from "@/providers/Auth";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    authContext
      ?.signOut()
      .then(() => {
        navigate("/characters");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false); // Close the menu
    navigate(path); // Navigate to the specified path
  };

  return (
    <nav className="bg-red-500 p-4 w-full scroll-p-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="hover:opacity-75">
            <img src={logo} alt="Rick and Morty" width="50" height="50" />
          </Link>
          <span className="text-white text-xl font-bold ml-2">Rick and Morty App</span>
        </div>

        {/* Hamburger Menu Button */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden lg:flex lg:items-center lg:space-x-8 ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="text-white text-lg font-semibold">
            <Link
              to="/characters"
              onClick={() => handleNavigation("/characters")}
              className="hover:opacity-75"
            >
              Characters
            </Link>
          </div>
          <div className="text-white text-lg font-semibold">
            <div
              className="hover:opacity-75 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign out
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
  className={`lg:hidden transition-all duration-300 ease-in-out ${
    isMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
  } overflow-hidden`}
>
  <div className="flex flex-col space-y-4 p-4 bg-red-500">
    <div className="text-white text-lg font-semibold">
      <Link
        to="/characters"
        onClick={() => handleNavigation("/characters")}
        className="hover:opacity-75"
      >
        Characters
      </Link>
    </div>
    <div className="text-white text-lg font-semibold">
      <div
        className="hover:opacity-75 cursor-pointer"
        onClick={handleSignOut}
      >
        Sign out
      </div>
    </div>
  </div>
</div>

    </nav>
  );
};

export default Header;
