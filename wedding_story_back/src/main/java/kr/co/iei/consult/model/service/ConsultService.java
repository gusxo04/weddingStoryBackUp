package kr.co.iei.consult.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.consult.model.dao.ConsultDao;

@Service
public class ConsultService {
	
	@Autowired
	private ConsultDao consultDao;
}
