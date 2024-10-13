import { useForm } from "react-hook-form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import FireBaseApp from "@/firebase";
import { FirebaseError } from "firebase/app";
import { AuthContext } from "@/providers/Auth";
import logo from "@/assets/logo.png";

type TFormInput = {
  email: string;
  password: string;
  displayName: string;
};

const SignUp = () => {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      if (user) {
        await updateProfile(user, { displayName: data.displayName });
        const token = await user.getIdToken();
        await authContext?.auth({
          token,
          user: { displayName: data.displayName },
        });
        navigate("/characters");
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          alert("An account with this email already exists.");
        }
      } else {
        alert("An error occurred during registration.");
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
      <h1 className="text-center text-2xl text-white"> Sign Up</h1>

      {/* Display Name */}
      <div className="mb-4">
        <label
          className="block text-gray-200 font-medium mb-2 text-left"
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="text"
          {...register("displayName", { required: "Username is required" })}
          className={`w-full p-3 ${
            errors.displayName ? "bg-red-100" : "bg-white"
          }  border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-400`}
          id="displayName"
        />
        {errors.displayName && (
          <p className="text-red-400">{errors.displayName.message}</p>
        )}
      </div>

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
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 30,
              message: "Password must be no more than 30 characters",
            },
            validate: {
              hasLowercase: (value) =>
                /[a-z]/.test(value) ||
                "Must contain at least one lowercase letter",
              hasUppercase: (value) =>
                /[A-Z]/.test(value) ||
                "Must contain at least one uppercase letter",
              hasNumber: (value) =>
                /\d/.test(value) || "Must contain at least one number",
              hasSpecialChar: (value) =>
                /[^\w\s]/.test(value) ||
                "Must contain at least one special character (^ $ * . [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~)",
            },
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

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-red-500 transition duration-500 hover:bg-red-700 text-white font-medium w-full p-3 rounded-lg"
      >
        Register
      </button>
      <div className="flex">
        <div className="flex-start mt-4 text-gray-200">
          Already have an account?
          <Link
            className="ml-4 transition duration-500 hover:underline hover:text-red-600"
            to={"/sign-in"}
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
