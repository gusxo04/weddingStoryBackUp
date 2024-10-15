import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HomeProduct2 = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [currentIndex, setCurrentIndex] = useState(0);
	const sliderRef = useRef(null);
	useEffect(() => {
		axios
			.get(`${backServer}/product/selectAd/` + "상품")
			.then((res) => {
				setProductList(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const [productList, setProductList] = useState([]);

	const productsPerSlide = 4; // 한 번에 보여줄 제품 수
	const productWidth = 255 + 20; // 한 제품의 너비(300px) + 간격(20px)
	const totalProducts = productList.length;

	const handleNext = () => {
		if (currentIndex < totalProducts - productsPerSlide) {
			setCurrentIndex((prevIndex) => prevIndex + 1);
			sliderRef.current.style.transform = `translateX(-${(currentIndex + 1) * productWidth}px)`;
		}
	};
	const handlePrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prevIndex) => prevIndex - 1);
			sliderRef.current.style.transform = `translateX(-${(currentIndex - 1) * productWidth}px)`;
		}
	};

	return (
		<div className="home-section1">
			<div className="home-section1-titleBox">
				<div>
					<h2>
						웨딩스토리 <span>핫한 스드메 브랜드 추천!!</span>
					</h2>
					<p>요즘 신랑 신부님께 가장 사랑받는 스드메 브랜드는?</p>
				</div>
			</div>
			<div className="home-section1-slider">
				<button className="slider-prev" onClick={handlePrev}>
					&#10094;
				</button>
				<div className="home-section1-productBox-wrapper">
					<div className="home-section1-productBox" ref={sliderRef}>
						{productList.map((product, i) => (
							<WeddingHallProduct key={"product" + i} product={product} />
						))}
					</div>
				</div>
				<button className="slider-next" onClick={handleNext}>
					&#10095;
				</button>
			</div>
		</div>
	);
};
export default HomeProduct2;

const WeddingHallProduct = (props) => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const product = props.product;
	const NumberFormatter = ({ number }) => {
		const formattedNumber = new Intl.NumberFormat("ko-KR").format(number);
		return <span>{formattedNumber}</span>;
	};
	return (
		<Link to={`/product/hallInfo/${product.productNo}`} className="home-section1-product">
			<div className="sec1-productImgBox">
				<img src={`${backServer}/product/image/${product.productImg}`} />
			</div>
			<div className="sec1-productInfo" style={{ paddingTop: "5px" }}>
				<p>
					[ {product.companyName} ] {product.productName}
				</p>
				<p>
					<NumberFormatter number={product.productPrice} /> 원
				</p>
			</div>
		</Link>
	);
};
