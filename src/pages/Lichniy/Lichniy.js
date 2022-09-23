import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../constants/BASE_URL'
import classes from "./Lichniy.module.css"

function Lichniy({ token }) {
    const [lastName, setLastName] = useState(localStorage.getItem('last_name'))
    const [firstName, setFirstName] = useState(localStorage.getItem('first_name'))
    const [userName, setUserName] = useState(localStorage.getItem('username'))
    const [email, setEmail] = useState(localStorage.getItem('email'))





    const UpdateAccount = async (e) => {
        e.preventDefault()
        await axios.put(`${BASE_URL}account/profile/${userName}/`, {
            email: email,
            first_name: firstName,
            last_name: lastName,
            username: userName,
            bio: "0",
            gender: "a"
        })
            .then(res => {
                localStorage.setItem('last_name', res.data.last_name)
                localStorage.setItem('email', res.data.email)
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('first_name', res.data.first_name)
                toast.success("Saved!")
            })
            .catch(err => toast.error("Username cannot be changed!"))
    }

    return (
        <div className={classes.Lichniy}>
            <div className="container">
                <div className={classes.Profile_private}>
                    <form action="#" onSubmit={(e) => e.preventDefault()}>
                        <div className={classes.div_input_label}>
                            <label htmlFor="last_name">Фамилия</label>
                            <input type="text" name="last_name" id="last_name" placeholder='Last Name' value={lastName} onChange={(e) => {
                                setLastName(e.target.value);
                            }} />
                        </div>
                        <div className={classes.div_input_label}>
                            <label htmlFor="first_name">Имя</label>
                            <input type="text" name="first_name" id="first_name" placeholder='First Name' value={firstName} onChange={(e) => {
                                setFirstName(e.target.value);
                            }} />
                        </div>
                        <div className={classes.div_input_label}>
                            <label htmlFor="username">Имя пользователя</label>
                            <input type="text" name="username" id="username" placeholder='Username' value={userName} onChange={(e) => {
                                setUserName(e.target.value);
                            }} />
                        </div>
                        <div className={classes.div_input_label}>
                            <label htmlFor="Email">E-mail</label>
                            <input type="email" name="Email" id="Email" placeholder='Email' value={email} onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                        </div>
                        <button onClick={UpdateAccount}>Сохранить изменения</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Lichniy