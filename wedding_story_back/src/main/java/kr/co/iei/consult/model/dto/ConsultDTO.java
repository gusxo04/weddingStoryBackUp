package kr.co.iei.consult.model.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

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
	private Date reservation;	//예식예정일
	private String consultTitle;	//상담제목
	private String consultWriter;	//상담내용
}
