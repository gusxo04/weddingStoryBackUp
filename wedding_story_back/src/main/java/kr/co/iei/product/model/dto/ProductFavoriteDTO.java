package kr.co.iei.product.model.dto;

import org.apache.ibatis.type.Alias;

import jdk.jfr.BooleanFlag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "productfavorite")
public class ProductFavoriteDTO {
	private int productNo;	//상품번호
	private int memberNo;	//회원번호
	private Boolean likeState; //true, false로 체크 
}
