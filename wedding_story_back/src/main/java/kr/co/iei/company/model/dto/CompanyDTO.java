package kr.co.iei.company.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import kr.co.iei.admin.model.dto.SalesDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="company")
public class CompanyDTO {
	private String companyNo;
	private String companyCategory;
	private String companyName;
	private String companyTel;
	private String companyAddr;
	private String companyInfo;
	private String companyThumb;
	private String startTime;
	private String endTime;
	private String companyEnrollDate;
	private String dayOff;
	private int companyReport;
	private int companyState;
	
	
	//업체 멤버 조회
	private List<MemberDTO> memberList;
	
	private String keyWord;
	
	//매출액 조회용
	private List<SalesDTO> salesList;
}
