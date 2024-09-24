import { useState } from "react";
import ProductReview from "./ProductReview";

const ProductReviewUpdate = ({ existingReview, onDelete }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reviewText, setReviewText] = useState(existingReview);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSave = () => {
    // Save the updated review logic here
    console.log("리뷰가 수정되었습니다:", reviewText);
    closePopup();
  };

  return (
    <div className="review-wrap">
      <h1>리뷰 수정하기</h1>
      <button onClick={openPopup}>수정하기</button>
      <button onClick={onDelete}>삭제하기</button>
      {isPopupOpen && (
        <ReviewPopup
          onClose={closePopup}
          reviewText={reviewText}
          onReviewChange={handleReviewChange}
          onSave={handleSave}
        />
      )}
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

const ReviewPopup = ({ onClose, reviewText, onReviewChange, onSave }) => {
  return (
    <div className="popup" style={popupStyle}>
      <h2>리뷰 수정</h2>
      <textarea value={reviewText} onChange={onReviewChange} />
      <button onClick={onSave}>저장</button>
      <button onClick={onClose}>취소</button>
    </div>
  );
};

export default ProductReviewUpdate;
