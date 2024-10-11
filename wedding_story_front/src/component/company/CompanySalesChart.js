import axios from "axios";
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { companyNoState } from "../utils/RecoilData";

const CompanySalesChart = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const companyNo = useRecoilValue(companyNoState);
	const [price, setPrice] = useState(Array(12));
	useEffect(() => {
		axios
			.get(`${backServer}/company/sales/${companyNo}`)
			.then((res) => {
				setPrice(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	/*----chart.js 라이브러리 */
	const chartRef = useRef(null);
	let chartInstance = null;

	useEffect(() => {
		const ctx = chartRef.current.getContext("2d");

		const createChart = () => {
			Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);
			chartInstance = new Chart(ctx, {
				type: "line",
				data: {
					labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
					datasets: [
						{
							label: "월별 매출액",
							data: [
								price[1],
								price[2],
								price[3],
								price[4],
								price[5],
								price[6],
								price[7],
								price[8],
								price[9],
								price[10],
								price[11],
								price[12],
							],
							borderColor: "rgba(255, 99, 132, 1)",
							backgroundColor: "rgba(255, 99, 132, 0.2)",
							pointRadius: 5, // 포인트 크기
							pointBackgroundColor: "rgba(255, 99, 132, 1)", // 포인트 배경색
							pointBorderColor: "rgba(255, 255, 255, 1)", // 포인트 테두리 색
							pointHoverRadius: 7, // 호버 시 포인트 크기
							pointHoverBackgroundColor: "rgba(255, 99, 132, 1)", // 호버 시 포인트 배경색
							pointHoverBorderColor: "rgba(255, 255, 255, 1)", // 호버 시 포인트 테두리 색
							fill: false, // 라인 그래프에서 영역 채우기 비활성화
						},
					],
				},
				options: {
					scales: {
						x: {
							display: true,
						},
						y: {
							beginAtZero: true,
							max: 10000, // 최대값 설정
						},
					},
				},
			});
		};

		const destroyChart = () => {
			if (chartInstance) {
				chartInstance.destroy();
				chartInstance = null;
			}
		};

		const initializeChart = () => {
			destroyChart(); // 이전 차트 파괴
			createChart(); // 새로운 차트 생성
		};

		// 컴포넌트가 처음 렌더링될 때 차트 초기화
		initializeChart();

		// 컴포넌트가 unmount될 때 차트 파괴
		return () => {
			destroyChart();
		};
	}, [price]);

	return (
		<section className="section">
			<div className="list-wrap">
				<div className="list-title">매출 현황</div>

				<div className="product-list-wrap">
					<div>
						<canvas ref={chartRef} />
					</div>
				</div>
			</div>
		</section>
	);
};
export default CompanySalesChart;
