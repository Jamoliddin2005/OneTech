import React from "react";
import { Link } from "react-router-dom";
import classes from "./BlogCart.module.css";

const BlogCart = ({ text, img, url, blogId, setBlogId }) => {
  return (
    <div className={classes.blog_cart}>
      <div
        className={classes.blog_cart_img}
        style={{ backgroundImage: "url(" + img + ")" }}
      ></div>
      <div className={classes.blog_cart_info}>{text}</div>
      <div className={classes.blog_button}>
        <Link
          onClick={(e) => {
            setBlogId(url);
          }}
          to={`/blog/article-rd/${url}`}
        >
          Continue Reading
        </Link>
      </div>
    </div>
  );
};

export default BlogCart;
