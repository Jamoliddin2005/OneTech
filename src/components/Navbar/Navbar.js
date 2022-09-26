import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import Loading2 from "../Loading2/Loading2";
import { BASE_URL } from "../../constants/BASE_URL";
import translate from "../../services/translate";
export default function Navbar({
  home,
  setHome,
  setIsRegister,
  setIsLogin,
  token,
  cart,
  categoryId,
  setCategoryId,
  GetProducts,
  totalCoastGet,
  productNumbers,
  allProducts
}) {
  const [categories, setCategory] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [filteredDate, setFilteredDate] = useState([]);
  const [filteredDate2, setFilteredDate2] = useState([]);
  const [language, setLanguage] = useState([
    'ru',
    'en',
    'uz'
  ])

  useEffect(() => {
    const GetCategories = async () => {
      setLoading(true);
      fetch(`${BASE_URL}product/3category/`)
        .then((response) => response.json())
        .then((res) => {
          setCategory(res.results)
          setLoading(false);
        });

    };

    GetCategories();

    const Language = () => {
      const lan = language
      const target = lan.splice(lan.indexOf((localStorage.getItem('language') || 'ru')), 1)
      lan.unshift(target[0])
      setLanguage(lan)
    }

    Language()
  }, []);



  const handleFilter = (event) => {
    const searchWord = event.target.value;
    if (allProducts) {
      const newFilter = allProducts.filter((value) => {
        if (value) {
          return value.name.toLowerCase().includes(searchWord.toLowerCase());
        }
      });
      if (searchWord === "") {
        setFilteredDate([]);
      } else {
        setFilteredDate(newFilter);
      }
    }
  };
  const handleFilter2 = (event) => {
    const searchWord = event.target.value;
    if (allProducts) {
      const newFilter = allProducts.filter((value) => {
        if (value) {
          return value.name.toLowerCase().includes(searchWord.toLowerCase());
        }
      }

      );
      if (searchWord === "") {
        setFilteredDate2([]);
      } else {
        setFilteredDate2(newFilter);
      }
    }
  };

  const [height, setHeight] = useState({ height: "0px", transition: "all .5s ease" })

  const heightHandler = () => {
    if (height.height === "0px") {
      setHeight({ height: "auto", transition: "all .5s ease" })
    } else {
      setHeight({ height: "0px", transition: "all .5s ease" })
    }
  }
  const [height1, setHeight1] = useState({ height: "0px", transition: "all .5s ease" })

  const heightHandler1 = () => {
    if (height1.height === "0px") {
      setHeight1({ height: "auto", transition: "all .5s ease" })
    } else {
      setHeight1({ height: "0px", transition: "all .5s ease" })
    }
  }


  return (
    <div className={classes.Navbar}>
      <div className={classes.Navbar_Top}>
        <div className="container">
          <div className={classes.Row}>
            <div className={classes.Left}>
              <div className={classes.PhoneNumber}>
                <img
                  src="data:image/webp;base64,UklGRqYAAABXRUJQVlA4TJoAAAAvCsAEEO8REQ7bSFLk5FUNHPP9x9DItCRxR4C/7LRP8Bb+NECFkIaYQSFlIKvCdSTbpnXtZ9u2nX9k5+8FsNbeEf2fgPr1sN+JKC7Nd2xlNZE8w9dzOtueRAh9nqvlUlFEUTmtLPNi4xmc9b9xDTaWlnn+mAx10NOhjh+3Xls6064IbnOLDH4Rydk39ZkbFXwmn8b9yHUf5L0F"
                  alt=""
                />
                <a href="tel:+38 068 005 3570">+38 068 005 3570</a>
              </div>
              <div className={classes.Email}>
                <img
                  src="data:image/webp;base64,UklGRtAAAABXRUJQVlA4TMMAAAAvE0ADEJ8SEQzbto2cO8lOv4uPVhECzEzKPnS4680W7DLah+HPOFVKE4AIhAY00mxAjGTbtDXPtm3btvmx88/mIoWI/k9AZb7d6dxMa5LH4tBspiyP/yI66/+3ceS1NGixHu/BwQUWf2G1hIxge/BAVUpKDSmAbXVwAtFnCzD1riHAqoRXHoHwr7jQkvzJF47ndPYvpeSBpmTAbYe0dMG2OmPcf/2o+t4nM+tJ7DVEc/8TH4qUwKgRciKte2cy0zzp3NoA"
                  alt=""
                />
                <a href="mailto:fastsales@gmail.com">fastsales@gmail.com</a>
              </div>
            </div>
            <div className={classes.center}>
              <ul>
                <li>
                  <a href="https://t.me/ibragimovxusan" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-telegram"></i></a>
                </li>
                <li>
                  <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-google"></i></a>
                </li>
                <li>
                  <a href="https://www.instagram.com/ibragimovxusan_/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                </li>
              </ul>
            </div>
            <div className={classes.Right}>
              <div className={classes.language_desktop}>
                <div className={classes.language}>
                  <select name="" id="" onInput={(e) => {
                    localStorage.setItem('language', e.target.value)
                    window.location.reload()
                  }}>
                    {
                      language.map((item, idx) => (
                        <option key={idx} value={item}>{item}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              {token ? (
                <Link to={'/user'} className={classes.account}>
                  <i className="fa-regular fa-user"></i>
                  <p className={classes.account_name}>
                    {
                      translate('Аккаунт', 'Akkaunt', 'Account')
                    }
                  </p>
                </Link>
              ) : (
                <>
                  <div
                    className={classes.Register}
                    onClick={(e) => {
                      setIsRegister(true);
                      setIsLogin(false);
                    }}
                  >
                    <img
                      src="https://preview.colorlib.com/theme/onetech/images/user.svg"
                      alt=""
                    />
                    <Link to={"/"}>
                      {
                        translate('Регистратсия', 'Registratsiya', 'Registration')
                      }
                    </Link>
                  </div>
                  <div
                    className={classes.Login}
                    onClick={(e) => {
                      setIsLogin(true);
                      setIsRegister(false);
                    }}
                  >
                    <Link to={"/"}>
                      {
                        translate('Вход', 'Kirish', 'Log in')
                      }
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={classes.Navbar_Center}>
          <div className={classes.Logo_search}>
            <div className={classes.Logo}>
              <Link to={"/"}>
                <img src="/images/Logo.png" alt="" />
              </Link>
            </div>
            <div className={classes.Search_div + ' ' + classes.oldFlex}>
              <div className={classes.input_Search}>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder={
                    translate('Искать продукты...', 'Tovarlar qidirish...', 'Search for products...')
                  }
                  onChange={handleFilter}
                />
              </div>
              {/* <div className={classes.Category_Search}>
                {loading ? <Loading2 /> :
                  <select name="" id="">
                    {categories.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                }
              </div> */}
              <button className={classes.SearchIcon}>
                <img
                  src="https://preview.colorlib.com/theme/onetech/images/search.png.webp"
                  alt=""
                />
              </button>
              {filteredDate.length !== 0 && (
                <div className={classes.searchDiv}>
                  {filteredDate.splice(0, 15).map((item, index) => (
                    <Link to={`/shop/product/${item.id}`} className={classes.searched} key={index} onClick={() => setFilteredDate([])}>
                      <img src={item.product_images[0].image} alt="" />
                      <h5>{item.name}</h5>
                      <p>{item.value}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={classes.Navbar_center_right}>
            <div className="language_mobile">
              <div className={classes.mobile_language}>
                <div className={classes.language}>
                  <select name="" id="" onInput={(e) => {
                    localStorage.setItem('language', e.target.value)
                    window.location.reload()
                  }}>
                    {
                      language.map((item, idx) => (
                        <option key={idx} value={item}>{item}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className={classes.Wishlist}>
              <div className={classes.Wishlist_left}>
                <Link to={"/wishlist"} className={window.location.pathname === "/wishlist" ? classes.activeHeart : ""}> <i className="fa-regular fa-heart "></i></Link>
              </div>
              <Link to={"/wishlist"} className={classes.Wishlist_right}>
                <h6>
                  {
                    translate('Избранные', 'Tanlanganlar', 'Wishlist')
                  }
                </h6>
              </Link>
            </div>
            <Link to={"/cart"}>
              <div className={classes.Cart}>
                <div className={classes.Wishlist_left}>
                  <img
                    src="data:image/webp;base64,UklGRkgBAABXRUJQVlA4TDsBAAAvGoAIED8jEEjy136ICIZt20aOVZJ7j4CgWCA3HACUgQgAmlE0uQRolIk0yKUooxUY01VM0g9AcmkmySMYKFAywg/bzJYACLatHVvub9tm5p9t9/bnfru685/Dh2cIEf2fABgM7n6Qn3shCNbH1JzOmSuTlxmHI31OVs04Z1yD5ir/XCY2eA/dOzZMNBnQ8/BNz5fNZrNDFrO6BU6z2WzWD9h+KNyyI0QqpX7ZVLov/FVKkWEk+A6gRxhkH8Ark8jzAUCfbj0nhwCuTgOo8wIA6dVzkwCsAFa4D2D70KJnOWhAe4frED/jgtwtS3KKKbkWI2LWGZ1ifg4gHueXXI5PclVeyy3zSG6Lm3InXJK7YUXumVm5b8bkJnTJ8R/yHZbk5vm/6LVarAYtBnBMcjwy2k0aQO1xSuPtqA4A"
                    alt=""
                  />
                  <span>{productNumbers ? productNumbers : "0"}</span>
                </div>
                <div className={classes.Cart_right}>
                  <h6>
                    {
                      translate('Корзинка', 'Savatcha', 'Cart')
                    }
                  </h6>
                  <p className={classes.text_cart}> {totalCoastGet ? `$${totalCoastGet}` : "$0"}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className={classes.Search_div + ' ' + classes.newFlex}>
          <div className={classes.input_Search}>
            <input
              type="text"
              name=""
              id=""
              placeholder={
                translate('Искать продукты...', 'Tovarlar qidirish...', 'Search for products...')
              }
              onChange={handleFilter2}
            />
          </div>
          {/* <div className={classes.Category_Search}>
                {loading ? <Loading2 /> :
                  <select name="" id="">
                    {categories.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                }
              </div> */}
          <button className={classes.SearchIcon}>
            <img
              src="https://preview.colorlib.com/theme/onetech/images/search.png.webp"
              alt=""
            />
          </button>
          {filteredDate2.length !== 0 && (
            <div className={classes.searchDiv}>
              {filteredDate2.splice(0, 15).map((item, index) => (
                <Link to={`/shop/product/${item.id}`} className={classes.searched} key={index} onClick={() => setFilteredDate([])}>
                  <img src={item.product_images[0].image} alt="" />
                  <h5>{item.name}</h5>
                  <p>{item.value}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={classes.Navbar_Bottom}>
        <div className="container">
          <div className={classes.Navbar_Bottom_row}>
            <div className={classes.categories} onClick={() => setHeight({ height: "0px", transition: "all .5s ease" })}>
              <div className={classes.item}>
                <i className="fa-solid fa-bars"></i>
                {
                  translate('Категории', 'Kategoriyalar', 'Category')
                }
              </div>
              <div className={home && window.innerWidth > 992 ? classes.mores : classes.hovered}>
                {loading ? <Loading2 /> : categories.map((item, index) => (
                  <div className={classes.hovers} key={index}  >
                    <Link
                      onClick={() => {
                        window.localStorage.setItem("categoryPage", item.id)
                        GetProducts()
                        setCategoryId(item.id)
                      }}
                      to={`/category/${item.id}`}
                    >
                      {item.name}
                    </Link>
                    {item.children ? <div className={classes.hover_categories} >
                      {
                        item.children.map((item1, index1) => (
                          <NavLink onClick={() => {
                            window.localStorage.setItem("categoryPage", item1.id)
                            GetProducts()
                            window.scrollTo(0, 0)
                          }}
                            to={`/category/${item1.id}`} key={index1} >{item1.name}</NavLink>
                        ))
                      }
                    </div> : <Loading2 />
                    }
                  </div>
                ))}

              </div>
            </div>
            <div onClick={heightHandler} className={classes.menu}>
              <span>{
                translate('Меню', 'Menyu', 'Menu')
              }</span>
              <i className="fa-solid fa-bars"></i>
            </div>
            <div className={classes.navbar_bottom_right}>
              <ul>
                <li>
                  <Link to={"/"} onClick={heightHandler}>
                    {
                      translate('Главная', 'Bosh sahifa', 'Home')
                    }
                  </Link>
                </li>
                <li>
                  <Link to={"/"} onClick={(e) => {
                    e.preventDefault()
                  }}>
                    {
                      translate('Страницы', 'Sahifalar', 'Pages')
                    }
                  </Link>
                  <i className="fa-solid fa-angle-down"></i>
                  <div className={classes.hovered} onClick={heightHandler}>
                    <ul>
                      <li>
                        <Link to={"/shop"}>
                          {
                            translate('Магазин', "Do'kon", 'Shop')
                          }
                        </Link>
                      </li>
                      <li>
                        <Link to={"/blog"}>
                          {
                            translate('Блог', 'Blog', 'Blog')
                          }
                        </Link>
                      </li>
                      <li>
                        <Link to={"/cart"}>
                          {
                            translate('Корзинка', 'Savatcha', 'Cart')
                          }
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link to={"/blog"} onClick={heightHandler}>
                    {
                      translate('Блог', 'Blog', 'Blog')
                    }
                  </Link>
                </li>
                <li>
                  <Link to={"/contact"} onClick={heightHandler}>
                    {
                      translate('Контакты', 'Kontaktlar', 'Contacts')
                    }
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div style={height} className={classes.mobile_forma}>
            <ul>
              {
                token ?
                  <li>
                    <Link to={'/user'} className={classes.account} onClick={heightHandler}>
                      <div className={classes.account}>
                        <i className="fa-regular fa-user"></i>
                        <p className={classes.account_name}>
                          {
                            translate('Аккаунт', 'Akkaunt', 'Account')
                          }
                        </p>
                      </div>
                    </Link>
                  </li>
                  :
                  <>
                    <li>
                      <div
                        className={classes.Register}
                        onClick={(e) => {
                          setIsRegister(true);
                          setIsLogin(false);
                        }}
                      >
                        <Link to={"/"} className={classes.account}>
                          <div className={classes.account}>
                            <i className="fa-regular fa-user"></i>
                            <p>
                              {
                                translate('Регистратсия', 'Registratsiya', 'Registration')
                              }
                            </p>
                          </div>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div
                        className={classes.Login}
                        onClick={(e) => {
                          setIsLogin(true);
                          setIsRegister(false);
                        }}
                      >
                        <Link to={"/"} className={classes.account}>
                          <div className={classes.account}>
                            <i className="fa-solid fa-user"></i>
                            <p>
                              {
                                translate('Вход', 'Kirish', 'Log in')
                              }
                            </p>
                          </div>
                        </Link>
                      </div>
                    </li>
                  </>
              }
              <li>
                <Link to={"/"} onClick={heightHandler}>
                  {
                    translate('Главная', 'Bosh sahifa', 'Home')
                  }
                </Link>
              </li>
              <li>
                <Link to={"/"} onClick={heightHandler1}>{
                  translate('Страницы', 'Sahifalar', 'Pages')
                } <i className="fa-solid fa-angle-down"></i></Link>
                <div style={height1} className={classes.hovered} onClick={heightHandler}>
                  <ul>
                    <li>
                      <Link to={"/shop"}>
                        {
                          translate('Магазин', "Do'kon", 'Shop')
                        }
                      </Link>
                    </li>
                    <li>
                      <Link to={"/blog"}>
                        {
                          translate('Блог', 'Blog', 'Blog')
                        }
                      </Link>
                    </li>
                    <li>
                      <Link to={"/cart"}>
                        {
                          translate('Корзинка', 'Savatcha', 'Cart')
                        }
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link to={"/blog"} onClick={heightHandler}>
                  {
                    translate('Блог', 'Blog', 'Blog')
                  }
                </Link>
              </li>
              <li>
                <Link to={"/contact"} onClick={heightHandler}>
                  {
                    translate('Контакты', 'Kontaktlar', 'Contacts')
                  }
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
