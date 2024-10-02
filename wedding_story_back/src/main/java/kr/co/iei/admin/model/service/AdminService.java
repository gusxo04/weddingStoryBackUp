package kr.co.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dao.NoticeDao;
import kr.co.iei.advertisement.model.dao.AdvertisementDao;
import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class AdminService {

	@Autowired
	private AdminDao adminDao;

	@Autowired
	private MemberDao memberDao;

	@Autowired
	private CompanyDao companyDao;

	@Autowired
	private NoticeDao noticeDao;
	
	@Autowired
	private AdvertisementDao advertisementDao;

	@Autowired
	private PageUtil pageUtil;

	public Map getMemberList(int reqPage) {
		int numPerPage = 5;
		int pageNaviSize = 5;
		int totalCount = memberDao.adminTotalCount();// 일반회원 총 카운트
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = memberDao.getMemberList(pi);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}

	public Map getCompanyList(int reqPage) {
		int numPerPage = 5;
		int pageNaviSize = 5;
		int totalCount = companyDao.adminTotalCount();// 일반회원 총 카운트
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List<CompanyDTO> companyList = companyDao.getCompanyList(pi);

		for (CompanyDTO company : companyList) {
			List memberList = memberDao.selectCompanyContainList(company.getCompanyNo());
//			System.err.println("사업자 조회를 위한 companyNo"+company.getCompanyNo());
			company.setMemberList(memberList);
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", companyList);
		map.put("pi", pi);
		return map;
	}

	public MemberDTO getPartner(int myNo, String myCode) {
		MemberDTO partner = memberDao.getPartner(myNo, myCode);
		return partner;
	}

	public int delete(int memberNo) {
		int del = memberDao.delete(memberNo);
		return del;
	}

	public int deleteCom(String companyNo) {
		int del = companyDao.deleteCom(companyNo);
		return del;
	}

	public int refuseAd(String loginId, String companyNo, String refuse, int adNo) {
		int result1 = noticeDao.refuseAd(loginId, companyNo, refuse);
		int result2 = advertisementDao.refuseAd(adNo);
		int result=0;
		if(result1==1 || result==1) {
			result1=1;
		}
		return result;
	}

	public int insertAdmin(int selectedType, String insertId) {
		int result = memberDao.insertAdmin(selectedType, insertId);
		return result;
	}

}
