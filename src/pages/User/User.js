import React from 'react'
import classes from './User.module.css'
import UserOffice from './UserOffice/UserOffice'

const User = ({hrefHome}) => {
    return (
        <div className={classes.User_dashboard}>
            <div className="container">
                <div className={classes.dashboard}>
                    <UserOffice hrefHome={hrefHome}/>
                </div>
            </div>
        </div>
    )
}

export default User