package kr.co.iei.admin.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="question")
public class QuestionDTO {
	private int questionNo;
	private int memberNo;
	private String questionTitle;
	private String questionContent;
	private int questionState;
	private int questionType;
	private int productCommentNo;
	private List<QuestionFileDTO> fileList;
}
