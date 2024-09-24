package kr.co.iei.convention.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RefundRequest {

    private int memberNo;
	private int ticketNo;
	private String merchantUid;
    private int cancelRequestAmount; //환불 가격임
    private String reason;
    // private String refundHolder;
    // private String refundBank;
    // private String refundAccount;
}
