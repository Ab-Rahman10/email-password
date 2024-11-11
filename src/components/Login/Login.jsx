import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();

  const handleLogin = (e) => {
    // reset status
    setErrorMessage("");
    setSuccess(false);

    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);

        // email verification
        if (!result.user.emailVerified) {
          setErrorMessage("Please verify your email address.");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please provide a valid email address");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("Reset email sent, Please check your email.");
      });
    }
  };

  return (
    <div>
      <div className="w-1/2 mx-auto  ">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label onClick={handleForgetPassword} className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-accent btn-wide">Login</button>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {success && <p className="text-green-500">Login Successful!</p>}
          <p>
            New to this website?{" "}
            <Link to="/signUp" className="underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
