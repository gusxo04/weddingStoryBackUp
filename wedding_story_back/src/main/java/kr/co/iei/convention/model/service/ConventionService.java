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

import kr.co.iei.company.model.dto.CompanyPayDTO;
import kr.co.iei.convention.model.dao.ConventionDao;
import kr.co.iei.convention.model.dto.ConventionCommentDTO;
import kr.co.iei.convention.model.dto.ConventionCompanyDTO;
import kr.co.iei.convention.model.dto.ConventionDTO;
import kr.co.iei.convention.model.dto.ConventionMemberDTO;
import kr.co.iei.convention.model.dto.ConventionSeatDTO;
import kr.co.iei.convention.model.dto.RefundRequest;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;

@Service
public class ConventionService {

    @Autowired
    private ConventionDao conventionDao;

    @Autowired
    private RestTemplate restTemplate;


    private final String restApi = "0054761064210788";
    private final String restApiSecret = "kzLRR2Iatp4DqnWs05I1lb4JQvhSmFs1xhV8s9UJQa6DkoBvdhnZfwZzry3KgYHrNcXggHVxNdmTEitq";
    
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
        System.out.println("박람회 등록 : "+result);
        return result;
    }

    
	public MemberDTO selectMemberInfo(int memberNo) {
        MemberDTO memberDTO = conventionDao.selectMemberInfo(memberNo);
        return memberDTO;
	}

    @Transactional
    public boolean conventionMemberPay(ConventionMemberDTO conventionMember, MemberPayDTO memberPay) {
        //티켓 코드 생성
        Random random = new Random();
        conventionMember.setTicketCode("");
        while(true){
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

            //티켓코드 중복체크
            ConventionMemberDTO checkTicket = conventionDao.checkTicketDupelicate(conventionMember);
            if(checkTicket == null){
                break;
            }
            else{
                conventionMember.setTicketCode("");
            }
                
        }
        
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

    

    public Map<String, List> selectConventionComments(int conventionNo) {
        List commentList = conventionDao.selectConventionCommentList(conventionNo);
        List reCommentList = conventionDao.selectConventionReCommentList(conventionNo);
        Map<String, List> commentMap = new HashMap<>();
        commentMap.put("commentList", commentList);
        commentMap.put("reCommentList", reCommentList);
        return commentMap;
    }

    @Transactional
    public Boolean insertconventionComment(ConventionCommentDTO conventionComment) {
        int result = conventionDao.insertConventionComment(conventionComment);
        return result == 1;
    }

    @Transactional
    public Boolean deleteConventionComment(int conventionCommentNo) {
        int result = conventionDao.deleteConventionComment(conventionCommentNo);
        return result == 1;
    }

    @Transactional
    public Boolean updateConventionComment(ConventionCommentDTO conventionComment) {
        int result = conventionDao.updateConventionComment(conventionComment);
        return result == 1;
    }

    @Transactional
	public boolean conventionCompanyPay(ConventionCompanyDTO conventionCompany, CompanyPayDTO companyPay) {
        int result = conventionDao.insertConventionCompany(conventionCompany);
        if(result > 0){
            result += conventionDao.insertCompanyPay(companyPay);
        }
        return result == 2;
	}




    // 환불 기능 메서드 2개 
    private String getAccessToken() {
        // 토큰 발급받는 코드
        String clientId = restApi;
        String clientSecret = restApiSecret;
        
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

    @Transactional
    public boolean updateSeatInfo(ConventionSeatDTO conventionSeat) {
        int result = conventionDao.updateSeatInfo(conventionSeat);
        return result == 1;
    }





    


}
