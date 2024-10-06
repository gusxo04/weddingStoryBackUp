import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { img: "/image/banner1.png", url: "http://localhost:3000/convention/main" },
    { img: "/image/banner2.png", url: "http://localhost:3000/product/list" },
    { img: "/image/banner3.png", url: "http://localhost:3000/myPage" },
  ];
  useEffect(() => {
    // 3초마다 이미지를 슬라이드
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // 이미지 순차 변경
    }, 7000); // 7초

    return () => clearInterval(intervalId); // 언마운트 시 인터벌 정리
  }, []);

  // 왼쪽 화살표 클릭 시 이전 이미지로
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // 오른쪽 화살표 클릭 시 다음 이미지로
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="banner-container">
      {/* 왼쪽 화살표 버튼 */}
      <button className="arrow left" onClick={prevSlide}>
        &#10094; {/* 왼쪽 화살표 기호 */}
      </button>
      <Link to={images[currentIndex].url}>
        <div
          className="banner-slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }} // 슬라이드 애니메이션
        >
          {images.map((image, index) => (
            <div className="banner-imgBox" key={index}>
              <img src={image.img} alt={`배너 이미지 ${index + 1}`} />
            </div>
          ))}
        </div>
      </Link>
      {/* 오른쪽 화살표 버튼 */}
      <button className="arrow right" onClick={nextSlide}>
        &#10095; {/* 오른쪽 화살표 기호 */}
      </button>
    </div>
  );
};

export default HomeBanner;
