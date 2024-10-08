package kr.co.iei.admin.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.admin.model.dao.NoticeDao;
import kr.co.iei.admin.model.dto.NoticeDTO;
import kr.co.iei.admin.model.dto.NoticeFileDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class NoticeService {

	@Autowired
	private NoticeDao noticeDao;
	@Autowired
	private PageUtil pageUtil;

	public Map selectNoticeList(int reqPage, int userState) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount;

		if (userState == 0) {
			// 관리자용(전체열람)
			totalCount = noticeDao.totalCount();
			PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			List list = noticeDao.selectNoticeList(pi);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("list", list);
			map.put("pi", pi);
			System.out.println(list);
			return map;

		} else if (userState == 1) {
			// 모든 업체에게
			totalCount = noticeDao.totalCount();
			PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			List list = noticeDao.selectNoticeList(pi);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("list", list);
			map.put("pi", pi);
		} else if (userState == 2) {
			// 특정업체에게
			totalCount = noticeDao.totalCount();
			PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			List list = noticeDao.selectNoticeList(pi);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("list", list);
			map.put("pi", pi);
		} else {
			// 관리자끼리만
			totalCount = noticeDao.totalCount();
			PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			List list = noticeDao.selectNoticeList(pi);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("list", list);
			map.put("pi", pi);
		}
		return null;
	}
	public Map selectNoticeList2(int reqPage, int userState, String companyNo) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount;
		
		totalCount = noticeDao.totalCountCom(companyNo);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		List list = noticeDao.selectNoticeList2(start, end, companyNo);
		System.out.println(list);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		
		return map;
	}
	@Transactional
	public int insertNotice(NoticeDTO notice, List<NoticeFileDTO> noticeFileList) {
		int result = noticeDao.insertNotice(notice);
		for (NoticeFileDTO noticeFile : noticeFileList) {
			noticeFile.setNoticeNo(notice.getNoticeNo());
			result += noticeDao.insertNoticeFile(noticeFile);
		}
		return result;
	}

	public NoticeDTO selectOneNotice(int noticeNo) {
		NoticeDTO notice = noticeDao.selectOneNotice(noticeNo);
		return notice;
	}

	public Map<String, NoticeDTO> selectPreNextNotice(int noticeNo) {
		Map<String, NoticeDTO> map = new HashMap<String, NoticeDTO>();
		NoticeDTO nextNotice = noticeDao.selectNextNotice(noticeNo);

		map.put("nextNotice", nextNotice);

		NoticeDTO preNotice = noticeDao.selectPreNotice(noticeNo);
		map.put("previousNotice", preNotice);

		return map;
	}

	public NoticeFileDTO getNoticeFile(int noticeFileNo) {
		NoticeFileDTO noticeFile = noticeDao.getNoticeFile(noticeFileNo);
		return noticeFile;
	}

	@Transactional
	public List<NoticeFileDTO> updateNotice(NoticeDTO notice, List<NoticeFileDTO> noticeFileList) {
		int result = noticeDao.updateNotice(notice);
		if(result>0) {
			List<NoticeFileDTO> delFileList = new ArrayList<NoticeFileDTO>();
			if(notice.getDelNoticeFileNo() != null) {
				delFileList=noticeDao.selectNoticeFile(notice.getDelNoticeFileNo());
				result += noticeDao.deleteNoticeFile(notice.getDelNoticeFileNo());
			}
			for(NoticeFileDTO noticeFile : noticeFileList) {
				result += noticeDao.insertNoticeFile(noticeFile);
			}
			
			int updateTotal = notice.getDelNoticeFileNo() == null
			?1+noticeFileList.size()
			:1+noticeFileList.size()+notice.getDelNoticeFileNo().length;
			if(result==updateTotal) {
				return delFileList;
			}
		}
		return null;
	}

	

}
