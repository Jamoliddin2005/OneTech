import React from 'react'
import classes from './Hero.module.css'

const Hero = (props) => {
    return (
        <div className={classes.hero} style={{backgroundImage: props.img, height: props.height ? props.height : ''}}>
            <div className={classes.hero_rgba} style={{background: props.rgba ? props.rgba : ''}}>
                <div className="container">
                    <div className={classes.center_title}>
                        <h2 className={classes.hero_title}>{props.text ? props.text : ''}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero