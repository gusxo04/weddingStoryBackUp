package kr.co.iei.convention.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RefundRequest {

    //회원이 구매시 memberNo / 업체가 구매시 companyNo 사용
    private int memberNo;
    private String companyNo;

    //회원이 박람회 티켓 구입시 ticketNo 쓰고 / 업체가 부스 구입시 conventionCompanyNo 사용
	private int ticketNo;
    private int conventionCompanyNo;

    //merchantUid는 필수 키 값은 merchant_uid임
	private String merchantUid;
    private int cancelRequestAmount; //환불 가격임

    // 얘는 그렇게 안 중요함 (db에 저장 안 하면)
    private String reason;
    // private String refundHolder;
    // private String refundBank;
    // private String refundAccount;
}
