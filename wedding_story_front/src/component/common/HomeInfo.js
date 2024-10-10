import { useRef, useState } from "react";

const HomeInfo = () => {
	const content = [
		{
			img: "/image/웨딩홀/1/메인사진.jpg",
			suv1: "/image/웨딩홀/1/서브사진1.jpg",
			suv2: "/image/웨딩홀/1/서브사진2.jpg",
			suv3: "/image/웨딩홀/1/서브사진3.jpg",
			text: "웨딩홀 비용 Save Tip",
		},
		{
			img: "/image/웨딩홀/2/메인사진.jpg",
			suv1: "/image/웨딩홀/2/서브사진1.jpg",
			suv2: "/image/웨딩홀/2/서브사진2.jpg",
			suv3: "/image/웨딩홀/2/서브사진3.jpg",
			text: "웨딩홀 필수 체크리스트!!",
		},
		{
			img: "/image/웨딩홀/3/메인사진.jpg",
			suv1: "/image/웨딩홀/3/서브사진1.jpg",
			suv2: "/image/웨딩홀/3/서브사진2.jpg",
			suv3: "/image/웨딩홀/3/서브사진3.jpg",
			text: "웨딩홀 투어 전 미리 체크하면 좋은 점!",
		},
		{
			img: "/image/웨딩홀/3/메인사진.jpg",
			suv1: "/image/웨딩홀/3/서브사진1.jpg",
			suv2: "/image/웨딩홀/3/서브사진2.jpg",
			suv3: "/image/웨딩홀/3/서브사진3.jpg",
			text: "웨딩홀 투어 전 미리 체크하면 좋은 점!",
		},
	];
	const [selectedIndex, setSelectedIndex] = useState(null); // 현재 선택된 대표사진 인덱스
	const [showModal, setShowModal] = useState(false); // 모달 표시 여부

	// 대표 사진 클릭 시 모달 열기
	const openModal = (index) => {
		setSelectedIndex(index);
		setShowModal(true);
	};

	// 모달 닫기
	const closeModal = () => {
		setShowModal(false);
		setSelectedIndex(null);
	};
	const [startIndex, setStartIndex] = useState(0); // 현재 슬라이드 시작 인덱스
	const itemsPerPage = 3; // 한 번에 보여줄 항목 수

	// 이전 슬라이드
	const prevSlide = () => {
		setStartIndex((prevIndex) => (prevIndex === 0 ? content.length - itemsPerPage : prevIndex - itemsPerPage));
	};

	// 다음 슬라이드
	const nextSlide = () => {
		setStartIndex((prevIndex) => (prevIndex + itemsPerPage >= content.length ? 0 : prevIndex + itemsPerPage));
	};

	// 현재 보여줄 아이템 슬라이스
	const currentItems = content.slice(startIndex, startIndex + itemsPerPage);
	return (
		<div className="home-section2">
			<div className="home-section2-titleBox">
				<div>
					<h2>
						더욱 완벽한 웨딩을 위한!! <span>웨딩 레시피</span>
					</h2>
				</div>
			</div>
			<div className="home-section2-infoBox">
				{/* 왼쪽 화살표 버튼 */}
				<button className="arrow2 left" onClick={prevSlide}>
					&#10094; {/* 왼쪽 화살표 기호 */}
				</button>
				{currentItems.map((info, index) => (
					<div key={index} onClick={() => openModal(startIndex + index)}>
						<div className="home-section2-infoImg">
							<img src={info.img} alt="웨딩 이미지" />
						</div>
						<div className="home-section2-infoInfo">
							<h4>{info.text}</h4>
						</div>
					</div>
				))}
				{/* 오른쪽 화살표 버튼 */}
				<button className="arrow2 right" onClick={nextSlide}>
					&#10095; {/* 오른쪽 화살표 기호 */}
				</button>
			</div>
			{/* 모달 */}
			{showModal && <Modal content={content[selectedIndex]} closeModal={closeModal} />}
		</div>
	);
};
export default HomeInfo;

function Modal({ content, closeModal }) {
	console.log(content);

	const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 번호
	const subImages = [content.img, content.suv1, content.suv2, content.suv3]; // 서브 이미지 배열

	// 이전 슬라이드로 이동
	const prevSlide = () => {
		setCurrentSlide((prev) => (prev === 0 ? subImages.length - 1 : prev - 1));
	};

	// 다음 슬라이드로 이동
	const nextSlide = () => {
		setCurrentSlide((prev) => (prev === subImages.length - 1 ? 0 : prev + 1));
	};

	return (
		<div className="home-infoDetail-wrap">
			<div className="modal-content">
				<span className="home-infoDetail-close" onClick={closeModal}>
					&times;
				</span>

				<span className="arrow prev" onClick={prevSlide}>
					&#10094;
				</span>

				<img src={subImages[currentSlide]} alt={`서브 사진 ${currentSlide + 1}`} className="modal-img" />

				<span className="arrow next" onClick={nextSlide}>
					&#10095;
				</span>
			</div>
		</div>
	);
}
