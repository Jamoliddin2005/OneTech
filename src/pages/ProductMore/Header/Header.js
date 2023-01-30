import React, { useEffect, useState } from "react";
import Loading2 from "../../../components/Loading2/Loading2";
import classes from "./Header.module.css";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../constants/BASE_URL";

const Header = ({ product, category1,
  cartNumbers,
}) => {
  const [category, setCategory] = useState("")
  const [categoryLoading, setCategoryLoading] = useState(true)
  const GetCategory = async () => {
    setCategoryLoading(true)
    fetch(`${BASE_URL}product/3category/${category1}`)
      .then(res => res.json())
      .then(res => {
        setCategory(res.name)
        setCategoryLoading(false)
      })
  }


  const LocalStorageLike = async () => {
    if (window.localStorage.getItem(product.id)) {
      setHeart("red");
    } else {
      setHeart("#ccc");
    }
  }



  useEffect(() => {
    GetCategory()
    LocalStorageLike()
  }, [])

  // =========== O'zgaradigan state  
  const [price] = useState(product.value ? Number(product.value) : 0);

  // =========== O'zgarmas state
  const [heart, setHeart] = useState("#ccc");
  const [activeImg, setActiveImg] = useState(0);

  // ========== Handlerlar
  let activeImgHandler = (idx) => {
    setActiveImg(idx);
  };
  let onHeartHandler = async (e) => {
    if (window.localStorage.getItem(product.id)) {
      window.localStorage.removeItem(product.id);
      LocalStorageLike()
      toast.error("Product deleted!")
    } else {
      window.localStorage.setItem(product.id, JSON.stringify(product));
      LocalStorageLike()
      toast.success("Product Added!")
    }
  };

  // ======= return
  return (
    <header className={classes.Header}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
        integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className="container">
        <div className={classes.product}>
          <div className={classes.left}>
            {product ? <>
              <div className={classes.trio}>
                {product.product_images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      activeImgHandler(index);
                    }}
                    className={classes.trioImg}
                  >
                    <img src={img.get_image_url} alt="img" />
                  </div>
                ))}
              </div>
              <div className={classes.singleImg}>
                <img src={product.product_images[activeImg].get_image_url} alt="img" />
              </div>
            </> : ""}

          </div>
          <div className={classes.right}>
            <div className={classes.right_items}>
              {categoryLoading ? <Loading2 /> : <p className={classes.product_category}>{category}</p>}

              <p className={classes.product_name}>{product.name}</p>
              <p className={classes.product_text}>
                {product.consists}
              </p>
              <form
                className={classes.form}
                onSubmit={(e) => e.preventDefault()}
              >
                <p className={classes.productPrice}>{price} <span className={classes.UZS}>UZS</span></p>
                <div className={classes.buyBtns}>
                  <button className={classes.buyBtn} onClick={(e) => {
                    cartNumbers(product);
                    toast.success("Product added")
                  }}>Add to Cart</button>
                  <button
                    className={classes.heartBtn}
                    onClick={onHeartHandler}
                    style={{ color: heart }}
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>




    </header>
  );
};

export default Header;