import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";

const CompanyInfo = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [company, setCompany] = useState({}); //DB에서 조회한 데이터가 들어갈 state
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState); //recoil에 저장되어있는 companyNo
  useEffect(() => {
    axios
      .get(`${backServer}/company/${companyNo}`)
      .then((res) => {
        console.log(res);
        setCompany(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [companyNo]);

  console.log(company);
  return (
    <div className="company-info-wrap">
      <div className="company-title">내 업체 정보</div>
      <section className="company-section">
        <div className="thumbnail-zone">
          <div className="company-thumbnail">
            <img
              src={
                company.companyThumb
                  ? `${backServer}/company/thumb/${company.companyThumb}`
                  : "/image/default_img.png"
              } //backServer 주소의 경로를 따라서 board.boardThumb의 이름인 파일을 선택
            />
          </div>
          <span>대표 사진</span>
        </div>
        <div className="main-content">
          <div className="company-info-input-zone">
            <div className="company-input-wrap">
              <label htmlFor="companyCode">업체코드</label>
              <input
                type="text"
                id="companyCode"
                defaultValue={company.companyNo}
                readOnly={true}
              ></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyName">업체명</label>
              <input
                type="text"
                id="companyName"
                defaultValue={company.companyName}
                readOnly={true}
              ></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyTel">전화번호</label>
              <input
                type="text"
                id="companyTelNum"
                defaultValue={company.companyTel}
                readOnly={true}
              ></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyCode">업체주소</label>
              <input
                type="text"
                id="companyAddr"
                defaultValue={company.companyAddr}
                readOnly={true}
              ></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="business-hour">영업시간</label>
              <input
                type="text"
                className="start-time"
                id="start-time"
                defaultValue={company.startTime}
                readOnly={true}
              ></input>
              <span className="and">~</span>
              <input
                type="text"
                className="end-time "
                id="end-time"
                defaultValue={company.endTime}
                readOnly={true}
              ></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyCategory">카테고리</label>
              <input
                type="text"
                id="companyCategory"
                defaultValue={
                  company.companyCategory === 0
                    ? "웨딩홀"
                    : company.companyCategory === 1
                    ? "스튜디오"
                    : company.companyCategory === 2
                    ? "드레스"
                    : company.companyCategory === 3
                    ? "메이크업"
                    : company.companyCategory === 4
                    ? "예복"
                    : company.companyCategory === 5
                    ? "본식"
                    : ""
                }
                readOnly={true}
              ></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="dayOff">휴무일</label>
              <input
                type="text"
                id="dayOff"
                defaultValue={company.dayOff}
                readOnly={true}
              ></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyKeyWord">키워드</label>
              <input
                type="text"
                id="companyKeyWord"
                defaultValue={company.keyWord}
                readOnly={true}
              ></input>
            </div>
          </div>
        </div>
      </section>
      <div className="introduction-wrap">
        <div>소개글</div>
        <textarea defaultValue={company.companyInfo} readOnly={true}></textarea>
      </div>
    </div>
  );
};
export default CompanyInfo;
