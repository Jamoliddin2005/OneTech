import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Filter.module.css";
import Loading2 from "../../../components/Loading2/Loading2"
import { BASE_URL } from "../../../constants/BASE_URL";
const Filter = () => {

  const [category, setCategory] = useState([""]);
  const [categorySub, setCategorySub] = useState([""]);

  const [loading, setLoading] = useState(true);




  useEffect(() => {
    const GetCategories = async () => {
      setLoading(true)
      fetch(`${BASE_URL}product/3category/`)
        .then((response) => response.json())
        .then(res => {
          setCategory(res.results)
          if (res.results) {
            for (var i = 0; i < res.results.length; i++) {
              setCategorySub(res.results[i].children);
            }
          }

          setLoading(false)
        })
    }
    GetCategories()
  }, [])


  return (
    <div className={classes.Filter}>
      <h4>Categories</h4>
      <div className={classes.category}>
        {loading ? (
          <Loading2 />
        ) : (
          <>
            {
              category ? category.map((a, index) => (
                <Link to={`/category/${a.id}`} className={classes.link} key={index} onClick={(e) => {
                  window.scrollTo(0, 0)
                  window.localStorage.setItem("categoryPage", a.id)
                }}>
                  {a.name}
                </Link>
              )) : ""
            }
            {categorySub.map((a, index) => (
              <Link to={`/category/${a.id}`} className={classes.link} key={index} onClick={(e) => {
                window.scrollTo(0, 0)
                window.localStorage.setItem("categoryPage", a.id)

              }}>
                {a.name}
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Filter;
