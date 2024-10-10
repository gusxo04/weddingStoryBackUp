import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";
import PageNavi from "../utils/PagiNavi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CompanyProductList = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [productList, setProductList] = useState([]); //조회한 리스트 결과가 들어갈 state
	const [reqPage, setReqPage] = useState(1); //페이지 시작 번호
	const [pi, setPi] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${backServer}/company/list/${companyNo}/${reqPage}`)
			.then((res) => {
				console.log(res);
				setProductList(res.data.list);
				setPi(res.data.pi);
				console.log(res.data.pi);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [companyNo, reqPage]);

	return (
		<div>
			<section className="section">
				<div className="list-wrap">
					<div className="list-title">상품 목록</div>
					<Link to={"/company/product/insert"}>
						<button>글쓰기</button>
					</Link>
					<div className="product-list-wrap">
						<table className="tbl">
							<thead border={1}>
								<tr>
									<th style={{ width: "10%" }}>상품번호</th>
									<th style={{ width: "50%" }}>상품명</th>
									<th style={{ width: "20%" }}>상품 가격</th>
									<th colSpan={2} style={{ width: "20%" }}>
										상태
									</th>
								</tr>
							</thead>
							<tbody>
								{productList.map((product, index) => {
									return (
										<ProductItem
											key={"product" + index}
											product={product}
											index={index}
											backServer={backServer}
											navigate={navigate}
											productList={productList}
											setProductList={setProductList}
										/>
									);
								})}
							</tbody>
						</table>
						<div className="product-page-wrap">
							<PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

const ProductItem = (props) => {
	const product = props.product;
	const index = props.index;
	const backServer = props.backServer;
	const navigate = props.navigate;
	const productList = props.productList;
	const setProductList = props.setProductList;
	const deleteProduct = (item) => {
		console.log(item);
		Swal.fire({
			title: "상품 삭제",
			text: "상품을 삭제하시겠습니까?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "승인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.value) {
				// result.value로 변경
				axios
					.delete(`${backServer}/company/product/${product.productNo}`)
					.then((res) => {
						console.log(res);
						Swal.fire({
							title: "삭제완료",
							text: "삭제가 정상적으로 완료되었습니다.",
							icon: "success",
						}).then(() => {
							const UpdateProductList = productList.filter((item) => item.productNo !== product.productNo);
							console.log(UpdateProductList);
							setProductList(UpdateProductList);
						});
					})
					.catch((err) => {
						console.log(err);
						Swal.fire({
							title: "삭제 실패",
							text: "상품 삭제에 실패했습니다.",
							icon: "error",
						});
					});
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				// 취소 버튼을 누른 경우 처리
				Swal.fire("취소됨", "상품 삭제가 취소되었습니다.", "info");
			}
		});
	};
	return (
		<tr>
			<td style={{ width: "10%" }}>{product.productNo}</td>
			<td style={{ width: "50%" }}>{product.productName}</td>
			<td style={{ width: "20%" }}>{product.productPrice.toLocaleString()} 원</td>
			<td style={{ width: "10%" }}>
				<Link to={`/company/product/update/${product.productNo}`}>
					<button className="update">수정</button>
				</Link>
			</td>
			<td style={{ width: "10%" }}>
				<button
					onClick={() => {
						deleteProduct(product);
					}}
				>
					삭제
				</button>
			</td>
		</tr>
	);
};

export default CompanyProductList;
