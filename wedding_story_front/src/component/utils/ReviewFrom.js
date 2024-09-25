import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
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
    onClose(); // Close the popup after submission
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
            fontSize: "24px",
          }}
        />
      );
    });
  };

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{initialData ? "리뷰 수정" : "리뷰 작성"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="title">
            <label>별점:</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              {renderStars()}
            </div>
          </div>
          <div className="title">
            <label>리뷰:</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
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
            <button type="submit">제출</button>
            <button type="button" onClick={onClose}>닫기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
