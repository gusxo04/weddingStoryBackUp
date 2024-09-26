package kr.co.iei.company.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.company.model.dto.KeyWordDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.product.model.dao.ProductDao;
import kr.co.iei.product.model.dto.ProductDTO;

@Service
public class CompanyService {
	@Autowired
	private CompanyDao companyDao;
	
	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private ProductDao productDao;

	//업체 등록 
	@Transactional
	public int insertCompany(CompanyDTO company, KeyWordDTO keyWord, MemberDTO member) {
		int lastCompanyNo = memberDao.checkLastCompanyNo();
		if(lastCompanyNo<9) {
			String companyNo = "C000"+(lastCompanyNo+1);
			company.setCompanyNo(companyNo);
		}else if(lastCompanyNo<99) {
			String companyNo = "C00"+(lastCompanyNo+1);
			company.setCompanyNo(companyNo);
		}else if(lastCompanyNo<999) {
			String companyNo = "C0"+(lastCompanyNo+1);
			company.setCompanyNo(companyNo);
		}else if(lastCompanyNo<9999) {
			String companyNo = "C"+(lastCompanyNo+1);
			company.setCompanyNo(companyNo);
		}
		System.out.println("service"+company);
		int companyResult = companyDao.insertCompany(company);
		
		keyWord.setCompanyNo(company.getCompanyNo());
		
		int keyWordResult = companyDao.insertKeyWord(keyWord);
		System.out.println("service"+member);
		int updateCompanyNo = memberDao.updateCompanyNo(company.getCompanyNo() ,member.getMemberNo());
		
		int resultTotal = companyResult + keyWordResult + updateCompanyNo ;  
		System.out.println(resultTotal);
		
			
		return resultTotal;
	}
	//업체 정보 한개 조회
	public CompanyDTO selectCompanyInfo(String companyNo) {
		CompanyDTO resultCompany = companyDao.selectCompanyInfo(companyNo);
			
		return resultCompany;
	}
	//업체가 상품 등록 
	public int insertProduct(ProductDTO product) {
		int resultProduct = productDao.insertProduct(product);
		return resultProduct;
	}


	
}
