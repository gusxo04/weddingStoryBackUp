package kr.co.iei.convention.model.service;



import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public boolean insertConvention(ConventionDTO convention) {

        // SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        // String conventionStartStr = sdf.format(convention.getConventionStart());
        // String conventionEndStr = sdf.format(convention.getConventionEnd());
        // Date conventionStartDate = Date.valueOf(conventionStartStr);
        // Date conventionEndDate = Date.valueOf(conventionEndStr);
        // convention.setConventionStart(conventionStartDate);
        // convention.setConventionEnd(conventionEndDate);
        // 아니 이거 안 해도 되는건데 뭐임..1시간 가까이 개고생했네
        boolean result = conventionDao.insertConvention(convention);
        return result;
    }
}
