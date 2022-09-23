import React from 'react'
import classes from "./Error.module.css"

function Error() {
    return (
        <div className={classes.Error}>
            <h1 style={{color: 'red' , fontSize: '90px'}}>404</h1>
            <h3>Page not found</h3>
        </div>
    )
}

export default Error