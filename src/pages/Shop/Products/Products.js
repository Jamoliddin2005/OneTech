import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Products.module.css";
import Loading from "../../../components/Loading/Loading";
import { BASE_URL } from "../../../constants/BASE_URL";
import translate from "../../../services/translate";
const Products = ({ token }) => {
  const newCls = [classes.new];
  newCls.push(classes.free);
  const priceCls = [classes.price];
  priceCls.push(classes.price_line);

  const [products, setProducts] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("")
  const [previous, setPrevious] = useState("")
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(true);
  const NextPage = async (e) => {
    if (page !== null) {
      setLoading(true);
      fetch(page)
        .then((response) => response.json())
        .then((res) => {
          setProducts(res.results)
          if (res.next !== null) {
            setPage(res.next);
            setPrevious(res.previous)
            setDisabled2(false)
          } else {
            setPrevious(res.previous)
            setDisabled(true)
            setDisabled2(false)
          }
          setLoading(false);
        });
    }

  }
  const PrevPage = async (e) => {
    if (previous !== null) {
      setLoading(true);
      fetch(previous)
        .then((response) => response.json())
        .then((res) => {
          setProducts(res.results)
          if (res.previous !== null) {
            setPrevious(res.previous);
            setDisabled(false)
            setDisabled2(false)
          } else {
            setPage(res.next);
            setDisabled(false)
            setDisabled2(true)
          }
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    const getProducts = async (e) => {
      setLoading(true);
      fetch(`${BASE_URL}product/5product/`)
        .then((response) => response.json())
        .then((res) => {
          setProducts(res.results)
          setPage(res.next);
          setLoading(false);
        });
    };

    getProducts();
  }, []);




  const Name = (name) => {
    if (name.length > 18) {
      return name.slice(0, 13) + "...";
    }
    return name;
  };

  return (
    <div className={classes.Products}>
      <div className={classes.product_filter}>
        <div>
          <p className={classes.products_count}>
            <span className={classes.products_count_span}>
              {products ? products.length : 0}
            </span>{" "}
            {translate("Продукты", "mahsulotlar", "products")}
          </p>
        </div>
      </div>
      <div className={loading ? classes.products_block : ''}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={classes.products}>
              {
                products ? products.map((item, index) => {
                  return (
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0)
                      }}
                      to={`/shop/product/${item.id}`}
                      className={classes.product_card}
                      key={index}
                    >
                      <div className={classes.product_border}></div>
                      <div className={classes.product_img}>

                        {item.new ? <span className={classes.new}>new</span> : ""}
                        {item.free < 0 ? (
                          <span className={newCls.join(" ")}>{item.free}%</span>
                        ) : (
                          ""
                        )}
                        <img
                          src={item.product_images[0].get_image_url}
                          alt="There are the img"
                        />
                      </div>
                      <div className={classes.product_info}>
                        <h4 className={classes.price}>{item.value} <span className={classes.UZS}> UZS</span></h4>
                        <p className={classes.product_name}>{Name(item.name)}</p>
                      </div>
                    </Link>
                  );
                }) : <h3 style={{ marginTop: "30px" }}>{translate("Продукт недоступен", "Mahsulot mavjud emas", "Product not available")}</h3>}
            </div>
            {products ? products.length > 1 ? <div className={classes.pagination}>
              <button className={disabled2 ? classes.disabled : classes.prev} onClick={(e) => PrevPage()} disabled={disabled2}>
                <i className="fa-solid fa-angle-left"></i>
              </button>
              <button className={disabled ? classes.disabled : classes.next} onClick={(e) => NextPage()} disabled={disabled}>
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div> : "" : ""}

          </>
        )}
      </div>
    </div>
  );
};

export default Products;
