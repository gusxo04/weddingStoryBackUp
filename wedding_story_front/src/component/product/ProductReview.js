import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductReview = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <h1>리뷰 작성하기</h1>
      <button onClick={openPopup}>리뷰 작성</button>
      {isPopupOpen && <ReviewPopup onClose={closePopup} />}
    </div>
  );
};

const ReviewPopup = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 리뷰 제출 로직 (API 호출 등)
    console.log("Rating:", rating, "Review:", review, "Image:", image);
    onClose();
  };
  //별클릭시 클릭만큼 별색깔 바꾸기

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starRating = index + 1;
      return (
        <FaStar
          key={starRating}
          onClick={() => setRating(starRating)}
          style={{
            cursor: "pointer",
            color: starRating <= rating ? "gold" : "gray",
            fontSize: "18px",
          }}
        />
      );
    });
  };

  return (
    <div className="review-wrap" style={popupStyle}>
      <img src="/image/main_logo.png" />
      <h2>리뷰 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="title">
          <label>별점:</label>
          <div>{renderStars()}</div>
        </div>
        <div className="title">
          <label>리뷰:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <div className="title">
          <label>이미지 업로드:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div>
              <img
                src={imagePreview}
                alt="미리보기"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            </div>
          )}
        </div>
        <div className="review-button">
          <button type="submit">
            <Link to="/product/info">제출</Link>
          </button>
          <button type="button" onClick={onClose}>
            닫기
          </button>
        </div>
      </form>
    </div>
  );
};

const popupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  border: "1px solid #ccc",
  zIndex: 1000,
};

export default ProductReview;
