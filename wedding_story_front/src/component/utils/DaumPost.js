import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

const DaumPost = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;
  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      //addressType-> R 도로명주소, J 지번
      if (data.bname !== "") {
        //bname = 법정동/법정리 이름
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress({ ...address, address: fullAddress });
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    console.log(data);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type="button" onClick={handleClick}>
      Open
    </button>
  );
};
export default DaumPost;
