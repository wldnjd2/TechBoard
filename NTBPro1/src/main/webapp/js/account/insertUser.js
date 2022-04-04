/**
 * insertUser.js 자바스크립트
 */
 
 function toBase64(event) {
	var reader = new FileReader();
	reader.readAsDataURL(event.target.files[0]);
	reader.onload = function(event) {
		var base64 = event.target.result;// img -> base64 변환
		
		var uploadFile = document.getElementById("user_img");
        uploadFile.value = base64;
        
	};
};
 
 $(function(){
		
	// 아이디 중복 체크 enter키 이벤트 
	$("#inputID").keypress(function(e){
		if(e.keyCode === 13){
			$("#btn_idcheck").click();
		}
	});
		
	//회원가입 (insert)
	$("#btn_insertUser").click(function(){
		
 		var user_id = $.trim($("#inputID").val());
 		var user_name = $.trim($("#user_name").val());
 		var user_pw1 = $.trim($("#user_pw").val());
 		var user_pw2 = $.trim($("#user_pw_collect").val());
 		var user_email = $.trim($("#user_email").val());
 		
 		// 이메일 정규식
 		var regularExpression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
 		var user_pnum = $.trim($("#user_pnum").val());
 		
 		// 휴대폰 번호 정규식
 		var regPhone = /^\d{3}-\d{3,4}-\d{4}$/;
 		
 		var user_year = $.trim($("#user_year").val());
 		var user_month = $.trim($("#user_month").val());
 		var user_day = $.trim($("#user_day").val());
		
 		if(user_id == ""){
 			alert("아이디를 입력해주세요.");
 			$("#userID").focus();
 			return false;
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
 		} else if(user_email != ""){
 			if(regularExpression.test(user_email) == false){
     			alert("이메일 형식을 한번 확인해주세요.");
     			$("#user_email").focus();
     			return false;
 			}else if(user_pnum != ""){
 				if(regPhone.test(user_pnum) == false){
         			alert("휴대폰 형식을 한번 확인해주세요.");
         			$("#user_pnum").focus();
         			return false;
 				}else{
 					if(user_year == ""){
     	    			alert("생년월일을 입력해주세요.");
     	    			$("#user_year").focus();
     	    			return false;
     	    		} else if(user_month == ""){
     	    			alert("생년월일을 입력해주세요.");
     	    			$("#user_month").focus();
     	    			return false;
     	    		} else if(user_day == ""){
     	    			alert("생년월일을 입력해주세요.");
     	    			$("#user_day").focus();
     	    			return false;
     	    		}
 				}
 			}
 		} else if(user_year == ""){
			alert("생년월일을 입력해주세요.");
			$("#user_year").focus();
			return false;
		} else if(user_month == ""){
			alert("생년월일을 입력해주세요.");
			$("#user_month").focus();
			return false;
		} else if(user_day == ""){
			alert("생년월일을 입력해주세요.");
			$("#user_day").focus();
			return false;
    	}
		
		
 		var formData = $("#frm").serialize();
		
		console.log(formData)

		$.ajax({
			type: "POST",
			data: formData,	// json(전송) 타입
			url: "/NTBPro1/account/insertAccountWrite.do",
			dataType: "json",
			
			success: function(data){
				if(data.result == "ok"){
					alert("회원가입이 완료되었습니다.");
					location="/NTBPro1/login/logIn.do"	//로그인 후 화면 설정
				} else{
					alert("회원가입이 실패하였습니다.");
				}
			},
			error: function(e){	//장애 발생
				console.log(e)
				alert("오류발생");
			}
		});
	});
	
	// id 중복 체크
	$("#btn_idcheck").click(function(){
		
		var user_id = $.trim($("#inputID").val());	//현재 창에 입력된 값
		
		if(user_id == ""){
			alert("아이디를 입력해주세요.")
			$("#inputID").focus();
			return false;
		}
		
		if(user_id.search(/\W|\s/g) > -1){
		    alert( '특수문자 또는 공백은 입력하실 수 없습니다.');
		    return false;
		}
		
		//idcheck.do - 비동기 전송 방식
		$.ajax({
			type: "POST",
			data: "user_id="+user_id,	// json(전송) 타입
			url: "/NTBPro1/account/idcheck.do",
			dataType: "json",
			
			success: function(data){	//성공이 되면 들어옴
				if(data.result == "ok"){
					$("#id_check").text("사용이 가능한 아이디 입니다.");
					$("#id_check").css('color', 'blue');
				} else{
					$("#id_check").text("이미 사용중인 아이디 입니다.");
					$("#id_check").css('color', 'red');
				}
			},
			error: function(){	//장애 발생
				alert("오류발생");
			}
		});
		return false;
	});
	
	$("input:file").on("change", function() {
		  var oFile = $(this)[0].files;
		  if(oFile.length < 1){
		    console.log('cancel was pressed');
		  }
		  else {
		    console.log(oFile[0].name);
		  }
	});
});

//비밀번호 확인
function check_pw(){
    var pw = document.getElementById('user_pw').value;
    var SC = ["!","@","#","$","%"];
    var check_SC = 0;

    if(pw.length < 6 || pw.length > 16){
        window.alert('비밀번호는 6글자 이상, 16글자 이하만 이용 가능합니다.');
        document.getElementById('user_pw').value='';
    }
    for(var i=0;i<SC.length;i++){
        if(pw.indexOf(SC[i]) != -1){
            check_SC = 1;
        }
    }
    if(check_SC == 0){
        window.alert('!,@,#,$,% 의 특수문자가 들어가 있지 않습니다.')
        document.getElementById('user_pw').value='';
    }
    if(document.getElementById('user_pw').value !='' && document.getElementById('user_pw_collect').value!=''){
        if(document.getElementById('user_pw').value==document.getElementById('user_pw_collect').value){
            document.getElementById('check').innerHTML='비밀번호가 일치합니다.'
            document.getElementById('check').style.color='blue';
        }
        else{
            document.getElementById('check').innerHTML='비밀번호가 일치하지 않습니다.';
            document.getElementById('check').style.color='red';
        }
    }
}

//파일추가 (썸네일 및 삭제)
document.addEventListener('DOMContentLoaded', function(){
	
    //이미지 객체 타입으로 이미지 확장자 밸리데이션
    var validateType = function(img){
        return (['image/jpeg','image/jpg','image/png'].indexOf(img.type) > -1);
    }

    var validateName = function(fname){
        let extensions = ['jpeg','jpg','png'];
        let fparts = fname.split('.');
        let fext = '';
    
        if(fparts.length > 1){
            fext = fparts[fparts.length-1];
        }
    
        let validated = false;
        
        if(fext != ''){
            extensions.forEach(function(ext){
                if(ext == fext){
                }
            });
        }
    
        return validated;
    }

    // 파일 선택 필드에 이벤트 리스너 등록
    document.getElementById('uploadFile').addEventListener('change', function(e){
        let elem = e.target;
        if(validateType(elem.files[0])){
            let preview = document.querySelector('.thumb');
            preview.src = URL.createObjectURL(elem.files[0]); //파일 객체에서 이미지 데이터 가져옴.
            document.querySelector('.dellink').style.display = 'block'; // 이미지 삭제 링크 표시
            preview.onload = function() {
                URL.revokeObjectURL(preview.src); //URL 객체 해제
            }
        }else{
        console.log('이미지 파일이 아닙니다.');
        }
    });

    document.querySelector('.dellink').addEventListener('click', function(e){
        let dellink = e.target;
        let preview = dellink.previousElementSibling;
        var uploadFile = document.getElementById("uploadFile");
		var user_img = document.getElementById("user_img");
        uploadFile.value = '';	// 썸네일 이미지 src 데이터 해제
		user_img.value = '';	// input 파일 src 데이터 해제
		preview.src = "../images/라이언 사진.png"; 
    });
});