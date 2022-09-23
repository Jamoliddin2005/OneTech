import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Partner from "../../components/Partner/Partner";
import classes from "./ProductMore.module.css";
import Loading from "../../components/Loading/Loading";
import { BASE_URL } from "../../constants/BASE_URL";

function ProductMore({ token,
  cartNumbers,
  setItems,
  totalCoast,
  minusNumber,
  setItemsMinus,
  totalCoastMinus,
  productNumbers,
  setProductNumbers,
  productsInCart,
  setProductsInCart,
  totalCoastGet,
  setTotalCoastGet, }) {
  const [url, setUrl] = useState(window.location.pathname.split("/")[3])
  const [product, setProduct] = useState("")
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("")

  const [addToBg, setAddtoBg] = useState(false)

  useEffect(() => {
    setLoading(true)
    setUrl(window.location.pathname.split("/")[3])
    const GetPorduct = async () => {
      fetch(`${BASE_URL}product/5product/${Number(url)}`)
        .then((res) => res.json())
        .then((res) => {
          setCategory(res.category[0].id)
          setProduct(res)
          setLoading(false)
        });
    };
    GetPorduct();
  }, []);

  return (
    <div className={classes.productMore} style={loading ? { paddingTop: "300px" } : { padding: 0 }
    }>
      {loading ? <Loading /> : <Header
        cartNumbers={cartNumbers}
        setItems={setItems}
        totalCoast={totalCoast}
        minusNumber={minusNumber}
        setItemsMinus={setItemsMinus}
        totalCoastMinus={totalCoastMinus}
        productNumbers={productNumbers}
        setProductNumbers={setProductNumbers}
        productsInCart={productsInCart}
        setProductsInCart={setProductsInCart}
        totalCoastGet={totalCoastGet}
        setTotalCoastGet={setTotalCoastGet}
        setAddtoBg={setAddtoBg} token={token} product={product} category1={category} />}

      <Partner />

    </div >
  );
}

export default ProductMore;
