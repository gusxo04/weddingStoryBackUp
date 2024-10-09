import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"; //별아이콘
import { useRecoilState } from "recoil";
import { loginIdState } from "../../../utils/RecoilData";
import styles from "./ReviewForm.module.css"; // 분리된 CSS 모듈 import

const Stars = ({ rating, onClick }) => {
	const handleStartClick = (starRating) => (e) => {
		onClick(starRating);
	};

	return (
		<>
			{[...Array(5)].map((_, index) => {
				const starRating = index + 1;
				return <FaStar key={starRating} onClick={handleStartClick(starRating)} fill={starRating <= rating ? "gold" : "gray"} />;
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
		const formDate = new FormData();
		formDate.append("memberNo", memberNo);
		formDate.append("rating", rating);
		formDate.append();
		axios
			.post(`${backServer}/productComment/memberNo/${memberNo}`)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
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
		<div className={styles["popup"]}>
			<img src="/image/main_logo.png" style={{ width: "300px" }} />
			<div className={styles["popup-content"]}>
				<h2>{initialData ? "리뷰 수정" : "리뷰 작성"}</h2>
				<form onSubmit={handleSubmit} className={styles["form"]}>
					<div className={styles["title"]}>
						<label>별점:</label>
						<Stars rating={rating} onClick={handleStarClick} />
					</div>

					<div className={styles["title"]}>
						<label>리뷰:</label>
						<textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} required />
					</div>

					<div className={styles["title"]}>
						<label>이미지 업로드:</label>
						<input type="file" accept="image/*" onChange={handleImageChange} />
						{imagePreview && (
							<div>
								<button onClick={handleRemoveImage} className={styles["remove-image"]}>
									&times;
								</button>
								<img src={imagePreview} alt="미리보기" />
							</div>
						)}
					</div>

					<div className={styles["review-button"]}>
						<button type="submit" className={styles["submit"]}>
							제출
						</button>
						<button type="button" onClick={onClose} className={styles["close"]}>
							닫기
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ReviewForm;
