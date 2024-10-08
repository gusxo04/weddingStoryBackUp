package kr.co.iei.company.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.advertisement.model.dao.AdvertisementDao;
import kr.co.iei.advertisement.model.dto.AdvertisementDTO;
import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.company.model.dto.CompanyPayDTO;
import kr.co.iei.company.model.dto.CounselDTO;
import kr.co.iei.company.model.dto.CustomerDTO;
import kr.co.iei.company.model.dto.KeyWordDTO;
import kr.co.iei.consult.model.dao.ConsultDao;
import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.product.model.dao.ProductDao;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ProductFileDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class CompanyService {
	@Autowired
	private CompanyDao companyDao;
	
	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private AdvertisementDao advertisementDao;
	
	@Autowired
	private ConsultDao consultDao;
	
	
	@Autowired
	private PageUtil pageUtil; 

	//업체 등록 
	@Transactional
	public String insertCompany(CompanyDTO company, KeyWordDTO keyWord, MemberDTO member) {
		int lastCompanyNo = memberDao.checkLastCompanyNo();
		String companyNo = "";
		//업체번호 최신꺼 조회후 다음번호 생성 
		if(lastCompanyNo<9) {
			companyNo = "C000"+(lastCompanyNo+1);
			company.setCompanyNo(companyNo);
		}else if(lastCompanyNo<99) {
			companyNo = "C00"+(lastCompanyNo+1);
			company.setCompanyNo(companyNo);
		}else if(lastCompanyNo<999) {
			companyNo = "C0"+(lastCompanyNo+1);
			company.setCompanyNo(companyNo);
		}else if(lastCompanyNo<9999) {
			companyNo = "C"+(lastCompanyNo+1);
			company.setCompanyNo(companyNo);
		}
		int companyResult = companyDao.insertCompany(company);
		//생성한 업체번호 키워드에 등록
		keyWord.setCompanyNo(company.getCompanyNo());
		
		int keyWordResult = companyDao.insertKeyWord(keyWord);
		int updateCompanyNo = memberDao.updateCompanyNo(company.getCompanyNo() ,member.getMemberNo());
		
		int resultTotal = companyResult + keyWordResult + updateCompanyNo ;  
		
			
		return companyNo;
	}
	//업체 정보 한개 조회
	public CompanyDTO selectCompanyInfo(String companyNo) {
		CompanyDTO resultCompany = companyDao.selectCompanyInfo(companyNo);
			
		return resultCompany;
	}
	//업체가 상품 등록 
	@Transactional
	public int insertProduct(ProductDTO product, List<ProductFileDTO> productFile) {
		int resultProduct = productDao.insertProduct(product);
		for(ProductFileDTO list : productFile) {//서비스에서 productNo를 부여받음
			list.setProductNo(product.getProductNo());// 리스트에 productNo를 하나씩 넣어줌 
			resultProduct += productDao.insertProductFile(list);//list를 하나씩 DB에 저장 리턴의 결과값을 resultProduct에 더함 
		}
		return resultProduct;
	}
	//업체 정보 수정
	@Transactional
	public int updateCompanyInfo(CompanyDTO company, KeyWordDTO keyWord) {
		int result1 = companyDao.updateCompanyInfo(company);
		int result2 = companyDao.updateCompanyKeyWord(keyWord);	
		int totalResult= result1 + result2;
		return totalResult;
	}
	
//	public String selectCompanyNo(int loginNo) {
//		String result = memberDao.selectCompanyNo(loginNo);
//		return result;
//	}
	//상품등록 페이지 이동시 업체 카테고리 조회
	public String selectCategory(String companyNo) {
		String result = companyDao.selectCategory(companyNo);
		return result;
	}
	
	//페이징 리스트 list , 페이지 목록 생성 
	public Map productList(int reqPage, String companyNo) {
		/*게시물 조회 및 페이징에 필요한 데이터를 모두 취합*/
		int numPerPage = 1; //한 페이지당 게시물 수
		int pageNaviSize = 1; //페이지 네비 길이
		int totalPage = productDao.productTotalCount(companyNo); //게시물 갯수 count(*) 조회
		 
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalPage);//pageUtil을 사용하여 페이지 갯수 생성
		List list = productDao.selectProductList(companyNo,pi);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		
		return map;
	}
	
	//상품 한개 정보 조회 
	public Map selectOneProduct(int productNo) {
		ProductDTO product = productDao.selectProduct(productNo);
		List file = productDao.selectProductFile(productNo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("product", product);
		map.put("thumbsFile", file);
		return map;
	}
	
	//상품 정보 수정
	@Transactional
	public int updateProductInfo(ProductDTO product, List<ProductFileDTO> productFile, List<Object> delThumbsFile) {
		//상품정보 수정
		int result = productDao.updateProductInfo(product);
		if(result > 0) {
			//파일 삭제 로직 
			if(delThumbsFile != null) {
				result += productDao.deleteThumbnails(delThumbsFile);
				
			}
			for(ProductFileDTO list : productFile) {//서비스에서 productNo를 부여받음
				result += productDao.insertProductFile(list);//list를 하나씩 DB에 저장 리턴의 결과값을 resultProduct에 더함 
			}
			int updateTotal = delThumbsFile == null 
					? 1 + productFile.size() : 1 + productFile.size() + delThumbsFile.size();
			if(result == updateTotal) {
				return result;
			}
		}
		return 0;
	}
	//상품 목록 삭제
	@Transactional
	public Map deleteProduct(int productNo) {
		

		List img = productDao.selectProductImg(productNo);
		List thumbs = productDao.selectProductFile(productNo);

		Map<String, List<String>> deleteFile = new HashMap<String, List<String>>();
		deleteFile.put("img",img);
		deleteFile.put("thumbs", thumbs);
		int result = productDao.deleteProduct(productNo);
		int fileResult = productDao.deleteProductFile(productNo);
		int totalResult = result + fileResult;
		if(totalResult >1) {
			
			return deleteFile;
		}else {
			return null;
		}
		
	}
	
	//고객 관리 리스트 
	public Map selectProductNo(String companyNo, int reqPage) {
		//업체 코드로 게시물 번호 조회
		List productNo = productDao.selectProductNo(companyNo);
		//조회한 게시물 번호로 구매한 회원 정보 조회
		
		int totalPage = 0;
		int numPerPage = 20; //한 페이지당 게시물 수
		int pageNaviSize = 1; //페이지 네비 길이
		totalPage += productDao.TotalCustomerCount(productNo); //게시물 갯수 count(*) 조회
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalPage);//pageUtil을 사용하여 페이지 갯수 생성
		List<CustomerDTO> result = productDao.selectCustomerList(productNo,pi);
		Map<String, Object> list = new HashMap<String, Object>();
		list.put("customer", result);
		list.put("pi",pi);
		
		return list;
	}
	
	//광고요청 등록
	@Transactional
	public int insertAdvertisement(AdvertisementDTO advert) {
		int result = advertisementDao.insertAdvertisement(advert);
		return result;
	}
		
	//광고요청 리스트
	public Map selectAdvertisement(String companyNo, int reqPage) {
		/*게시물 조회 및 페이징에 필요한 데이터를 모두 취합*/
		int numPerPage = 10; //한 페이지당 게시물 수
		int pageNaviSize = 1; //페이지 네비 길이
		int totalPage = advertisementDao.totalCount(companyNo); //게시물 갯수 count(*) 조회
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalPage);//pageUtil을 사용하여 페이지 갯수 생성
		List<AdvertisementDTO> advert = advertisementDao.selectAdvertisementList(pi,companyNo);
		Map<String,Object> list = new HashMap<String, Object>();
		System.out.println(advert);
		list.put("advert", advert);
		list.put("pi",pi);
		return list;
	}
	
	//진행 일정 리스트
	public Map selectCounselList(String companyNo, int reqPage) {
		List productNo = productDao.selectProductNo(companyNo);
		
		int totalPage = 0;
		int numPerPage = 10; //한 페이지당 게시물 수
		int pageNaviSize = 1; //페이지 네비 길이
		totalPage  += productDao.totalCounselCount(productNo);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalPage);
		List<CounselDTO> counsel = productDao.totalCounselList(pi,productNo);
		Map<String, Object> list = new HashMap<String, Object>();
		list.put("counsel",counsel);
		list.put("pi",pi);
		
		return list;
	}
	//상담일정 조회 
	public Map selectScheduleList(String companyNo, int reqPage) {
		List productNo = productDao.selectProductNo(companyNo);
		
		
		int totalPage = 0;
		int numPerPage = 10; //한 페이지당 게시물 수
		int pageNaviSize = 1; //페이지 네비 길이
		totalPage  += consultDao.totalConsultCount(productNo);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalPage);
		
		List consult = consultDao.selectConsultList(productNo,pi);
		Map<String, Object> list = new HashMap<String, Object>();
		list.put("consult",consult);
		list.put("pi",pi);
		System.out.println(list);
		return list;
	}
	//광고 등록 페이지 업체번호 조회
	public List selectAdvertProductNo(String companyNo) {
		
		List productNo = productDao.selectAdvertProductNo(companyNo);
		
		return productNo;
	}
	
	//광고 결제 정보 등록
	@Transactional
	public int insertCompanyPayDate(CompanyPayDTO companyPay) {
		int result = companyDao.insertCompanyPayDate(companyPay);
		if(result > 0) {
			result += advertisementDao.updateAdvertisement(companyPay.getAdvertisementNo());
			return result;
		}else {
			return 0;
		}
		
		
	}
	public List<MemberPayDTO> selectSalesData(String companyNo) {
		List<MemberPayDTO> memberPay = memberDao.selectSalesData(companyNo);
		
		
		return null;
	}
	


	
}
