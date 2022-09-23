import React, { useEffect, useState } from "react";
import classes from "./Partner.module.css";
import Slider from "react-slick";

let NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <button className={className + " " + classes.nextBtn} onClick={onClick}>
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  );
};

let PrevBtn = (props) => {
  const { className, onClick } = props;
  return (
    <button className={className + " " + classes.prevBtn} onClick={onClick}>
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );
};

const Partner = () => {
  const [images] = useState([
    "/images/moreProduct/brand1.png",
    "/images/moreProduct/brand2.png",
    "/images/moreProduct/brand3.png",
    "/images/moreProduct/brand4.png",
    "/images/moreProduct/brand1.png",
    "/images/moreProduct/brand2.png",
    "/images/moreProduct/brand3.png",
    "/images/moreProduct/brand4.png",
    "/images/moreProduct/brand1.png",
    "/images/moreProduct/brand2.png",
    "/images/moreProduct/brand3.png",
    "/images/moreProduct/brand4.png",
  ]);
  const [slide, setSlide] = useState(8);
  useEffect(
    (e) => {
      if (window.innerWidth > 768 && window.innerWidth < 992) {
        setSlide(4);
      } else if (window.innerWidth > 576 && window.innerWidth < 768) {
        setSlide(2);
      } else if (window.innerWidth < 576) {
        setSlide(1);
      }
    },
    []
  );
  const settings = {
    dots: false,
    infinite: true,
    loop: true,
    slidesToShow: slide,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 250,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };
  return (
    <div className={classes.Partner}>
      <div className="container Partner">
        <div className={classes.shadowBox}>
          <div className={classes.slideBox}>
            <Slider {...settings}>
              {images.map((img, index) => {
                return (
                  <div key={index} className={classes.sild}>
                    <img src={img} alt="img" />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
