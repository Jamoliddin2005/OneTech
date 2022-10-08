import React, { useState } from 'react'
import classes from "./Register.module.css"
import axios from "axios"
import { toast } from 'react-toastify'
import { BASE_URL } from '../../constants/BASE_URL'
import translate from '../../services/translate'

function Register({
    setIsRegister,
    setIsLogin,
}) {
    const [first_name, setFirstname] = useState("")
    const [last_name, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const PostRegister = async (e) => {
        e.preventDefault()
        password1.length > 5 ? (
            password1 === password2 ? (
                await axios.post(`${BASE_URL}account/register/`, {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    username: userName,
                    password: password1,
                    password2: password2,
                })
                    .then(res => res.json())
                    .then(res => {
                        return toast.success(translate("", "Muvaffaqiyatli!", "Success!"))
                    })
                    .catch(err => {
                        if (err.response) {
                            if (err.response.data) {
                                if (err.response.data) {
                                    if (err.response.data.username) {
                                        if (err.response.data.username[0] === translate("Учетная запись с таким именем пользователя уже существует.", "bir xil foydalanuvchi nomi bilan hisob allaqachon mavjud.", "account with this username already exists.")) {
                                            return toast.error(err.response.data.username[0])
                                        }
                                    }
                                    if (err.response.data.email) {
                                        if (err.response.data.email[0] === translate("учетная запись с этим адресом электронной почты уже существует.", "bir xil foydalanuvchi nomi bilan hisob allaqachon mavjud.", "account with this email already exists.")) {
                                            return toast.error(err.response.data.email[0])
                                        }
                                    }

                                }

                            }
                        }
                        setIsRegister(false)
                        return toast.success("Oтправлено на вашу EMAIL!")

                    })
            ) : toast.error("перепроверять пароли!")
        ) : toast.error("пароль очень простой")

    }
    return (
        <>
            <div className={classes.register}>
                <h3>{translate("Регистратсия", "Ro'yxatdan o'tish", "Registration")}</h3>
                <form action="#" onSubmit={PostRegister}>
                    <div className={classes.labelInp}>
                        <label htmlFor="first_name">{translate("Введите ваше имя", "Ismingizni kiriting", "First Name")}</label>
                        <input type="text" name="first_name" id="first_name" placeholder={translate("Введите ваше имя...", "Ismingizni kiriting...", "First Name...")} required={true}
                            value={first_name}
                            onChange={(e) => setFirstname(e.target.value)} />
                    </div>
                    <div className={classes.labelInp}>
                        <label htmlFor="last_name">{translate("Введите ваше фамилия", "Familiyangizni kiriting", "Last Name")}</label>
                        <input type="text" name="last_name" id="last_name" placeholder={translate("Введите ваше фамилия...", "Familiyangizni kiriting...", "Last Name...")} required={true} value={last_name}
                            onChange={(e) => setLastname(e.target.value)} />
                    </div>
                    <div className={classes.labelInp}>
                        <label htmlFor="userName">{translate("Введите ваше имя пользователя", "Foydalanuvchi nomi", "Username")}</label>
                        <input type="text" name="userName" id="userName" placeholder={translate("имя пользователя...", "Foydalanuvchi nomi...", "Username...")} required={true} value={userName}
                            onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className={classes.labelInp}>
                        <label htmlFor="email">{translate("Введите ваше Эл. адрес", "Elektron pochta manzil", "Email")}</label>
                        <input type="email" name="email" id="email" placeholder={translate("Эл. адрес...", "Elektron pochta manzil...", "Email...")} required={true} value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={classes.labelInp}>
                        <label htmlFor="password1">{translate("Введите ваше пароль", "Parolingizni kiriting", "Password")}</label>
                        <input type="password" name="password1" id="password1" placeholder={translate("Введите ваше пароль...", "Parolingizni kiriting...", "Password...")} required={true} value={password1}
                            onChange={(e) => setPassword1(e.target.value)} />
                    </div>
                    <div className={classes.labelInp}>
                        <label htmlFor="password2">{translate("Повторите ваш пароль", "Parolingizni qayta yozing", "Repeat your password")} </label>
                        <input type="password" name="password2" id="password2" placeholder={translate("Повторите ваш пароль...", "Parolingizni qayta yozing...", "Repeat your password...")} required={true} value={password2}
                            onChange={(e) => setPassword2(e.target.value)} />
                    </div>
                    <button>{translate("Регистратсия", "Ro'yxatdan o'tish", "Registration")}</button>
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
    )
}

export default Register