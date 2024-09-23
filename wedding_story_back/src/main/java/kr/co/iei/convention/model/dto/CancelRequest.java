package kr.co.iei.convention.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CancelRequest {

	private String reason;
    private int amount;
    private String merchantUid;
    private String checksum;
}
