import { useState } from "react";

const HomeInfo = () => {
	const [currentIndex1, setCurrentIndex1] = useState(0);
	const [currentIndex2, setCurrentIndex2] = useState(0);
	const content = [
		{ img: "/image/웨딩레시피메인.jpg", img1: "/image/웨딩레시피메인.jpg" },
		{ img: "/image/웨딩레시피메인.jpg", img1: "/image/웨딩레시피메인.jpg" },
		{ img: "/image/웨딩레시피메인.jpg", img1: "/image/웨딩레시피메인.jpg" },
	];
	const [isModalOpen, setIsModalOpen] = useState(false); //모달 오픈 여부
	const [selectedEvent, setSelectedEvent] = useState(null); //선택한 이벤트의 정보가 담긴 함수
	const openModal = (info) => {
		console.log(info);

		setSelectedEvent({
			img1: info.img,
		});
		setIsModalOpen(true);
		handlePrev(info);
		handleNext(info);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedEvent(null);
	};
	// 왼쪽 화살표 클릭 시 이전 이미지로
	const prevSlide = () => {
		setCurrentIndex1((prevIndex) => (prevIndex === 0 ? content.length - 1 : prevIndex - 1));
	};

	// 오른쪽 화살표 클릭 시 다음 이미지로
	const nextSlide = () => {
		setCurrentIndex1((prevIndex) => (prevIndex + 1) % content.length);
	};
	const handlePrev = (info) => {
		setCurrentIndex2((prevIndex) => (prevIndex === 0 ? info.length - 1 : prevIndex - 1));
	};
	const handleNext = (info) => {
		setCurrentIndex2((prevIndex) => (prevIndex === info.length - 1 ? 0 : prevIndex + 1));
	};
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
				{content.map((info) => (
					<div onClick={() => openModal(info)}>
						<div className="home-section2-infoImg">
							<img src={info.img} />
						</div>
						<div className="home-section2-infoInfo">
							<h4>웨딩홀 타입별 드레스 TIP</h4>
						</div>
					</div>
				))}
				{/* 오른쪽 화살표 버튼 */}
				<button className="arrow2 right" onClick={nextSlide}>
					&#10095; {/* 오른쪽 화살표 기호 */}
				</button>
			</div>
			{/* 모달 */}
			{isModalOpen ? (
				<div className="home-infoDetail-wrap">
					<div className="home-infoDetail-slider" onClick={handlePrev}>
						<span class="material-icons">chevron_left</span>
					</div>
					<div style={{ height: "100%" }}>
						<span className="home-infoDetail-close" onClick={closeModal}>
							&times;
						</span>
						<div className="home-infoDetail">
							<img src={selectedEvent[currentIndex2]} alt={`Slide ${currentIndex2 + 1}`} />
						</div>
					</div>
					<div className="home-infoDetail-slider" onClick={handleNext}>
						<span class="material-icons">navigate_next</span>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};
export default HomeInfo;
