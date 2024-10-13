import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import FireBaseApp from "@/firebase";
import { FirebaseError } from "firebase/app";
import { AuthContext } from "@/providers/Auth";
import logo from "@/assets/logo.png";

type TFormInput = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInput>();

  const auth = getAuth(FireBaseApp);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const onSubmit = async (data: TFormInput) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      await authContext?.auth({
        token,
        user: { displayName: user.displayName },
      });
      navigate("/characters");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          alert("Invalid email or password");
        }
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-zinc-600 p-6 rounded-lg mt-10 max-w-[600px] mx-auto"
      noValidate
    >
      <img
        src={logo}
        alt="Rick and Morty"
        width="70"
        height="70"
        className="mx-auto my-4"
      />
      <h1 className="text-center text-2xl text-white">Sign In</h1>

      {/* Email */}
      <div className="mb-4">
        <label
          className="block text-gray-200 font-medium mb-2 text-left"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email address",
            },
          })}
          className={`w-full p-3 ${
            errors.email ? "bg-red-100" : "bg-white"
          }  border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-400`}
          id="email"
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="mb-6">
        <label
          className="block text-gray-200 font-medium mb-2 text-left"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          className={`w-full p-3 ${
            errors.password ? "bg-red-100" : "bg-white"
          }  border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-400`}
          id="password"
        />
        {errors.password && (
          <p className="text-red-400">{errors.password.message}</p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-red-500 transition duration-500 hover:bg-red-700 text-white font-medium w-full p-3 rounded-lg"
      >
        Login
      </button>

      <div className="flex">
        <div className="flex-start mt-4 text-gray-200">
          Don't have an account yet?
          <Link
            className="ml-4 transition duration-500 hover:underline hover:text-red-600"
            to={"/sign-up"}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
