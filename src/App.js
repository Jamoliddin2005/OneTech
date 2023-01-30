import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import Blog from "./pages/Blog/Blog";
import BlogSingle from "./pages/Blog_single/BlogSingle";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import ProductMore from "./pages/ProductMore/ProductMore";
import Shop from "./pages/Shop/Shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Categories from "./pages/Categories/Categories";
import Error from "./pages/Error/Error";
import Wishlist from "./pages/Wishlist/Wishlist";
import User from "./pages/User/User";
import Lichniy from "./pages/Lichniy/Lichniy";
import { BASE_URL } from "./constants/BASE_URL";

function App() {
  const [home, setHome] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [cart, setCart] = useState("");
  const [blogId, setBlogId] = useState("");

  const hrefHome = async () => {
    setInterval(() => {
      window.location.href.split("/")[3] === ""
        ? setHome(true)
        : setHome(false);
    }, 200);
    setToken(localStorage.getItem("refreshToken"));
  };
  useEffect(() => {
    const CartGet = async () => {
      if (token) {
        const CartGetItem = async () => {
          fetch(`${BASE_URL}cart/order-get/`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
            .then((response) => response.json())
            .then((res) => setCart(res.results));
        };
        CartGetItem();
      }
    };
    CartGet();
  }, []);

  // Cateogry 

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([""])
  const [allProducts, setAllProducts] = useState([""])

  const GetProducts = () => {
    setLoading(true)
    fetch(
      `${BASE_URL}product/5product/`, {
      headers: {
        Authorization: "Bearer " + token
      },
    }
    )
      .then((response) => response.json())
      .then((response) => {
        setAllProducts(response.results)
        const count = []
        if (response.results) {
          for (var i = 0; i < response.results.length; i++) {
            if (Number(response.results[i].category[0].id) === Number(window.localStorage.getItem("categoryPage"))) {
              count.push(response.results[i])
            }
          }
        }

        setProducts(count)
        setLoading(false)
      });
  }
  //category end

  useEffect(() => {
    GetProducts()
    hrefHome();
  }, []);


  // Add To Cart

  const [productNumbers, setProductNumbers] = useState("");
  const [productsInCart, setProductsInCart] = useState("");
  const [totalCoastGet, setTotalCoastGet] = useState("");

  useEffect(() => {
    function getLocals() {
      setProductNumbers(localStorage.getItem("cartNumbers"));
      setProductsInCart(localStorage.getItem("productsInCart"));
      setTotalCoastGet(localStorage.getItem("totalCoast"));
    }
    getLocals();
  }, [])


  function cartNumbers(item) {
    setProductNumbers(localStorage.getItem("cartNumbers"));
    if (productNumbers) {
      localStorage.setItem("cartNumbers", +productNumbers + 1);
    } else {
      localStorage.setItem("cartNumbers", 1);
    }
    setItems(item);
    totalCoast(item);
    setProductNumbers(localStorage.getItem("cartNumbers"));
  }

  function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
      if (cartItems[product.id] === undefined) {
        cartItems = {
          ...cartItems,
          [product.id]: product,
        };
      }
      cartItems[product.id].in_cart += 1;
    } else {
      product.in_cart = 1;
      cartItems = {
        [product.id]: product,
      };
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    setProductsInCart(localStorage.getItem("productsInCart"));
  }

  function totalCoast(product) {
    let cartCoast = localStorage.getItem("totalCoast");
    if (cartCoast !== null) {
      localStorage.setItem(
        "totalCoast",
        +cartCoast + Number(product.value)
      );
      setTotalCoastGet(localStorage.getItem("totalCoast"));
    } else {
      localStorage.setItem("totalCoast", Number(product.value));
      setTotalCoastGet(localStorage.getItem("totalCoast"));
    }
  }

  function minusNumber(item) {
    setProductNumbers(localStorage.getItem("cartNumbers"));
    if (productNumbers) {
      localStorage.setItem("cartNumbers", +productNumbers - 1);
    }
    setItemsMinus(item);
    totalCoastMinus(item);
    setProductNumbers(localStorage.getItem("cartNumbers"));
  }

  function setItemsMinus(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
      if (cartItems[product.id] === undefined) {
        cartItems = {
          ...cartItems,
          [product.id]: product,
        };
      }
      cartItems[product.id].in_cart -= 1;
    } else {
      product.in_cart -= 1;
      cartItems = {
        [product.id]: product,
      };
    }
    if (cartItems[product.id].in_cart < 1) {
      delete cartItems[product.id]
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    setProductsInCart(localStorage.getItem("productsInCart"));
  }

  function totalCoastMinus(product) {
    let cartCoast = localStorage.getItem("totalCoast");
    if (cartCoast !== null) {
      localStorage.setItem(
        "totalCoast",
        +cartCoast - Number(product.value)
      );
      setTotalCoastGet(localStorage.getItem("totalCoast"));
    }
  }


  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar
        allProducts={allProducts}
        productNumbers={productNumbers}
        totalCoastGet={totalCoastGet}
        GetProducts={GetProducts}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        cart={cart}
        token={token}
        setToken={setToken}
        home={home}
        setHome={setHome}
        setIsRegister={setIsRegister}
        setIsLogin={setIsLogin}
      />
      {isRegister ? (
        <Register
          hrefHome={hrefHome}
          token={token}
          setToken={setToken}
          setIsRegister={setIsRegister}
          setIsLogin={setIsLogin}
        />
      ) : (
        ""
      )}
      {isLogin ? (
        <Login
          hrefHome={hrefHome}
          token={token}
          setToken={setToken}
          setIsRegister={setIsRegister}
          setIsLogin={setIsLogin}
        />
      ) : (
        ""
      )}

      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} />} />
        <Route path="/wishlist" element={<Wishlist token={token} setToken={setToken} />} />
        <Route
          path="/blog"
          element={
            <Blog
              blogId={blogId}
              setBlogId={setBlogId}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path={`/blog/article-rd/*`}
          element={
            <BlogSingle
              blogId={blogId}
              setBlogId={setBlogId}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path="/shop/product/*"
          element={<ProductMore
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
            token={token} setToken={setToken} />}
        />
        <Route
          path="/shop"
          element={<Shop token={token} setToken={setToken} />}
        />
        <Route
          path="/contact"
          element={<Contact token={token} setToken={setToken} />}
        />

        <Route
          path="/cart"
          element={<Cart
            setIsLogin={setIsLogin}
            productNumbers={productNumbers}
            minusNumber={minusNumber}
            productsInCart={productsInCart}
            totalCoastGet={totalCoastGet}
            cartNumbers={cartNumbers}
            token={token} setToken={setToken} />}
        />
        <Route
          path={`/category/*`}
          element={
            <Categories
              loading={loading}
              products={products}
              categoryId={categoryId}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path="/*"
          element={<Error token={token} setToken={setToken} />}
        />
        <Route path="/user" element={token ? <User hrefHome={hrefHome} token={token} /> : <Navigate to="/" />} />
        <Route path="/private" element={token ? <Lichniy token={token} /> : <Navigate to="/" />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
