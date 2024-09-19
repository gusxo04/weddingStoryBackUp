package kr.co.iei.member.model.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "memberPay")
public class MemberPayDTO {

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
  
}
