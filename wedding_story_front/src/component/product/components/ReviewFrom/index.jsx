import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { loginIdState } from "../../../utils/RecoilData";

const Stars = ({ rating, onClick }) => {
	const handleStartClick = (starRating) => (e) => {
		onClick(starRating);
	};

	return (
		<>
			{[...Array(5)].map((_, index) => {
				const starRating = index + 1;
				return (
					<FaStar
						key={starRating}
						onClick={handleStartClick(starRating)}
						fill={starRating <= rating ? "gold" : "gray"}
						style={{
							cursor: "pointer",
							fontSize: "20px",
						}}
					/>
				);
			})}
		</>
	);
};

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
			setImagePreview(initialData.image);
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

	const handleStarClick = (starRating) => {
		setRating(starRating);
	};

	const handleRemoveImage = () => {
		setImagePreview(null); // 이미지를 초기화하여 미리보기 삭제
	};

	if (!isOpen) return null; // 열려있지 않으면 렌더링X

	return (
		<div className="popup" style={popupStyle}>
			<img src="/image/main_logo.png" style={{ width: "300px" }} />
			<div className="popup-content">
				<h2 style={{ color: "#c19975" }}>{initialData ? "리뷰 수정" : "리뷰 작성"}</h2>
				<form onSubmit={handleSubmit} style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
					<div className="title" style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "16px", fontWeight: "bold", marginRight: "10px" }}>별점:</label>
						<Stars rating={rating} onClick={handleStarClick} />
					</div>

					<div className="title" style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "16px", fontWeight: "bold", marginRight: "10px" }}>리뷰:</label>
						<textarea
							value={reviewText}
							onChange={(e) => setReviewText(e.target.value)}
							required
							style={{
								width: "100%",
								height: "80px",
								padding: "10px",
								borderRadius: "5px",
								border: "1px solid #ddd",
								fontSize: "14px",
								resize: "none",
							}}
						/>
					</div>

					<div className="title" style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "20px" }}>
						<label style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px", textAlign: "left" }}>이미지 업로드:</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							style={{
								padding: "10px",
								border: "1px solid #ddd",
								borderRadius: "5px",
								cursor: "pointer",
								backgroundColor: "#fff",
								marginBottom: "10px",
							}}
						/>

						{imagePreview && (
							<div style={{ position: "relative", display: "inline-block", marginTop: "10px" }}>
								<button
									onClick={handleRemoveImage}
									style={{
										position: "absolute",
										top: "5px",
										right: "5px",
										backgroundColor: "red",
										color: "white",
										border: "none",
										borderRadius: "50%",
										width: "25px",
										height: "25px",
										cursor: "pointer",
										fontSize: "16px",
										lineHeight: "25px",
										textAlign: "center",
										boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
									}}
								>
									&times;
								</button>
								<img
									src={imagePreview}
									alt="미리보기"
									style={{
										maxWidth: "100%",
										height: "auto",
										borderRadius: "5px",
										boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
									}}
								/>
							</div>
						)}
					</div>

					<div className="review-button" style={{ textAlign: "right" }}>
						<button
							type="submit"
							style={{
								padding: "10px 20px",
								backgroundColor: "#4CAF50",
								color: "white",
								border: "none",
								borderRadius: "5px",
								cursor: "pointer",
								fontSize: "14px",
								marginRight: "10px",
								boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
							}}
						>
							제출
						</button>
						<button
							type="button"
							onClick={onClose}
							style={{
								padding: "10px 20px",
								backgroundColor: "#f44336",
								color: "white",
								border: "none",
								borderRadius: "5px",
								cursor: "pointer",
								fontSize: "14px",
								boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
							}}
						>
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
