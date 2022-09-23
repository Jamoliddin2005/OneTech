import React from "react";
import classes from "./Home.module.css";
import Header from "./Header/Header";
import Services from "./Services/Services";
import PopularCategories from "./PopularCategories/PopularCategories";
import Partner from "../../components/Partner/Partner";
import Featured from "./Featured/Featured";

function Home() {
  return (
    <div className={classes.Home}>
      <Header />
      {window.innerWidth > 765 ? <Services /> : ""}
      <Featured />
      <PopularCategories />
      <Partner />
      {window.innerWidth < 765 ? <Services /> : ""}
    </div>
  );
}

export default Home;
