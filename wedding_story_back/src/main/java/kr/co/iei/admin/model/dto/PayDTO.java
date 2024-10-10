package kr.co.iei.admin.model.dto;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.type.Alias;

import kr.co.iei.admin.model.dto.SalesDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.product.model.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "pay")
public class PayDTO {
	private int payNo;
	  private int memberNo;
	  private int productNo;
	  private int ticketNo;
	  private String payDate;
	  private Date progressDate;
	  private String progressTime;
	  private int payPrice;
	  private int progress;
	  private String merchantUid;
	  
	  //결제 내역 조회 시 상품 정보를 띄우기 위하여
	  private ProductDTO product;
	  
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
