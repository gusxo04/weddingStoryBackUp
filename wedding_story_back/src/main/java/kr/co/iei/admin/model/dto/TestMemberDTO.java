package kr.co.iei.admin.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="TESTmember")
public class TestMemberDTO {
	private int memberNo;
    private String memberId;
    private String memberName;
    private String memberPhone;
    private String memberMail;
    private String memberGender;
    private String memberCode;
}
