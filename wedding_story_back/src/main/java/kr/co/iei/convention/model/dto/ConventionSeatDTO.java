package kr.co.iei.convention.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="conventionSeat")
public class ConventionSeatDTO {

    private int seatNo;
    private int conventionSeatPrice;
    private String seatCode;
    private int seatStatus;
    // 0 정상 / 1 구매 불가능자리
}
