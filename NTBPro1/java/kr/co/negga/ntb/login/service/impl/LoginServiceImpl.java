package kr.co.negga.ntb.login.service.impl;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import kr.co.negga.ntb.account.service.AccountVO;
import kr.co.negga.ntb.login.service.LoginService;

@Service("loginService")
public class LoginServiceImpl implements LoginService{

	@Resource(name="loginMapper")
	public LoginMapper loginMapper;
	
	/*
	 * 로그인 데이터 확인
	 */
	@Override
	public int selectAccountCount(AccountVO avo) throws Exception {
		
		return loginMapper.selectAccountCount(avo);
	}

	/*
	 * 솔트값 갖고 오기
	 */
	@Override
	public String selectAccountSalt(String user_salt) throws Exception {
		
		return loginMapper.selectAccountSalt(user_salt);
	}

	/*
	 * 로그아웃
	 */
	@Override
	public void logout(HttpSession session) {
		session.invalidate();
		
	}
	
	
	
}
