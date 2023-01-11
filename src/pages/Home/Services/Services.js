import React from "react";
import classes from "./Services.module.css";

function Services() {
  const services = [
    {
      img: "/images/char_1.png.webp",
      text: "Free Delivery",
      from: "from $50",
    },
    {
      img: "/images/char_1.png.webp",
      text: "Free Delivery",
      from: "from $50",
    },
    {
      img: "/images/char_1.png.webp",
      text: "Free Delivery",
      from: "from $50",
    },
    {
      img: "/images/char_1.png.webp",
      text: "Free Delivery",
      from: "from $50",
    },
  ];
  return (
    <div className={classes.Services}>
      <div className="container">
        <div className={classes.row}>
          {services.map((item, index) => (
            <div className={classes.item} key={index}>
              <div className={classes.ItemLeft}>
                <img src={item.img} alt="" />
              </div>
              <div className={classes.ItemRight}>
                <h4>{item.text}</h4>
                <h6>{item.from}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
