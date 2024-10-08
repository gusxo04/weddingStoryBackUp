import { useRef, useState } from "react";

const HomeProduct = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const sliderRef = useRef(null);
	const [productList, setProductList] = useState([
		{
			productImg: "/image/testImg.jpg",
			companyName: "웨딩홀이름1",
			productName: "상품이름1",
			productPrice: "2000000",
			companyKeyWord: {
				keyWord1: "키워드1",
				keyWord2: "키워드2",
				keyWord3: "키워드3",
			},
		},
		{
			productImg: "/image/testImg.jpg",
			companyName: "웨딩홀이름2",
			productName: "상품이름2",
			productPrice: "3000000",
			companyKeyWord: {
				keyWord1: "키워드4",
				keyWord2: "키워드5",
				keyWord3: "키워드6",
			},
		},
		{
			productImg: "/image/testImg.jpg",
			companyName: "웨딩홀이름3",
			productName: "상품이름3",
			productPrice: "4000000",
			companyKeyWord: {
				keyWord1: "키워드4",
				keyWord2: "키워드5",
				keyWord3: "키워드6",
			},
		},
		{
			productImg: "/image/testImg.jpg",
			companyName: "웨딩홀이름4",
			productName: "상품이름4",
			productPrice: "4000000",
			companyKeyWord: {
				keyWord1: "키워드4",
				keyWord2: "키워드5",
				keyWord3: "키워드6",
			},
		},
		{
			productImg: "/image/testImg.jpg",
			companyName: "웨딩홀이름4",
			productName: "상품이름4",
			productPrice: "4000000",
			companyKeyWord: {
				keyWord1: "키워드4",
				keyWord2: "키워드5",
				keyWord3: "키워드6",
			},
		},
	]);

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
						웨딩스토리 <span>BEST WEDDING HALL</span>
					</h2>
					<p>나에게 잘 어울리는 베스트 웨딩홀을 찾으세요!</p>
				</div>
			</div>
			<div class="home-section1-slider">
				<button class="slider-prev" onClick={handlePrev}>
					&#10094;
				</button>
				<div className="home-section1-productBox-wrapper">
					<div className="home-section1-productBox" ref={sliderRef}>
						{productList.map((product, i) => (
							<WeddingHallProduct key={"product" + i} product={product} />
						))}
					</div>
				</div>
				<button class="slider-next" onClick={handleNext}>
					&#10095;
				</button>
			</div>
		</div>
	);
};
export default HomeProduct;

const WeddingHallProduct = (props) => {
	const product = props.product;
	const NumberFormatter = ({ number }) => {
		const formattedNumber = new Intl.NumberFormat("ko-KR").format(number);
		return <span>{formattedNumber}</span>;
	};
	return (
		<div className="home-section1-product">
			<div className="sec1-productImgBox">
				<img src={product.productImg} />
			</div>
			<div className="sec1-productInfo">
				<div>
					<span>{product.companyKeyWord.keyWord1}</span>
					<span>{product.companyKeyWord.keyWord2}</span>
					<span>{product.companyKeyWord.keyWord3}</span>
				</div>
				<p>
					[ {product.companyName} ] {product.productName}
				</p>
				<p>
					<NumberFormatter number={product.productPrice} /> 원
				</p>
			</div>
		</div>
	);
};
