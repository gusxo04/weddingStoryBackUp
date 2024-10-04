import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { refundPay } from "./mypageRefund";

const MyPayment = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const setNowPath = props.setNowPath;
  setNowPath("payment");
  const [activeButton, setActiveButton] = useState("all");
  const memberNo = useRecoilValue(loginNoState);
  const [paymentList, setPaymentList] = useState([]);
  console.log(paymentList);

  const stateChange = (e) => {
    setActiveButton(e.target.name);
  };

  useEffect(() => {
    axios
      .get(`${backServer}/member/paymentList/${memberNo}/${activeButton}`)
      .then((res) => {
        setPaymentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [memberNo, activeButton]);
  return (
    <div className="mypage-payment-wrap">
      <div>
        <div className="mypage-payment-state">
          <div className={`${activeButton === "all" ? "stateHere" : ""}`}>
            <button name="all" onClick={stateChange}>
              전체
            </button>
          </div>
          <div className={`${activeButton === "payment" ? "stateHere" : ""}`}>
            <button name="payment" onClick={stateChange}>
              결제 완료
            </button>
          </div>
          <div className={`${activeButton === "complet" ? "stateHere" : ""}`}>
            <button name="complet" onClick={stateChange}>
              이용 완료
            </button>
          </div>
          <div className={`${activeButton === "cancel" ? "stateHere" : ""}`}>
            <button name="cancel" onClick={stateChange}>
              결제 취소
            </button>
          </div>
        </div>
        <div className="mypage-payment-list">
          {paymentList.map((pay) => {
            return (
              <table className="paymentList-tbl">
                <tbody>
                  <tr key={pay} className="payment-title">
                    <td colSpan="4">
                      <div>
                        <h3>{pay.payDate}</h3>
                      </div>
                    </td>
                  </tr>
                  <tr className="payment-info">
                    <td style={{ width: "15%" }}>
                      <Link to="#">
                        <div className="payment-productImg">
                          <img src={`${pay.product.productImg}`} />
                        </div>
                      </Link>
                    </td>
                    <td className="payment-info-text" style={{ width: "50%" }}>
                      <span>{`${
                        pay.progress === 3
                          ? "이용 완료"
                          : pay.progress === 2
                          ? "결제 취소"
                          : "결제 완료"
                      }`}</span>
                      <Link to="">
                        <h4>
                          {" "}
                          {pay.companyName !== null
                            ? "[ " + `${pay.companyName}` + " ]"
                            : "[ 웨딩스토리 ]"}{" "}
                          {pay.product.productName}
                        </h4>
                      </Link>
                      <p>이용일 : {pay.progressDate}</p>
                    </td>
                    <td className="payment-info-price" style={{ width: "15%" }}>
                      {pay.payPrice.toLocaleString()}원
                    </td>
                    <td
                      className="payment-info-btnBox"
                      style={{ width: "20%" }}
                    >
                      <div>
                        {pay.progress === 3 ? (
                          <button>후기작성</button>
                        ) : pay.progress === 2 ? (
                          "취소완료"
                        ) : (
                          <button
                            onClick={() =>
                              Swal.fire({
                                text: "환불 요청하시겠습니까?",
                                icon: "question",
                                showCancelButton: true,
                                cancelButtonText: "취소",
                                confirmButtonText: "확인",
                              }).then((res) => {
                                if (res.isConfirmed) {
                                  refundPay(
                                    memberNo,
                                    pay.companyNo,
                                    pay,
                                    "",
                                    -1
                                  );
                                }
                              })
                            }
                          >
                            환불요청
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MyPayment;
