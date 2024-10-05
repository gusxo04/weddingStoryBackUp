package kr.co.iei.product.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.product.model.dto.ReportDTO;

@Mapper
public interface ReportDao {

	int insertReport(ReportDTO report);

	ReportDTO getReportId(int reportNo);

	int deleteReport(int reportNo);

	List<ReportDTO> getReport(String currentCompanyNo);

}
