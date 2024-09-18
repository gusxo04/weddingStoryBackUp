import React from "react";
import "./sales.css";
import { Data } from "./Data"; // Data import
import SalesChart from "./SalesChart"; // Chart 컴포넌트 import

const Sales = () => {
  const years = Object.keys(Data);
  //Data에서 객체의 key(년도)를 배열로 저장>>차트 레이블
  //예를 들어, Data가 { 2020: {...}, 2021: {...} }라면, years는 ["2020", "2021"]

  const salesData = years.map((year) => {
    //첫번째 map >> years 배열 순회 >> years배열의 각 요소를 year변수로 받음

    return Object.values(Data[year]).map((month) => month.sales);
    //년도 > 월 추출, sales 데이터에 접근하여 월별 매출
    //Object.values(Data[year])는 현재 year에 해당하는 데이터를 배열로 반환
  });

  //차트에 전달할 데이터 설정
  const chartData = {
    labels: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    datasets: years.map((year, index) => ({
      //각 년도별 데이터셋
      label: `${year}년`, //각 데이터셋의 레이블을 해당 년도로 설정
      data: salesData[index], //각 년도에 대한 월별 매출 데이터를 data 필드에 저장
      fill: false, //라인 차트의 영역을 채우지 않도록 설정
      borderColor:
        index === 0 ? "rgba(75, 192, 192, 1)" : "rgba(153, 102, 255, 1)",
      tension: 0,
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
