import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./Feature.css";
import classes from "./Featured.module.css";
import Loading from "../../../components/Loading/Loading"
import Loading2 from "../../../components/Loading2/Loading2";
import { BASE_URL } from "../../../constants/BASE_URL";

const Featured = () => {
  // states
  const [cards, setCards] = useState([""]);
  const [loading1, setLoading] = useState(false)



  useEffect(() => {
    const GetNewProducts = async () => {
      setLoading(true)
      fetch(`${BASE_URL}product/5product/new/`)
        .then(res => res.json())
        .then(res => {
          setCards(res)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }
    GetNewProducts()
  }, [])



  const [slide, setSlide] = useState(5);
  const [rows, setRows] = useState({ rows: 2, dots: true });

  const [style, setStyle] = useState({
    display: "inline-block",
    width: "15px",
    height: "15px",
    padding: "0",
    margin: "0",
    borderRadius: "50%",
    content: "",
    background: "#e8e8e8",
    marginRight: "20px",
    cursor: "pointer",
    transition: "all 200ms ease",
    opacity: "1",
  });

  // Handlerlar
  let NextBtn = (e) => {
    return;
  };

  let PrevBtn = (e) => {
    return;
  };

  const opacityHandler = (e) => {
    let clos = { ...style };
    clos.opacity = "0";
    setStyle(clos);
  };
  const opacity0Handler = (e) => {
    let clos = { ...style };
    clos.opacity = "1";
    setStyle(clos);
  };

  useEffect(
    (e) => {
      if (window.innerWidth > 768 && window.innerWidth < 992) {
        setSlide(4);
      } else if (window.innerWidth < 768 && window.innerWidth > 576) {
        setSlide(3);
      } else if (window.innerWidth < 576) {
        setSlide(2);
        setRows(2);
      } else if (window.innerWidth < 450) {
        setSlide(1);
        setRows(1);
      }
    },
    []
  );

  // Configlar
  const settings = {
    infinite: false,
    slidesToShow: slide,
    slidesToScroll: slide,
    speed: 500,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    cssEase: "ease",
    customPaging: (e) => <div style={style}></div>,
  };
  // return 
  return (
    <div className="container" style={loading1 ? { position: "relative", paddingTop: "100px" } : { position: "relative" }}>
      {loading1 ? <Loading /> :
        <Slider {...settings} {...rows}>
          {cards.length > 0 ?
            cards.map((card, index) => (
              <div className={classes.bigСard}
                onMouseOver={opacityHandler}
                onMouseOut={opacity0Handler}
                key={index}
              >
                <div className={classes.absolut + " " + classes.new}>
                  <p>new</p>
                </div>
                {card.product_images ?
                  <Link to={`/shop/product/${card.id}`} onClick={() => {
                    window.scrollTo(0, 0)
                  }}> <img src={card.product_images[0].get_image_url} alt="" /></Link>
                  : <Loading2 />}

                <p className={classes.bigСardPrice}>{card.value} UZS</p>
                <Link className={classes.bigСardLink} to={`/shop/product/${card.id}`} onClick={() => {
                  window.scrollTo(0, 0)
                }}>
                  {card.name}
                </Link>
              </div>
            ))
            : <Loading />}
        </Slider >
      }
    </div >
  );
};

export default Featured;
