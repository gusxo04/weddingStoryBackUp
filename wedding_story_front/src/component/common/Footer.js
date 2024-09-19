import { Link } from "react-router-dom";
import "./common.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <div className="footer-logo">
            <img src="/image/main_logo.png" />
          </div>
          <div className="footer-link">
            <ul>
              <li>
                <Link to="#">회사 소개</Link>
              </li>
              <li>
                <span>|</span>
              </li>
              <li>
                <Link to="#">개인정보 처리 방침</Link>
              </li>
              <li>
                <span>|</span>
              </li>
              <li>
                <Link to="#">사이트 이용 약관</Link>
              </li>
              <li>
                <span>|</span>
              </li>
              <li>
                <Link to="#">오시는 길</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-info">
          <p>
            (주) 웨딩 스토리 | 대표 : 김정성 | 사업자 등록번호 : 618-1234-56789
            | 주소 : 서울 영등포구 선유동2로 57 이레빌딩
          </p>
        </div>
        <div className="footer-cs">
          <p>고객센터 02-4153-3449 | 월요일 ~ 일요일 09시 ~ 18시 </p>
          <div className="cs-link">
            <Link to="#">
              <img src="/image/kakao.png"></img>
            </Link>
            <Link to="#">
              <img src="/image/insta.png"></img>
            </Link>
            <Link to="#">
              <img src="/image/blog.png"></img>
            </Link>
            <Link to="#">
              <img src="/image/youtube.png"></img>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
