import { useEffect, useState } from "react";
import CompanyJoinFrm from "./CompanyJoinFrm";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { companyNoState, loginNoState } from "../utils/RecoilData";

const CompanyJoin = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  const [companyName, setCompanyName] = useState("");
  const [companyTel, setCompanyTel] = useState("");
  const [companyAddr, setCompanyAddr] = useState("");
  const [companyInfo, setCompanyInfo] = useState("");
  const [companyCategory, setCompanyCategory] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dayOff, setDayOff] = useState([]);
  const [keyWord, setKeyWord] = useState([]);

  const [thumbnail, setThumbnail] = useState(null);

  const insertCompany = () => {
    if (
      companyName !== "" &&
      companyTel !== "" &&
      companyInfo !== "" &&
      companyCategory !== "" &&
      startTime !== "" &&
      endTime !== "" &&
      keyWord !== null &&
      thumbnail !== null
    ) {
      const form = new FormData();
      form.append("companyName", companyName);
      form.append("companyTel", companyTel);
      form.append("companyAddr", companyAddr);
      form.append("companyInfo", companyInfo);
      form.append("companyCategory", companyCategory);
      form.append("startTime", startTime);
      form.append("endTime", endTime);
      form.append("memberNo", loginNo);
      if (thumbnail !== null) {
        form.append("thumbFile", thumbnail); //썸네일은 스프링에서 String 타입으로 받는게 아닌 multipartFile 로 받는다.
      } //썸네일 있는 경우에만 썸네일 append
      if (dayOff !== null) {
        for (let i = 0; i < dayOff.length; i++) {
          form.append("dayOff", dayOff[i]);
        }
      }

      for (let i = 0; i < keyWord.length; i++) {
        form.append("keyWord", keyWord[i]);
      }
      axios
        .post(`${backServer}/company/join`, form, {
          headers: {
            contentType: "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          setCompanyNo(res.data);
          Swal.fire({
            title: "등록성공",
            text: "업체 등록에 성공하였습니다.",
            icon: "success",
            timer: 5000,
          }).then(() => {
            navigate("/company");
          });
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
  console.log(companyNo);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          insertCompany();
        }}
      >
        <CompanyJoinFrm
          companyName={companyName}
          setCompanyName={setCompanyName}
          companyTel={companyTel}
          setCompanyTel={setCompanyTel}
          companyAddr={companyAddr}
          setCompanyAddr={setCompanyAddr}
          companyInfo={companyInfo}
          setCompanyInfo={setCompanyInfo}
          companyCategory={companyCategory}
          setCompanyCategory={setCompanyCategory}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          dayOff={dayOff}
          setDayOff={setDayOff}
          keyWord={keyWord}
          setKeyWord={setKeyWord}
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
