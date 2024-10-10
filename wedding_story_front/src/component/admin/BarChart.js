import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [sales, setSales] = useState([]);
	const year = new Date().getFullYear();

	useEffect(() => {
		axios
			.get(`${backServer}/admin/getAdSales`)
			.then((res) => {
				console.log("광고값은" + res.data);
				if (res.data) {
					console.log(res.data);
					setSales(res.data);
				} else {
					console.error("데이터 없음");
				}
			})
			.catch((err) => {
				console.error(err);
				console.log("조회 에러");
			});
	}, [backServer]);
	const data = {
		labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		datasets: [
			{
				label: "광고매출",
				data: sales,
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "광고 매출",
			},
		},
	};

	return <Bar data={data} options={options} />;
};

export default BarChart;
