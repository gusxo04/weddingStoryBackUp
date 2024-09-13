package kr.co.iei.convention.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.convention.model.dto.ConventionDTO;
import kr.co.iei.convention.model.service.ConventionService;
import kr.co.iei.util.FileUtils;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@CrossOrigin("*")
@RequestMapping("/convention")
public class ConventionController {

    @Autowired
    private ConventionService conventionService;

    @Autowired
    private FileUtils fileUtils;

    @Value("${file.root}")
    public String root;


    @GetMapping
    public ResponseEntity<Map> conventionMain() {
        LocalDate date = LocalDate.now();
        ConventionDTO convention = conventionService.getTime();
        LocalDate startDate = convention.getConventionStart().toLocalDate();
        LocalDate endDate = convention.getConventionEnd().toLocalDate();
// 만약에 시작날짜랑 현재 날짜랑 뺐을때 0이면 사전 예약 불가니까 신청 버튼 없애야 하고
// 현재 날짜랑 종료날짜랑 뺐을때 0이 아니면 아직 박람회는 진행중이니까 메인에 띄워주긴 해야 함
// 그리고 종료날짜가 지나면 메인에서 없애야 함 (종료 날짜에서 종료시간이 지나도 없애는 건 힘드니까 다음날 없애는 걸로)
        long beforeStart = ChronoUnit.DAYS.between(date, startDate);
        long afterEnd = ChronoUnit.DAYS.between(date, endDate);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("convention", convention);
        map.put("startDate", beforeStart);
        map.put("endDate", afterEnd);
        // startDate는 현재 서버 날짜랑 박람회 시작날짜를 뺀 거
        // endDate는 현재 서버 날짜랑박람회 종료날짜를 뺀 거
        return ResponseEntity.ok(map);
    }
    
    

}
