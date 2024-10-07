package kr.co.iei.company.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="counsel")
public class CounselDTO {
	private int memberNo;
	private String memberName;
	private String memberPhone;
	private int productNo;
	private String productName;
	private String payDate;
	private int progress;

}
