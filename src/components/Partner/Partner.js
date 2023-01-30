import React, { useEffect, useState } from "react";
import classes from "./Partner.module.css";
import Slider from "react-slick";
import Loading2 from "../../components/Loading2/Loading2"
import { toast } from "react-toastify"

const Partner = () => {

  const [slide, setSlide] = useState(5);
  useEffect(
    (e) => {
      if (window.innerWidth > 768 && window.innerWidth < 992) {
        setSlide(3);
      } else if (window.innerWidth > 576 && window.innerWidth < 768) {
        setSlide(1);
      } else if (window.innerWidth < 576) {
        setSlide(1);
      }
    },
    []
  );

  const [loading, setLoading] = useState(false)
  const [partners, setPartners] = useState([''])



  useEffect(() => {
    const GetPartners = () => {
      setLoading(true)
      fetch(`${process.env.REACT_APP_URL}product/4brand-list/`)
        .then((res) => res.json())
        .then(res => {
          setPartners(res.results)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }
    GetPartners()
  }, [])




  const settings = {
    infinite: true,
    slidesToShow: slide,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
  return (
    <div className={classes.Partner}>
      <div className="container Partner">
        <div className={classes.shadowBox}>
          <div className={classes.slideBox}>

            {loading ? <Loading2 /> : <Slider {...settings}>
              {partners ? partners.map((img, index) => {
                return (
                  <div key={index} className={classes.sild}>
                    <img src={img.image} alt="img" />
                  </div>
                );
              }) : ""}
            </Slider>}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
