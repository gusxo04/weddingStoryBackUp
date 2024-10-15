import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CompanyProductFrm from "./CompanyProductFrm";
import { companyNoState } from "../utils/RecoilData";
import { useNavigate, useParams } from "react-router-dom";
import ToastEditor from "../utils/ToastEditor";
import Swal from "sweetalert2";

const CompanyProductUpdate = () => {
	const params = useParams();
	const productNo = params.productNo;
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const navigate = useNavigate();
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [productName, setProductName] = useState("");
	const [productContent, setProductContent] = useState("");
	const [productImg, setProductImg] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productThumb, setProductThumb] = useState(Array(10).fill(null));
	const [coronation, setCoronation] = useState("");
	const [diningRoom, setDiningRoom] = useState("");
	const [numberPeople, setNumberPeople] = useState("");
	const [companyCategory, setCompanyCategory] = useState("");
	const [delThumbsFile, setDelThumbsFile] = useState([null]);
	useEffect(() => {
		axios
			.get(`${backServer}/company/product/${productNo}`)
			.then((res) => {
				setProductName(res.data.product.productName);
				setProductContent(res.data.product.productContent);
				setProductImg(res.data.product.productImg);
				setProductPrice(res.data.product.productPrice);
				setProductThumb((prevData) => {
					return [...res.data.thumbsFile, ...prevData.slice(res.data.thumbsFile.length)];
				});

				setCoronation(res.data.product.coronation);
				setDiningRoom(res.data.product.diningRoom);
				setNumberPeople(res.data.product.numberPeople);
				setCompanyCategory(res.data.product.companyCategory);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [companyNo]);
	const updateProduct = () => {
		const form = new FormData();
		if (productName !== "" && productPrice !== "" && productContent !== null) {
			if (companyCategory === "웨딩홀") {
				if (coronation !== "" && diningRoom !== "" && numberPeople !== "") {
					form.append("coronation", coronation);
					form.append("diningRoom", diningRoom);
					form.append("numberPeople", numberPeople);
				}
			}
			form.append("productNo", productNo);
			form.append("companyNo", companyNo);
			form.append("productName", productName);
			form.append("productPrice", productPrice);
			form.append("productContent", productContent);
			form.append("companyCategory", companyCategory);
			form.append("thumbFile", productImg);
			for (let i = 0; i < productThumb.length; i++) {
				form.append("thumbnailFiles", productThumb[i]);
			}
			for (let i = 0; i < delThumbsFile.length; i++) {
				form.append("delThumbsFile", delThumbsFile[i]);
			}
			axios
				.patch(`${backServer}/company/product`, form, {
					headers: {
						contentType: "multipart/form-data",
					},
				})
				.then((res) => {
					Swal.fire({
						title: "수정완료",
						text: "정보를 변경하였습니다.",
						icon: "success",
					}).then(() => {
						navigate("/company/product/list");
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			Swal.fire({
				title: "정보입력 오류",
				text: "정보를 모두 입력해주세요",
				icon: "error",
			});
		}
	};

	return (
		<div className="companyProduct-main">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					updateProduct();
				}}
			>
				<CompanyProductFrm
					productName={productName}
					setProductName={setProductName}
					productImg={productImg}
					setProductImg={setProductImg}
					productPrice={productPrice}
					setProductPrice={setProductPrice}
					productContent={productContent}
					setProductContent={setProductContent}
					productThumb={productThumb}
					setProductThumb={setProductThumb}
					coronation={coronation}
					setCoronation={setCoronation}
					diningRoom={diningRoom}
					setDiningRoom={setDiningRoom}
					numberPeople={numberPeople}
					setNumberPeople={setNumberPeople}
					companyCategory={companyCategory}
					delThumbsFile={delThumbsFile}
					setDelThumbsFile={setDelThumbsFile}
				/>

				<div className="btn-zone">
					<button type="submit">수정 하기</button>
				</div>
			</form>
		</div>
	);
};

export default CompanyProductUpdate;
