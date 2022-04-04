package kr.co.negga.ntb.login.service;

import javax.servlet.http.HttpSession;

import kr.co.negga.ntb.account.service.AccountVO;

public interface LoginService {
	
	/*
	 * 로그인 데이터 확인
	 */
	public int selectAccountCount(AccountVO avo) throws Exception;
	
	/*
	 * 솔트값 갖고 오기
	 */
	public String selectAccountSalt(String user_salt) throws Exception;
	
	/*
	 * 로그아웃
	 */
	public void logout(HttpSession session);
	
	/*
	 * 자신의 정보갖고 오기
	 */
}
