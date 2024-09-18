import React from "react";
import "./sales.css";
import { Data } from "./Data"; // Data import
import SalesChart from "./SalesChart"; // Chart 컴포넌트 import

const Sales = () => {
  const years = Object.keys(Data);
  const salesData = years.map((year) => {
    return Object.values(Data[year]).map((month) => month.sales);
  });

  const labels = [...Array(12).keys()].map((i) => `${i + 1}월`); // 1월 ~ 12월

  // 데이터를 Chart 컴포넌트에 전달
  const chartData = {
    labels: labels,
    datasets: years.map((year, index) => ({
      label: `${year}년`,
      data: salesData[index],
      fill: false,
      borderColor:
        index === 0 ? "rgba(75, 192, 192, 1)" : "rgba(153, 102, 255, 1)",
      tension: 0.1,
    })),
  };

  return (
    <div>
      <h3>매출</h3>
      <SalesChart data={chartData} /> {/* Chart에 데이터 전달 */}
    </div>
  );
};

export default Sales;
