<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css" rel="stylesheet" type="text/css">
	<title>로그인</title>
	
	<!-- 시멘틱 UI 조건 -->
	<script
		src="https://code.jquery.com/jquery-3.1.1.min.js"
		integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
		crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.js"></script>
	
	<!-- RSA암호화 조건 -->
	<script type="text/javascript" src="http://www-cs-students.stanford.edu/~tjw/jsbn/rsa.js"></script>
	<script type="text/javascript" src="http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn.js"></script>
	<script type="text/javascript" src="http://www-cs-students.stanford.edu/~tjw/jsbn/prng4.js"></script>
	<script type="text/javascript" src="http://www-cs-students.stanford.edu/~tjw/jsbn/rng.js"></script>
	
	<!-- login.js파일, css파일 연결 -->
	<script type="text/javascript" src="<c:url value='/'/>js/login/login.js"></script>
	<link href="<c:url value='/'/>css/login/logIn.css" rel="stylesheet" type="text/css" >
	
	<script type="text/javaScript" language="javascript" defer="defer">

	</script>
	
</head>
<body>
	<div id="wrap">
		<div id="header">
			<h1>로그인</h1>
		</div>
		<div id="main">
			<form class="ui form" name="loginFrm" method="POST">
				<div class="field">
					<input type="hidden" id="RSAModulus" value="${RSAModulus}"/>
    				<input type="hidden" id="RSAExponent" value="${RSAExponent}"/>
					<label>아이디</label>
					<div class="ui left icon input">
						<input type="text" placeholder="UserID" id="user_id"> <i class="user icon"></i>
					</div>
				</div>
				<div class="field">
					<label>비밀번호</label>
					<div class="ui left icon input">
						<input type="password" id="user_pw"> <i class="lock icon"></i>
					</div>
					<input type="hidden" id="USER_ID" name="USER_ID">
       				<input type="hidden" id="USER_PW" name="USER_PW">
				</div>

			</form>
		</div>
		<div id="footer">
			<button id="btn_submit" class="ui button" type="submit">로그인</button>
			<a class="ui button" href="/NTBPro1/account/insertAccount.do">회원가입</a>
		</div>
	</div>
</body>
</html>