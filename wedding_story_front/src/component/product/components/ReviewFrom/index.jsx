import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styles from "./ReviewForm.module.css";
import { FaStar } from "react-icons/fa";
import { loginNoState } from "../../../utils/RecoilData";

// 별점 컴포넌트
const Stars = ({ rating, onClick }) => {
	const handleStarClick = (starRating) => () => {
		onClick(starRating);
	};

	return (
		<div>
			{[...Array(5)].map((_, index) => {
				const starRating = index + 1;
				return (
					<FaStar
						key={starRating}
						onClick={handleStarClick(starRating)}
						fill={starRating <= rating ? "gold" : "gray"}
						style={{ cursor: "pointer" }}
					/>
				);
			})}
		</div>
	);
};

const Review = (props) => {
	const payNo = props.payNo;
	const index = props.index;
	const productNo = props.productNo;
	const [isOpen, setIsOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false); // 새로운 검토인지 편집인지 추적하세요.

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
		setIsEditing(false); // 닫을 때 편집 상태 재설정
	};

	return (
		<div>
			<button className={styles["review-button"]} onClick={handleOpen}>
				{isEditing ? "수정하기" : "후기작성"}
			</button>
			{isOpen && (
				<div className={styles["popup-overlay"]}>
					<div className={styles["popup-content"]}>
						<ReviewForm
							onClose={handleClose}
							payNo={payNo}
							productNo={productNo}
							index={index}
							isEditing={isEditing}
							setIsEditing={setIsEditing}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

const ReviewForm = (props) => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const isEditing = props.isEditing;
	const setIsEditing = props.setIsEditing;
	const payNo = props.payNo;
	const productNo = props.productNo;
	const index = props.index;
	const [memberNo, setMemberNo] = useRecoilState(loginNoState);
	const [review, setReview] = useState({
		review: "",
		rating: 0,
	});
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState("");
	const navigator = useNavigate();

	useEffect(() => {
		if (isEditing) {
			axios
				.get(`${backServer}/productComment/${memberNo}`)
				.then((res) => {
					setReview({
						review: res.data.review,
						rating: res.data.rating,
					});
					setImagePreview(res.data.imageUrl);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [isEditing, memberNo, backServer]);

	const handleChange = (e) => {
		setReview({ ...review, [e.target.name]: e.target.value });
	};

	const handleStarClick = (starRating) => {
		setReview({ ...review, rating: starRating });
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = (e, index) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("memberNo", memberNo); //회원정보
		formData.append("productNo", productNo); //제품번호
		formData.append("review", review.review); //리뷰내용
		formData.append("rating", review.rating); //별점
		formData.append("payNo", payNo); //결제번호
		if (image) {
			formData.append("image", image);
		}

		axios
			.post(`${backServer}/productComment`, formData)
			.then((res) => {
				console.log(res);
				//navigator("/list");
			})
			.catch((err) => {
				console.log(err);
			});
		setReview({ review: "", rating: 0 });
		setImage(null);
		setImagePreview("");
		props.onClose();
	};

	const handleDelete = () => {
		axios
			.delete(`${backServer}/productComment/${memberNo}`)
			.then((res) => {
				console.log("Review deleted:", res);
				setReview({ review: "", rating: 0 });
				setImage(null);
				setImagePreview("");
				setIsEditing(false);
				props.onClose();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleRemoveImage = () => {
		setImage(null);
		setImagePreview(null);
	};

	return (
		<div className={styles["review-popup"]} style={popupStyle}>
			<img src="/image/main_logo.png" style={{ width: "300px" }} alt="Logo" />
			<h2>{isEditing ? "수정하기" : "작성하기"}</h2>
			<form onSubmit={handleSubmit}>
				<label>
					별점:
					<Stars rating={review.rating} onClick={handleStarClick} />
				</label>
				<label>후기작성</label>
				<textarea
					name="review"
					value={review.review}
					onChange={handleChange}
					placeholder="후기를 입력하세요."
					rows="5"
					cols="30"
					required
				/>
				<br />
				<br />
				<label>
					이미지 업로드:
					<input type="file" accept="image/*" onChange={handleImageChange} />
					{imagePreview && (
						<div className={styles["image-preview"]}>
							<button type="button" onClick={handleRemoveImage} className={styles["remove-image"]}>
								&times;
							</button>
							<img src={imagePreview} alt="미리보기" />
						</div>
					)}
				</label>
				<br />
				<div className={styles["review-buttons"]}>
					<button type="submit">{isEditing ? "수정하기" : "작성하기"}</button>
					<button type="button" onClick={props.onClose} style={{ backgroundColor: "#dc3545" }}>
						취소
					</button>
					{isEditing && (
						<button type="button" onClick={handleDelete} className={styles["delete-button"]}>
							삭제하기
						</button>
					)}
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

export default Review;
