package kr.co.iei.company.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="companyPay")
public class CompanyPayDTO {

	private int payNo;
	private String companyNo;
	private int conventionNo;
	private int advertisementNo;
	private String payDate;
	private int payPrice;
	private int sellType;
	private int progress;
	private String merchantUid;
	
	private int conventionCompanyNo;
}
