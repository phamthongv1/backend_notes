/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../assets/css/neumorphism.css";

export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");
  const [isRegister, setIsRegister] = useState(false);


  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/register", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setErr(res.data.msg);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
      setErr(res.data.msg);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  return (
    <>
      {isRegister ? (
        <div className="container">
          <div className="card">
            <div className="card__content">
              <h3 className="card__title">Login</h3>
              <form onSubmit={registerSubmit}>
                <div className="input-fields">
                  <div className="text-input-group">
                    <input
                      type="text"
                      name="name"
                      id="register-name"
                      placeholder="Name"
                      required
                      value={user.name}
                      onChange={onChangeInput}
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                </div>
                <div className="input-fields">
                  <div className="text-input-group">
                    <input
                      type="email"
                      name="email"
                      id="register-email"
                      placeholder="Email"
                      required
                      value={user.email}
                      onChange={onChangeInput}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="input-fields">
                  <div className="text-input-group">
                    <input
                      type="password"
                      name="password"
                      id="register-password"
                      placeholder="Password"
                      required
                      value={user.password}
                      autoComplete="true"
                      onChange={onChangeInput}
                    />
                    {/* <i className="far fa-eye"></i>
              <i className="far fa-eye-slash"></i> */}
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <p className="error-messenger">{err}</p>
                <div className="card__footer">
                  <button type="submit">
                    <span>Register</span>
                  </button>
                </div>
                <p className="guide">
                  You have an account?{" "}
                  <span className="register">
                    Login Now
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="card">
            <div className="card__content">
              <h3 className="card__title">Login</h3>
              <form onSubmit={loginSubmit}>
                <div className="input-fields">
                  <div className="text-input-group">
                    <input
                      type="email"
                      name="email"
                      id="login-email"
                      placeholder="Email"
                      required
                      value={user.email}
                      onChange={onChangeInput}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="input-fields">
                  <div className="text-input-group">
                    <input
                      type="password"
                      name="password"
                      id="login-password"
                      placeholder="Password"
                      required
                      value={user.password}
                      autoComplete="true"
                      onChange={onChangeInput}
                    />
                    {/* <i className="far fa-eye"></i>
              <i className="far fa-eye-slash"></i> */}
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <p className="error-messenger">{err}</p>
                <div className="card__footer">
                  <button type="submit">
                    <span>Login</span>
                  </button>
                </div>
                <p className="guide">
                  You don't have an account?{" "}
                  <span className="register">
                    Register Now
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
