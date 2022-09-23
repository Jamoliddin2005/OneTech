import React, { useState, useEffect } from "react";
import classes from "./PopularCategories.module.css";
import Slider from "react-slick";
// import { Link } from "react-router-dom";
import "./Slider.css";
function PopularCategories() {
  const [slide, setSlide] = useState(5);

  // array
  const PopularCategories = [
    {
      img: "https://preview.colorlib.com/theme/onetech/images/xpopular_1.png.pagespeed.ic.iakLDOhA7r.webp",
      text: "Smartphones & Tablets",
    },
    {
      img: "https://preview.colorlib.com/theme/onetech/images/xpopular_2.png.pagespeed.ic.2dscQlBLuy.webp",
      text: "Computers & Laptops",
    },
    {
      img: "https://preview.colorlib.com/theme/onetech/images/xpopular_3.png.pagespeed.ic.0uu5Dfk2Gh.webp",
      text: "Gadgets",
    },
    {
      img: "https://preview.colorlib.com/theme/onetech/images/xpopular_4.png.pagespeed.ic.2oShzKU_RW.webp",
      text: "Video Games & Consoles",
    },
    {
      img: "https://preview.colorlib.com/theme/onetech/images/xpopular_5.png.pagespeed.ic.N9JFcEegtU.webp",
      text: "Accessories",
    },
    {
      img: "https://preview.colorlib.com/theme/onetech/images/xpopular_5.png.pagespeed.ic.N9JFcEegtU.webp",
      text: "Accessories",
    },
    {
      img: "https://preview.colorlib.com/theme/onetech/images/xpopular_5.png.pagespeed.ic.N9JFcEegtU.webp",
      text: "Accessories",
    },
    {
      img: "https://preview.colorlib.com/theme/onetech/images/xpopular_5.png.pagespeed.ic.N9JFcEegtU.webp",
      text: "Accessories",
    },
  ];

  // handler
  useEffect(
    (e) => {
      if (window.innerWidth > 768 && window.innerWidth < 992) {
        setSlide(4);
      } else if (window.innerWidth < 768 && window.innerWidth > 576) {
        setSlide(2);
      } else if (window.innerWidth < 576) {
        setSlide(1);
      }
    },
    []
  );

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <i className="fas fa-angle-right ml-auto"></i>
      </button>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <i className="fas fa-angle-left ml-auto"></i>
      </button>
    );
  }

  // config
  const settings = {
    // dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: slide,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // return
  return (
    <div className={classes.PopularCategories}>
      <div className="container">
        <div className={classes.PopularCategoryRow}>
          <div className={classes.PopularCategoryLeft}>
            <h3>Popular Categories</h3>
            <a href="#header">FULL CATALOG</a>
          </div>
          <div className={classes.PopularCategoryRight}>
            <Slider {...settings}>
              {PopularCategories.map((item, index) => {
                return (
                  <div
                    className={
                      index % 2 !== 0
                        ? classes.odd + " " + classes.popularCart
                        : classes.even + " " + classes.popularCart
                    }
                    key={index}
                  >
                    <div>
                      <img src={item.img} alt="" />
                      <p className={classes.popularCartTxt}>{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularCategories;
