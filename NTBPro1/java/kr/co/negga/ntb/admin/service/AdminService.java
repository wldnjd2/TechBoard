package kr.co.negga.ntb.admin.service;

import java.util.List;

import kr.co.negga.ntb.account.service.AccountVO;
import kr.co.negga.ntb.board.service.BoardVO;
/**
 * @Class AdminService.java
 * @Description 관리자 기능 서비스 Interface
 * @Since 2022.03.23
 * @author hsan
 * @version 1.0
 * @Modification 수정사항 없음 
 */
public interface AdminService {

	/**
	 * 사용자 리스트를 불러온다.
	 * @param accountVO 사용자 정보가 담긴 VO
	 * @return 사용자 정보 AccountVO
	 * @exception Exception
	 */
	public List<AccountVO> selectAccountList(AccountVO accountVO) throws Exception;

	/**
	 * 총 사용자 수를 불러온다.
	 * @param accountVO 사용자 정보가 담긴 VO
	 * @return 총 사용자 수 int
	 * @exception Exception
	 */
	public int selectAccountListCnt(AccountVO accountVO) throws Exception;

	/**
	 * 사용자를 삭제한다.
	 * @param accountVO 사용자 정보가 담긴 VO
	 * @return 삭제 성공 여부 int
	 * @exception Exception
	 */
	public int deleteAccount(AccountVO accountVO) throws Exception;

	/**
	 * 사용자 권한을 변경한다.
	 * @param accountVO 사용자 정보가 담긴 VO
	 * @return 변경 성공 여부 int
	 * @exception Exception
	 */
	public int updateAccountRank(AccountVO accountVO) throws Exception;

	/**
	 * 게시글을 삭제한다.
	 * @param boardVO 게시판 정보가 담긴 VO
	 * @return 삭제 성공 여부 int
	 * @exception Exception
	 */
	public int deleteTechBoardList(BoardVO boardVO) throws Exception;

}
