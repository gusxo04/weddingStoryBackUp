import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
/>;

function UnevenSetsFinite() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 4,
    slidesToShow: 4,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}

export default UnevenSetsFinite;
