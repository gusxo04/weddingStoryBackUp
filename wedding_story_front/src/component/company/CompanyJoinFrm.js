import { useState } from "react";
import Select from "react-select";
import "./company.css";
import Example from "../utils/ReactTagInput";

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
  const [selectOption, setSelectOption] = useState(null);
  const [timeValue, setTimeValue] = useState("");
  const [category, setCategory] = useState(null);
  const selectOptions = [
    { value: "웨딩홀", label: "웨딩홀" },
    { value: "스튜디오", label: "스튜디오" },
    { value: "드레스", label: "드레스" },
    { value: "메이크업", label: "메이크업" },
    { value: "예복", label: "예복" },
    { value: "본식", label: "본식" },
  ];
  const changeValue = (e) => {
    const name = e.target.name;
    setCompany({ ...company, [name]: e.target.value });
    console.log(company);
  };
  const push = (e) => {
    const pushTel = { ...company.companyTel };
    pushTel.push(e.target.value);
    setCompany(pushTel);
    console.log(company.companyTel);
  };
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
                name="companyTel"
                value={company.companyTel}
                onChange={changeValue}
              ></input>
              <span>-</span>
              <input
                type="text"
                id="companyTel"
                name="companyTel"
                value={company.companyTel}
                onChange={changeValue}
              ></input>
              <span>-</span>
              <input
                type="text"
                id="companyTel"
                name="companyTel"
                value={company.companyTel}
                onChange={changeValue}
              ></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyAddr">업체주소</label>
              <input type="text" id="companyAddr" readOnly></input>
              <button>검색</button>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyAddr-detail">상세주소</label>
              <input type="text" id="companyAddr-detail"></input>
              <input type="text" id="companyAddr" name="companyAddr"></input>
            </div>
            <div className="company-select-wrap">
              <label htmlFor="open-time">영업시간</label>
              <div className="time-select" id="open-time">
                <Select
                  onChange={(e) => setTimeValue(e.value)}
                  placeholder="시간을 선택하세요."
                  options={openHour}
                />
              </div>
              <span>~</span>
              <div className="time-select">
                <Select
                  onChange={(e) => setTimeValue(e.value)}
                  placeholder="시간을 선택하세요."
                  options={closeHour}
                />
              </div>
            </div>
            <div className="company-select-wrap">
              <label htmlFor="category">카테고리</label>
              <div className="category-select" id="category">
                <Select
                  onChange={(e) => setCategory(e.value)}
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
