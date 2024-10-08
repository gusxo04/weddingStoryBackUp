import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import axios from "axios";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const MyFavorite = (props) => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const setNowPath = props.setNowPath;
	setNowPath("favorite");
	const [productList, setProductList] = useState([]);
	const memberNo = useRecoilValue(loginNoState);
	const [state, setState] = useState(true);
	const [visibleCount, setVisibleCount] = useState(9); // 처음에 9개 보여줌

	useEffect(() => {
		axios
			.get(`${backServer}/product/favoriteList/${memberNo}`)
			.then((res) => {
				setProductList(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [state, memberNo]);
	const handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
			// 페이지 하단에 도달하면 9개 더 로드
			setVisibleCount((prevCount) => prevCount + 9);
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
		<div>
			<div className="mypage-favorite-wrap">
				{productList.length === 0 ? (
					<div>관심 상품이 없습니다.</div>
				) : (
					productList
						.slice(0, visibleCount)
						.map((product, i) => <ProductInfo key={"product" + i} product={product} setState={setState} state={state} />)
				)}
			</div>
		</div>
	);
};
export default MyFavorite;

const ProductInfo = (props) => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const product = props.product;
	const memberNo = useRecoilValue(loginNoState);
	const navigate = useNavigate();
	const [liked, setLiked] = useState(true);
	const state = props.state;
	const setState = props.setState;
	const [companyCategory, setCompanyCategory] = useState("");
	const NumberFormatter = ({ number }) => {
		const formattedNumber = new Intl.NumberFormat("ko-KR").format(number);
		return <span>{formattedNumber}</span>;
	};
	useEffect(() => {
		axios
			.get(`${backServer}/company/category/${product.companyNo}`)
			.then((res) => {
				setCompanyCategory(res.data);
			})
			.catch((err) => {});
	});
	const handleLikeToggle = (e) => {
		e.stopPropagation(); //클릭 시 상품정보로 이동되는 것을 방지
		e.preventDefault(); //링크로 이동되는 것 방지
		setLiked((prev) => !prev);
		axios
			.post(`${backServer}/product/favorite`, { productNo: product.productNo, memberNo: memberNo, likeState: !liked })
			.then((res) => {
				setState(!state);
			})
			.catch((err) => {});
	};
	return (
		<>
			{companyCategory === "웨딩홀" ? (
				<Link className="mypage-favorite-product" to={`/product/hallInfo/${product.productNo}`}>
					<div className="favorite-productImgBox">
						<img src={product.productImg} />
						<div className="favorite-iconBox" onClick={handleLikeToggle}>
							{liked ? <MdFavorite fill="red" fontSize="28px" /> : <MdFavoriteBorder fontSize="28px" />}
						</div>
					</div>
					<div className="favorite-productInfo">
						<p>{product.productName}</p>
						<p>
							<NumberFormatter number={product.productPrice} /> 원
						</p>
					</div>
				</Link>
			) : (
				<Link className="mypage-favorite-product" to={`/product/info/${product.productNo}`}>
					<div className="favorite-productImgBox">
						<img src={product.productImg} />
						<div className="favorite-iconBox" onClick={handleLikeToggle}>
							{liked ? <MdFavorite fill="red" fontSize="28px" /> : <MdFavoriteBorder fontSize="28px" />}
						</div>
					</div>
					<div className="favorite-productInfo">
						<p>{product.productName}</p>
						<p>
							<NumberFormatter number={product.productPrice} /> 원
						</p>
					</div>
				</Link>
			)}
		</>
	);
};
