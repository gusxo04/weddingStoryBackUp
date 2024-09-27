package kr.co.iei.product.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductFileDTO {
	private int productFileNo ;
	private int productNo;
	private String fileName;
	private String filePath;
}
