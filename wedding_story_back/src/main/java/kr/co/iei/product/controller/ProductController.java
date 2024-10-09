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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ProductFavoriteDTO;
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
		System.out.println(map);
		return ResponseEntity.ok(map);
	}
	
	@PostMapping(value = "/editorImage")
	public ResponseEntity<String> editorImage(@ModelAttribute MultipartFile image){
		String savepath = root+"/editor/";
		String filepath = fileUtils.upload(savepath, image);
		return ResponseEntity.ok("/editor/"+filepath);
	}
	
	//웨딩홀리스트
	@GetMapping("/hallList/{reqPage}")
	public ResponseEntity<Map> getProductHallList(@PathVariable int reqPage) {
		Map map = productService.getProducthallList(reqPage);
		return ResponseEntity.ok(map);
	}
	
	//웨딩홀 예약하기에서 상품명불러오기
	@GetMapping(value = "/reservation/{memberNo}/{productNo}")
	public ResponseEntity<Map> selectReservationInfo(@PathVariable int productNo,@PathVariable int memberNo){
		Map map = productService.selectReservationInfo(productNo,memberNo);		
		return ResponseEntity.ok(map);
	}
		
	//웨딩홀 결제
	@PostMapping
	public ResponseEntity<Integer>insertWeddingHallPay(@ModelAttribute MemberDTO member, @ModelAttribute ProductDTO product, @ModelAttribute MemberPayDTO memberPay ){
		int result = productService.insertWeddingHallPay(member,product,memberPay);
		System.out.println(result);
		return ResponseEntity.ok(result);
	}
	
	
	//제품 상세페이지
	@GetMapping(value="/productInfo/{productNo}")
	public ResponseEntity<Map> productList(@PathVariable int productNo){
		Map map = productService.productList(productNo);
		//System.out.println(productNo);
		return ResponseEntity.ok(map);
	}
	
	
	
	//회원이 좋아요한 제품 리스트
	@GetMapping(value = "/favoriteList/{memberNo}")
	public ResponseEntity<List> favoriteList(@PathVariable int memberNo){
		List<ProductDTO> list = productService.favoriteList(memberNo);
		return ResponseEntity.ok(list);
	}
	
	//회원이 관심상품 등록,취소하는 로직
	@PostMapping(value = "/favorite")
	public ResponseEntity<Integer> favorite(@RequestBody ProductFavoriteDTO favorite){
		System.out.println(favorite);
		System.out.println(favorite.getProductNo());
		System.out.println(favorite.getMemberNo());
		int result = productService.favorite(favorite.getProductNo(),favorite.getMemberNo(),favorite.getLikeState());
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "/favorite")
	public ResponseEntity<ProductFavoriteDTO> favoriteOneList(@ModelAttribute ProductFavoriteDTO favorite){
		ProductFavoriteDTO productFavorite = productService.favoriteOneList(favorite);
		return ResponseEntity.ok(productFavorite);
	}
	
	
	
}
