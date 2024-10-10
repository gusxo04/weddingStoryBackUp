package kr.co.iei.admin.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dao.NoticeDao;
import kr.co.iei.admin.model.dto.QuestionDTO;
import kr.co.iei.admin.model.dto.QuestionFileDTO;
import kr.co.iei.admin.model.dto.QuestionReDTO;
import kr.co.iei.admin.model.dto.SalesDTO;
import kr.co.iei.advertisement.model.dao.AdvertisementDao;
import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.product.model.dao.ProductDao;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ReportDTO;
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
	private ProductDao productDao;

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

	public Map getAdminMemberList(int reqPage) {
		int numPerPage = 5;
		int pageNaviSize = 5;
		int totalCount = memberDao.adminTotalCount2();// 관리자회원 카운트
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = memberDao.getAdminList(pi);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}

	public Map getCompanyList(int reqPage) {
		int numPerPage = 5;
		int pageNaviSize = 5;
		int totalCount = companyDao.adminTotalCount();// 업체 카운트
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
		int result = 0;
		if (result1 ==1 && result2==1 ) {
			result = 1;
		}
		return result;
	}

	public int insertAdmin(int selectedType, String insertId) {
		int result = memberDao.insertAdmin(selectedType, insertId);
		return result;
	}

	public Map getYear() {
		List<MemberPayDTO> year = memberDao.getYear();
		Map map = new HashMap<String, List<MemberPayDTO>>();
		map.put("year", year);
		return map;
	}

	public Map<String, Map<Integer, SalesDTO>> getSales(String selectedYear) {
		Map<String, Map<Integer, SalesDTO>> map = new HashMap<String, Map<Integer, SalesDTO>>();
		Map<Integer, SalesDTO> subMap = new HashMap<Integer, SalesDTO>();
		String month;
		for (int i = 1; i <= 12; i++) {
			if (i < 10) {
				month = "0"+Integer.toString(i);
			} else {
				month=Integer.toString(i);
			}
			SalesDTO sales = productDao.getMontlySales(month, selectedYear);
			if (sales == null) {
	            sales = new SalesDTO(); // sales가 null인 경우 새로운 SalesDTO 인스턴스를 생성
	        } else if (sales.getSales() == null) {
	            sales.setSales(0); // sales 필드가 null인 경우 0으로 설정
	        }
			subMap.put(i, sales);
		}
		map.put(selectedYear, subMap);

		return map;
	}
	public Map<String, Map<Integer, SalesDTO>> getSalesMember(String selectedYear) {
		Map<String, Map<Integer, SalesDTO>> map = new HashMap<String, Map<Integer, SalesDTO>>();
		Map<Integer, SalesDTO> subMap = new HashMap<Integer, SalesDTO>();
		String month;
		for (int i = 1; i <= 12; i++) {
			if (i < 10) {
				month = "0"+Integer.toString(i);
			} else {
				month=Integer.toString(i);
			}
			SalesDTO sales = productDao.getMontlySalesMember(month, selectedYear);
			if (sales == null) {
	            sales = new SalesDTO(); // sales가 null인 경우 새로운 SalesDTO 인스턴스를 생성
	        } else if (sales.getSales() == null) {
	            sales.setSales(0); // sales 필드가 null인 경우 0으로 설정
	        }
			subMap.put(i, sales);
		}
		map.put(selectedYear, subMap);

		return map;
	}
	
	public Map<String, Map<Integer, SalesDTO>> getSalesCompany(String selectedYear) {
		Map<String, Map<Integer, SalesDTO>> map = new HashMap<String, Map<Integer, SalesDTO>>();
		Map<Integer, SalesDTO> subMap = new HashMap<Integer, SalesDTO>();
		String month;
		for (int i = 1; i <= 12; i++) {
			if (i < 10) {
				month = "0"+Integer.toString(i);
			} else {
				month=Integer.toString(i);
			}
			SalesDTO sales = productDao.getMontlySalesCompany(month, selectedYear);
			if (sales == null) {
	            sales = new SalesDTO(); // sales가 null인 경우 새로운 SalesDTO 인스턴스를 생성
	        } else if (sales.getSales() == null) {
	            sales.setSales(0); // sales 필드가 null인 경우 0으로 설정
	        }
			subMap.put(i, sales);
		}
		map.put(selectedYear, subMap);

		return map;
	}
	
	public List getComapnyRank() {
		//1. 각 회사 별로 product no 가 담긴 List 추출
		//해당 상품의 매출들을 다 더해서 sales에 넣음
		//매출이 높은 회사 5개까지만 걸러서 return
		List<CompanyDTO> list = companyDao.getCompanyList2();
		for(CompanyDTO company : list) {
			String companyNo = company.getCompanyNo();
			//회사 코드로 상품 조회
			List<ProductDTO> productList = productDao.selectProductList2(companyNo);
			List<SalesDTO> salesList = new ArrayList<SalesDTO>();
			
			
			for(ProductDTO product : productList) {
				int productNo = product.getProductNo();
				SalesDTO sales = productDao.getCompanySales(productNo);//매출 테이블에서 조회
				if(sales==null) {
					sales.setSales(0);
				}
				System.out.println(product.getCompanyNo()+"의 매출 데이터는"+"sales"+sales);
				salesList.add(sales);
				System.out.println("salesList"+salesList);
			}
			
			company.setSalesList(salesList);
		}
		
		 list.sort((c1, c2) -> {
		        int sales1 = (c1.getSalesList().isEmpty() || c1.getSalesList().get(0) == null) 
		                      ? 0 : c1.getSalesList().get(0).getSales();
		        int sales2 = (c2.getSalesList().isEmpty() || c2.getSalesList().get(0) == null) 
		                      ? 0 : c2.getSalesList().get(0).getSales();
		        return Integer.compare(sales2, sales1); // 내림차순 정렬
		    });
		System.out.println(list);
		return list;
	}

	public int insertQuestion(QuestionDTO question, List<QuestionFileDTO> questionFileList, MemberDTO member) {
		int memberNo = member.getMemberNo();
		
		String questionTitle = question.getQuestionTitle();
		String questionContent=question.getQuestionContent();
		int questionType=question.getQuestionType();
		int result = noticeDao.insertQuestion(questionTitle,questionContent,questionType, memberNo);
		
		int questionNo = noticeDao.getQuestionNo();
		
		for(QuestionFileDTO questionFile : questionFileList) {
			questionFile.setQuestionNo(question.getQuestionNo());
			String filename = questionFile.getFilename();
			String filepath = questionFile.getFilepath();
			result += noticeDao.insertQuestionFile(filename,filepath, questionNo);
		}
		return result;
	}

	public MemberDTO getMember(String loginId) {
		MemberDTO member = memberDao.getMember(loginId);
		return member;
	}

	public Map selectQuestionList(int reqPage) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount;
		
		totalCount = noticeDao.QuestionTotalCount();
		
		
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		
		
		List list = noticeDao.selectQuestionList(pi);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		System.out.println(list);
		
		return map;
	}

	public QuestionDTO getOneQuestion(int questionNo) {
		QuestionDTO question = noticeDao.getOneQuestion(questionNo);
		
		return question;
	}

	public QuestionFileDTO getQuestionFile(int questioinFileNo) {
		QuestionFileDTO questionFile = noticeDao.getQuestionFile(questioinFileNo);
		return questionFile;
	}

	public MemberDTO getMemberNo(int memberNo) {
		MemberDTO member = memberDao.getMemberNo(memberNo);
		return member;
	}

	public int questionRe(String content, String loginIdState, int questionNo) {
		int result=0;
		int result1 = noticeDao.questionRe(content,loginIdState,questionNo);
		if(result1==1) {			
			int result2 = noticeDao.updateQuestionState(questionNo);
			if(result2==1) {
				result=1;
			}
		}
		return result;
	}

	public QuestionReDTO getQuestionRe(int questionNo) {
		QuestionReDTO result = noticeDao.getQuestionRe(questionNo);
		return result;
	}

	public Map myQsList(int reqPage, String loginId) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount;
		
		MemberDTO loginMember = memberDao.getMember(loginId);
		int loginNo = loginNo = loginMember.getMemberNo();
		totalCount = noticeDao.QuestionTotalCountMy(loginNo);
		
		
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		
		int start = pi.getStart();
		int end = pi.getEnd();
		List list = noticeDao.selectQuestionList2(start, end, loginNo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}

	public List<Integer> getAdSales() {
		List<Integer> list = new ArrayList<Integer>();
		String month;
		for (int i = 1; i <= 12; i++) {
			if (i < 10) {
				month = "0"+Integer.toString(i);
			} else {
				month=Integer.toString(i);
			}
			Integer sales = productDao.getAdSales(month);
			if (sales == null) {
	            sales = 0;
	        }
			list.add(sales);
		}
		return list;
	}

	

	

}
