import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import CompanyProductFrm from "./CompanyProductFrm";
import { companyNoState } from "../utils/RecoilData";
import { useParams } from "react-router-dom";

const CompanyProductUpdate = () => {
  const params = useParams();
  const productNo = params.productNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  useEffect(() => {
    axios
      .get(`${backServer}/company/product/${productNo}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [companyNo]);

  return (
    <div className="companyProduct-main">
      sdsdsd
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <CompanyProductFrm />
        <div className="btn-zone">
          <button type="submit">등록 하기</button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProductUpdate;
