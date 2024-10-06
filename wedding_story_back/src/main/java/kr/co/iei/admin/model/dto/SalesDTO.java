package kr.co.iei.admin.model.dto;

import org.apache.ibatis.type.Alias;

import kr.co.iei.company.model.dto.CompanyDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="sales")
public class SalesDTO {
	private Integer sales;
	private CompanyDTO company;
}
