package kr.co.iei.consult.model.dto;

import java.sql.Date;
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
@Alias(value = "consult")
public class ConsultDTO {
	private int consultNo;	//상담번호
	private int memberNo;	//회원번호
	private int productNo;	//상품번호
	private Date consultDate;	//진행날짜
	private String consultTime;	//진행시간
	private int contract;	//계약상태 (0:계약전,1:가계약,2:계약완료)
	private String reservation;	//예식예정일
	private String consultTitle;	//상담제목
	private String consultWrite;	//상담내용
	
	//
	private MemberDTO memberDTO;
	private ProductDTO productDTO;
	
	//마이페이지 일정관리 모달에 들어갈 내용
	private String companyNo;
	private CompanyDTO company;
	private int consultType;
}
