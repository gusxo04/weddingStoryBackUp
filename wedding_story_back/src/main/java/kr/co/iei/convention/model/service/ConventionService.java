package kr.co.iei.convention.model.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public Map selectConventionSeat() {
        Map<String, Object> map = new HashMap<String, Object>();
        for(int i = 0; i < 3; i++){
            List list = conventionDao.selectConventionSeat(i);
            map.put("line"+i, list);
        }
        return map;
    }
}
