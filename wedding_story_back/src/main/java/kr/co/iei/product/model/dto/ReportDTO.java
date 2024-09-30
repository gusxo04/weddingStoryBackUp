package kr.co.iei.product.model.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "report")
public class ReportDTO {
	private int reportNo;	//신고번호
	private int memberNo;	//회원번호
	private String companyNo;	//업체번호
	private String reportContent;	//신고내용
	private Date reportDate;	//신고날짜(접수일)
}
