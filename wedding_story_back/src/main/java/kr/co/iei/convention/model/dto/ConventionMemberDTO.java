package kr.co.iei.convention.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="conventionMember")
public class ConventionMemberDTO {

    private int ticketNo;
    private int conventionNo;
    private int memberNo;
    private String ticketCode;
    private String memberEmail;
    //이메일은 알림 원하는 회원들만 받으면 됨
    private int ticketCount;
}
