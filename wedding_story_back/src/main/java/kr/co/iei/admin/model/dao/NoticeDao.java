package kr.co.iei.admin.model.dao;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.admin.model.dto.NoticeDTO;
import kr.co.iei.admin.model.dto.NoticeFileDTO;
import kr.co.iei.admin.model.dto.QuestionDTO;
import kr.co.iei.admin.model.dto.QuestionFileDTO;
import kr.co.iei.member.model.dto.MemberDTO;
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

	int refuseAd(String loginId, String companyNo, String refuse);

	NoticeFileDTO getNoticeFile(int noticeFileNo);

	int updateNotice(NoticeDTO notice);

	List<NoticeFileDTO> selectNoticeFile(int[] delNoticeFileNo);

	int deleteNoticeFile(int[] delNoticeFileNo);


	int insertQuestion(String questionTitle, String questionContent, int questionType, int memberNo);
	
	int getQuestionNo();

	int insertQuestionFile(String filename, String filepath, int questionNo);

	int QuestionTotalCount();

	List selectQuestionList(PageInfo pi);

	QuestionDTO getOneQuestion(int questionNo);

	QuestionFileDTO getQuestionFile(int questioinFileNo);

}
