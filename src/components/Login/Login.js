import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/BASE_URL";
import classes from "./Login.module.css";
import translate from '../../services/translate'

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
        <h3>{translate("Войти", "Kirish", "Login")}</h3>
        <form action="#" onSubmit={PostLogin}>
          <div className={classes.labelInp}>
            <label htmlFor="email">{translate("Эл. адрес", "Elektron pochta manzil", "Email")}</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={translate("Эл. адрес...", "Elektron pochta manzil...", "Email...")}
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.labelInp}>
            <label htmlFor="password1">{translate("Пароль", "Parolingizni kiriting", "Password")}</label>
            <input
              type="password"
              name="password1"
              id="password1"
              placeholder={translate("Пароль...", "Parolingizni kiriting...", "Password...")}
              required={true}
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <button>{translate("Войти", "Kirish", "Login")}</button>
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
