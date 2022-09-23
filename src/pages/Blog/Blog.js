import { React, useEffect, useState } from "react";
import classes from "./Book.module.css";
import Hero from "../../components/Hero/Hero";
import BlogCart from "../../components/BlogCart/BlogCart";
import Loading from "../../components/Loading/Loading";
import { BASE_URL } from "../../constants/BASE_URL";
import translate from "../../services/translate";

function Blog({ blogId, setBlogId }) {
  const [blog, setBlog] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(()=> {
    return translate("Блог","Blog","Blog")
  })

  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      fetch(`${BASE_URL}blog/article-list`)
        .then((res) => res.json())
        .then((res) => {
          setBlog(res.results);
          setLoading(false);
        });
    };
    getBlog();
  }, []);


  return (
    <div className={classes.Blog}>
      <Hero
        text={text}
        img="url(/images/shop_background.jpg.webp)"
        rgba="linear-gradient(#fff,#cde4f1)"
      />
      <section className={classes.blogs}>
        <div className={classes.blog_container}>
          {loading ? (
            <Loading />
          ) : (
            <div className={classes.blog_carts}>
              {blog.map((item, index) => {
                return (
                  <BlogCart
                    key={index}
                    text={item.title}
                    img={item.image}
                    url={item.id}
                    setBlogId={setBlogId}
                    blogId={blogId}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blog;
