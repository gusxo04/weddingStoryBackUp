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

import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.company.model.dto.KeyWordDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
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
		System.out.println("service"+member);
		int updateCompanyNo = memberDao.updateCompanyNo(company.getCompanyNo() ,member.getMemberNo());
		
		int resultTotal = companyResult + keyWordResult + updateCompanyNo ;  
		System.out.println(resultTotal);
		
			
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
		System.out.println(product);
		for(ProductFileDTO list : productFile) {//서비스에서 productNo를 부여받음
			System.out.println(list);
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
		int numPerPage = 10; //한 페이지당 게시물 수
		int pageNaviSize = 5; //페이지 네비 길이
		int totalPage = productDao.TotalCount(); //게시물 갯수 count(*) 조회
		 
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalPage);//pageUtil을 사용하여 페이지 갯수 생성
		System.out.println("service pi : " + pi);
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
				System.out.println("service1212 : "+delThumbsFile);
				result += productDao.deleteThumbnails(delThumbsFile);
				
			}
			System.out.println("service + list : "+ productFile);
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
	@Transactional
	public Map deleteProduct(int productNo) {
		

		String img = productDao.selectProductImg(productNo);
		List thumbs = productDao.selectProductFile(productNo);

		Map<String, Object> deleteFile = new HashMap<String, Object>();
		deleteFile.put("img", img);
		deleteFile.put("thumbs", thumbs);
		System.out.println(deleteFile);
		int result = productDao.deleteProduct(productNo);
		int fileResult = productDao.deleteProductFile(productNo);
		int totalResult = result + fileResult;
		if(totalResult >1) {
			
			return deleteFile;
		}else {
			return null;
		}
		
	}
	


	
}
