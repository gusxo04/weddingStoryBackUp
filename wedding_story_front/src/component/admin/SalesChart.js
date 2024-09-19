import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Chart.js 기본 스케일 등록
Chart.register(...registerables);

const SalesChart = ({ data }) => {
  return (
    <div>
      <Line data={data} />
    </div>
  );
};
export default SalesChart;
