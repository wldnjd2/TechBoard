package kr.co.negga.ntb.admin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.co.negga.ntb.account.service.AccountVO;
import kr.co.negga.ntb.admin.service.AdminService;
import kr.co.negga.ntb.board.service.BoardVO;

/**
 * @Class AdminServiceImpl.java
 * @Description 관리자 관련 서비스 구현 Class
 * @Since 2022.03.23
 * @author hsan
 * @version 1.0
 * @Modification 수정사항 없음 
 */
@Service("adminService")
public class AdminServiceImpl implements AdminService {
	
	@Resource(name = "adminMapper")
	AdminMapper adminMapper;
	
	/**
	 * 사용자 리스트를 불러온다.
	 * @param accountVO 사용자 정보가 담긴 VO
	 * @return 사용자 정보 AccountVO
	 * @exception Exception
	 */
	@Override
	public List<AccountVO> selectAccountList(AccountVO accountVO) throws Exception {
		return adminMapper.selectAccountList(accountVO);
	}

	
	/**
	 * 총 사용자 수를 불러온다.
	 * @param accountVO 사용자 정보가 담긴 VO
	 * @return 총 사용자 수 int
	 * @exception Exception
	 */
	@Override
	public int selectAccountListCnt(AccountVO accountVO) throws Exception {
		return adminMapper.selectAccountListCnt(accountVO);
	}

	/**
	 * 사용자를 삭제한다.
	 * @param accountVO 사용자 정보가 담긴 VO
	 * @return 삭제 성공 여부 int
	 * @exception Exception
	 */
	@Override
	public int deleteAccount(AccountVO accountVO) throws Exception {
		return adminMapper.deleteAccount(accountVO);
		
	}

	/**
	 * 사용자 권한을 변경한다.
	 * @param accountVO 사용자 정보가 담긴 VO
	 * @return 변경 성공 여부 int
	 * @exception Exception
	 */
	@Override
	public int updateAccountRank(AccountVO accountVO) throws Exception {
		return adminMapper.updateAccountRank(accountVO);
	}


	/**
	 * 게시글을 삭제한다.
	 * @param boardVO 게시판 정보가 담긴 VO
	 * @return 삭제 성공 여부 int
	 * @exception Exception
	 */
	@Override
	public int deleteTechBoardList(BoardVO boardVO) throws Exception {
		return adminMapper.deleteTechBoardList(boardVO);
	}

	
}
