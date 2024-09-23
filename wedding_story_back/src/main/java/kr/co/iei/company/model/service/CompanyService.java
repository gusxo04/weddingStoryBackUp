package kr.co.iei.company.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.company.model.dao.CompanyDao;

@Service
public class CompanyService {
	@Autowired
	private CompanyDao companyDao;
}
