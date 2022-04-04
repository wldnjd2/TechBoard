	//base64 설정
	function toBase64(event) {
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = function(event) {
			var base64 = event.target.result;// img -> base64 변환
			
			var uploadFile = document.getElementById("user_img");
	        uploadFile.value = base64;
	        
		};
	};
	
	//정보수정 모달창 닫기
	function closeModal2() {
		$('#modal_back').hide();
	};
	
	//정보수정 클릭시 회원 정보 갖고오기
	function updateUserInfo(){
		
		$.ajax({
			type: "POST",
			url: "/NTBPro1/account/selectAccount.do",
			dataType: "json",
			contentType : false,
	        processData : false,
	        cache : false,
			beforeSend : function(xmlHttpRequest){
				xmlHttpRequest.setRequestHeader("AJAX", "true");
			},
				
			success: function(data){
				if(data.result == "ok"){
					$("#user_name").val(data.accountVO.user_name);
					$("#user_email").val(data.accountVO.user_email);
					$("#user_pnum").val(data.accountVO.user_pnum);
					$("#user_birth").val(data.accountVO.user_birth);
					$("#img").attr("src", data.accountVO.user_img);
					$("#user_rank").val(data.accountVO.user_rank);
				} else{
					alert("회원정보 수정이 실패하였습니다.비밀번호를 한번 확인해주세요.");
				}
			},
			error: function(e){
				if(e.resultCode == 300){
					alert(returnData.resultMsg);
				}
				if(e.status == 400){
					var offset = location.href.indexOf(location.host)+location.host.length;
					var ctxPath = location.href.substring(offset, location.href.indexOf('/', offset+1));
					location.href = 'login/logIn.do';
					alert("session값이 존재하지 않아서 로그인 페이지로 이동합니다. ");
				}
			}
		});
		
		$("#modal_back").css("display","block");
		
	}
	
	function logout(){
		$(location).attr("href", "/NTBPro1/login/logOut.do")
	}
	
	//회원관련 js시작
	$(function(){	
		
		/* 회원 정보 수정 */
		$("#updateAccount_btn").click(function(){
			
			var user_pw = $("#user_pw");
			
			var user_email = $.trim($("#user_email").val());
			// 이메일 정규식
			var regularExpression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			
			var user_pnum = $.trim($("#user_pnum").val());
     		// 휴대폰 번호 정규식
     		var regPhone = /^\d{3}-\d{3,4}-\d{4}$/;
			
     		if(user_pw.val() == ""){
     			alert("비밀번호를 입력해주세요.");
     			$("#user_pw.val()").focus();
     			return false;
     		}else if(user_email != ""){
     			if(regularExpression.test(user_email) == false){
         			alert("이메일 형식을 한번 확인해주세요.");
         			$("#user_email").focus();
         			return false;
     			}else if(user_pnum != ""){
     				if(regPhone.test(user_pnum) == false){
             			alert("휴대폰 형식을 한번 확인해주세요.");
             			$("#user_pnum").focus();
             			return false;
     				}
     			}
 			}	
			
			var form = $("#frm_update")[0];
			var formData = new FormData(form);
			
			$.ajax({
				type: "POST",
				data: formData,	// json(전송) 타입
				url: "/NTBPro1/account/updateAccountWrite.do",
				dataType: "json",
				contentType : false,
		        processData : false,
		        cache : false,
				beforeSend : function(xmlHttpRequest){
					xmlHttpRequest.setRequestHeader("AJAX", "true");
				},
					
				success: function(data){
					if(data.result == "ok"){
						alert("회원정보 수정이 완료되었습니다.");
						$("#modal_back").css("display", "none")
						$("#user_pw").val("");
					} else{
						alert("회원정보 수정이 실패하였습니다.비밀번호를 한번 확인해주세요.");
					}
				},
				error: function(e){
					if(e.resultCode == 300){
						alert(returnData.resultMsg);
					}
					if(e.status == 400){
						alert("session값이 존재하지 않습니다. 3초 후 로그인 페이지로 이동합니다. ");
						var offset = location.href.indexOf(location.host)+location.host.length;
						var ctxPath = location.href.substring(offset, location.href.indexOf('/', offset+1));
						setTimeout("location.href='"+ctxPath+"/login/logIn.do'",3000);
					}
				}
			});
		});
	});
	
	/* 게시글 클릭 시 상세정보로 이동 */
	function moveToDetail(){
		console.log("test")
	}
	
	
	//썸네일
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