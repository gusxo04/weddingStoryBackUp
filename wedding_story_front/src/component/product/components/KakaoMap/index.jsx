import { useEffect } from "react";
const { kakao } = window;

const KakaoMap = () => {
  useEffect(() => {
    const container = document.getElementById("map"); //지동에 담을 영역의 DOM 래퍼런스
    const options = {
      center: new kakao.maps.LatLng(37.51207412593136, 127.05902969025047), //지도의 중심좌표
      Level: 3,
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);
  return <div id="map" style={{ width: "800px", height: "300px" }}></div>;
};

export default KakaoMap;
