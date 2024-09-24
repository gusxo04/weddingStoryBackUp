package kr.co.iei.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface MemberDao {

	int checkId(String checkId);

	int checkCode(String checkCode);

	int adminTotalCount();

	List getMemberList(PageInfo pi);

	List selectCompanyContainList(String companyNo);


	

}
