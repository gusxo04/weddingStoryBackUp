package kr.co.iei.company.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.company.model.dto.KeyWordDTO;

@Service
public class CompanyService {
	@Autowired
	private CompanyDao companyDao;

	@Transactional
	public int insertCompany(CompanyDTO company, KeyWordDTO keyWord) {
		int companyResult = companyDao.insertCompany(company);
		int keyWordResult = companyDao.insertKeyWord(keyWord);
		
		int resultTotal = companyResult + keyWordResult ;  
		
			
		return resultTotal;
	}
}
