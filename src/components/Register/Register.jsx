import React from "react";

const Register = () => {
  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(e.target.email.value, e.target.password.value);
  };

  return (
    <div className="w-1/2 mx-auto  ">
      <h2 className="text-2xl font-semibold text-center">Register</h2>
      <form onSubmit={handleSubmitForm} className="card-body">
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
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-accent btn-wide">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
