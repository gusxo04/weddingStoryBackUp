import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"; // 별 아이콘
import { useRecoilState } from "recoil";
import { loginIdState, loginNoState } from "../../../utils/RecoilData";
import styles from "./ReviewForm.module.css"; // 분리된 CSS 모듈 import
import { useParams } from "react-router-dom";

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
	const [memberNo, setMemberNo] = useRecoilState(loginNoState);
	const params = useParams();
	const productNo = params.productNo; // URL에서 상품 번호 가져오기
	const [payNo, setPayNo] = useState(""); // 결제번호 저장할 상태
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState("");

	// 초기 데이터 설정 및 결제번호 가져오기
	useEffect(() => {
		// 초기 리뷰 데이터를 설정하는 부분
		if (initialData) {
			setRating(initialData.rating);
			setReview(initialData.review);
			setImagePreview(initialData.image);
		} else {
			setRating(0);
			setReview("");
			setImagePreview("");
		}

		// 결제번호(payNo)를 가져오는 API 호출
		if (memberNo && productNo) {
			axios
				.get(`${backServer}/member/`, {
					params: { memberNo, productNo }, // 회원번호와 상품번호로 결제 정보를 요청
				})
				.then((res) => {
					if (res.data && res.data.payNo) {
						setPayNo(res.data.payNo); // 결제 번호 설정
					} else {
						console.log("결제 번호를 찾을 수 없습니다.");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [initialData, memberNo, productNo, backServer]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = new FormData();

		// FormData에 데이터 추가
		form.append("memberNo", memberNo); // 회원번호
		form.append("rating", rating); // 별점
		form.append("review", review); // 리뷰 내용
		form.append("productNo", productNo); // 제품번호
		form.append("payNo", payNo); // 결제번호

		// 이미지 파일이 있으면 FormData에 추가
		if (image) {
			form.append("image", image);
		}

		axios
			.post(`${backServer}/productComment`, form)
			.then((res) => {
				console.log(res);
				onSubmit(res.data); // 서버 응답 데이터를 onSubmit으로 전달
			})
			.catch((err) => {
				console.log(err);
			});

		// 제출 후 초기화 및 팝업 닫기
		setRating(0);
		setReview("");
		setImage(null);
		setImagePreview("");
		onClose();
	};

	const handleStarClick = (starRating) => {
		setRating(starRating);
	};

	const handleRemoveImage = () => {
		setImage(null); // 이미지 초기화
		setImagePreview(null); // 미리보기 초기화
	};

	if (!isOpen) return null; // 팝업이 열려 있지 않으면 렌더링하지 않음

	return (
		<div className={styles["popup"]}>
			<img src="/image/main_logo.png" style={{ width: "300px" }} alt="로고" />
			<div className={styles["popup-content"]}>
				<h2>{initialData ? "리뷰 수정" : "리뷰 작성"}</h2>
				<form onSubmit={handleSubmit} className={styles["form"]}>
					<div className={styles["title"]}>
						<label>별점:</label>
						<Stars rating={rating} onClick={handleStarClick} />
					</div>

					<div className={styles["title"]}>
						<label>리뷰:</label>
						<textarea value={review} onChange={(e) => setReview(e.target.value)} required />
					</div>

					<div className={styles["title"]}>
						<label>이미지 업로드:</label>
						<input type="file" accept="image/*" onChange={handleImageChange} />
						{imagePreview && (
							<div>
								<button type="button" onClick={handleRemoveImage} className={styles["remove-image"]}>
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
