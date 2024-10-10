import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
	const [sales, setSales] = useState([]);
	const company = props.selectedCompany;
	const backServer = process.env.REACT_APP_BACK_SERVER;

	useEffect(() => {
		axios
			.get(`${backServer}/company/getAdPay/${company}`)
			.then((res) => {
				console.log(res.data);
				setSales(res.data.sales);
			})
			.catch((err) => {
				console.log(err);
				console.log("광고 거절 에러");
			});
	}, [company]);

	const [data, setData] = useState({
		labels: ["Red", "Blue", "Yellow"],
		datasets: [
			{
				label: "My First Dataset",
				data: [300, 50, 100],
				backgroundColor: sales.map((sales, index) => `rgba(${(index + 1) * 50}, ${(index + 1) * 30}, 100, 0.5)`),
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
				borderWidth: 1,
			},
		],
	});

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Pie Chart Example",
			},
		},
	};

	return <Pie data={data} options={options} />;
};

export default PieChart;
