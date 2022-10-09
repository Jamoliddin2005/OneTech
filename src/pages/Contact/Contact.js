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
                        <h2>{translate("Связаться", "Biz bilan aloqa", "Get in Touch")}</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className={classes.inputs}>
                                <input type="text" name='name' className={classes.inp} placeholder={translate("Ваше имя", "Ismingizni kiriting", "Your name")} required={true} value={name} onChange={(e) => {
                                    setName(e.target.value)
                                }} />
                                <input type="email" name='email' className={classes.inp} placeholder={translate("Ваш адрес электронной почты", "E-mail manzilingizni kiriting", "Your email")} required={true} value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                                <input type="number" name='name' className={classes.inp} placeholder={translate("Ваш номер телефона", "Telefon raqamingizni kiriting", "Your phone number")} required={true} value={phoneNumber} onChange={(e) => {
                                    setPhoneNumber(e.target.value)
                                }} />
                            </div>
                            <div className={classes.textarea}>
                                <textarea name="message" id="" rows="4" placeholder={translate("Сообщение", "Xabaringini kiriting", "Message")} value={message} onChange={(e) => {
                                    setMessage(e.target.value)
                                }} ></textarea>
                            </div>
                            <button className={classes.btn} onClick={(e) => {
                                SubmitContact()
                            }}>{translate("Отправить", "Xabarni yuborish", "Send Message")}</button>
                        </form>
                    </div>
                </div>
                <div className={classes.Locations}>
                    <h4>
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="25px" height="25px" viewBox="0 0 395.71 395.71" xmlSpace="preserve">
                            <g>
                                <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
		c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
		C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
		c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
                            </g>
                        </svg>
                        {translate("Локации", "Joylashuvlar", "Locations")}
                        <div className={classes.location_div}>
                            {location.map((item, index) => (
                                <p key={index} onClick={() => {
                                    window.open(item.url)
                                }}>
                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        width="10px" height="10px" viewBox="0 0 395.71 395.71" xmlSpace="preserve" style={{ marginRight: "5px" }}>
                                        <g>
                                            <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
		c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
		C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
		c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
                                        </g>
                                    </svg>
                                    {item.name}</p>
                            ))}
                        </div></h4>

                </div>
            </div>
            <div className="map">
                <div className={classes.map_top}></div>
                <div className="map_yandex">
                    <div className={classes.map_yandex}><iframe src="https://yandex.uz/map-widget/v1/-/CCUVbQVz~B" width="100%" height="400" frameBorder="1" allowFullScreen={true} style={{ position: 'relative' }}></iframe></div>
                </div>
            </div>

        </>
    )
}

export default Contact