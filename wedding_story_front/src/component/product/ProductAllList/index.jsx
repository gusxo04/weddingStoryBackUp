import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PageNavi from "../../utils/PagiNavi";
import styles from "./ProductAllList.module.css";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { loginNoState } from "../../utils/RecoilData";

const ProductAllList = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [productList, setProductList] = useState([]);
	const [visibleCount, setVisibleCount] = useState(12);
	const [activeButton, setActiveButton] = useState("");
	const stateChange = (e) => {
		setActiveButton(e.target.name);
	};
	console.log(activeButton);

	useEffect(() => {
		axios
			.get(`${backServer}/product/list/${activeButton}`)
			.then((res) => {
				console.log(res);
				setProductList(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [activeButton]);

	const handleScroll = () => {
		const scrollTop = window.scrollY; // 현재 스크롤 위치
		const windowHeight = window.innerHeight; // 현재 창의 높이
		const documentHeight = document.documentElement.scrollHeight; // 문서 전체의 높이

		// 스크롤이 거의 끝에 도달했을 때 (여기서는 100px 남았을 때 로드하도록 설정)
		if (windowHeight + scrollTop >= documentHeight - 100) {
			setVisibleCount((prevCount) => prevCount + 8); // 8개씩 추가 로드
		}
	};
	useEffect(() => {
		// 컴포넌트가 마운트되면 스크롤 이벤트 리스너 추가
		window.addEventListener("scroll", handleScroll);
		return () => {
			// 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<section className={styles["board-list"]}>
			<div className={styles["page-title"]}>
				<ul className={styles["name-title"]}>
					<li>
						<div className={`${activeButton === "all" ? "stateHere" : ""}`}>
							<button name="studio" onClick={stateChange}>
								스튜디오
							</button>
						</div>
					</li>
					<li>
						<div className={`${activeButton === "all" ? "stateHere" : ""}`}>
							<button name="dress" onClick={stateChange}>
								드레스
							</button>
						</div>
					</li>
					<li>
						<div className={`${activeButton === "all" ? "stateHere" : ""}`}>
							<button name="make" onClick={stateChange}>
								메이크업
							</button>
						</div>
					</li>
					<li>
						<div className={`${activeButton === "all" ? "stateHere" : ""}`}>
							<button name="tuxido" onClick={stateChange}>
								예복
							</button>
						</div>
					</li>
					<li>
						<div className={`${activeButton === "all" ? "stateHere" : ""}`}>
							<button name="picture" onClick={stateChange}>
								본식촬영
							</button>
						</div>
					</li>
				</ul>
			</div>
			<div className={styles["product-list-wrap"]}>
				<ul className={styles["posting-wrap"]}>
					{productList.slice(0, visibleCount).map((product, i) => {
						return <BoardItem key={"product-" + i} product={product} />;
					})}
				</ul>
			</div>
		</section>
	);
};

const BoardItem = (props) => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const product = props.product;
	const productNo = product.productNo;
	const memberNo = useRecoilValue(loginNoState);
	const navigate = useNavigate();
	const [liked, setLiked] = useState();
	console.log(liked);

	// 서버에서 좋아요 상태 받아오기
	useEffect(() => {
		axios
			.get(`${backServer}/product/favoriteState/${productNo}/${memberNo}`)
			.then((res) => {
				if (res.data > 0) {
					setLiked(true);
				} else {
					setLiked(false);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleLikeToggle = (e) => {
		//console.log("실행됨");

		e.stopPropagation(); //클릭 시 상품정보로 이동되는 것을 방지

		setLiked((prev) => !prev);
		// 선택적으로 여기에서 좋아요 상태를 서버에 보낼 수 있습니다.
		axios
			.post(`${backServer}/product/favorite`, { productNo: productNo, memberNo: memberNo, likeState: !liked })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const NumberFormatter = ({ number }) => {
		const formattedNumber = new Intl.NumberFormat("ko-KR").format(number);
		return <span>{formattedNumber}</span>;
	};

	return (
		<li
			className={styles["posting-item"]}
			onClick={() => {
				navigate(`/product/info/${productNo}?category=${product.category}`);
			}}
		>
			<div className={styles["posting-info"]}>
				<div>
					<img
						src={product.productImg ? `${backServer}/product/thumb/${product.productImg}` : "/image/default_img.png"}
						alt={product.productName}
					/>
				</div>
				<div className={styles["favirite"]} onClick={handleLikeToggle}>
					{liked ? <MdFavorite fill="red" /> : <MdFavoriteBorder />}
				</div>
				<div className={styles["posting-title"]}>상품명:{product.productName}</div>
				<div className={styles["posting-sub-info"]}>
					<span>
						가격:
						<NumberFormatter number={product.productPrice} /> 원
					</span>
				</div>
			</div>
		</li>
	);
};

export default ProductAllList;
