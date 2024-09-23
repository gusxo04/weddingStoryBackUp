import { useState } from "react";
import CompanyJoinFrm from "./CompanyJoinFrm";
import axios from "axios";
import Swal from "sweetalert2";

const CompanyJoin = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [company, setCompany] = useState({
    companyName: "",
    companyTel: "",
    companyAddr: "",
    companyInfo: "",
    companyCategory: "",
    startTime: "",
    endTime: "",
    dayOff: [],
    keyWord: [],
  });
  const [thumbnail, setThumbnail] = useState(null);
  const insertCompany = () => {
    if (
      company.companyName !== "" &&
      company.companyTel !== "" &&
      company.companyInfo !== "" &&
      company.companyCategory !== "" &&
      company.startTime !== "" &&
      company.endTime !== "" &&
      company.keyWord !== null &&
      thumbnail !== null
    ) {
      const form = new FormData();
      form.append("companyName", company.companyName);
      form.append("companyTel", company.companyTel);
      form.append("companyAddr", company.companyAddr);
      form.append("companyInfo", company.companyInfo);
      form.append("companyCategory", company.companyCategory);
      form.append("startTime", company.startTime);
      form.append("endTime", company.endTime);
      if (thumbnail !== null) {
        form.append("companyThumb", thumbnail);
      } //썸네일 있는 경우에만 썸네일 append
      if (company.dayOff !== null) {
        for (let i = 0; i < company.dayOff.length; i++) {
          form.append("dayOff", company.dayOff[i]);
        }
      }

      for (let i = 0; i < company.keyWord.length; i++) {
        form.append("keyWord", company.keyWord[i]);
      }
      axios
        .post(`${backServer}/company`, form, {
          headers: {
            contentType: "multipart/formdate",
            processDate: false,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "입력 오류",
        text: "입력란을 확인해주세요",
        icon: "error",
      });
    }
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          insertCompany();
        }}
      >
        <CompanyJoinFrm
          company={company}
          setCompany={setCompany}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
        />
        <div className="btn-zone">
          <button type="submit">등록 하기</button>
        </div>
      </form>
    </div>
  );
};
export default CompanyJoin;
