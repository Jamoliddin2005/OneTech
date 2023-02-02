import React, { useEffect, useState } from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
import Loading2 from "../../components/Loading2/Loading2";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import translate from "../../services/translate";

function Footer() {
  const [categories, setCategories] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState([""]);

  useEffect(() => {
    const GetCategories = async () => {
      setLoading(true);
      fetch(`${BASE_URL}product/3category/`)
        .then((response) => response.json())
        .then((res) => {
          setCategories(res.results);
          setLoading(false);
        })
        .catch((err) => {});
    };
    const GetLocation = async () => {
      fetch(`${BASE_URL}contact/location`)
        .then((response) => response.json())
        .then((res) => {
          setLocation(res);
        })
        .catch((err) => {});
    };
    GetCategories();
    GetLocation();
  }, []);

  const Subscribe = async (e) => {
    await axios
      .post(`${process.env.REACT_APP_URL}contact/subscribe/`, {
        email: email,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.Footer}>
      <div className={classes.Newsletter}>
        <div className={classes.footer_container}>
          <div className={classes.row}>
            <div className={classes.Left}>
              <div className={classes.LeftItem}>
                <img
                  src="data:image/webp;base64,UklGRsADAABXRUJQVlA4TLMDAAAvO8AMEEenoG0bJvw10t3fEIzDkAsISiRkkzZkb70DsoEIBmWpHIQAlqKpsAqqAzmhLWkn44hyyNzeuXGMbjd8BiBBkmzTtvrZtr9t27Zt27Zt27Zt27Z/zeMe3jeBiP5PgLJtcp9bl7NL3XW/4We2yDf2Hp6jvS+i7UFMM72t7EKM30zgirw6sccVeLjvNfA6pgO9vKnmWmBvg64n/8ClOP0h3mtyj3wGzEhMGA+wTqrBMXlnaKuDwLE2UsMvAGMk7aehV5Se+xNej88vZZzGs6WkKP4FuBfX7TKwo4EkjYFrH/hURpI6sUZuV10F3B2cIUkVb/Ng+gUup8rzIhXdyRr2CFhWSZ6hc2Bk80ts9ZFnCl/kYlCzvcCpjjEybPiGFwWq/WGcjIcww7kSM7/Bx8mFZZy4HqarK7ST6TNyORTd9Tywu6GfTDv84X0xreNHaZkW5Z4crbQUeDA8S+aZu2C+Am5zLU3mcxngQPrgu8CqarLaD+5VVEnY6iuL30my499kJ3CuW5ysFj8N46VeMElWq3JW1otM/QBfpxeT9bFwuri0ANrL8mbaWInsfBrY0zRQ1ivfhf5S8BG+l5PlEAg2K7cIeDYyj2yGzIJDuaWcD7iZJuut2SLj7heBtTVlu8Er/nWWVBO2B8jmGaqZAHv9ZDthLWxIktQLpshuIj9kWuIArCxup+Mv3jaWpPnQUbb7M99ManQblqVbybEP5oZJCjnAz/Kyf4+iVqT+v2F4kEkfuFddkrLuczNd9nPwXDZjZ8DbDh5FT8BEX0mq9pddgXJwEkPtSHk2wcVyQaPhXEl59oBpcvQzqfakiqfgJQyS4SzoIkcrcEnOtnzHsRzyDNrPr0pydg2dHFJjRskz8zb3MuWs/z+inMrirkeV72wLlsP1OSynfX4TIeWFQ3L8IPUc01HKSm2BNUUdiuO3j3Pj6CkNZNM5WJzuSE+WyPnGrJDmU1RD/8OYMAduUNqFNJ5I+ykvxc+Azz1tpfNebn4mWA9Jl6Rcq+FuCxsjmOTKdkroP0EeUtF9cKqapZfkcGUIbcVLmde5CDuKmpXiulytweRwjhvkvTVbUrtXsDTFaBk93EnkSFVWeuT7yRxJChzyH8aES/L9Rbw7evd9MmMk5fvFfBnHT4MvvaUaHJfLG3lMZ6nQL+bJYs4VcL/2epq7NQCoo4J/mSXrpfYAv4Pdqgoo6Q+zZbvWFZbL7Ti4U/IVs+VkrWjXdJWXMFvZdAkwQ9m1L0xXts3xdK68FwA="
                  alt=""
                />
              </div>
              <div className={classes.RightItem}>
                <h4>
                  {translate(
                    "Подписивайся что бы узнать новости",
                    "Yangiliklarni bilish uchun ro'yxatdan o'ting",
                    "Sign up for Newsletter"
                  )}
                </h4>
                <p>
                  {translate(
                    "...и получи %20 ный купон для первой покупки",
                    "...va birinchi xarid uchun %20 li kuponni qo'lga kirit",
                    "...and receive %20 coupon for first shopping."
                  )}
                </p>
              </div>
            </div>
            <div className={classes.Right}>
              <form
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();
                  Subscribe();
                }}
              >
                <input
                  type="email"
                  placeholder={translate(
                    "Вводите свой емаил адресс",
                    "Email adresingizni kiriting",
                    "Enter your email address"
                  )}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">
                  {translate("Подписатся", "Obuna bo'lish", "Subscribe")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.Footer}>
        <div className={classes.footer_container}>
          <div className={classes.FooterBottomRow}>
            <div className={classes.FooterLeft}>
              <Link to={"/"} className={classes.FooterLogo}>
                <img src="/images/Logo.png" alt="" />
              </Link>
              <h5>
                {translate(
                  "Есть вопросы? Звоните нам 24/7",
                  "Savol bormi? Bizga telefon qiling 24/7",
                  "Got Question? Call Us 24/7"
                )}
              </h5>
              <a href="tel:+38 068 005 3570">+38 068 005 3570</a>
              {location.map((item, index) => (
                <p
                  key={index}
                  onClick={() => {
                    window.open(item.url);
                  }}
                >
                  {item.name}
                </p>
              ))}
              <div className={classes.socials}>
                <li>
                  <a href="facebook.com">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="twitter.com">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="youtube.com">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a href="google.com">
                    <i className="fa-brands fa-google"></i>
                  </a>
                </li>
                <li>
                  <a href="vimeo.com">
                    <i className="fa-brands fa-vimeo-v"></i>
                  </a>
                </li>
              </div>
            </div>
            {loading ? (
              <Loading2 />
            ) : (
              <div className={classes.FooterRight}>
                <ul>
                  <h4>
                    {translate(
                      "Найдите быстро",
                      "Tezroq toping",
                      "Find it Fast"
                    )}
                  </h4>
                  {categories
                    ? categories.map((item, index) => (
                        <li key={index}>
                          <a href={`/category/${item.id}`}>{item.name}</a>
                        </li>
                      ))
                    : ""}
                </ul>
                <ul>
                  <h4>
                    {translate(
                      "Обслуживание клиентов",
                      "Mijozlarga xizmat",
                      "Customer Care"
                    )}
                  </h4>
                  <li>
                    <Link to="/">
                      {translate(
                        "Мой аккаунт",
                        "Menign akkauntim",
                        "My Account"
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      {translate(
                        "Отслеживание заказа",
                        "Buyurtmani kuzatish",
                        "Order Tracking"
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      {translate("Избранные", "Tanlanganlar", "Wish List")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      {translate(
                        "Обслуживание клиентов",
                        "Mijozlarga xizmat ko'rsatish",
                        "Customer Services"
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      {translate(
                        "Возврат/обмен",
                        "Qaytish / almashish",
                        "Returns / Exchange"
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="/">FAQs</Link>
                  </li>
                  <li>
                    <Link to="/">
                      {translate(
                        "Поддержка продукта",
                        "Mahsulotni qo'llab-quvvatlash",
                        "Product Support"
                      )}
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
