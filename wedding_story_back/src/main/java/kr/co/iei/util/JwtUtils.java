package kr.co.iei.util;

import java.util.Calendar;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
//import kr.co.iei.member.model.dto.LoginMemberDTO;

@Component
public class JwtUtils {

    @Value("${jwt.secret-key}")
    public String secretKey;
    @Value("${jwt.expire-hour}")
    public int expireHour;
    @Value("${jwt.expire-hour-refresh}")
    public int expireHourRefresh;

    public String createAccessToken(String memberId, int memberType){
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
        Calendar c = Calendar.getInstance();
        Date startTime = c.getTime();
        c.add(Calendar.HOUR, expireHour);
        Date expireTime = c.getTime();

        String token = Jwts.builder()                               
                            .issuedAt(startTime)                  
                            .expiration(expireTime)               
                            .signWith(key)                          
                            .claim("memberId", memberId)       
                            .claim("memberType", memberType) 
                            .compact();                            
        return token;
    }

    public String createRefreshToken(String memberId, int memberType){
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
        Calendar c = Calendar.getInstance();
        Date startTime = c.getTime();
        c.add(Calendar.HOUR, expireHourRefresh);
        Date expireTime = c.getTime();

        String token = Jwts.builder()                            
                            .issuedAt(startTime)                  
                            .expiration(expireTime)              
                            .signWith(key)                         
                            .claim("memberId", memberId)      
                            .claim("memberType", memberType)  
                            .compact();                         
        return token;
    }

//    public LoginMemberDTO checkToken(String token){
//        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
//        Claims claims = (Claims) Jwts.parser()             
//                                    .verifyWith(key)     
//                                    .build()
//                                    .parse(token)
//                                    .getPayload();
//        String memberId = (String)claims.get("memberId");
//        int memberType = (int)claims.get("memberType");
//        LoginMemberDTO loginMember = new LoginMemberDTO();
//        loginMember.setMemberId(memberId);
//        loginMember.setMemberType(memberType);
//        return loginMember;
//    }
    
    
}
