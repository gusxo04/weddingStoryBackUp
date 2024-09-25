package kr.co.iei.company.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.company.model.dto.KeyWordDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface CompanyDao {

	int insertCompany(CompanyDTO company);

	int insertKeyWord(KeyWordDTO keyWord);

	int adminTotalCount();

	List getCompanyList(PageInfo pi);
	CompanyDTO selectCompanyInfo();

	int deleteCom(String companyNo);

}
