import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";

const NoticeFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const memberType = useRecoilState(memberTypeState);
  const noticeTitle = props.noticeTitle;
  const setNoticeTitle = props.setNoticeTitle;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;
  const noticeFile = props.noticeFile;
  const setNoticeFile = props.setNoticeFile;
  const noticeVisible = props.noticeVisible;
  const setNoticeVisible = props.setNoticeVisible;

  //수정인경우에 추가로 전송되는 데이터
  const noticeThumb = props.noticeThumb;
  const setNoticeThumb = props.setNoticeThumb;
  const fileList = props.fileList;
  const setFileList = props.setFileList;
  const delNoticeFileNo = props.delNoticeFileNo;
  const setDelNoticeFileNo = props.setDelNoticeFileNo;
  const companyNo = props.companyNo;
  const setCompanyNo = props.setCompanyNo;

  const thumbnailRef = useRef(null);
  //썸네일 미리보기용 state(데이터전송하지 않음)
  const [noticeImg, setNoticeImg] = useState(null);

  console.log(loginId + "로그인 아이디");
  //썸네일 이미지 첨부파일이 변경되면 동작할 함수
  const changeThumbnail = (e) => {
    //요소들이 겹쳐있는 상태에서 해당 요소를 선택할 때는 currentTarget(target을사용하면 여러요소가 한번에 선택)
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] !== 0) {
      //썸네일 파일 객체를 글작성 시 전송하기위한 값 저장
      setThumbnail(files[0]);
      //화면에 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setNoticeImg(reader.result);
      };
    } else {
      setThumbnail(null);
      setNoticeImg(null);
    }
  };

  //첨부파일 화면에 띄울 state
  const [showNoticeFile, setShowNoticeFile] = useState([]);

  const setNoticeVisibleChange = (event) => {
    const value = event.target.value;
    console.log("value: " + value);
    setNoticeVisible(value);
  };

  //첨부파일 추가시 동작할 함수
  const addNoticeFile = (e) => {
    const files = e.currentTarget.files;
    const fileArr = new Array(); //글작성 시 전송할 파일 배열
    const filenameArr = new Array(); //화면에 노출시킬 파일이름 배열
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
      filenameArr.push(files[i].name);
    }
    setNoticeFile([...noticeFile, ...fileArr]);
    setShowNoticeFile([...showNoticeFile, ...filenameArr]);
  };
  return (
    <div>
      <div className="notice-thumb-wrap">
        {noticeImg ? (
          <img
            className="notice-thumb"
            src={noticeImg}
            onClick={() => {
              thumbnailRef.current.click();
            }}
          />
        ) : noticeThumb ? (
          <img
            src={`${backServer}/notice/thumb/${noticeThumb}`}
            onClick={() => {
              thumbnailRef.current.click();
            }}
          />
        ) : (
          <img
            src="/image/default_img.png"
            onClick={() => {
              thumbnailRef.current.click();
            }}
          ></img>
        )}
        <input
          ref={thumbnailRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={changeThumbnail}
        ></input>
      </div>
      <div className="notice-info-wrap">
        <table className="tbl">
          <tbody>
            <tr>
              <th style={{ width: "30%" }}>
                <label htmlFor="noticeTitle">제목</label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text"
                    id="noticeTitle"
                    name="noticeTitle"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)} // 수정된 부분
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>작성자</th>
              <td className="left">
                <div className="input-item">
                  <a id="loginId" name="loginId">
                    {loginId}
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <th>파일</th>
              <td className="left">
                <div className="input-item">
                  <input
                    type="file"
                    id="noticeFile"
                    onChange={addNoticeFile}
                    multiple
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>공개여부</th>
              <td className="left">
                <div className="input-item">
                  <select
                    value={noticeVisible}
                    onChange={setNoticeVisibleChange}
                  >
                    <option value={"1"}>모든업체</option>
                    <option value={"2"}>특정업체</option>
                    <option value={"3"}>관리자끼리만</option>
                  </select>
                </div>
              </td>
            </tr>
            {noticeVisible === "2" && ( // 특정 업체 선택 시 텍스트 입력 필드 표시
              <tr>
                <th>업체 코드</th>
                <td className="left">
                  <div className="input-item">
                    <input
                      type="text"
                      value={companyNo}
                      onChange={(e) => setCompanyNo(e.target.value)}
                      placeholder="업체 코드 입력"
                    />
                  </div>
                </td>
              </tr>
            )}

            <tr>
              <th>첨부파일 목록</th>
              <td>
                <div className="notice-file-wrap">
                  {fileList
                    ? fileList.map((noticeFile, i) => {
                        const deleteFile = () => {
                          const newFileList = fileList.filter((item) => {
                            return item !== noticeFile;
                          });
                          setFileList(newFileList); //화면에 반영
                          //Controller로 전송하기위해서 배열에 추가
                          setDelNoticeFileNo([
                            ...delNoticeFileNo,
                            noticeFile.noticeFileNo,
                          ]);
                        };
                        return (
                          <p key={"oldFile-" + i}>
                            <span className="filename">
                              {noticeFile.filename}
                            </span>
                            <span
                              className="material-icons del-file-icon"
                              onClick={deleteFile}
                            >
                              delete
                            </span>
                          </p>
                        );
                      })
                    : ""}
                  {showNoticeFile.map((filename, i) => {
                    const deleteFile = () => {
                      noticeFile.splice(i, 1);
                      setNoticeFile([...noticeFile]);
                      showNoticeFile.splice(i, 1);
                      setShowNoticeFile([...showNoticeFile]);
                    };
                    return (
                      <p key={"newFile-" + i}>
                        <span className="filename">{filename}</span>
                        <span
                          className="material-icons del-file-icon"
                          onClick={deleteFile}
                        >
                          delete
                        </span>
                      </p>
                    );
                  })}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoticeFrm;
