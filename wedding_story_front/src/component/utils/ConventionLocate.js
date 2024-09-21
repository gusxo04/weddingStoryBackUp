import { useEffect, useRef } from 'react';
import "./conventionLocate.css";
// import { kakao } from 'react-kakao-maps';
const {kakao} = window;

const ConventionLocate = (props) => {

  const {
    closeAlert,
  } = props;

  const mapRef = useRef(null);

  const wayLat = 37.53415181653148;
  const wayLng = 126.89729611650175;

  useEffect(() => {
    const container = mapRef.current //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(wayLat, wayLng), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    
    // 마커 표시
    const markerPosition = new kakao.maps.LatLng(wayLat, wayLng);
    const marker = new kakao.maps.Marker({
      position : markerPosition
    }),infowindow = new kakao.maps.InfoWindow({zindex:1});
    marker.setMap(map);

    // 주소 얻기
    const geocoder = new kakao.maps.services.Geocoder();
    

    
    // 위경도 객체
    const way = {wayLat, wayLng};

     // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다

      searchDetailAddrFromCoords(way, function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
              let detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
              detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
              
              let content = '<div class="bAddr">' +
                              '<span class="title">법정동 주소정보</span>' + 
                              detailAddr + 
                          '</div>';

              // 마커를 클릭한 위치에 표시합니다 
              // marker.setPosition(way);
              // marker.setMap(map);

              // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
              infowindow.setContent(content);
              infowindow.open(map, marker);
          }   
      });

function searchDetailAddrFromCoords(coords, callback) {
  // 좌표로 법정동 상세 주소 정보를 요청합니다
  // geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  geocoder.coord2Address(wayLng, wayLat, callback);
}

  }, []);

  
  return (
    <div className="convention-map-wrap" id="convention-close-screen" onClick={closeAlert}>
      <div className="convention-map-alert">
        <div id="map" ref={mapRef} style={{width:"100%", height:"500px"}}></div>
      </div>
    </div>
  )
}
export default ConventionLocate
// 박람회 위치 표시 API 쓸 곳
// utils로 빼둔 이유는 마이 페이지에서도 쓸 수 있게 하기 위함