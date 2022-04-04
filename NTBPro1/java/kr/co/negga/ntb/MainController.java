package kr.co.negga.ntb;

import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.crypto.Cipher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.negga.ntb.account.service.AccountService;
import kr.co.negga.ntb.account.service.AccountVO;
import kr.co.negga.ntb.account.web.AccountController;
import kr.co.negga.ntb.board.service.BoardService;
import kr.co.negga.ntb.board.service.BoardVO;

@Controller
public class MainController {
	
	@Resource(name = "boardService")
	private BoardService boardService;
	
	@Resource(name = "accountService")
	private AccountService acservice;

	@RequestMapping(value = "/main.do")
	public String main() {
		return "main";
	}

}
