import React, { useEffect, useState } from "react";
import classes from "./Header.module.css";
import Slider from "react-slick";
import Loading2 from "../../../components/Loading2/Loading2"
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
        .catch(err => console.log(err))
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
    <div className={classes.HEader_bg_div}>
      {loading ? <div className={classes.HeaderLoadingDiv}>
        <Loading2 />
      </div> :
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
