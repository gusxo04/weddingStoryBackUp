package kr.co.iei.product.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.product.model.dao.ReportDao;
import kr.co.iei.product.model.dto.ReportDTO;

@Service
public class ReportService {
	@Autowired
	private ReportDao reportDao;

	public int insertReport(ReportDTO report) {
		int result = reportDao.insertReport(report);
		return result;
	}

	public ReportDTO getReportId(int reportNo) {
		ReportDTO report = reportDao.getReportId(reportNo);
		return report;
	}
	
	public int deleteReport(int reportNo) {
		int result = reportDao.deleteReport(reportNo);
		return result;
	}

	public List<ReportDTO> getReport(String currentCompanyNo) {
		List<ReportDTO> report = reportDao.getReport(currentCompanyNo);
		return report;
	}
	
	
}
