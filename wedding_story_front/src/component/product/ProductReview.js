import { useState } from "react";
import { PiStarFill, PiStarLight } from "react-icons/pi";

const ProductReview = () => {
  function Star() {
    //const [rating, setRating] = useState(3);
  }
  /*
  return (
    <div className="review-wrap">
      <div className="title">
        <h3>리뷰작성</h3>
      </div>
      <div className="content">
        <label className="star">별점</label>
        <div>
          {[...Array(rating)].map((a, i) => (
            <PiStarFill
              className="star-lg"
              key={i}
              onClick={() => setRating(i + 1)}
            />
          ))}
          {[...Array(5 - rating)].map((a, i) => (
            <PiStarLight
              className="star-lg"
              key={i}
              onClick={() => setRating(rating + i + 1)}
            />
          ))}
        </div>
      </div>
      <div className="review-board"></div>
    </div>
  );*/
};

export default ProductReview;
