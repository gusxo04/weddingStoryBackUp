import { useEffect, useState } from "react";
import "./companyControll.css";
import axios from "axios";
import PageNavi from "../utils/PagiNavi";
import Swal from "sweetalert2";
const CompanyControll = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [companyList, setCompanyList] = useState([]);
  const [pi, setPi] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [seeInfo, setSeeInfo] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [delCompany, setDelCompany] = useState("");

  const [currentCompanyNo, setCurrentCompanyNo] = useState(null); // 상태 선언
  const [report, setReport] = useState([]);

  console.log("modalOpen" + modalOpen);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/company/${reqPage}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setCompanyList(Object.values(res.data.list));
          setPi(res.data.pi);
        } else {
          console.error("업체 없음");
          setCompanyList([]);
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("조회 에러");
        setCompanyList([]);
      });
  }, [reqPage]);
  const companyData = (company) => {
    console.log(company);
    setSelectedCompany(company);
  };
  useEffect(() => {}, [modalOpen]);

  return (
    <div className="company-controll-wrap">
      <div className="page-title">
        <h2>업체 관리</h2>
      </div>
      <div>
        <table className="tbl1 company_tbl">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>업체번호</th>
              <th style={{ width: "10%" }}>업체명</th>
              <th style={{ width: "15%" }}>사업자 이름</th>
              <th style={{ width: "10%" }}>카테고리</th>
              <th style={{ width: "20%" }}>업체 전화번호</th>
              <th style={{ width: "20%" }}>사업자 이메일</th>
              <th style={{ width: "10%" }}>신고 수</th>
            </tr>
          </thead>
          <tbody>
            {companyList.length > 0 ? (
              companyList.map((company, index) => (
                <CompanyItem
                  key={"company-" + index}
                  company={company}
                  index={index}
                  companyData={companyData}
                  seeInfo={seeInfo}
                  setSeeInfo={setSeeInfo}
                  setModalOpen={setModalOpen}
                  modalOpen={modalOpen}
                  setCurrentCompanyNo={setCurrentCompanyNo}
                  currentCompanyNo={currentCompanyNo}
                  setReport={setReport}
                  report={report}
                  delCompany={delCompany}
                  setDelCompany={setDelCompany}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7">업체가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </div>
      </div>
      <CompanyInfo
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
    </div>
  );
};
const CompanyItem = (props) => {
  const company = props.company;
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const index = props.index;
  const companyData = props.companyData;
  const seeInfo = props.seeInfo;
  const setSeeInfo = props.setSeeInfo;

  const modalOpen = props.modalOpen;
  const setModalOpen = props.setModalOpen;
  const currentCompanyNo = props.currentCompanyNo;
  const setCurrentCompanyNo = props.setCurrentCompanyNo;
  const report = props.report;
  const setReport = props.setReport;
  const setDelCompany = props.setDelCompany;
  const delCompany = props.delCompany;

  const handleReportClick = (e) => {
    e.stopPropagation();
    setModalOpen(true);
    setCurrentCompanyNo(company.companyNo); // 클릭한 회사 번호 설정
  };

  return (
    <tr className="userInfo" onClick={() => companyData(company)}>
      <td>{company.companyNo}</td>
      <td>{company.companyName}</td>
      {company.memberList.length === 0 ? (
        <td>사업자 미정</td>
      ) : (
        company.memberList.map((c, index) => (
          <td key={"member" + index}>
            {c.memberName ? c.memberName : "사업자 미정"}
          </td>
        ))
      )}
      <td>{company.companyCategory}</td>
      <td>{company.companyTel}</td>
      <td>{company.companyAddr}</td>
      <td onClick={handleReportClick} className="report-text">
        {company.companyReport}
        {modalOpen ? (
          currentCompanyNo ? (
            <ReportOverlay
              setDelCompany={setDelCompany}
              delCompany={delCompany}
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
              currentCompanyNo={currentCompanyNo}
              report={report}
              setReport={setReport}
            />
          ) : null
        ) : null}
      </td>
    </tr>
  );
};

const CompanyInfo = (props) => {
  const selectedCompany = props.selectedCompany;
  return (
    <>
      <div className="companyInfo-wrap">
        <div className="company">
          <h3>업체 상세</h3>
          {selectedCompany === null ? (
            <a>업체를 선택하세요</a>
          ) : (
            <table className="tbl2">
              <thead>
                <tr>
                  <th>항목</th>
                  <th>정보</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>업체코드</th>
                  <td>{selectedCompany.companyNo}</td>
                </tr>
                <tr>
                  <th>카테고리</th>
                  <td>{selectedCompany.companyCategory}</td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>{selectedCompany.companyName}</td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>{selectedCompany.companyTel}</td>
                </tr>
                <tr>
                  <th>주소</th>
                  <td>{selectedCompany.companyAddr}</td>
                </tr>
                <tr>
                  <th>영업 시작</th>
                  <td>{selectedCompany.startTime}</td>
                </tr>
                <tr>
                  <th>영업 마감</th>
                  <td>{selectedCompany.endTime}</td>
                </tr>
                <tr>
                  <th>등록일자</th>
                  <td>{selectedCompany.companyEnrollDate}</td>
                </tr>
                <tr>
                  <th>휴업일</th>
                  <td>{selectedCompany.dayOff}</td>
                </tr>
                <tr>
                  <th>신고 수</th>
                  <td>{selectedCompany.companyReport}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="company-member">
          <h3>사업자 상세</h3>
          {selectedCompany === null ? (
            <a>업체를 선택하세요</a>
          ) : (
            <table className="tbl2">
              <thead>
                <tr>
                  <th>항목</th>
                  <th>정보</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>회원번호</th>
                  {selectedCompany.memberList.map((c, index) => (
                    <td key={"member" + index}>{c.memberNo}</td>
                  ))}
                </tr>
                <tr>
                  <th>아이디</th>
                  {selectedCompany.memberList.map((c, index) => (
                    <td key={"member" + index}>{c.memberId}</td>
                  ))}
                </tr>
                <tr>
                  <th>이름</th>
                  {selectedCompany.memberList.map((c, index) => (
                    <td key={"member" + index}>{c.memberName}</td>
                  ))}
                </tr>
                <tr>
                  <th>전화번호</th>
                  {selectedCompany.memberList.map((c, index) => (
                    <td key={"member" + index}>{c.memberPhone}</td>
                  ))}
                </tr>
                <tr>
                  <th>이메일</th>
                  {selectedCompany.memberList.map((c, index) => (
                    <td key={"member" + index}>{c.memberEmail}</td>
                  ))}
                </tr>
                <tr>
                  <th>회원가입</th>
                  {selectedCompany.memberList.map((c, index) => (
                    <td key={"member" + index}>{c.enrollDate}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

const ReportOverlay = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const modalOpen = props.modalOpen;
  const setModalOpen = props.setModalOpen;
  const currentCompanyNo = props.currentCompanyNo;
  const report = props.report;
  const setReport = props.setReport;
  const delCompany = props.delCompany;

  useEffect(() => {
    axios
      .get(`${backServer}/report/getReport/${currentCompanyNo}`)
      .then((res) => {
        console.log(res.data);
        setReport(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("광고 거절 에러");
      });
  }, []);
  const handleClose = () => {
    setModalOpen(false);
  };

  const delCom = () => {
    console.log("탈퇴시킬 업체는" + currentCompanyNo);
    axios
      .post(`${backServer}/admin/deleteCom/${currentCompanyNo}`)
      .then((res) => {
        Swal.fire({
          title: "탈퇴 처리 완료",
          text: "선택한 업체의 탈퇴처리가 완료되었습니다.",
          icon: "success",
          iconColor: "var(--main1)",
          confirmButtonText: "확인",
          confirmButtonColor: "var(--main1)",
        });
      })
      .catch((err) => {
        console.log("회원탈퇴 실패");
      });
  };

  return (
    <div className="reportOverlay">
      <div
        className="reportOverlay-content"
        onClick={(e) => e.stopPropagation()}
      >
        <table className="tbl1 report_tbl">
          <thead>
            <tr>
              <th style={{ width: "33%" }}>신고자</th>
              <th style={{ width: "33%" }}>신고일</th>
              <th style={{ width: "33%" }}>사유</th>
            </tr>
          </thead>
          <tbody>
            {report.length > 0 ? (
              report.map((report, index) => (
                <ReportItem key={"report-" + index} report={report} />
              ))
            ) : (
              <tr>
                <td colSpan="3">신고내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="button-group">
          <button onClick={handleClose} className="close-btn">
            닫기
          </button>
          <button onClick={() => delCom()} className="close-btn">
            업체 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};
const ReportItem = (props) => {
  const report = props.report;
  return (
    <tr>
      <td>{report.memberNo}</td>
      <td>{report.reportDate}</td>
      <td>{report.reportContent}</td>
    </tr>
  );
};
export default CompanyControll;
