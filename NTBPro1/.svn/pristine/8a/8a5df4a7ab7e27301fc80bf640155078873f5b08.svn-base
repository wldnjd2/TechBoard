package kr.co.negga.ntb.login.service.impl;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.negga.ntb.account.service.AccountVO;

/**
 * @Class LoginMapper.java
 * @Description	로그인관리 관련 Mapper Class(mybatis)
 * @Since 2022.03.18
 * @author jshan
 * @version 1.0
 * @Modification 수정사항 없음 
 */

@Mapper("loginMapper")
public class LoginMapper extends EgovAbstractMapper{

	/*
	 * 로그인 데이터 확인
	 */
	public int selectAccountCount(AccountVO avo) {
		
		return selectOne("selectAccountCount",avo);
	}

	/*
	 * 솔트값 갖고 오기
	 */
	public String selectAccountSalt(String user_salt) {
		
		return selectOne("selectAccountSalt",user_salt);
	}

}
