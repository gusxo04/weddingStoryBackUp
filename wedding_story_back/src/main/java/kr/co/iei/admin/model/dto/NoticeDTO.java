package kr.co.iei.admin.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="notice")
public class NoticeDTO {
	private int noticeNo;
	private int companyNo;
	private String noticeTitle;
	private String noticeContent;
	private String noticeDate;
	private int noticeVisible;
	private String noticeThumb;
	private String noticeWriter;
	private List<NoticeFileDTO> fileList;
}
