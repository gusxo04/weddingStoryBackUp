package kr.co.iei.member.model.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="member")
public class MemberDTO {
	
	private int memberNo;
	private String companyNo;
	private String memberCode;
	private int memberType;
	private String memberId;
	private String memberPw;
	private String memberName;
	private String memberGender;
	private String memberPhone;
	private String memberEmail;
	private String partnerName;
	private String partnerId;
	private Date enrollDate;
}
