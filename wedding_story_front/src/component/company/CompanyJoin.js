import { useState } from "react";
import Select from "react-select";
import "./company.css";

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

const CompanyJoin = () => {
  const [selectOption, setSelectOption] = useState(null);
  const [timeValue, setTimeValue] = useState("");
  return (
    <div className="join-wrap">
      <section className="section">
        <div className="main-content">
          <div className="title">업체 등록</div>
          <div className="company-info-input-zone">
            <div className="company-input-wrap">
              <label htmlFor="companyCode">업체코드</label>
              <input type="text" id="companyCode"></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyName">업체명</label>
              <input type="text" id="companyName"></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyPhone">업체 전화번호</label>
              <input type="text" id="companyPhone"></input>
              <span>-</span>
              <input type="text" id="companyPhone"></input>
              <span>-</span>
              <input type="text" id="companyPhone"></input>
              <input type="hidden"></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyAddr">업체주소</label>
              <input type="text" id="companyAddr" readOnly></input>
              <button>검색</button>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyAddr-detail">상세주소</label>
              <input type="text" id="companyAddr-detail"></input>
            </div>
            <div className="company-select-wrap">
              <label htmlFor="open-time">영업시간</label>
              <div className="time-select" id="open-time">
                <Select
                  classNames={{
                    control: (state) =>
                      state.isFocused ? "border-red-600" : "border-grey-300",
                  }}
                  onChange={(e) => setTimeValue(e.value)}
                  placeholder="시간을 선택하세요."
                  options={openHour}
                />
              </div>
              <span>~</span>
              <div className="time-select">
                <Select
                  classNames={{
                    control: (state) =>
                      state.isFocused ? "border-red-600" : "border-grey-300",
                  }}
                  onChange={(e) => setTimeValue(e.value)}
                  placeholder="시간을 선택하세요."
                  options={closeHour}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyJoin;
