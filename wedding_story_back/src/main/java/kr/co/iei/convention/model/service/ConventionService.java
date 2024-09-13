package kr.co.iei.convention.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.convention.model.dao.ConventionDao;

@Service
public class ConventionService {

    @Autowired
    private ConventionDao conventionDao;
}
