package kr.co.iei.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginMemberDTO {
	private String accessToken;
	private String refreshToken;
	private int memberNo;
	private String memberId;
	private int memberType;
	private String memberCode;
	private String companyNo;
}
