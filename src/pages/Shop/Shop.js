import React, { useState } from 'react'
import Hero from '../../components/Hero/Hero'
import translate from '../../services/translate'
import Filter from './Filter/Filter'
import Products from './Products/Products'
import classes from './Shop.module.css'

const Shop = ({ token }) => {
    const [text, setText] = useState(()=> {
        return translate("Смартфоны и Планшеты","Smartfonlar va Plnashetlar","Smartphones & Tablets")
      })
    return (
        <div className={classes.Shop}>
            <Hero text={text} img='url(/images/shop_background.jpg.webp)' rgba='linear-gradient(#fff,#cde4f1)' />
            <div className={classes.product_container}>
                <div className={classes.product_filter}>
                    <Filter token={token} />
                    <Products token={token} />
                </div>
            </div>
        </div>
    )
}

export default Shop