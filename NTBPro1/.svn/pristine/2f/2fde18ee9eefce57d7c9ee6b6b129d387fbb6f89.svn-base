package kr.co.negga.ntb.account.service;

import java.util.List;

import kr.co.negga.ntb.board.service.BoardVO;


/**
 * @Class AccountService.java
 * @Description 회원 관련 서비스 Interface
 * @Since 2022.03.17
 * @author jshan
 * @version 1.0
 * @Modification 수정사항 없음 
 */

public interface AccountService {
	
	/*
	 * 회원등록처리 (save)
	 */
	public int insertAccount(AccountVO avo) throws Exception;
	
	/*
	 * 중복아이디 체크
	 */
	public int selectIdCheck(String user_id) throws Exception;
	
	/*
	 * 회원정보 출력
	 */
	public AccountVO selectAccount(String user_id) throws Exception;
	
	/*
	 * 회원정보 수정 처리
	 */
	public int updateAccount(AccountVO avo) throws Exception;
	
	/*
	 * 회원정보 수정 비밀번호 확인
	 */
	public int selectAccountPass(String user_pw) throws Exception;

}