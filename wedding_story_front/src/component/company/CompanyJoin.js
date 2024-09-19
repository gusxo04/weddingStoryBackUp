import { useState } from "react";
import "./company.css";

const CompanyJoin = () => {
  const [selectOption, setSelectOption] = useState(null);
  const options = [
    { label: "08:00", value: "08:00" },
    { label: "08:30", value: "08:30" },
    { label: "09:00", value: "09:00" },
  ];

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
            <select
              className="open-time"
              onChange={(e) => {
                setSelectOption(e.target.value);
              }}
              options={options}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyJoin;
