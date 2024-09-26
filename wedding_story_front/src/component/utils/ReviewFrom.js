import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { loginIdState } from "./RecoilData";

const ReviewForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberNo, setMemberNo] = useRecoilState(loginIdState);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    axios
      .post(`${backServer}/product/memberNo/${memberNo}`)
      .then((res) => {})
      .catch((err) => {});
    if (initialData) {
      setRating(initialData.rating);
      setReviewText(initialData.review);
      setImagePreview(initialData.image || "");
    } else {
      setRating(0);
      setReviewText("");
      setImagePreview("");
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = { rating, review: reviewText, image: imagePreview };
    onSubmit(reviewData);
    setRating(0);
    setReviewText("");
    setImage(null);
    setImagePreview("");
    onClose(); // 제출 후 팝업 닫기
  };

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
            fontSize: "20px",
          }}
        />
      );
    });
  };

  if (!isOpen) return null; // 열려있지 않으면 렌더링X

  return (
    <div className="popup" style={popupStyle}>
      <img src="/image/main_logo.png" style={{ width: "300px" }} />
      <div className="popup-content">
        <h2 style={{ color: "#c19975" }}>
          {initialData ? "리뷰 수정" : "리뷰 작성"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="title">
            <label>별점:</label>
            <div>{renderStars()}</div>
          </div>
          <div className="title">
            <label>리뷰:</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              style={{ width: "300px", height: "30px" }}
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
            <button type="submit">제출</button>
            <button type="button" onClick={onClose}>
              닫기
            </button>
          </div>
        </form>
      </div>
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

export default ReviewForm;
