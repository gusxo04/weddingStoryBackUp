package kr.co.iei.product.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.service.ProductService;
import kr.co.iei.util.FileUtils;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin("*")
@RequestMapping("/product")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@Autowired
	private FileUtils fileUtils;
	
	@Value("${file.root}")
	public String root;
	
	
	@GetMapping("/list/{reqPage}")
	public ResponseEntity<Map> getProductList(@PathVariable int reqPage) {
		Map map = productService.getProductList(reqPage);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping("/hallList/{reqPage}")
	public ResponseEntity<Map> getProductHallList(@PathVariable int reqPage) {
		Map map = productService.getProducthallList(reqPage);
		return ResponseEntity.ok(map);
	}
	
	@PostMapping(value = "/editorImage")
	public ResponseEntity<String> editorImage(@ModelAttribute MultipartFile image){
		String savepath = root+"/editor/";
		String filepath = fileUtils.upload(savepath, image);
		return ResponseEntity.ok("/editor/"+filepath);
	}

	@GetMapping("/productNo/{productNo}")
	public ResponseEntity<ProductDTO> productList(@PathVariable int productNo){
		ProductDTO product = productService.productList(productNo);
		return ResponseEntity.ok(product);
	}

}
