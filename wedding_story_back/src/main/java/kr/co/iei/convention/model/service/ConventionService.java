package kr.co.iei.convention.model.service;



import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.iei.convention.model.dao.ConventionDao;
import kr.co.iei.convention.model.dto.CancelRequest;
import kr.co.iei.convention.model.dto.ConventionDTO;
import kr.co.iei.convention.model.dto.ConventionMemberDTO;
import kr.co.iei.convention.model.dto.RefundRequest;
import kr.co.iei.member.model.dto.MemberPayDTO;

@Service
public class ConventionService {

    @Autowired
    private ConventionDao conventionDao;

    @Autowired
    private RestTemplate restTemplate;

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

    @Transactional
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

    @Transactional
    public boolean updateConvention(ConventionDTO convention) {
        return conventionDao.updateConvention(convention);
        
    }

    public MemberPayDTO getPayment(int memberNo, int conventionNo) {
        return conventionDao.selectPayment(memberNo, conventionNo);
    }

    @Transactional
    public Boolean refundPayment(RefundRequest request) {
        String accessToken = getAccessToken();
        String code = cancelPayment(accessToken, request);
        int result = -2;
        if(code.equals("0")){
            result = conventionDao.updateMemberPayKind(request);
            result += conventionDao.deleteConventionMember(request);
            result += conventionDao.updateMemberPay(request); 
        }
        return result == 3;
    }

    private String getAccessToken() {
        // 토큰 발급받는 코드
        String clientId = "0054761064210788";
        String clientSecret = "kzLRR2Iatp4DqnWs05I1lb4JQvhSmFs1xhV8s9UJQa6DkoBvdhnZfwZzry3KgYHrNcXggHVxNdmTEitq";
        
        String tokenUrl = "https://api.iamport.kr/users/getToken";

        String tokenRequest = "imp_key=" + clientId + "&imp_secret=" + clientSecret;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<String> entity = new HttpEntity<>(tokenRequest, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, entity, String.class);

        String responseBody = response.getBody();
        System.out.println("token test"+responseBody);
        ObjectMapper om = new ObjectMapper();
        String accessToken = "";
        try {
            JsonNode jsonNode = om.readTree(responseBody);
            JsonNode responseObject = jsonNode.get("response");
            accessToken = responseObject.get("access_token").asText();
            System.out.println("파싱 토큰임 : "+accessToken);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        // String accessToken = responseBody.substring(responseBody.indexOf("access_token\":\"") + 15, responseBody.indexOf("\",\"now"));
        // accessToken = accessToken.replaceAll("\"", "");
        return accessToken;
    }

    private String cancelPayment(String accessToken, RefundRequest request) {


        String cancelUrl = "https://api.iamport.kr/payments/cancel";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        // CancelRequest cancelRequest = new CancelRequest();
        // cancelRequest.setReason(request.getReason());
        // cancelRequest.setAmount(request.getCancelRequestAmount());
        // cancelRequest.setMerchant_uid(request.getMerchantUid());

        Map<String, Object> cancelRequest = new HashMap<>();
        cancelRequest.put("merchant_uid", request.getMerchantUid());
        cancelRequest.put("amount", request.getCancelRequestAmount());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(cancelRequest, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(cancelUrl, entity, String.class);
        System.out.println("response 에요!!! : "+response.getBody());
        ObjectMapper om = new ObjectMapper();
        String code = "-1";
		try {
            JsonNode json = om.readTree(response.getBody());
            code = json.get("code").asText();
		} catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
			e.printStackTrace();
		}
        System.out.println("code : "+code);
        
        return code;
    }


}
