import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { BASE_URL } from '../../constants/BASE_URL';
import classes from './Contact.module.css';
import translate from '../../services/translate'


const Contact = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [message, setMessage] = useState("")
    const [location, setLocation] = useState([""])

    useEffect(() => {
        const GetLocation = async () => {
            fetch(`${BASE_URL}contact/location`)
                .then((response) => response.json())
                .then(res => {
                    setLocation(res);
                })
                .catch(err => toast.error("ERROR"))
        }
        GetLocation()
    }, [])


    const SubmitContact = async (e) => {
        await axios.post(`${BASE_URL}contact/create/`, {
            full_name: name,
            phone: phoneNumber,
            email: email,
            message: message,
        })
            .then(response => {
                setName("")
                setEmail("")
                setPhoneNumber("")
                setMessage("")
                return toast.success(response.statusText)
            })
            .catch(err => toast.error(err.response.data.email[0]))
    }


    return (
        <>
            <div className="container">
                <div className={classes.Contact}>
                    <div className={classes.contacts}>
                        <div className={classes.contact}>
                            <i className="fa-solid fa-mobile-screen"></i>
                            <div className="contact_info">
                                <h4>Phone</h4>
                                <a rel="noopener noreferrer" href="tel:+38 068 005 3570">+38 068 005 3570</a>
                            </div>
                        </div>
                        <div className={classes.contact}>
                            <i className="fa-solid fa-envelope"></i>
                            <div className="contact_info">
                                <h4>Email</h4>
                                <a target="_blank" rel="noopener noreferrer" href="mailto: fastsales@gmail.com">fastsales@gmail.com</a>
                            </div>
                        </div>
                        <div className={classes.contact}>
                            <i className="fa-solid fa-location-dot"></i>
                            <div className="contact_info">
                                <h4>Address</h4>
                                <a target="_blank" rel="noopener noreferrer" href="https://yandex.ru/maps?whatshere%5Bpoint%5D=69.302221%2C41.309052&whatshere%5Bzoom%5D=18.458757&ll=69.30227909560165%2C41.308859862508925&z=18.458757">10 Suffolk at Soho, London, UK</a>
                            </div>
                        </div>
                    </div>
                    <div className={classes.get_in_touch}>
                        <div className={classes.Locations}>
                            <h4>{translate("Локации", "Joylashuvlar", "Locations")}</h4>
                            {location.map((item, index) => (
                                <p key={index} onClick={() => {
                                    window.open(item.url)
                                }}>{item.name}</p>
                            ))}
                        </div>
                        <div className={classes.Right_Form}>
                            <h2>Get in Touch</h2>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                            }}>
                                <div className={classes.inputs}>
                                    <input type="text" name='name' className={classes.inp} placeholder='Your name' required={true} value={name} onChange={(e) => {
                                        setName(e.target.value)
                                    }} />
                                    <input type="email" name='email' className={classes.inp} placeholder='Your email' required={true} value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} />
                                    <input type="number" name='name' className={classes.inp} placeholder='Your phone number' required={true} value={phoneNumber} onChange={(e) => {
                                        setPhoneNumber(e.target.value)
                                    }} />
                                </div>
                                <div className={classes.textarea}>
                                    <textarea name="message" id="" rows="4" placeholder='Message' value={message} onChange={(e) => {
                                        setMessage(e.target.value)
                                    }} ></textarea>
                                </div>
                                <button className={classes.btn} onClick={(e) => {
                                    SubmitContact()
                                }}>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contact