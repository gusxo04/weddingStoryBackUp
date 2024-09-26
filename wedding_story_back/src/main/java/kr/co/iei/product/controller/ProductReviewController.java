package kr.co.iei.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.product.model.service.ProductReviewService;
import kr.co.iei.util.FileUtils;

@RestController
@CrossOrigin("*")
@RequestMapping("/productComment")
public class ProductReviewController {
	@Autowired
	private ProductReviewService productReviewService;
	
	@Autowired
	private FileUtils fileUtils;
	
	@Value("${file.root}")
	public String root;
	

	
}
