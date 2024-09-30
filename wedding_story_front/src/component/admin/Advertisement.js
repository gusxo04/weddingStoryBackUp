import React, { useEffect, useState } from "react";
import "./advertisement.css";
import axios from "axios";
const Advertisement = () => {
  const [Advertisement, setAdvertisement] = useState([]);
  const [activeAd, setActiveAd] = useState([]); //광고중

  const [adend, setAdend] = useState([]); //광고 종료

  const [adyet, setAdyet] = useState([]); //광고 대기

  const [adwait, setAdwait] = useState([]);

  const backServer = process.env.REACT_APP_BACK_SERVER;

  useEffect(() => {
    axios
      .get(`${backServer}/advertisement/advertisement`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setActiveAd(Object.values(res.data.activeAd));
          setAdend(Object.values(res.data.endAd));
          setAdyet(Object.values(res.data.yetAd));
          setAdwait(Object.values(res.data.waitAd));
        } else {
          console.log("진행중인 광고 없음");
          setActiveAd([]);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("진행중인 광고 조회 에러");
        setActiveAd([]);
      });
  }, []);

  return (
    <div className="advertisement-wrap">
      <div className="page-title">
        <h2>광고</h2>
      </div>
      <div className="in-progress">
        <h3 style={{ float: "left", marginBottom: "10px" }}>진행중</h3>
        <table className="tbl ad-tbl">
          <thead>
            <tr>
              <td>업체 이름</td>
              <td>상품 이름</td>
              <td>광고 시작</td>
              <td>광고 종료</td>
              <td>수정</td>
            </tr>
          </thead>
          <tbody>
            <InProgress activeAd={activeAd} setActiveAd={setActiveAd} />
          </tbody>
        </table>
      </div>

      <div className="upComing">
        <h3 style={{ float: "left", marginBottom: "10px" }}>광고예정</h3>
        <table className="tbl ad-tbl">
          <thead>
            <tr>
              <td>업체 이름</td>
              <td>상품 이름</td>
              <td>광고 시작</td>
              <td>광고 종료</td>
              <td>수정</td>
            </tr>
          </thead>
          <tbody>
            <Upcomming adyet={adyet} setAdyet={setAdyet} />
          </tbody>
        </table>
      </div>

      <div className="upComing">
        <h3 style={{ float: "left", marginBottom: "10px" }}>승인대기</h3>
        <table className="tbl ad-tbl">
          <thead>
            <tr>
              <td>업체 이름</td>
              <td>상품 이름</td>
              <td>광고 시작</td>
              <td>광고 종료</td>
              <td>수정</td>
            </tr>
          </thead>
          <tbody>
            <PendingApproval adwait={adwait} setAdwait={setAdwait} />
          </tbody>
        </table>
      </div>

      <div className="ended">
        <h3 style={{ float: "left", marginBottom: "10px" }}>종료</h3>
        <table className="tbl ad-tbl">
          <thead>
            <tr>
              <td>업체 이름</td>
              <td>상품 이름</td>
              <td>광고 시작</td>
              <td>광고 종료</td>
            </tr>
          </thead>
          <tbody>
            <End adend={adend} setAdend={setAdend} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const InProgress = (props) => {
  const activeAd = props.activeAd;
  return (
    <>
      {activeAd.length > 0 ? (
        activeAd.map((ad) => (
          <tr key={ad.advertisementNo}>
            <td>{ad.company.companyName}</td>
            <td>{ad.adRank}</td>
            <td>
              <input datatype="date" value={"{ad.adStart}"}></input>
            </td>
            <td>{ad.adEnd}</td>
            <td>
              <button>수정</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5">업체가 없습니다.</td>
        </tr>
      )}
    </>
  );
};

const PendingApproval = (props) => {
  const adwait = props.adwait;
  const setAdwait = props.adWait;
  return (
    <>
      {adwait.length > 0 ? (
        adwait.map((ad) => (
          <tr key={ad.advertisementNo}>
            <td>{ad.company.companyName}</td>
            <td>{ad.adRank}</td>
            <td>{ad.adStart}</td>
            <td>{ad.adEnd}</td>
            <td>
              <button>수정</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5">업체가 없습니다.</td>
        </tr>
      )}
    </>
  );
};

const Upcomming = (props) => {
  const setAdyet = props.setAdyet;
  const adyet = props.adyet;
  return (
    <>
      {adyet.length > 0 ? (
        adyet.map((ad) => (
          <tr key={ad.advertisementNo}>
            <td>{ad.company.companyName}</td>
            <td>{ad.adRank}</td>
            <td>{ad.adStart}</td>
            <td>{ad.adEnd}</td>
            <td>
              <button>수정</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5">업체가 없습니다.</td>
        </tr>
      )}
    </>
  );
};

const End = (props) => {
  const setAdend = props.setAdend;
  const adend = props.adend;
  return (
    <>
      {adend.length > 0 ? (
        adend.map((ad) => (
          <tr key={ad.advertisementNo}>
            <td>{ad.company.companyName}</td>
            <td>{ad.adRank}</td>
            <td>{ad.adStart}</td>
            <td>{ad.adEnd}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5">업체가 없습니다.</td>
        </tr>
      )}
    </>
  );
};
export default Advertisement;
