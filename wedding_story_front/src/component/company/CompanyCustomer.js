import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";
import PageNavi from "../utils/PagiNavi";

const CompanyCustomer = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [reqPage, setReqPage] = useState(1);
	const [customerList, setCustomerList] = useState([]);
	const [pi, setPi] = useState({});
	useEffect(() => {
		axios
			.get(`${backServer}/company/customer/${companyNo}/${reqPage}`)
			.then((res) => {
				console.log(res);
				setCustomerList(res.data.customer);
				setPi(res.data.pi);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [companyNo, reqPage]);
	console.log(customerList);
	return (
		<div>
			<section className="section">
				<div className="list-wrap">
					<div className="list-title">고객관리</div>

					<div className="product-list-wrap">
						<table className="tbl">
							<thead border={1}>
								<tr>
									<th style={{ width: "10%" }}>회원번호</th>
									<th style={{ width: "10%" }}>이름</th>
									<th style={{ width: "10%" }}>성별</th>
									<th style={{ width: "15%" }}>전화번호</th>
									<th style={{ width: "30%" }}>이메일</th>
									<th style={{ width: "10%" }}>배우자이름</th>
								</tr>
							</thead>
							<tbody>
								{customerList.map((customer, index) => {
									return <CustomerItem key={"customer" + index} index={index} customer={customer} />;
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

const CustomerItem = (props) => {
	const customer = props.customer;
	const index = props.index;
	console.log(customer);
	return (
		<tr>
			<th style={{ width: "10%" }}>{customer.memberNo}</th>
			<th style={{ width: "10%" }}>{customer.memberName}</th>
			<th style={{ width: "10%" }}>{customer.memberGender}</th>
			<th style={{ width: "15%" }}>{customer.memberPhone}</th>
			<th style={{ width: "30%" }}>{customer.memberEmail}</th>
			<th style={{ width: "10%" }}>{customer.partnerName}</th>
		</tr>
	);
};

export default CompanyCustomer;
