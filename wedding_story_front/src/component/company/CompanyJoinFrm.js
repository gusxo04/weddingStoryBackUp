import { useRef, useState } from "react";
import Select from "react-select";
import "./company.css";
import Example from "../utils/ReactTagInput";
import DaumPost from "../utils/DaumPost";

// 시간 option 만들기 - 시(hour)
let openHour = [];
for (let i = 8; i < 13; i++) {
  let op = {};

  // 시간을 00시로 나타내기 위해
  op.value = ("0" + i).slice(-2);
  op.label = ("0" + i).slice(-2) + "시";

  openHour.push(op);
}
let closeHour = [];
for (let i = 16; i < 25; i++) {
  let op = {};

  // 시간을 00시로 나타내기 위해
  op.value = ("0" + i).slice(-2);
  op.label = ("0" + i).slice(-2) + "시";

  closeHour.push(op);
} //출처: https://anerim.tistory.com/213 [디발자 뚝딱:티스토리]

const CompanyJoinFrm = () => {
  const [company, setCompany] = useState({
    companyName: "",
    companyTel: "",
    companyAddr: "",
    companyCategory: "",
    startTime: "",
    endTime: "",
    dayOff: "",
    keyWord: "",
  });

  const selectOptions = [
    { value: 0, label: "웨딩홀" },
    { value: 1, label: "스튜디오" },
    { value: 2, label: "드레스" },
    { value: 3, label: "메이크업" },
    { value: 4, label: "예복" },
    { value: 5, label: "본식" },
  ];
  const changeValue = (e) => {
    const name = e.target.name;
    setCompany({ ...company, [name]: e.target.value });
    console.log(company);
  };
  const tel1Ref = useRef();
  const tel2Ref = useRef();
  const tel3Ref = useRef();

  const changeTel = () => {
    const tel1 = tel1Ref.current.value;
    const tel2 = tel2Ref.current.value;
    const tel3 = tel3Ref.current.value;
    const combinedTel = `${tel1}-${tel2}-${tel3}`; /*tel1-tel2-tel3 의형식대로 값을 모두 합침*/

    setCompany((prevCompany) => ({
      /*prevCompany는 매개변수로 다른 문자가 와도 상관은 없음 */
      ...prevCompany /*... -> 이것은 스프레드 문법으로 company를 전체 복사함*/,
      companyTel: combinedTel /*companyTel에 들어갈 값은 000-0000-0000형식*/,
    }));

    // 여기서 추가적인 처리 (예: 서버로 데이터 전송) 가능
    console.log(company);
  };
  const handleTelInput = (e, ref) => {
    const value = e.target.value;
    // 숫자만 허용
    if (/^\d*$/.test(value) || value === "") {
      ref.current.value = value;
      changeTel(); // 전화번호 업데이트
    } else {
      ref.current.value = value.replace(/\D/g, ""); // 숫자가 아닌 문자는 제거
    }
  };

  const [address, setAddress] = useState({
    //이메일 주소를 담기위한 state
    address: "",
    detailAddress: "",
  });

  return (
    <div className="company-join-wrap">
      <div className="company-title">업체 등록</div>
      <section className="company-section">
        <div className="thumbnail-zone">
          <div className="company-thumbnail"></div>
          <span>대표 사진</span>
        </div>
        <div className="main-content">
          <div className="company-info-input-zone">
            <div className="company-input-wrap">
              <label htmlFor="companyCode">업체코드</label>
              <input type="text" id="companyCode" readOnly></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyName">업체명</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={company.companyName}
                onChange={changeValue}
              ></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyTel">업체 전화번호</label>
              <input
                type="text"
                id="companyTel"
                ref={tel1Ref}
                onChange={(e) => handleTelInput(e, tel1Ref)}
                maxLength={3}
              />
              <span>-</span>
              <input
                type="text"
                id="companyTel"
                ref={tel2Ref}
                onChange={(e) => handleTelInput(e, tel2Ref)}
                maxLength={4}
              />
              <span>-</span>
              <input
                type="text"
                id="companyTel"
                ref={tel3Ref}
                onChange={(e) => handleTelInput(e, tel3Ref)}
                maxLength={4}
              />
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyAddr">업체주소</label>
              <input
                type="text"
                id="companyAddr"
                defaultValue={address.address}
                readOnly
              ></input>
              <DaumPost address={address} setAddress={setAddress} />
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyAddr-detail">상세주소</label>
              <input
                type="text"
                id="companyAddr-detail"
                value={address.detailAddress}
                onChange={(e) => {
                  setAddress({ ...address, detailAddress: e.target.value });
                }}
              ></input>
            </div>
            <div className="company-select-wrap">
              <label htmlFor="open-time">영업시간</label>
              <div className="time-select" id="open-time">
                <Select
                  onChange={(e) =>
                    setCompany({ ...company, startTime: e.value })
                  }
                  placeholder="시간을 선택하세요."
                  options={openHour}
                />
              </div>
              <span>~</span>
              <div className="time-select">
                <Select
                  onChange={(e) => setCompany({ ...company, endTime: e.value })}
                  placeholder="시간을 선택하세요."
                  options={closeHour}
                />
              </div>
            </div>
            <div className="company-select-wrap">
              <label htmlFor="category">카테고리</label>
              <div className="category-select" id="category">
                <Select
                  onChange={(e) => {
                    setCompany({ ...company, companyCategory: e.value });
                  }}
                  placeholder="카테고리"
                  options={selectOptions}
                />
              </div>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="company-closed-days">업체 휴무일</label>
              <div className="checkbox" id="company-closed-day">
                <label htmlFor="monday">월</label>
                <input type="checkbox" id="monday" value="월"></input>
                <label htmlFor="tuesday">화</label>
                <input type="checkbox" id="tuesday" value="화"></input>
                <label htmlFor="wednesday">수</label>
                <input type="checkbox" id="wednesday" value="수"></input>
                <label htmlFor="thursday">목</label>
                <input type="checkbox" id="thursday" value="목"></input>
                <label htmlFor="friday">금</label>
                <input type="checkbox" id="friday" value="금"></input>
                <label htmlFor="saturday">토</label>
                <input type="checkbox" id="saturday" value="토"></input>
                <label htmlFor="sunday">일</label>
                <input type="checkbox" id="sunday" value="일"></input>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="keyWord-wrap">
        <label htmlFor="keyword">키워드</label>
        <Example />
      </div>
      <div className="introduction-wrap">
        <div>소개글</div>
        <textarea
          maxLength={100}
          placeholder="업체 소개글 100자 이내로 작성 부탁"
        ></textarea>
      </div>
      <div className="btn-zone">
        <button>등록 하기</button>
      </div>
    </div>
  );
};

export default CompanyJoinFrm;
