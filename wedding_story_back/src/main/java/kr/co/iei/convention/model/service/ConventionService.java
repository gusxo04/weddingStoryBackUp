package kr.co.iei.convention.model.service;



import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.convention.model.dao.ConventionDao;
import kr.co.iei.convention.model.dto.ConventionDTO;
import kr.co.iei.convention.model.dto.ConventionMemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;

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

    public boolean conventionMemberPay(ConventionMemberDTO conventionMember, MemberPayDTO memberPay) {
        //티켓 코드 생성
        Random random = new Random();
        conventionMember.setTicketCode("");
        for(int i = 0; i < 30; i++){
            int randomType = random.nextInt(3);
            if(randomType == 0){
                String randomCode = String.valueOf((char)(random.nextInt(26)+97));
                conventionMember.setTicketCode(conventionMember.getTicketCode() + randomCode);
            }
            else if(randomType == 1){
                String randomCode = String.valueOf((char)(random.nextInt(26)+65));
                conventionMember.setTicketCode(conventionMember.getTicketCode() + randomCode);
            }
            else if(randomType == 2){
                String randomCode = random.nextInt(10) + "";
                conventionMember.setTicketCode(conventionMember.getTicketCode() + randomCode);
            }
        }
        // 이거 두 개는 테스트 데이터임
        conventionMember.setMemberNo(2);
        memberPay.setMemberNo(2);

        // 혹시 티켓코드가 겹칠 수 있으니까 먼저 조회해서 없는지 있는지 판단 후 insert 해야함
        // 
        
        int result = conventionDao.insertConventionMember(conventionMember);
        if(result > 0){
            memberPay.setTicketNo(conventionMember.getTicketNo());
            result += conventionDao.insertMemberPay(memberPay);
        }

        return result == 2;
    }

    public ConventionDTO selectOneConvention(int conventionNo) {
        return conventionDao.selectOneConvention(conventionNo);
    }

    public boolean updateConvention(ConventionDTO convention) {
        return conventionDao.updateConvention(convention);
        
    }




}
