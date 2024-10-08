package kr.co.iei.advertisement.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.product.model.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="advertisement")
public class AdvertisementDTO {
	private int advertisementNo;
	private String companyNo;
	private int adRank;
	private String adStart;
	private String adEnd;
	private String adRequestDate;
	private String adRequest;
	private int advertisementState;
	private int productNo;
	private String productName;
	private CompanyDTO company;
	
}
