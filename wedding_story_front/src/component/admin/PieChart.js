// PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js에 필요한 구성 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
	// 차트 데이터
	const data = {
		labels: ["Red", "Blue", "Yellow", "Green"],
		datasets: [
			{
				label: "# of Votes",
				data: [12, 19, 3, 5],
				backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
				borderWidth: 1,
			},
		],
	};

	// 차트 옵션
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
