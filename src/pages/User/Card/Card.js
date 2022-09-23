import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import classes from './Card.module.css'

const Card = (props) => {
  const logout = () => {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    localStorage.removeItem("first_name")
    localStorage.removeItem("last_name")
    localStorage.removeItem("email")
    localStorage.removeItem("username")
    props.hrefHome()
    return toast.success("Logout successfully!")
  }
  return (
    <Link to={props.url} className={classes.Card} onClick={() => {
      if (props.logout === true) {
        logout()
      }
    }}>

      {props.image}
      <p>{props.name}</p>
    </Link>
  )
}

export default Card