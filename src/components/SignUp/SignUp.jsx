import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const terms = e.target.terms.checked;

    console.log(email, password, name, photoURL, terms);

    // reset the error message
    setSuccess(false);
    setErrorMessage("");

    // terms
    if (!terms) {
      setErrorMessage("You have not accepted our terms and condition.");
    }

    // password validation
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password should be at least 1 Uppercase, 1 Lowercase, 1 Number, 1 Special character and at least 8 characters"
      );
      return;
    }

    // create user email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        //Send verification email
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification sent");
        });

        // Update profile
        const profile = {
          displayName: name,
          photoURL: photoURL,
        };
        updateProfile(auth.currentUser, profile).then(() => {
          console.log("User profile updated");
        });
      })
      .catch((error) => {
        console.log("Error", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="w-1/2 mx-auto  ">
      <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="text"
            name="photoURL"
            placeholder="PhotoURL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-12"
          >
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control">
          <label className="cursor-pointer justify-start label">
            <input
              type="checkbox"
              name="terms"
              className="checkbox checkbox-error"
            />
            <span className="label-text ml-2">
              Accept our terms and condition.
            </span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-accent btn-wide">Sign Up</button>
        </div>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage} </p>}
      {success && <p className="text-green-600">Sign up is Successful</p>}
      <p>
        Already have an account?
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
