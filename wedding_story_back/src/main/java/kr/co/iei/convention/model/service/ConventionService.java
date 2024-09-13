package kr.co.iei.convention.model.service;


import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.convention.model.dao.ConventionDao;
import kr.co.iei.convention.model.dto.ConventionDTO;

@Service
public class ConventionService {

    @Autowired
    private ConventionDao conventionDao;

    public ConventionDTO getTime() {
        ConventionDTO conventionDate = conventionDao.getTime();
        return conventionDate;
    }
}
