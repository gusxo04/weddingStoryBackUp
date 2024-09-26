package kr.co.iei.convention.controller;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.convention.model.dto.ConventionCommentDTO;
import kr.co.iei.convention.model.dto.ConventionDTO;
import kr.co.iei.convention.model.dto.ConventionMemberDTO;
import kr.co.iei.convention.model.dto.RefundRequest;
import kr.co.iei.convention.model.service.ConventionService;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.util.FileUtils;
import org.springframework.web.bind.annotation.RequestBody;

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
        if (convention == null) {
            return ResponseEntity.ok(null);
        }
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

    @GetMapping("/layout")
    public ResponseEntity<Map> layput() {
        Map map = conventionService.selectConventionSeat();
        return ResponseEntity.ok(map);

    }

    @PostMapping("/write")
    public ResponseEntity<Boolean> writeConvention(@ModelAttribute ConventionDTO convention,
            @ModelAttribute MultipartFile image) {
        // System.out.println(convention);
        // System.out.println(image);
        if (image != null) {
            String savepath = root + "/convention/";
            String filepath = fileUtils.upload(savepath, image);
            convention.setConventionImg(filepath);
        }

        boolean result = conventionService.insertConvention(convention);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/buy")
    public ResponseEntity<Boolean> conventionMemberPay(@ModelAttribute ConventionMemberDTO conventionMember, @ModelAttribute MemberPayDTO memberPay) {
        boolean result = conventionService.conventionMemberPay(conventionMember, memberPay);

        System.out.println(conventionMember); // 넘어온 데이터 -> memberNo, memberEmail(알림받을)
        System.out.println(memberPay); // 넘어온 데이터 -> progressDate, payPrice, merchantUid
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{conventionNo}")
    public ResponseEntity<ConventionDTO> getConvention(@PathVariable int conventionNo) {
        ConventionDTO conventionDTO = conventionService.selectOneConvention(conventionNo);
        return ResponseEntity.ok(conventionDTO);
    }

    @PatchMapping("/update")
    public ResponseEntity<Boolean> updateConvention(@ModelAttribute ConventionDTO convention,
            @ModelAttribute MultipartFile image) {

        if (image != null) {
            String savepath = root + "/convention/";
            String filepath = fileUtils.upload(savepath, image);
            convention.setConventionImg(filepath);
        }
        boolean result = conventionService.updateConvention(convention);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/payment/{memberNo}/{conventionNo}")
    public ResponseEntity<MemberPayDTO> getPayment(@PathVariable int memberNo, @PathVariable int conventionNo) {
        MemberPayDTO memberPay = conventionService.getPayment(memberNo, conventionNo);
        return ResponseEntity.ok(memberPay);

    }

    @PostMapping("/refund")
    public ResponseEntity<Boolean> refundConventionTicket(@RequestBody RefundRequest request) {
        // System.out.println(request); 
        Boolean result = conventionService.refundPayment(request);
        return ResponseEntity.ok(result);
    }


    // 박람회 댓글 조회
    @GetMapping("/comment/{conventionNo}")
    public ResponseEntity<Map> getConventionComment(@PathVariable int conventionNo) {
        Map<String, List> map = conventionService.selectConventionComments(conventionNo);
        return ResponseEntity.ok(map);
    }
    
    
    //박람회 댓글 작성
    @PostMapping("/comment")
    public ResponseEntity<Boolean> writeComment(@ModelAttribute ConventionCommentDTO conventionComment) {
        Boolean result = conventionService.insertconventionComment(conventionComment);
        
        return ResponseEntity.ok(result);
    }
    

    @PostMapping("/reComment")
    public ResponseEntity<Boolean> writeReComment(@ModelAttribute ConventionCommentDTO conventionComment) {
        Boolean result = conventionService.insertconventionComment(conventionComment);
        return ResponseEntity.ok(result);
    }
    

}
