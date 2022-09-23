import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/BASE_URL";
import classes from "./Login.module.css";

function Login({ setIsRegister, setIsLogin, hrefHome }) {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");

  const PostLogin = async (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}account/login/`, {
        email: email,
        password: password1,
      })
      .then((response) => {
        localStorage.setItem("refreshToken", response.data.data.token.refresh)
        localStorage.setItem("accessToken", response.data.data.token.access)
        localStorage.setItem("first_name", response.data.data.first_name)
        localStorage.setItem("last_name", response.data.data.last_name)
        localStorage.setItem("email", response.data.data.email)
        localStorage.setItem("username", response.data.data.username)
        setIsRegister(false)
        setIsLogin(false)
        hrefHome()
        return toast.success("Success!")
      })
      .catch(err => {
        return toast.error("ERROR!!!")
      })
  };

  return (
    <>
      <div className={classes.login}>
        <h3>Login</h3>
        <form action="#" onSubmit={PostLogin}>
          <div className={classes.labelInp}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email..."
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.labelInp}>
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              name="password1"
              id="password1"
              placeholder="Password..."
              required={true}
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
      <div
        className={classes.bg}
        onClick={(e) => {
          setIsRegister(false);
          setIsLogin(false);
        }}
      ></div>
    </>
  );
}

export default Login;
