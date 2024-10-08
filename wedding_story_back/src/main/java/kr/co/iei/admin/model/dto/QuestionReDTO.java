package kr.co.iei.admin.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="questionRe")
public class QuestionReDTO {
	private int questionReNo;
	private int question_no;
	private String questionReWriter;
	private String questionReContent;
}
