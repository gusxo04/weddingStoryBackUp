import { useState } from "react";

const HomeInfo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const content = [
    { img: "/image/웨딩레시피메인.jpg", url: "" },
    { img: "//image/웨딩레시피메인.jpg", url: "" },
    { img: "/image/웨딩레시피메인.jpg", url: "" },
  ];

  // 왼쪽 화살표 클릭 시 이전 이미지로
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? content.length - 1 : prevIndex - 1
    );
  };

  // 오른쪽 화살표 클릭 시 다음 이미지로
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
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
        <div>
          <div className="home-section2-infoImg">
            <img src="/image/웨딩레시피메인.jpg" />
          </div>
          <div className="home-section2-infoInfo">
            <h4>웨딩홀 타입별 드레스 TIP</h4>
          </div>
        </div>
        <div>
          <div className="home-section2-infoImg">
            <img src="/image/웨딩레시피메인.jpg" />
          </div>
          <div className="home-section2-infoInfo">
            <h4>웨딩홀 타입별 드레스 TIP</h4>
          </div>
        </div>
        <div>
          <div className="home-section2-infoImg">
            <img src="/image/웨딩레시피메인.jpg" />
          </div>
          <div className="home-section2-infoInfo">
            <h4>웨딩홀 타입별 드레스 TIP</h4>
          </div>
        </div>
        {/* 오른쪽 화살표 버튼 */}
        <button className="arrow2 right" onClick={nextSlide}>
          &#10095; {/* 오른쪽 화살표 기호 */}
        </button>
      </div>
    </div>
  );
};
export default HomeInfo;
