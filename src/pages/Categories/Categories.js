import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading"
import classes from "./Categories.module.css"

function Categories({ token, categoryId,
  loading,
  products }) {
  const newCls = [classes.new];
  newCls.push(classes.free);
  const priceCls = [classes.price];
  priceCls.push(classes.price_line);


  const Name = (name) => {
    if (name.length > 18) {
      return name.slice(0, 13) + "...";
    }
    return name;
  };



  return (
    <div className="container">
      <div className={classes.Products}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={classes.products}>
              {
                products.length
                  ? products.map((item, index) => { 
                    return (
                      <Link
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
                            src={item.product_images[0].image}
                            alt="There are the img"
                          />
                        </div>
                        <div className={classes.product_info}>
                          <h4 className={classes.price}>{item.value}</h4>
                          <p className={classes.product_name}>{Name(item.name)}</p>
                        </div>
                      </Link>
                    );
                  }) : <h1 style={{ textAlign: "center", margin: 'auto', color: "red", textTransform: "uppercase" }}>PRODUCT NOT FOUND</h1>}


            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Categories;
