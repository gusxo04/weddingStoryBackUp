package kr.co.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.member.model.dao.MemberDao;
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
	private PageUtil pageUtil;

	public Map getMemberList(int reqPage) {
		int numPerPage = 5;
		int pageNaviSize = 5;
		int totalCount = memberDao.adminTotalCount();//일반회원 총 카운트
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
		int totalCount = companyDao.adminTotalCount();//일반회원 총 카운트
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List<CompanyDTO> companyList = companyDao.getCompanyList(pi);
		
		for(CompanyDTO company : companyList) {
			List memberList = memberDao.selectCompanyContainList(company.getCompanyNo());
			company.setMemberList(memberList);
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", companyList);
		map.put("pi", pi);
		return map;
	}
}
