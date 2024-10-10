const Data = () => {
	//월별 광고 수익
	axios
		.get(`${backServer}/admin/advertisementPay/${selectedYear}`)
		.then((res) => {
			if (res.data) {
				setData(res.data); // 응답 데이터 설정
			}
		})
		.catch((err) => {
			console.error(err);
		});
};
export default Data;
