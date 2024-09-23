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
	private int noticeNo;//자동생성
	private Integer companyNo;
	private String noticeTitle;//받아야함
	private String noticeContent;//받아야함
	private String noticeDate;
	private int noticeVisible;//받아야함
	private String noticeThumb;
	private String noticeWriter;//받아야함
	private List<NoticeFileDTO> fileList;
}
