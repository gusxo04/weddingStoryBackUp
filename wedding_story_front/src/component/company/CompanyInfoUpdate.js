import { useEffect, useState } from "react";
import CompanyJoinFrm from "./CompanyJoinFrm";
import axios from "axios";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";
import CompanyInfo from "./CompanyInfo";

const CompanyInfoUpdate = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  const [company, setCompany] = useState({
    companyAddr: "",
    companyCategory: "",
    companyInfo: "",
    companyName: "",
    companyTel: "",
    companyThumb: "",
    startTime: "",
    endTime: "",
    dayOff: [],
    keyWord: [],
  });

  useEffect(() => {
    axios
      .get(`${backServer}/company/${companyNo}`)
      .then((res) => {
        console.log(res);
        setCompany(res.data);
        console.log(company);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [companyNo]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <CompanyJoinFrm
          company={company}
          setCompany={setCompany}
          companyNo={companyNo}
        />
        <div className="btn-zone">
          <button type="submit">등록 하기</button>
        </div>
      </form>
    </div>
  );
};

export default CompanyInfoUpdate;
