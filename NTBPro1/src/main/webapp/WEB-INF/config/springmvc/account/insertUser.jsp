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
	<link href="<c:url value='/'/>css/insertUser.css" rel="stylesheet" type="text/css" >
	<title>회원가입</title>
	
	<script
	  src="https://code.jquery.com/jquery-3.1.1.min.js"
	  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
	  crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.js"></script>
	
	<link rel="stylesheet" href="//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css">
  	<link rel="stylesheet" href="/resources/demos/style.css">
  	<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  	<script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>
	
	<script>
	$(function(){
		$("#user_birth").datepicker({
    		changeMonth: true,
    		changeYear: true
    	});
		
    	$("#btn_insertUser").click(function(){
    		
    		var user_id = $.trim($("#inputID").val());
    		var user_name = $.trim($("#user_name").val());
    		var user_pw1 = $.trim($("#user_pw").val());
    		var user_pw2 = $.trim($("#user_pw_collect").val());
    		
    		if(user_id == ""){
    			alert("아이디를 입력해주세요.");
    			$("#userID").focus();
    			return false;
    		//} else if(!/^[a-zA-Z0-9!@#$%^&*()?_~]{6,20}$/.test(user_pw1)){
    		//	alert("비밀번호는 영문, 숫자, 특수문자 조합으로 6~20 자리를 사용해야 합니다.");
    		//	return false;
    		} else if(user_name == ""){
    			alert("이름을 입력해주세요.");
    			$("#user_name").focus();
    			return false;
    		}else if(user_pw1 == ""){
    			alert("비밀번호를 입력해주세요.");
    			$("#user_pw1").focus();
    			return false;
    		} else if(user_pw1 != user_pw2) {
    			alert("비밀번호가 일치하지 않습니다.");
    			return false;
    		} else if(user_pw2 == ""){
    			alert("비밀번호 확인을 입력해주세요.");
    			$("#user_pw2").focus();
    			return false;
    		}
    		
    		var formData = $("#frm").serialize();
    		console.log(formData)
    		$.ajax({
				type: "POST",
				data: formData,	// json(전송) 타입
// 				url: "<c:url value='insertUserWrite.do' />",
				url: "${pageContext.request.contextPath}/account/insertUserWrite.do",
				dataType: "json",	//리턴 타입
				
				success: function(result){
					if(result == "ok"){
						alert("저장 완료");
						location="${pageContext.request.contextPath}/login/logIn.do"	//로그인 후 화면 설정
					} else{
						alert("저장 실패");
					}
				},
				error: function(){	//장애 발생
					alert("오류발생");
				}
			});
    		
    	});
    });
	
	
	</script>
</head>
<body>
	<div id="wrap">
		<div id="header">
			<h1>회원가입</h1>
		</div>
		<form name = "insertUser" id="frm">
			<div class="ui form success error">
				<div id="main_left">
					<div class="field">
						<label>대표 이미지</label> 
						<img class="ui medium circular image" src="<c:url value='images/라이언 사진.png'/>"/>
						<input type="image" id="user_img" name="user_img">
						<button id="img_btn" class="ui button">이미지 불러오기</button>
					</div>
				</div>
	
				<div id="main_right">
					<div class="field">
						<label>아이디 *</label> 
						<input type="text" id="inputID" name="user_id" placeholder="ex) HongGilDong">
						<button class="ui primary button fr">중복확인</button>
					</div>
	
					<div class="ui success, message">
						<div class="header">정확히 입력 하셨습니다.</div>
						<p>다음으로 항목으로 넘어가세요.</p>
					</div>
					<div class="ui error, message">
						<div class="header">잘못 입력 하셨습니다.</div>
						<p>다시 입력해주세요.</p>
					</div>
	
					<div class="field">
						<label>이름 *</label> 
						<input type="text" id="user_name" name="user_name" placeholder="ex) 홍길동">
					</div>
					<div class="ui success, message">
						<div class="header">정확히 입력 하셨습니다.</div>
						<p>다음으로 항목으로 넘어가세요.</p>
					</div>
					<div class="ui error, message">
						<div class="header">잘못 입력 하셨습니다.</div>
						<p>다시 입력해주세요.</p>
					</div>
	
					<div class="field">
						<label>비밀번호 *</label>
						<input type="password" id="user_pw" name="user_pw" placeholder="ex) 비밀번호는 영문, 숫자, 특수문자 조합으로 6~20 자리를 사용">
					</div>
	
					<div class="field">
						<label>비밀번호 확인 *</label> 
						<input type="password" id="user_pw_collect">
					</div>
					<div class="ui success, message">
						<div class="header">정확히 입력 하셨습니다.</div>
						<p>다음으로 항목으로 넘어가세요.</p>
					</div>
					<div class="ui error, message">
						<div class="header">잘못 입력 하셨습니다.</div>
						<p>다시 입력해주세요.</p>
					</div>
	
					<div class="field">
						<label>이메일</label> 
						<input type="email" id="user_email" name="user_email" placeholder="ex) naver@naver.com">
					</div>
	
					<div class="field">
						<label>전화번호</label> 
						<input type="text" id="user_pnum" name="user_pnum" placeholder="ex) 01012345678">
					</div>
	
					<div class="field">
						<label>생년월일</label> 
						<input type="text" id="user_birth" name="user_birth">
					</div>
				</div>
			</div>
	
			<div class="clear"></div>
	
			<div id="footer">
				<div class="ui submit button" id="btn_insertUser">회원가입</div>
				<a class="ui button" href="<c:url value="/login/logIn.do"/>">취소</a>
			</div>
		</form>
	</div>
</body>
</html>