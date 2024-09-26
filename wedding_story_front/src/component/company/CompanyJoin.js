import { useState } from "react";
import CompanyJoinFrm from "./CompanyJoinFrm";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";

const CompanyJoin = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  console.log(loginNo);
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
      form.append("memberNo", loginNo);
      if (thumbnail !== null) {
        form.append("thumbFile", thumbnail); //썸네일은 스프링에서 String 타입으로 받는게 아닌 multipartFile 로 받는다.
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
        .post(`${backServer}/company/join`, form, {
          headers: {
            contentType: "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data === true) {
            Swal.fire({
              title: "등록성공",
              text: "업체 등록에 성공하였습니다.",
              icon: "success",
              timer: 5000,
            }).then(() => {
              navigate("/company");
            });
          }
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
