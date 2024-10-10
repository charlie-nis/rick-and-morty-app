import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, MouseEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FireBaseApp from "../../firebase";
import { FirebaseError } from "firebase/app";
import { AuthContext } from "@/providers/Auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const auth = getAuth(FireBaseApp);
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      await authContext?.auth({
        token,
        user: { displayName: user.displayName },
      });
      navigate("/characters");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      } else {
        setError("An error occurred");
      }
    }
  };

  const toggleSignUp = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSignUp(!signUp);
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="bg-white p-6 rounded-lg shadow-xl"
    >
      <h1 className="text-center">{signUp ? "Sign Up" : "Sign In"}</h1>

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
        Login
      </button>
      <div className="flex">
        <div className="flex-start ">
          <button
            className="mr-4 transition duration-500 hover:underline"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
