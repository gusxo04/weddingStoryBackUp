package kr.co.iei.product.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "product")
public class ProductDTO {
	private int productNo;	//상품번호
	private String companyNo;	//업체코드
	private String productName;	//상품이름 --
	private String productImg;	//상품이미지 --
	private String productContent;	//상품컨텐츠 --
	private int productPrice;	//상품가격--
	private String productThumb ;	//상품썸네일
	private int coronation;	//대관료 --
	private int diningRoom;	//식비 --
	private int numberPeople;	//보증인원 --
	private List<ProductFileDTO> fileList; //썸네일이미지 여러장이 들어가는 ProductFileDTO 타입의 List;
	private int productState;
}
