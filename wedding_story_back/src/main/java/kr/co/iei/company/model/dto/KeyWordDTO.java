package kr.co.iei.company.model.dto;

import lombok.NoArgsConstructor;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="keyWord")
public class KeyWordDTO {
	private String companyNo;
	private String[] keyWord;
}
