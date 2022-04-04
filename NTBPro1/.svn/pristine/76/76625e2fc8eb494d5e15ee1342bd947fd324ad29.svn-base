package kr.co.negga.ntb.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class LoginSessionInterceptor extends HandlerInterceptorAdapter{

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		boolean result = false;
		HttpSession session = request.getSession();
	 	
		try {
			//세션 값에 id값이 있는지 확인
			if(session.getAttribute("Session_user_id") == null){
				//session값이 null이고 비동기 통신(ajax)을 할 때 인터셉터를 함
				if(ajaxRequest(request)) {
					//javascript에서 error시 400에러를 받아서 처리함.
					response.sendError(400);
					return false;
				}else {		//session값이 null이고 동기 통신을 할 때 인터셉터를 함
					response.sendRedirect(request.getContextPath()+"/login/logIn.do");
					result = false;
				}
			}else {
				result = true;
			}
		} catch (Exception e) {
			 e.printStackTrace();
	         System.out.println(e.getMessage());
	         return false;
		}
		return result;
	}
	
	//request의 header값을 받아서 비동기 통신(ajax) 인지를 확인함.
	private boolean ajaxRequest(HttpServletRequest req) {
		String header = req.getHeader("AJAX");
		//비동기 통신일 경우 true를 아닐 경우 false를 return함.
		if("true".equals(header)) {
			return true;
		}else {
			return false;
		}
	}
}