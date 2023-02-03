import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Currecy from "../../services/Currency";
import translate from "../../services/translate";
import classes from "./Categories.module.css";

function Categories({ token, categoryId, loading, products }) {
  const newCls = [classes.new];
  newCls.push(classes.free);
  const priceCls = [classes.price];
  priceCls.push(classes.price_line);
  const [productsView, setProductsView] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(true);
  const [next, setNext] = useState(0);
  const [prev, setPrev] = useState(10);

  const Name = (name) => {
    if (name) {
      if (name.length > 18) {
        return name.slice(0, 13) + "...";
      }
      return name;
    }
  };

  const NextPage = () => {
    setNext(next + 10);
    setPrev(prev + 10);
    let n = next + 10;
    let p = prev + 10;
    let lengthh = products.slice(n, p);
    setProductsView(lengthh);
    if (lengthh.length < 10) {
      setDisabled(true);
    }
    setDisabled2(false);
  };

  const PrevPage = () => {
    setNext(next - 10);
    setPrev(prev - 10);
    let n = next - 10;
    let p = prev - 10;
    let lengthh = products.slice(n, p);
    setProductsView(lengthh);
    if (n === 0) {
      setDisabled(false);
    }
    setDisabled2(true);
  };


  useEffect(() => {
    setProductsView(products.slice(next, prev));
  }, [loading]);

  return (
    <div className="container">
      <div className={classes.Products}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={classes.products}>
              {productsView.length ? (
                productsView.map((item, index) => {
                  return (
                    <Link
                      to={`/shop/product/${item.id}`}
                      className={classes.product_card}
                      key={index}
                    >
                      <div className={classes.product_border}></div>
                      <div className={classes.product_img}>
                        {item.new ? (
                          <span className={classes.new}>new</span>
                        ) : (
                          ""
                        )}
                        {item.free < 0 ? (
                          <span className={newCls.join(" ")}>{item.free}%</span>
                        ) : (
                          ""
                        )}
                        {item.product_images ? (
                          <img
                            src={item.product_images[0].get_image_url}
                            alt="There are the img"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={classes.product_info}>
                        <h4 className={classes.price}>{Currecy(item.price)} UZS</h4>
                        <p className={classes.product_name}>
                          {Name(item.name)}
                        </p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <h1
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    color: "red",
                    textTransform: "uppercase",
                  }}
                >
                  {translate("ПРОДУКТЫ НЕ НАЙДЕНЫ", "MAHSULOTLAR TOPILMADI", "PRODUCTS NOT FOUND")}
                </h1>
              )}
            </div>
            {
              productsView.length > 5 ?
                <div className={classes.pagination}>
                  <button
                    className={disabled2 ? classes.disabled : classes.prev}
                    onClick={(e) => {
                      PrevPage();
                      window.scrollTo(0, 100);
                    }}
                    disabled={disabled2}
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </button>
                  <button
                    className={disabled ? classes.disabled : classes.next}
                    onClick={(e) => {
                      NextPage();
                      window.scrollTo(0, 100);
                    }}
                    disabled={disabled}
                  >
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                </div> : ""
            }
          </>
        )}
      </div>
    </div>
  );
}

export default Categories;
