package kr.co.iei.company.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.company.model.dto.KeyWordDTO;

@Mapper
public interface CompanyDao {

	int insertCompany(CompanyDTO company);

	int insertKeyWord(KeyWordDTO keyWord);

	CompanyDTO selectCompanyInfo();

}
