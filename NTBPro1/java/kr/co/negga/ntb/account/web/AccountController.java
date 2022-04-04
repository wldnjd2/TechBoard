package kr.co.negga.ntb.account.web;

import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.negga.ntb.account.service.AccountService;
import kr.co.negga.ntb.account.service.AccountVO;
import kr.co.negga.ntb.account.service.SHA256Util;
import kr.co.negga.ntb.login.service.LoginService;


/**
 * @Class AccountController.java
 * @Description 회원 관련 컨트롤러 구현 Class
 * @Since 2022.03.17
 * @author jshan
 * @version 1.0
 * @Modification 수정사항 없음 
 */

@Controller
@RequestMapping("/account/*")
public class AccountController {

	@Resource(name="accountService")
	public AccountService accountService;
	
	@Resource(name="loginService")
	public LoginService loginService;
	
	/**
	 * 회원가입 페이지를 불러온다.
	 * @return 회원가입 Page
	 * @exception Exception
	 */
	@RequestMapping(value = "/insertAccount.do", method = RequestMethod.GET)
	public String insertAccount() throws Exception{
		
		return "/account/insertAccount";
	}
	

	
	/**
	 * 회원가입 insert를 한다.
	 * @return 회원가입 Page
	 * @exception Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/insertAccountWrite.do", method = RequestMethod.POST)
	public HashMap<String, Object> insertAccountWrite(AccountVO avo,
													HttpSession session) throws Exception {
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		//이미지 not null 처리
		if(avo.getUser_img() == null) {
			avo.setUser_img("");
		}
		
        //생년월일 처리
		String dateStr = (avo.getUser_year()+"-"+avo.getUser_month()+"-"+avo.getUser_day());
		avo.setUser_birth(dateStr);
		
		// 개인 계정 솔트값 생성
		String salt = SHA256Util.generateSalt();
		avo.setUser_salt(salt);
		
		// 개인 계정 password 암호화
		String user_pw = avo.getUser_pw();
		user_pw = SHA256Util.getEncrypt(user_pw, salt);
		
		avo.setUser_pw(user_pw);
		
	    int result = accountService.insertAccount(avo);
	    
	    if(result == 1){
	    	resultMap.put("result", "ok");
	    }
	    return resultMap;
	}
	
	/*
	 * 회원 정보 업데이트
	 */
	@RequestMapping(value = "/updateAccountWrite.do", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> updateAccountWrite(AccountVO avo, Model model, HttpServletResponse response,
			HttpServletRequest request, HttpSession session) throws Exception {
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		// 유저 고유 솔트값 해시 처리해서 비교 데이터 만들기
		String salt = loginService.selectAccountSalt(avo.getUser_id());
		String hash_pw = SHA256Util.getEncrypt(avo.getUser_pw(), salt);
		
		avo.setUser_pw(hash_pw);
		
		int count = accountService.selectAccountPass(avo.getUser_pw());
	    
		if(count == 1) {
			//비밀번호가 맞을 때 들어와서 
			int result = accountService.updateAccount(avo);
			
			if(result == 1) {
				
				resultMap.put("result", "ok");
			}else {
				resultMap.put("result", "no");
			}
		} else {
			resultMap.put("result", "no");
		}
		
		return resultMap;
	}
	
	/*
	 * ID 중복체크
	 */
	@RequestMapping(value = "/idcheck.do", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> idcheck(String user_id, 
													HttpSession session) throws Exception{
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
			
		int count = accountService.selectIdCheck(user_id);
		
		if(count == 0) {
			resultMap.put("result", "ok");
		}else {
			resultMap.put("result", "no");
		}
		
		return resultMap;
	}
	
	/*
	 * 회원정보 갖고오기
	 */
	@RequestMapping(value = "/selectAccount.do", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> selectAccount(@ModelAttribute("accountVO") AccountVO avo, 
			HttpServletRequest request, HttpSession session) throws Exception{
		
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		String userID = (String)session.getAttribute("Session_user_id");
		
		AccountVO AVO = accountService.selectAccount(userID);
		
		if(AVO.getUser_id().equals(userID)) {
			resultMap.put("result", "ok");
			resultMap.put("accountVO", AVO);
		}else {
			resultMap.put("result", "no");
		}
		
		return resultMap;
	}

}