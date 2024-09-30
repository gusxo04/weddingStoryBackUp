package kr.co.iei.admin.model.dao;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.admin.model.dto.NoticeDTO;
import kr.co.iei.admin.model.dto.NoticeFileDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface NoticeDao {

	int totalCount();

	List selectNoticeList(PageInfo pi);

	int insertNotice(NoticeDTO notice);

	int insertNoticeFile(NoticeFileDTO noticeFile);

	NoticeDTO selectOneNotice(int noticeNo);

	List<NoticeFileDTO> selectOneNoticeFile(int noticeNo);

	NoticeDTO selectNextNotice(int noticeNo);

	NoticeDTO selectPreNotice(int noticeNo);

}
