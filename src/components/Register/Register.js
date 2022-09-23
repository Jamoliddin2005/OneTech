import React, { useState } from 'react'
import classes from "./Register.module.css"
import axios from "axios"
import { toast } from 'react-toastify'
import { BASE_URL } from '../../constants/BASE_URL'

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
                        return toast.success("Success!")
                    })
                    .catch(err => {
                        if (err.response) {
                            if (err.response.data) {
                                if (err.response.data) {
                                    if (err.response.data.username) {
                                        if (err.response.data.username[0] === "account with this username already exists.") {
                                            return toast.error(err.response.data.username[0])
                                        }
                                    }
                                    if (err.response.data.email) {
                                        if (err.response.data.email[0] === "account with this email already exists.") {
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
                <h3>Register</h3>
                <form action="#" onSubmit={PostRegister}>
                    <div className={classes.labelInp}>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" name="first_name" id="first_name" placeholder="First Name..." required={true}
                            value={first_name}
                            onChange={(e) => setFirstname(e.target.value)} />
                    </div>
                    <div className={classes.labelInp}>
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" name="last_name" id="last_name" placeholder="Last Name..." required={true} value={last_name}
                            onChange={(e) => setLastname(e.target.value)} />
                    </div>
                    <div className={classes.labelInp}>
                        <label htmlFor="userName">Username</label>
                        <input type="text" name="userName" id="userName" placeholder="Username..." required={true} value={userName}
                            onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className={classes.labelInp}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email..." required={true} value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={classes.labelInp}>
                        <label htmlFor="password1">Password</label>
                        <input type="password" name="password1" id="password1" placeholder="Password..." required={true} value={password1}
                            onChange={(e) => setPassword1(e.target.value)} />
                    </div>
                    <div className={classes.labelInp}>
                        <label htmlFor="password2">Password </label>
                        <input type="password" name="password2" id="password2" placeholder="Password..." required={true} value={password2}
                            onChange={(e) => setPassword2(e.target.value)} />
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
    )
}

export default Register