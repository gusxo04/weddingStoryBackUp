import { useEffect } from "react";

const Kakao = (props) => {
	useEffect(() => {
		// 지도를 표시할 div
		const mapContainer = document.getElementById("map");
		const mapOption = {
			center: new window.kakao.maps.LatLng(37.5665, 126.978), // 기본 지도 중심 좌표 (서울)
			level: 5, // 지도 확대 레벨
		};

		// 지도 생성
		const map = new window.kakao.maps.Map(mapContainer, mapOption);

		// 주소-좌표 변환 객체 생성
		const geocoder = new window.kakao.maps.services.Geocoder();

		// 도로명 주소 또는 구 주소 (예시)
		const address = props.address;
		console.log(address);

		// 주소로 좌표를 검색합니다.
		geocoder.addressSearch(address, function (result, status) {
			// 정상적으로 검색이 완료되었으면
			if (status === window.kakao.maps.services.Status.OK) {
				// 검색된 좌표값 (위도, 경도)을 기반으로 마커를 지도에 표시
				const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

				// 마커 생성 및 지도에 표시
				const marker = new window.kakao.maps.Marker({
					map: map,
					position: coords,
				});

				// 지도 중심을 마커 좌표로 이동
				map.setCenter(coords);
			} else {
				alert("주소 검색 결과가 없습니다.");
			}
		});
	}, []);

	return (
		<div>
			{/* 지도를 표시할 영역 */}
			<div id="map" style={{ width: "100%", height: "150px" }}></div>
		</div>
	);
};

export default Kakao;
