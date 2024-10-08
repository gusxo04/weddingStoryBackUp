package kr.co.iei.product.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ReportDTO;

@Mapper
public interface ReportDao {
	//신고
	int insertReport(ReportDTO report, CompanyDTO company, MemberDTO member);

	ReportDTO getReportId(int reportNo);

	int deleteReport(int reportNo);

	List<ReportDTO> getReport(String currentCompanyNo);

}
