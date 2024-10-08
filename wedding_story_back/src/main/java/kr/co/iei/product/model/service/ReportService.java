package kr.co.iei.product.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.product.model.dao.ReportDao;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ReportDTO;

@Service
public class ReportService {
	@Autowired
	private ReportDao reportDao;
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private CompanyDao companyDao;
	
	
	//신고
	public int insertReport(ReportDTO report, CompanyDTO company, MemberDTO member) {
		int result = reportDao.insertReport(report,company,member);
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

	public MemberDTO selectMemberNo(int memberNo) {
		MemberDTO member = memberDao.selectOneMember(memberNo);
		return member;
	}

	public CompanyDTO selectCompanyNo(int companyNo) {
		CompanyDTO company = companyDao.selectOneCompanyNo(companyNo);
		return company;
	}
	
	
}
