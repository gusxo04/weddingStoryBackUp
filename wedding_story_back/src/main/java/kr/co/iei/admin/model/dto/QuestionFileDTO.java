package kr.co.iei.admin.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="questionFile")
public class QuestionFileDTO {
	private int questionFileNo;
	private int questionNo;
	private String filename;
	private String filepath;
}
