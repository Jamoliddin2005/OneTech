import React from 'react'
import { useState } from 'react'
import Card from '../Card/Card'
import classes from './UserOffice.module.css'

const UserOffice = ({hrefHome}) => {
  const [cards] = useState([
    {
      img: (<i className="fa-regular fa-user"></i>),
      name: "Личные данные",
      url: "/private",
      id: 1
    },
    {
      img: (<i className="fa-solid fa-list-check"></i>),
      name: "История заказов",
      url: "/wishlist",
      id: 2
    },
    {
      img: (<i className="fa-regular fa-rectangle-list"></i>),
      name: "Профили заказов",
      url: "/wishlist",
      id: 3
    },
    {
      img: (<i className="fa-solid fa-cart-shopping"></i>),
      name: "Корзина",
      url: "/cart",
      id: 4
    },
    {
      img: (<i className="fa-regular fa-address-book"></i>),
      name: "Контакты",
      url: "/contact",
      id: 5
    },
    {
      img: (<i className="fa-solid fa-arrow-right-from-bracket"></i>),
      name: "Выход",
      url: "/",
      id: 6,
      logout: true
    }
  ])

  return (
    <div className={classes.UserOffice}>
      {
        cards.map((item, idx) => {
          return (
            <Card hrefHome={hrefHome} image={item.img} name={item.name} url={item.url} key={item.id} logout={item.logout} />
          )
        })
      }
    </div>
  )
}

export default UserOffice