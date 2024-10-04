package kr.co.iei.member.model.service;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.convention.model.dao.ConventionDao;
import kr.co.iei.convention.model.dto.ConventionDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.product.model.dao.ProductDao;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.util.JwtUtils;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private ProductDao productDao;
	@Autowired
	private ConventionDao conventionDao;
	@Autowired
	private CompanyDao companyDao;
	@Autowired
	private BCryptPasswordEncoder encoder;
	@Autowired
	private JwtUtils jwtUtil;

	public int checkId(String checkId) {
		int result = memberDao.checkId(checkId);
		return result;
	}

	public int checkCode(String checkCode) {
		int result = memberDao.checkCode(checkCode);
		return result;
	}
	
	@Transactional
	public int insertMember(MemberDTO member) {
		int result = 0;
		String defaultPw = member.getMemberPw();
		String encPw = encoder.encode(defaultPw);
		member.setMemberPw(encPw);
		
		if(member.getMemberType() ==2) {
			if(member.getCompanyBusinessNo() != null) {
				String companyCode = memberDao.checkBusinessNo(member.getCompanyBusinessNo());
				if(companyCode !=null) {
					member.setCompanyNo(companyCode);
					result = memberDao.insertMember(member);
				}else {
					result = memberDao.insertMember(member);
				}
			}else {
				result = memberDao.insertMember(member);
			}
		}else if(member.getMemberType()==1) {
			if(member.getPartnerId()==null) {
				int lastMemberCode = memberDao.checkLastMemberCode();
				System.out.println(lastMemberCode);
				if(lastMemberCode<9) {
					String memberCode = "M000"+(lastMemberCode+1);
					member.setMemberCode(memberCode);
				}else if(lastMemberCode<99) {
					String memberCode = "M00"+(lastMemberCode+1);
					member.setMemberCode(memberCode);
				}else if(lastMemberCode<999) {
					String memberCode = "M0"+(lastMemberCode+1);
					member.setMemberCode(memberCode);
				}else if(lastMemberCode<9999) {
					String memberCode = "M"+(lastMemberCode+1);
					member.setMemberCode(memberCode);
				}
			}else if(member.getPartnerId()!=null) {
				String partnerCode = memberDao.checkPartnerCode(member.getPartnerId());
				member.setMemberCode(partnerCode);
				result = memberDao.insertMember(member);
				if(result>0) {
					result = memberDao.updateMember(member.getPartnerId(),member.getMemberName(),member.getMemberId());					
				}else {
					result = 0;
				}
			}
		}else {
			result = memberDao.insertMember(member);
		}
		return result;
	}

	public LoginMemberDTO loginMember(MemberDTO member) {
		MemberDTO m = memberDao.searchPw(member.getMemberId());
		 if(m != null && encoder.matches(member.getMemberPw(), m.getMemberPw())) {
			 String accessToken = jwtUtil.createAccessToken(m.getMemberNo() ,m.getMemberId(), m.getMemberType(), m.getMemberCode(), m.getCompanyNo());
			 String refreshToken = jwtUtil.createRefreshToken(m.getMemberNo() ,m.getMemberId(), m.getMemberType(), m.getMemberCode(), m.getCompanyNo());
			 LoginMemberDTO loginMember = new LoginMemberDTO(accessToken, refreshToken,m.getMemberNo(), m.getMemberId(), m.getMemberType(), m.getMemberCode(), m.getCompanyNo());
			 return loginMember;
		 }else {
			return null; 
		 }
	}

	public LoginMemberDTO refresh(String token) {
		try {
			LoginMemberDTO loginMember = jwtUtil.checkToken(token);
			String companyNo = memberDao.selectInsertCompanyNo(loginMember.getMemberNo()); 
			/* 업체등록을 누른시점에서 리프레쉬 토큰은 기존에 companyNo == null 인걸로 재생성하기에 companyNo가 발급 된 후 조회를 다시해서 리프레쉬 토큰 발행 */
			loginMember.setCompanyNo(companyNo);
			String accessToken = jwtUtil.createAccessToken(loginMember.getMemberNo(), loginMember.getMemberId(), loginMember.getMemberType(),loginMember.getMemberCode(), loginMember.getCompanyNo());
			String refreshToken = jwtUtil.createRefreshToken(loginMember.getMemberNo(),loginMember.getMemberId(), loginMember.getMemberType(),loginMember.getMemberCode(), loginMember.getCompanyNo());
			loginMember.setAccessToken(accessToken);
			loginMember.setRefreshToken(refreshToken);
			return loginMember;
		}catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
	public MemberDTO selectLoginMember(int memberNo) {
		MemberDTO m = memberDao.selectLoginMember(memberNo);
		m.setMemberPw(null);
		return m;
	}

	public int checkOldPw(MemberDTO member) {
		MemberDTO m = memberDao.searchPw(member.getMemberId());
		if(m != null && encoder.matches(member.getMemberPw(), m.getMemberPw())) {
			return 1;
		}else {
			return 0;
		}
	}
	@Transactional
	public int modifyPw(MemberDTO member) {
		String defaultPw = member.getMemberPw();
		String encPw = encoder.encode(defaultPw);
		member.setMemberPw(encPw);
		int result = memberDao.modifyPw(member);
		return result;
	}
	@Transactional
	public int updateMember2(MemberDTO member) {
		int result = memberDao.updateMember2(member);
		return result;
	}
	@Transactional
	public int deleteMember(MemberDTO member) {
		int result = memberDao.deleteMember(member);
		return result;
	}

	public int checkEmail(String checkEmail) {
		int result = memberDao.checkEmail(checkEmail);
		return result;
	}

	public List<ConsultDTO> consultList(int memberNo) {
		List<ConsultDTO> list = memberDao.consultList(memberNo);
		for(ConsultDTO consult : list) {
			if(consult.getCompanyNo().equals("0")) {
				System.out.println(consult.getConsultDate());
				CompanyDTO company = memberDao.conventionList(consult.getConsultDate());
				company.setCompanyAddr("서울 영등포구 선유동2로 57");
				company.setCompanyTel("02-4153-3449");
				consult.setCompany(company);
			}else {				
				CompanyDTO company = memberDao.consultCompanyList(consult.getCompanyNo());				
				consult.setCompany(company);
			}
		}
		return list;
	}

	public List<MemberPayDTO> paymentList(int memberNo, String state) {
		List<MemberPayDTO> list = memberDao.paymentList(memberNo,state);
		for(MemberPayDTO pay : list) {
			
			StringTokenizer sT = new StringTokenizer(pay.getPayDate(), "/");
			while (sT.hasMoreElements()) {
				int year = 0, month = 0, day = 0;
			    if (sT.hasMoreElements()) {
			    year = Integer.parseInt(sT.nextToken());  // 년도 (24)
			    }
			    if (sT.hasMoreElements()) {
			    month = Integer.parseInt(sT.nextToken());  // 월 (10)
			    }
			    if (sT.hasMoreElements()) {
			    day = Integer.parseInt(sT.nextToken());  // 일 (04)
			    }

			    // 연도를 2024년으로 맞추기 위해 조정
			    if (year < 100) {
			    year += 2000;  // 24는 2024년으로 변환
			    }
			    String formattedDateString = String.format("%04d.%02d.%02d", year, month, day);
			    
			    pay.setPayDate(formattedDateString);
			}		
			
			if(pay.getProductNo() != 0) {
				//상품 구매 시
				ProductDTO product = productDao.selectProduct(pay.getProductNo());
				CompanyDTO company = companyDao.selectCompanyNo(product.getCompanyNo());
				pay.setProduct(product);
				pay.setCompanyName(company.getCompanyName());
			}else {
				//박람회 티켓 구매 시
				ConventionDTO convention = conventionDao.selectConventInfo(pay.getTicketNo());
				ProductDTO product = new ProductDTO();
				product.setProductName(convention.getConventionTitle());
				product.setProductImg(convention.getConventionImg());
				pay.setProduct(product);
			}
		}
		return list;
	}
}
