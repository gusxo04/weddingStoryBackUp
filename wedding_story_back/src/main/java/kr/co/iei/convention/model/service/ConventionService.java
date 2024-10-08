package kr.co.iei.convention.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import kr.co.iei.util.EmailSender;

@Service
public class ConventionService {

    @Autowired
    private ConventionDao conventionDao;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private EmailSender emailSender;

    // private final String restApi = "0054761064210788";
    // private final String restApiSecret = "kzLRR2Iatp4DqnWs05I1lb4JQvhSmFs1xhV8s9UJQa6DkoBvdhnZfwZzry3KgYHrNcXggHVxNdmTEitq";
    @Value("${restApi}")
    private String restApi;

    @Value("${restApiSecret}")
    private String restApiSecret;
    

    public ConventionDTO getTime() {
        ConventionDTO conventionDate = conventionDao.getTime();
        return conventionDate;
    }

    public Map selectConventionSeat(int searchType) {
        Map<String, Object> map = new HashMap<String, Object>();
        for (int i = 0; i < 3; i++) {
            List list = conventionDao.selectConventionSeat(i, searchType);
            map.put("line" + i, list);
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
        //원래는 삽입하면 1행을 삽입했습니다긴 한데 true로도 값을 받을 수 있음 
        return result;
    }

    public MemberDTO selectMemberInfo(int memberNo) {
        MemberDTO memberDTO = conventionDao.selectMemberInfo(memberNo);
        return memberDTO;
    }

    @Transactional
    public boolean conventionMemberPay(ConventionMemberDTO conventionMember, MemberPayDTO memberPay, int conventionLimit) {
        //티켓 코드 생성
        ConventionMemberDTO conventionMemberDTO = conventionDao.checkConventionLimit(conventionMember.getConventionNo());
        // System.out.println(conventionMemberDTO);
        if(conventionMemberDTO.getTicketCount() >= conventionLimit) return false;
        
        Random random = new Random();
        conventionMember.setTicketCode("");
        while (true) {
            for (int i = 0; i < 30; i++) {
                int randomType = random.nextInt(3);
                if (randomType == 0) {
                    String randomCode = String.valueOf((char) (random.nextInt(26) + 97));
                    conventionMember.setTicketCode(conventionMember.getTicketCode() + randomCode);
                } else if (randomType == 1) {
                    String randomCode = String.valueOf((char) (random.nextInt(26) + 65));
                    conventionMember.setTicketCode(conventionMember.getTicketCode() + randomCode);
                } else if (randomType == 2) {
                    String randomCode = random.nextInt(10) + "";
                    conventionMember.setTicketCode(conventionMember.getTicketCode() + randomCode);
                }
            }

            //티켓코드 중복체크
            ConventionMemberDTO checkTicket = conventionDao.checkTicketDupelicate(conventionMember);
            if (checkTicket == null) {
                break;
            } else {
                conventionMember.setTicketCode("");
            }

        }

        int result = conventionDao.insertConventionMember(conventionMember);
        if (result > 0) {
            memberPay.setTicketNo(conventionMember.getTicketNo());
            result += conventionDao.insertMemberPay(memberPay);
        }

        return result == 2;
    }

    @Transactional
    public boolean deleteConventionMemberPay(int conventionNo, int memberNo) {
        int result = conventionDao.deleteConventionMemberPay(conventionNo, memberNo);
        return result == 1;
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
        // System.out.println("request : " + request);
        String accessToken = getAccessToken();
        try {
            Thread.sleep(3000);
            // 3초 지연시켜서 환불이 바로 가능하도록 했음
        } catch (InterruptedException e) {
            // Thread.currentThread().interrupt();
            e.printStackTrace();
            return false;
        }

        String code = "-1";
        //환불이 한 번에 안 되니까 for문으로 10번 돌려서 웬만하면 바로 환불가능하게 구현
        for (int i = 0; i < 10; i++) {
            code = cancelPayment(accessToken, request);
            System.out.println(i + "번 돌았음");
            if (code.equals("0")) {
                break;
            }
        }
        int result = -2;
        if (code.equals("0")) {
            if (request.getMemberNo() != 0) {
                // result = conventionDao.updateMemberPayKind(request);
                // result += conventionDao.deleteConventionMember(request);
                result = conventionDao.updateMemberPay(request);
                result += conventionDao.updateConventionMemberTicket(request);
                return result == 2;
            } else if (request.getCompanyNo() != null) {
                result = conventionDao.updateCompanyPay(request);
                result += conventionDao.deleteConventionCompany(request);
                return result == 2;
            }
        }
        return false;
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
        conventionComment.setConventionCommentContent(conventionComment.getConventionCommentContent().replaceAll("\\s+$", ""));
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
        ConventionSeatDTO conventionSeatDTO = conventionDao.getConventionSeat(conventionCompany);
        if (conventionSeatDTO == null) {
            return false;
        }
        int result = conventionDao.insertConventionCompany(conventionCompany);
        if (result > 0) {
            result += conventionDao.insertCompanyPay(companyPay);
        }
        return result == 2;
    }

    @Transactional
    public boolean updateSeatInfo(ConventionSeatDTO conventionSeat) {
        if (conventionSeat.getConventionNo() != 0) {
            ConventionCompanyDTO conventionCompanyDTO = conventionDao.checkConventionCompany(conventionSeat);
            if (conventionCompanyDTO != null) {
                return false;
            }
        }
        int result = conventionDao.updateSeatInfo(conventionSeat);
        return result == 1;
    }

    public CompanyPayDTO getPayment(String companyNo, int conventionNo) {
        return conventionDao.selectCompanyPayment(companyNo, conventionNo);
    }

    // 환불 기능 메서드 2개 
    public String getAccessToken() {
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
        ObjectMapper om = new ObjectMapper();
        String accessToken = "";
        try {
            JsonNode jsonNode = om.readTree(responseBody);
            JsonNode responseObject = jsonNode.get("response");
            accessToken = responseObject.get("access_token").asText();
            // System.out.println("파싱 토큰임 : " + accessToken);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        // String accessToken = responseBody.substring(responseBody.indexOf("access_token\":\"") + 15, responseBody.indexOf("\",\"now"));
        // accessToken = accessToken.replaceAll("\"", "");
        return accessToken;
    }

    public String cancelPayment(String accessToken, RefundRequest request) {

        String cancelUrl = "https://api.iamport.kr/payments/cancel";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        // CancelRequest cancelRequest = new CancelRequest();
        // cancelRequest.setReason(request.getReason());
        // cancelRequest.setAmount(request.getCancelRequestAmount());
        // cancelRequest.setMerchant_uid(request.getMerchantUid());
        // System.out.println("merchant_uid : "+request.getMerchantUid());
        Map<String, Object> cancelRequest = new HashMap<>();
        cancelRequest.put("merchant_uid", request.getMerchantUid());
        cancelRequest.put("amount", request.getCancelRequestAmount());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(cancelRequest, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(cancelUrl, entity, String.class);
        // System.out.println(response);
        ObjectMapper om = new ObjectMapper();
        String code = "-1";
        try {
            JsonNode json = om.readTree(response.getBody());
            code = json.get("code").asText();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        // System.out.println("code : " + code);

        return code;
    }

    //이메일 보내는 로직
    public void sendTicketEmail() {
        String emailContent = "<h1>웨딩 스토리 박람회</h1><br/><span>박람회 시작하기 3일전입니다.</span>";
        List<MemberDTO> list = conventionDao.selectAlarmTicket();
        for (MemberDTO emailList : list) {
            // System.out.println(emailList);
            emailSender.sendMail("웨딩스토리 박람회", emailList.getMemberEmail(), emailContent);
        }
    }

    @Transactional
    public boolean deleteSeatInfo(int conventionNo, String companyNo) {
        int result = conventionDao.deleteCompanyPay(conventionNo, companyNo);
        if (result == 1) {
            result += conventionDao.cancelConventionCompany(conventionNo, companyNo);
        }
        return result == 2;
    }

    @Transactional
    public void updateMemberPayStartProgress() {
        List<MemberPayDTO> updateList = conventionDao.selectMemberPayProgress0();
        // System.out.println("updateList : "+updateList);
        if(updateList.isEmpty()) return;
        conventionDao.updateMemberPayProgress1(updateList);
    }

    @Transactional
    public void selectMemberPayEndProgress() {
        List<MemberPayDTO> updateList = conventionDao.selectMemberPayProgress1();
        // System.out.println(updateList);
        if(updateList.isEmpty()) return;
        conventionDao.updateMemberPayProgress3(updateList);
    }






}
