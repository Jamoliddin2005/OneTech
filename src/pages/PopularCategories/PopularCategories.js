import React from "react";
import classes from "./PopularCategories.module.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./Slider.css";
function PopularCategories() {
  const PopularCategories = [
    {
      img: "/images/popular_1.png.webp",
      text: "Smartphones & Tablets",
    },
    {
      img: "/images/popular_1.png.webp",
      text: "Computers & Laptops",
    },
    {
      img: "/images/popular_1.png.webp",
      text: "Gadgets",
    },
    {
      img: "/images/popular_1.png.webp",
      text: "Video Games & Consoles",
    },
    {
      img: "/images/popular_1.png.webp",
      text: "Accessories",
    },
  ];

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
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className={classes.PopularCategories}>
      <div className="container">
        <div className={classes.PopularCategoryRow}>
          <div className={classes.PopularCategoryLeft}>
            <h3>Popular Categories</h3>
            <Link to="/">FULL CATALOG</Link>
          </div>
          <div className={classes.PopularCategoryRight}>
            <Slider {...settings}>
              {PopularCategories.map((item, index) => (
                <div key={index}>
                  <div>
                    <img src={item.img} alt="" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularCategories;
