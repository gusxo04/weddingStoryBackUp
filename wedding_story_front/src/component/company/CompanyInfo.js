import { useEffect, useState } from "react";

const CompanyInfo = () => {
  const [company, setCompany] = useState(null);
  useEffect(() => {}, []);
  return (
    <div className="company-info-wrap">
      <div className="company-title">내 업체 정보</div>
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
              <input type="text" id="companyName" readOnly></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyTel">전화번호</label>
              <input type="text" id="companyTelNum" readOnly></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyCode">업체주소</label>
              <input type="text" id="companyAddr" readOnly></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="business-hour">영업시간</label>
              <input
                type="text"
                className="start-time"
                id="start-time"
                readOnly
              ></input>
              <span className="and">~</span>
              <input
                type="text"
                className="end-time "
                id="end-time"
                readOnly
              ></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyCategory">카테고리</label>
              <input type="text" id="companyCategory" readOnly></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="dayOff">휴무일</label>
              <input type="text" id="dayOff" readOnly></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyKeyWord">키워드</label>
              <input type="text" id="companyKeyWord" readOnly></input>
            </div>
          </div>
        </div>
      </section>
      <div className="introduction-wrap">
        <div>소개글</div>
        <textarea readOnly></textarea>
      </div>
    </div>
  );
};
export default CompanyInfo;
