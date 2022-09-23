import React, { useEffect, useState } from "react";
import classes from "./Header.module.css";
import Slider from "react-slick";
import Loading from "../../../components/Loading/Loading"
import { toast } from "react-toastify";
import { BASE_URL } from "../../../constants/BASE_URL";
import './Header.css'

function Header() {
  const [banner, setBanner] = useState([""])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const GetHomeBanner = () => {
      fetch(`${BASE_URL}product/banner/`)
        .then(res => res.json())
        .then(res => {
          setBanner(res)
          setLoading(false)
        })
        .catch(err => toast.error("ERROR"))
    }
    GetHomeBanner()
  }, [])


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="HomeHeaderBigDiv">
      {loading ? <Loading /> :
        <Slider {...settings}>
          {banner.map((item, index) => (
            <div key={index}>
              <div className={classes.sliderItem} style={{ backgroundImage: 'url(' + item.image + ')' }}></div>
            </div>
          ))}
        </Slider>
      }
    </div >
  );
}

export default Header;
