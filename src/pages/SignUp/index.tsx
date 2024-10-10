import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FormEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FireBaseApp from "../../firebase";
import { AuthContext } from "@/providers/Auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | undefined>();
  const auth = getAuth(FireBaseApp);
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        updateProfile(user, {
          displayName,
        });

        const token = await user.getIdToken();
        await authContext?.auth({
          token,
          user: { displayName: displayName },
        });
        navigate("/characters");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="bg-white p-6 rounded-lg shadow-xl"
    >
      <h1 className="text-center">Sign Up</h1>

      <>
        <label
          className="block text-gray-700 font-medium mb-2 text-left"
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="username"
          name="username"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          className="w-full p-3 border border-gray-400 rounded-lg outline-teal-500"
          id="username"
          required
        />
      </>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2 text-left"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full p-3 border border-gray-400 rounded-lg outline-teal-500"
          id="email"
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 font-medium mb-2 text-left"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full p-3 border border-gray-400 rounded-lg outline-teal-500"
          id="password"
          required
        />
      </div>
      <p className="text-red-400">{error && error}</p>
      <button
        type="submit"
        className="bg-teal-500 transition duration-500 hover:bg-teal-600 text-white font-medium w-full p-3 rounded-lg"
      >
        Register
      </button>
      <div className="flex">
        <div className="flex-start ">
          <button
            className="mr-4 transition duration-500 hover:underline"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
