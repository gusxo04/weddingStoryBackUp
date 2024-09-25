import { useEffect, useState } from "react";
import "./companyControll.css";
import axios from "axios";
import PageNavi from "../utils/PagiNavi";
const CompanyControll = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [companyList, setCompanyList] = useState([]);
  const [pi, setPi] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [seeInfo, setSeeInfo] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [deleteCompany, setDeleteCompany] = useState([]);
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
  useEffect(() => {
    console.log(deleteCompany);
  }, [deleteCompany]);
  const companyData = (company) => {
    console.log(company);
    setSelectedCompany(company);
  };

  const delCom = () => {
    if (deleteCompany.length > 0) {
      axios
        .post(`${backServer}/admin/deleteCom/${deleteCompany}`)
        .then((res) => {
          console.log(res);
          setDeleteCompany([]);
          setCompanyList((prevList) =>
            prevList.filter(
              (company) => !deleteCompany.includes(company.companyNo)
            )
          );
        })
        .catch((err) => {
          console.log("회원탈퇴 실패");
        });
    }
  };
  return (
    <div className="company-controll-wrap">
      <div className="page-title">
        <h2>업체 관리</h2>
      </div>
      <div>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>업체번호</th>
              <th style={{ width: "10%" }}>업체명</th>
              <th style={{ width: "15%" }}>사업자 이름</th>
              <th style={{ width: "10%" }}>카테고리</th>
              <th style={{ width: "20%" }}>업체 전화번호</th>
              <th style={{ width: "20%" }}>사업자 이메일</th>
              <th style={{ width: "10%" }}>신고 수</th>
              <th style={{ width: "10%" }}>선택</th>
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
                  setDeleteCompany={setDeleteCompany}
                  deleteCompany={deleteCompany}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7">업체가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="del-btn-wrap">
          <button className="member-delBtn" onClick={delCom}>
            업체 탈퇴
          </button>
        </div>
        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </div>
      </div>
      <CompanyInfo
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
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
  const setDeleteCompany = props.setDeleteCompany;
  const deleteCompany = props.deleteCompany;
  const click = (e) => {
    if (e.target.type !== "checkbox") {
      companyData(company);
    }
  };
  const checkBoxClick = (e) => {
    e.stopPropagation();
    const companyNo = company.companyNo;

    if (deleteCompany.includes(companyNo)) {
      setDeleteCompany(deleteCompany.filter((no) => no !== companyNo));
    } else {
      setDeleteCompany([...deleteCompany, companyNo]);
    }
  };
  return (
    <tr className="userInfo" onClick={() => companyData(company)}>
      <td>{company.companyNo}</td>
      <td>{company.companyName}</td>
      {company.memberList.map((c, index) => (
        <td key={"member" + index}>{c.memberName}</td>
      ))}
      <td>{company.companyCategory}</td>
      <td>{company.companyTel}</td>
      <td>{company.companyAddr}</td>
      <td>{company.companyReport}</td>
      <td>
        <input type="checkbox" onClick={checkBoxClick} />
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
            <a>회원을 선택하세요</a>
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
export default CompanyControll;
