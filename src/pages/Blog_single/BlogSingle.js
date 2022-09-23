import { React, useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import classes from "./BlogSingle.module.css";
import BlogCart from "../../components/BlogCart/BlogCart";
import Loading from "../../components/Loading/Loading";
import { BASE_URL } from "../../constants/BASE_URL";

const BlogSingle = (props) => {
  const [find, setFind] = useState("");
  const [loading, setLoading] = useState(true);

  const [blog, setBlog] = useState([""]);

  useEffect(() => {
    const getBlogFindOne = async () => {
      setLoading(true);
      fetch(
        `${BASE_URL}blog/article/${window.location.href.split("/")[5]
        }`,
        {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        }
      )
        .then((result) => result.json())
        .then((res) => {
          setFind(res);
          setLoading(false);
        });
    };
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
    getBlogFindOne();
  }, []);

  return (
    <div className={classes.BLOG_SINGLE}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {find.detail ? (
            <h1
              style={{ color: "red", textAlign: "center", padding: "120px 0" }}
            >
              Page Not Found
            </h1>
          ) : (
            <>
              <Hero
                img="url(/images/blog_single_background.jpg)"
                height="460px"
              />
              <div className={classes.BlogSingle}>
                <div className="container">
                  <div className={classes.blog_container}>
                    <div className={classes.blog_title}>
                      <h3 className={classes.blog_title_first}>{find.title}</h3>
                      <p className={classes.blog_text}>{find.content}</p>
                    </div>
                  </div>
                  <div className={classes.other_blogs}>
                    {blog.map((item, index) => {
                      return (
                        <BlogCart
                          key={index}
                          text={item.title}
                          img={item.image}
                          url={item.id}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BlogSingle;
