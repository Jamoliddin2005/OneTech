import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../../components/Loading/Loading'
import { BASE_URL } from '../../constants/BASE_URL'
import classes from './Cart.module.css'
import translate from '../../services/translate'


const Cart = ({
    minusNumber,
    productsInCart,
    totalCoastGet,
    cartNumbers,
    token,
    setIsLogin
}) => {
    const rightText = [classes.cart_item_inline]
    rightText.push(classes.right_cart_text)
    const name = [classes.cart_item_inline_value]
    name.push(classes.media_name)

    const [money, setMoney] = useState(false)
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [note, setNote] = useState("")
    const [zipCode, setZipCode] = useState("")



    const onSubmit = async (e) => {
        e.preventDefault()
        let quantity = []
        let productIds = []
        for (var i = 0; i < Object.values(JSON.parse(productsInCart)).length; i++) {
            quantity.push(Object.values(JSON.parse(productsInCart))[i].in_cart * Object.values(JSON.parse(productsInCart))[i].value);
            productIds.push(Object.values(JSON.parse(productsInCart))[i].id);
        }

        axios.post(`${BASE_URL}cart/order/`, {
            phone: phoneNumber,
            address: address,
            note: note,
            zipcode: zipCode,
            cart_items: productIds
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
            .then(res => {
                axios.post(`${BASE_URL}cart/quantity/`, {
                    cart_items: productIds,
                    quantities: quantity
                })
                    .then(res => {
                        setMoney(false)
                        return toast.success(res.data.message)
                    })
                    .catch(err => toast.error("ERROR"))
            })
            .catch(err => toast.error("ERROR"))

    }


    const nameCart = (e) => {
        if (e.length > 10) {
            return e.slice(0, 9) + "..."
        }
    }

    return (
        <div className={classes.Cart}>
            <div className="container">
                {
                    productsInCart ? <div className={classes.cart_container}>
                        {
                            Object.values(JSON.parse(productsInCart)).length > 0 ? (
                                <>

                                    <h2 className={classes.cart_title}>
                                        {translate("Корзинка", "Savatcha", "Shopping Cart")}
                                    </h2>
                                    <div className={classes.cart_items}>
                                        <ul>
                                            <li className={classes.cart_inline_names}>
                                                <p className={classes.cart_item_inline_name}>     {translate("Картина", "Rasm", "Photo")} </p>
                                                <p className={classes.cart_item_inline_name}>     {translate("Имя", "Nomi", "Name")} </p>
                                                <p className={classes.cart_item_inline_name}>     {translate("Цена", "Narx", "Price")} </p>
                                                <p className={classes.cart_item_inline_name}>     {translate("Категория", "Kategoriya", "Category")} </p>
                                                <p className={classes.cart_item_inline_name}>     {translate("Масса", "Og'irlik", "weight")} </p>
                                                <p className={classes.cart_item_inline_name}>     {translate("Количество", "Soni", "Total")} </p>
                                            </li>
                                            {
                                                Object.values(JSON.parse(productsInCart)).map((item, index) => (
                                                    <li className={classes.cart_item} key={index}>
                                                        <div className={classes.cart_item_inline_img}>
                                                            <img src={item.product_images[0].image} alt="" />
                                                        </div>
                                                        <div className={classes.cart_item_inlines}>
                                                            <div className={classes.cart_item_inline}>
                                                                <h4 className={name.join(' ')}>{nameCart(item.name)}</h4>
                                                            </div>
                                                            <div className={rightText.join(' ')}>
                                                                <h4 className={classes.cart_item_inline_value}>{item.value}</h4>
                                                            </div>
                                                            <div className={rightText.join(' ')}>
                                                                <h4 className={classes.cart_item_inline_value}>{item.category[0].name}</h4>
                                                            </div>
                                                            <div className={rightText.join(' ')}>
                                                                <h4 className={classes.cart_item_inline_value}>{item.capacity}</h4>
                                                            </div>
                                                            <div className={rightText.join(' ')}>
                                                                <div className={classes.cartnumber}>
                                                                    <button
                                                                        className={classes.minus}
                                                                        onClick={(e) => {
                                                                            minusNumber(item);
                                                                        }}
                                                                    > - </button>
                                                                    <div className={classes.number}>{item.in_cart}</div>
                                                                    <button
                                                                        className={classes.plus}
                                                                        onClick={(e) => {
                                                                            cartNumbers(item);
                                                                        }}
                                                                    >  + </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    <div className={classes.order_total}>
                                        <p className={classes.order_total_name}>
                                            {translate("Итоговая цена:", "Jami:", "Order Total:")}
                                        </p>
                                        <h3 className={classes.order_total_value}>{totalCoastGet} UZS</h3>
                                    </div>

                                    <div className={classes.add_cart_btns}>
                                        {token ? <Link to={"/"} className={classes.add_cart_btn} onClick={(e) => {
                                            e.preventDefault()
                                            setMoney(true)
                                        }} > {translate("Покупать", "Sotib olish", "Buy")}</Link> : <Link to={"/"} className={classes.add_cart_btn} onClick={(e) => {
                                            e.preventDefault()
                                            setIsLogin(true)
                                        }}> {translate("Покупать", "Sotib olish", "Buy")}</Link>}
                                    </div>

                                    {money ? <div className={classes.AddToCartBg} onClick={() => {
                                        setMoney(false)
                                    }}>
                                    </div> : ""}

                                    {money ? (
                                        <div className={classes.money}>
                                            <div className={classes.form}>
                                                <form onSubmit={onSubmit}>
                                                    <label htmlFor="phoneNumber"> {translate("Номер телефона", "Telefon raqam", "Phone Number")}</label>
                                                    <input type="number" name="phoneNumber" id="phoneNumber" placeholder={translate("Номер телефона", "Telefon raqam", "Phone Number")} required value={phoneNumber} onChange={(e) => {
                                                        setPhoneNumber(e.target.value)
                                                    }} />
                                                    <label htmlFor="Address"> {translate("Адрес", "Manzil", "Address")}</label>
                                                    <input type="text" name="Address" id="Address" placeholder={translate("Адрес", "Manzil", "Address")} required value={address} onChange={(e) => {
                                                        setAddress(e.target.value)
                                                    }} />
                                                    <label htmlFor="Note">{translate("Напоминание", "Eslatma", "Note")}</label>
                                                    <input type="text" name="Note" id="Note" placeholder={translate("Напоминание", "Eslatma", "Note")} required value={note} onChange={(e) => {
                                                        setNote(e.target.value)
                                                    }} />
                                                    <label htmlFor="ZipCode">{translate("Почтовый индекс", "Pochta indeksi", "ZipCode")}</label>
                                                    <input type="number" name="ZipCode" id="ZipCode" placeholder={translate("Почтовый индекс", "Pochta indeksi", "ZipCode")} required value={zipCode} onChange={(e) => {
                                                        setZipCode(e.target.value)
                                                    }} />
                                                    <button>{translate("Отправлять", "Yuborish", "Submit")}</button>
                                                </form>
                                            </div>
                                        </div>
                                    ) : ""}
                                </>
                            ) : <Link to={"/"} className={classes.empty}>{translate("Корзина пуста", "Savatcha bo‘sh", "Cart is empty")}</Link>
                        }


                    </div> : productsInCart === null ? <Link className={classes.empty} to={"/"}>{translate("Корзина пуста", "Savatcha bo‘sh", "Cart is empty")}</Link> : productsInCart === 0 ? <Link className={classes.empty} to={"/"}>{translate("Корзина пуста", "Savatcha bo‘sh", "Cart is empty")}</Link> : <Loading />
                }

            </div>
        </div >
    )
}

export default Cart