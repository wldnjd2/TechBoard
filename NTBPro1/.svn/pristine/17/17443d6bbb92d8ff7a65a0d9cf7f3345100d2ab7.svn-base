package kr.co.negga.ntb.admin.web;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.negga.ntb.account.service.AccountVO;
import kr.co.negga.ntb.admin.service.AdminService;
import kr.co.negga.ntb.board.service.BoardVO;

@Controller
public class AdminController {

	@Resource(name = "adminService")
	AdminService adminService;
	
	@RequestMapping(value = "/manageUser.do", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> AccountList(@ModelAttribute("accountVO") AccountVO accountVO, HttpSession session) throws Exception{
			
			HashMap<String, Object> resultMap = new HashMap<String, Object>();
	
			
				// 한 페이지에 게시되는 게시글 건수
				accountVO.setRecordCountPerPage(5);
				// 하단 페이지 리스트에 게시되는 페이지 건수
				accountVO.setPageSize(10);
				accountVO.setUser_id((String)session.getAttribute("Session_user_id"));
				
				PaginationInfo paginationInfo = new PaginationInfo();
				
				// 총 회원 수
				int totCnt = adminService.selectAccountListCnt(accountVO);
				paginationInfo.setTotalRecordCount(totCnt);
				// 한 페이지에 게시되는 게시글 건수
				paginationInfo.setRecordCountPerPage(accountVO.getRecordCountPerPage());
				// 페이지 리스트에 게시되는 페이지 건수
				paginationInfo.setPageSize(accountVO.getPageSize());
				// 한 페이지당 게시되는 게시글 건수
				accountVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
				
				// 현재 페이지 번호
				paginationInfo.setCurrentPageNo(accountVO.getCurrentPage());
				// SQL문 조건절 시작 rownum
				accountVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
				// SQL문 조건절 끝 rownum
				accountVO.setLastIndex(paginationInfo.getLastRecordIndex());
				
				
				List<AccountVO> resultList = adminService.selectAccountList(accountVO);
				
				resultMap.put("resultUserCnt", totCnt);
				resultMap.put("resultUserList", resultList);
				resultMap.put("accountVO", accountVO);
				resultMap.put("paginationInfo", paginationInfo);
				

			return resultMap;
	}
	
	@RequestMapping(value = "/deleteUser.do", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> deleteAccount(@ModelAttribute("accountVO")AccountVO accountVO) throws Exception{
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		String msg = "";
		int result = adminService.deleteAccount(accountVO);
		
		if(result == 1) {
			msg = "삭제가 완료되었습니다.";
		}else {
			msg = "삭제에 실패했습니다.";
		}
		resultMap.put("msg", msg);

		return resultMap;
	}
	
	@RequestMapping(value = "updateUserRank.do", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> updateAccountRank(@ModelAttribute("accountVO")AccountVO accountVO) throws Exception{
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		String msg = "";
		
		/** 선택한 사용자가 관리자라면 회원으로 변경*/
		if(accountVO.getUser_rank() == 1) {
			accountVO.setUser_rank(0);
			int result = adminService.updateAccountRank(accountVO);
			
			if(result == 1) {
				msg = "관리자 -> 회원으로 권한이 변경되었습니다.";
			}else {
				msg = "권한 변경이 실패했습니다.";
			}
		/** 선택한 사용자가 회원이라면 관리자로 변경*/
		}else {
			accountVO.setUser_rank(1);
			int result = adminService.updateAccountRank(accountVO);
			
			if(result == 1) {
				msg = "회원 -> 관리자로 권한이 변경되었습니다.";
			}else {
				msg = "권한 변경이 실패했습니다.";
			}
		}
		
		resultMap.put("msg", msg);
		
		return resultMap;
	}
	
	@RequestMapping(value = "deleteTechBoardList.do", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> deleteTechBoardList(@ModelAttribute("boardVO") BoardVO boardVO
													,HttpServletRequest request) throws Exception{
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		/** 가져온 post_pnum을 배열에 담는다. */
		String[] strArr = request.getParameterValues("techBoardListArr");
		int[] intArr = new int[strArr.length];
		String msg = "";
		
		
		/* 게시글 번호가 담겨있는 배열을 String 배열로받아오고 int배열로 바꿔준다 */
		for (int i = 0; i < strArr.length; i++) {
			intArr[i] = Integer.parseInt(strArr[i]);
		}
		
		/* 반복문으로 여러 게시글을 삭제한다. */

		for (int i = 0; i < intArr.length; i++) {
			
			boardVO.setPost_pnum(intArr[i]);
			int result = adminService.deleteTechBoardList(boardVO);
			if(result == 1) {
				msg = "삭제가 완료되었습니다.";
			}else {
				msg = "게시글 삭제가 실패했습니다.";
				break;
			}
		}
		
		resultMap.put("msg", msg);
	
		return resultMap;
	}
}
