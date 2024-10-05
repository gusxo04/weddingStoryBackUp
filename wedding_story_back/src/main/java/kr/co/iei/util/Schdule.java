package kr.co.iei.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kr.co.iei.convention.model.service.ConventionService;

@Component
public class Schdule {

    @Autowired
    private ConventionService conventionService;

    // @Scheduled(fixedDelay = 10 * 1000)
    // public void test1(){
    // 	// conventionService.testService();
    // }
// 	select member_no, member_email 
// from convention_member 
// where member_email is not null and convention_no = (select max(convention_no) from convention where to_char(convention_start - 3) = to_char(sysdate))
    @Scheduled(cron = "0 0 9 * * *")
    public void sendAlarmTicket() {
        //박람회 알림받을 이메일 설정한 사람들 알림 보내기
        conventionService.sendTicketEmail();
    }

		// @Scheduled(fixedDelay = 30 * 1000)
    @Scheduled(cron = "0 0 9 * * *")
    public void updateProgress() {
        conventionService.updateMemberPayStartProgress();
				try {
					Thread.sleep(3000);
				} catch (InterruptedException e) {
						e.printStackTrace();
				}

				conventionService.selectMemberPayEndProgress();
				
    }

}
