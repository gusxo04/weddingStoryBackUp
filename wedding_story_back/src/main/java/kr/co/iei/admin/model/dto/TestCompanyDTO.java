package kr.co.iei.admin.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="Testcompany")
public class TestCompanyDTO {
	private String companyCode;
	private String companyName;
	private String Category;
    private String companyPhone;
    private String companyMail;
    private int companyReport;
    
}
