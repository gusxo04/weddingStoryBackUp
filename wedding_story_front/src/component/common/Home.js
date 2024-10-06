import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import HomeBanner from "./HomeBanner";
import HomeProduct from "./HomeProduct";
import HomeInfo from "./HomeInfo";

const Home = () => {
  return (
    <>
      <div className="home-banner-wrap">
        <HomeBanner />
      </div>
      <div className="home-section1-wrap">
        <HomeProduct />
      </div>
      <div className="home-section2-wrap">
        <HomeInfo />
      </div>
    </>
  );
};

export default Home;
