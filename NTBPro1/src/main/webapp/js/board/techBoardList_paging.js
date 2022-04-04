
	/* 페이징에 필요한 변수 */
	/* 현재 페이지 */
	var cp;
	/* 한번에 게시될 페이지 리스트 */
	var size;
	/* 현재 페이지 리스트의 마지막 페이지 번호 */
	var ep;
	/* 현재 페이지 리스트의 첫 페이지 번호 */
	var sp;
	/* 총 페이지 갯수*/
	var tp;
	/* 카테고리명 */
	var categoryName;
	/* 현재 접속자*/
	var user_id = '';
	/* 카테고리 목록 */
	var categoryList = [];
	
	/* 메인페이지 게시판 이전, 다음버튼 클릭했을 때 이벤트 처리 */
	function pageMove(flag){

		/* 다음 페이지 버튼 클릭시 */
		if (flag == 'next'){
		/* 비동기방식으로 처리한 하단 페이징 부분 html코드를 담을 변수 */
		var str = '';
		/* '다음'버튼을 클릭했기 때문에 시작번호와 끝번호를 증가시켜준다.*/
		sp += size; // 11
		ep = sp+(size-1); // 20
		/* sp를 현재페이지로 지정 */
		cp = sp;
				/* 끝페이지가 총 페이지보다 작다면 */
				if(ep < tp){
					
					/* 시작페이지가 1이라면 '이전'버튼 안보이게*/
					if(sp == 1){
						
						for(var i = sp; i <= ep; i++){
							str += '<a class="paging" href="javascript:void(0)" id="pageNum'+i+'" onclick="javascript:pagination_techBoardList('+i+', \''+categoryName+'\', '+sp+', '+ep+');">'+i+'</a>'
						}
						str += '<a href="javascript:void(0)" class="pageMove" onclick="javascript:pageMove('+size+', '+cp+', \'next\' )">다음</a>'
						
					}else{
						str += '<a href="javascript:void(0)" class="pageMove" onclick="javascript:pageMove('+size+', '+cp+', \'pre\')">이전</a>'
						for(var i = sp; i <= ep; i++){
							str += '<a class="paging" href="javascript:void(0)" id="pageNum'+i+'" onclick="javascript:pagination_techBoardList('+i+', \''+categoryName+'\', '+sp+', '+ep+');">'+i+'</a>'
						}
						str += '<a href="javascript:void(0)" class="pageMove" onclick="javascript:pageMove('+size+', '+cp+', \'next\')">다음</a>'
						
					}
				/* 그 외의 경우, 끝페이지가 총페이지보다 크거나 같을 때 */
				}else{
					/* 끝페이지번호를 총페이지로 번호로 설정  */
					ep = tp;
					for(var i = sp; i <= ep; i++){
						str += '<a class="paging" href="javascript:void(0)" id="pageNum'+i+'" onclick="javascript:pagination_techBoardList('+i+', \''+categoryName+'\', '+sp+', '+ep+');">'+i+'</a>'
					}
					str = '<a href="javascript:void(0)" class="pageMove" onclick="javascript:pageMove('+size+', '+cp+', \'pre\')">이전</a>'+str;
				}
		/* 이전 페이지 */
		}else if (flag == 'pre'){
			/* 비동기방식으로 처리한 하단 페이징 부분 html코드를 담을 변수 */
			var str = '';
			/* 이전 버튼을 클릭했기 때문에 시작번호, 끝번호를 감소시켜준다*/
			sp -= size;
			ep = sp+(size-1);;
			/* 현재 끝페이지를 현재페이지로 지정 */
			cp = ep;
				/* 시작페이지가 1이라면 이전버튼 안보이게*/
				if(sp == 1){
					for(var i = sp; i <= ep; i++){
						str += '<a class="paging" href="javascript:void(0)" id="pageNum'+i+'" onclick="javascript:pagination_techBoardList('+i+', \''+categoryName+'\', '+sp+', '+ep+');">'+i+'</a>'
					}
					str += '<a href="javascript:void(0)" class="pageMove" onclick="javascript:pageMove('+size+', '+cp+', \'next\')">다음</a>'
				}else{
					str += '<a href="javascript:void(0)" class="pageMove" onclick="javascript:pageMove('+size+', '+cp+', \'pre\')">이전</a>'
					for(var i = sp; i <= ep; i++){
						str += '<a class="paging" href="javascript:void(0)" id="pageNum'+i+'" onclick="javascript:pagination_techBoardList('+i+', \''+categoryName+'\', '+sp+', '+ep+');">'+i+'</a>'
					}
					str += '<a href="javascript:void(0)" class="pageMove" onclick="javascript:pageMove('+size+', '+cp+', \'next\')">다음</a>'
				}
			}
			$("#pagination").html(str);
			
			
			/* 다음 버튼을 누르면 다음 페이지의 데이터를 불러와야 함*/
			if(categoryName == ''){
				pagination_techBoardList(cp, categoryName);
			}else if(categoryName != ''){
				pagination_techBoardList(cp, categoryName);
			}
	}
	
	
	/* 메인페이지 화면생성, 게시판 데이터 불러오기 및 페이징 처리 */
	function pagination_techBoardList(currentPage, cat_cname){
		$.ajax({
			url : './techBoardList.do',
			type : 'POST',
			data: { 'currentPage' : currentPage, 'cat_cname' : cat_cname },
			dataType: 'json',
			beforeSend : function(xmlHttpRequest){
				xmlHttpRequest.setRequestHeader("AJAX", "true");
			},
			success:function(data){
				
				/* 페이징에 필요한 변수 */
				/* 현재 페이지 */
				cp = currentPage; 
				/* 한번에 게시될 페이지 리스트 */
				size = data.boardVO.pageSize;
				/* 현재 페이지 리스트의 마지막 페이지 번호 */
				ep = Math.ceil(currentPage/size)*10;
				/* 현재 페이지 리스트의 첫 페이지 번호 */
				sp = (ep-size)+1;
				/* 총 페이지 갯수*/
				tp = Math.ceil(data.resultCnt/data.paginationInfo.recordCountPerPage);
				/* 카테고리명 */
				categoryName = cat_cname;
				/* 현재 접속자 */
				user_id = data.resultUserInfo.user_id;

				
				/* 상단 헤더부분 메뉴 버튼 생성 */
				var menuDiv = document.getElementById("menu");
				
				if(menuDiv.hasChildNodes() == false){
					/* OOO님 환영합니다. */
					var welcomeUser = document.createElement("span");
					welcomeUser.setAttribute("id", "welcome_user");
					welcomeUser.setAttribute("style", "margin-right: 20px;");
					welcomeUser.innerText = user_id + "님 환영합니다."
					
					/* 사용자관리 버튼 생성*/
					var manageUserButton = document.createElement("a");
					manageUserButton.setAttribute("href", "javascript:void(0)");
					manageUserButton.setAttribute("class", "btn_menu");
					manageUserButton.setAttribute("onclick", "openModal_manageUser()");
					manageUserButton.innerText = "사용자관리";
					/* 사용자관리 버튼 아이콘 생성 */
					var usersIcon = document.createElement("i");
					usersIcon.setAttribute("class", "big grey users icon");
					manageUserButton.prepend(usersIcon);
					
					/* 정보수정 버튼 생성 */
					var updateUserButton = document.createElement("a");
					updateUserButton.setAttribute("href", "javascript:void(0)");
					updateUserButton.setAttribute("id", "update_btn");
					updateUserButton.setAttribute("class", "btn_menu");
					updateUserButton.setAttribute("onclick", "updateUserInfo()");
					updateUserButton.innerText = "정보수정";
					/* 정보수정 버튼 아이콘 생성 */
					var updateIcon = document.createElement("i");
					updateIcon.setAttribute("class", "big grey edit outline icon");
					updateUserButton.prepend(updateIcon);
					
					/* 로그아웃 버튼 생성*/
					var logoutButton = document.createElement("a");
					logoutButton.setAttribute("href", "javascript:void(0)");
					logoutButton.setAttribute("id", "logout_btn");
					logoutButton.setAttribute("class", "btn_menu");
					logoutButton.setAttribute("onclick", "logout()");
					logoutButton.innerText = "로그아웃";
					/* 로그아웃 버튼 아이콘 생성*/
					var logoutIcon = document.createElement("i");
					logoutIcon.setAttribute("class", "big grey power off icon");
					logoutButton.prepend(logoutIcon);
						
					menuDiv.appendChild(welcomeUser);
					/* 관리자 계정으로 접속했다면 사용자 관리버튼 생성 */
					if(data.resultUserInfo.user_rank == 1){
						menuDiv.appendChild(manageUserButton);
					}
					menuDiv.appendChild(updateUserButton);
					menuDiv.appendChild(logoutButton);
				}
				
				/* 게시글 하단 게시글 추가,삭제버튼 생성 */
				var manageBoardList = document.getElementById("manageBoardListBtn");
				
				if(manageBoardList.hasChildNodes() == false){
					/* 게시글 삭제 버튼 생성 */
					var deleteList = document.createElement("a");
					deleteList.setAttribute("href", "javascript:void(0)");
					deleteList.setAttribute("class", "btn_menu");
					deleteList.setAttribute("onclick", "javascript:deleteTechBoardList();");
					deleteList.setAttribute("style", "float: right; margin-left: 10px;");
					deleteList.innerText = "삭제";
					/* 게시글 삭제 버튼 아이콘 생성 */
					var deleteListIcon = document.createElement("i");
					deleteListIcon.setAttribute("class", "grey big trash alternate icon")
					deleteList.prepend(deleteListIcon);
					
					/* 게시글 추가 버튼 생성*/
					var addList = document.createElement("a");
					addList.setAttribute("href", "javascript:void(0)");
					addList.setAttribute("class", "btn_menu");
					addList.setAttribute("onclick", "javascript:openModal_insertTechBoardList();");
					addList.setAttribute("id", "addList");
					addList.setAttribute("style", "float: right;");
					addList.innerText = "게시글 추가";
					/* 게시글 추가 버튼 아이콘 생성 */
					var addListIcon = document.createElement("i");
					addListIcon.setAttribute("class", "grey big plus circle icon");
					addList.prepend(addListIcon);
					
					if(data.resultUserInfo.user_rank == 1){
						manageBoardList.appendChild(deleteList);
					}
					manageBoardList.appendChild(addList);
				}
				
				/* 카테고리 목록 불러오기 & 카테고리 버튼 생성 */
				var categoryDiv = document.getElementById("category");
				
				if(categoryDiv.hasChildNodes() == false){
					var categoryButton = document.createElement("button");
						categoryButton.setAttribute("class", "ui grey button");
						categoryButton.setAttribute("onclick", "javascript:pagination_techBoardList(1, '')");
						categoryButton.innerText = "전체";
						categoryDiv.appendChild(categoryButton);
					
					for(var i = 0; i < data.resultCategory.length; i++){
						categoryList[i] = data.resultCategory[i].cat_cname;
						
						var categoryButton = document.createElement("button");
						categoryButton.setAttribute("class", "ui grey button");
						categoryButton.setAttribute("onclick", "javascript:pagination_techBoardList(1, '"+data.resultCategory[i].cat_cname+"')");
						categoryButton.innerText = data.resultCategory[i].cat_cname;
						categoryDiv.appendChild(categoryButton);
					}
				}
				
				/* 관리자기능 -체크박스 ColGroup 생성*/
				var listColGroup = document.getElementById("listColGroup");
				var col = document.createElement("col");
				col.setAttribute("width", "10px");
				if(listColGroup.childElementCount == 6 && data.resultUserInfo.user_rank == 1){
					listColGroup.appendChild(col)
				}
				/* 관리자기능 -체크박스 tr, th 생성*/
				var listTr = document.getElementById("listTr");
				var listTh = document.createElement("th")
				var listInput = document.createElement("input");
				listInput.setAttribute("type", "checkbox");
				listInput.setAttribute("id", "allCheck");
				listInput.setAttribute("onclick", "javascript:allCheck()");
				listTh.appendChild(listInput);
				
				if(listTr.childElementCount == 6 && data.resultUserInfo.user_rank == 1){
					listTr.appendChild(listTh);
				}
				

				var arr = [];
				
				/* 비동기방식으로 불러온 데이터가 남아있는 경우가 있어 비동기로 불러온 데이터도 비워준다. */
				$(".tr-async").empty();
				
				
				for(var i = 0; i < data.resultList.length; i++){
					arr[i] = '<td>'+data.resultList[i].post_pnum+'</td>'
							+'<td>'+data.resultList[i].cat_cname+'</td>'
							+'<td class="td-title" onclick="moveToDetail('+data.resultList[i].post_pnum+');">'+data.resultList[i].post_title+'</td>'
							+'<td>'+data.resultList[i].user_id+'</td>'
							+'<td>'+data.resultList[i].post_regdate+'</td>'
							+'<td>'+data.resultList[i].post_hits+'</td>'
							if(data.resultUserInfo.user_rank == 1){
								arr[i] += '<td><input type="checkbox" id="list_chk'+data.resultList[i].post_pnum+'" name="post_pnum" value="'+data.resultList[i].post_pnum+'"  onclick="javascript:singleCheck('+data.resultList[i].post_pnum+')" /></td>'
							}
					
				/* 비동기방식으로 불러온 데이터들로 테이블의 행들을 채운다 */
					$("#tr-async"+(i+1)+"").html(arr[i])
				}
				
				/* 카테고리를 클릭했을 경우*/
				var str = '';
				if(categoryName != ''){
					if(ep < tp){
						for(var i = sp; i <= ep; i++){
							str += '<a class="paging" href="javascript:void(0)" id="pageNum'+i+'" onclick="javascript:pagination_techBoardList('+i+', \''+categoryName+'\', '+sp+', '+ep+');">'+i+'</a>'
						}
						str += '<a href="javascript:void(0)" class="pageMove" onclick="javascript:pageMove('+size+', '+cp+', \'next\')">다음</a>'
					
					}else{
						ep = tp
						for(var i = sp; i <= ep; i++){
							str += '<a class="paging" href="javascript:void(0)" id="pageNum'+i+'" onclick="javascript:pagination_techBoardList('+i+', \''+categoryName+'\', '+sp+', '+ep+');">'+i+'</a>'
						}
					}
					/* 전체 조회인 경우 */
				}else{
					if(ep < tp){
						
						/* 시작페이지가 1이라면 '이전'버튼 안보이게*/
						if(sp == 1){
							
							for(var i = sp; i <= ep; i++){
								str += '<a class="paging" href="javascript:void(0)" id="pageNum'+i+'" onclick="javascript:pagination_techBoardList('+i+', \''+categoryName+'\', '+sp+', '+ep+');">'+i+'</a>'
							}
							str += '<a href="javascript:void(0)" class="pageMove" onclick="javascript:pageMove('+size+', '+cp+', \'next\' )">다음</a>'
							
						}else{
							str += '<a href="javascript:void(0)" class="pageMove" onclick="javascript:pageMove('+size+', '+cp+', \'pre\')">이전</a>'
							for(var i = sp; i <= ep; i++){
								str += '<a class="paging" href="javascript:void(0)" id="pageNum'+i+'" onclick="javascript:pagination_techBoardList('+i+', \''+categoryName+'\', '+sp+', '+ep+');">'+i+'</a>'
							}
							str += '<a href="javascript:void(0)" class="pageMove" onclick="javascript:pageMove('+size+', '+cp+', \'next\')">다음</a>'
							
						}
					/* 그 외의 경우, 끝페이지가 총페이지보다 크거나 같을 때 */
					}else{
						/* 끝페이지번호를 총페이지로 번호로 설정  */
						ep = tp;
						for(var i = sp; i <= ep; i++){
							str += '<a class="paging" href="javascript:void(0)" id="pageNum'+i+'" onclick="javascript:pagination_techBoardList('+i+', \''+categoryName+'\', '+sp+', '+ep+');">'+i+'</a>'
						}
					}
				}
				$("#pagination").html(str);
				
				/* 게시판 하단 현재 페이지 표시*/
				for(var i = sp; i <= ep; i++){
					$("#pageNum"+i+"").css("color", "black");
				}
				$("#pageNum"+cp+"").css("color", "red");
				
				
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
		})
	}