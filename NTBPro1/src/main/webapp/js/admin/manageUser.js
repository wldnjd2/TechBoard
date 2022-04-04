/**
 * 
 */

	/* 사용자 관리 창 열기 */
	function openModal_manageUser(){
		$(".bg_manageUser").css("display", "block");
		pagination_manageUser(1);
	}
	
	/* 사용자 관리 창 닫기*/
	function closeModal_manageUser(){
		$(".bg_manageUser").css("display", "none")
	}
	
	/* 사용자 목록 페이징 */
	function pagination_manageUser(cp){
			$.ajax({
				url: './manageUser.do',
				type : 'POST',
				data: { 'currentPage' : cp},
				dataType: 'json',
				beforeSend : function(xmlHttpRequest){
					xmlHttpRequest.setRequestHeader("AJAX", "true");
				},
				success:function(data){	
					
					/* 총 사용자 부분 업데이트 */
					$("#totalUser").html('총 사용자 : '+data.resultUserCnt+'(현재 접속 포함)');
					/* 비동기 페이징 - 데이터를 비우고 다시 채워줌. */
					$(".tr-async_manageUser").empty();
					var arr = [];
					for(var i = 0; i < data.resultUserList.length; i++){
						
						var rank = data.resultUserList[i].user_rank == 1 ? '관리자' : '회원 '
						
						arr[i] = '<td>'+data.resultUserList[i].user_name+'</td>'
								+'<td>'+data.resultUserList[i].user_id+'</td>'
								+'<td>'+rank+'</td>'
								+'<td><a href="javascript:void(0)" onclick="javascript:deleteUser(\''+data.resultUserList[i].user_id+'\');"><i class="grey large trash alternate outline icon"></i></a></td>'
								+'<td><a href="javascript:void(0)" onclick="javascript:updateUserRank(\''+data.resultUserList[i].user_id+'\', '+data.resultUserList[i].user_rank+');"><i class="grey large edit outline icon"></i></a></td>'
					/* 비동기방식으로 불러온 데이터들로 테이블의 행들을 채운다 */
						$("#tr-async_manageUser"+(i+1)+"").html(arr[i])
					}
					
					/* 비동기방식으로 하단 페이징 처리 */
					var resultCnt = data.resultUserCnt;
					var recordCountPerPage = data.accountVO.recordCountPerPage;
					var pageSize = data.accountVO.pageSize;
					var pageNum = Math.floor((resultCnt-1)%recordCountPerPage == 0 ? (resultCnt-1)/recordCountPerPage : (resultCnt-1)/recordCountPerPage +1)
					var page = '';
					
					if(pageNum < pageSize){
						for(var i = 0; i < pageNum; i++ ){
							page += '<a class="paging_admin" href="javascript:void(0)" id="pageNum_admin'+(i+1)+'" onclick="javascript:pagination_manageUser('+(i+1)+');">'+(i+1)+'</a>';
						}
					}else{
						for(var i = 0; i < pageSize; i++){
							page += '<a class="paging_admin" href="javascript:void(0)" id="pageNum_admin'+(i+1)+'" onclick="javascript:pagination_manageUser('+(i+1)+');">'+(i+1)+'</a>';
						}
					}
					
					
					$("#pagination_manageUser").html(page);
					$("#pageNum_admin"+cp+"").css("color", "red")
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
			})
			
	}
	
	/* 관리자기능 - 사용자 삭제 */
	function deleteUser(user_id){
			
		if(confirm("해당 사용자의 게시글이 모두 삭제됩니다.\n 사용자를 정말 삭제하시겠습니까?") == true){
		
		$.ajax({
			url : './deleteUser.do',
			type: 'POST',
			data: {'user_id' : user_id},
			dataType : 'json',
			success:function(data){
				alert(data.msg)
				
				/* 게시판 부분 reload */
				pagination_manageUser(1);
			},
			error:function(data){
				alert(data.msg)
			}
		})
		}else{
			return;
		}
	}
	
	/* 관리자기능 - 사용자 권한 변경 */
	function updateUserRank(user_id, user_rank){
		
		if(user_rank == 1){
			
			if(confirm("관리자 -> 회원으로 권한을 변경하시겠습니까?") == true){
				$.ajax({
					url : './updateUserRank.do',
					type : 'POST',
					data : {'user_id' : user_id, 'user_rank' : user_rank},
					dataType : 'json',
					success:function(data){
						alert(data.msg)
						
						/* 사용자 관리 게시판 reload */
						pagination_manageUser(1);
					},
					error:function(data){
						alert(data.msg)
					}
				})
			}else{
				return;
			}
		}else{
			if(confirm("회원-> 관리자로 권한을 변경하시겠습니까?") == true){
				$.ajax({
					url : './updateUserRank.do',
					type : 'POST',
					data : {'user_id' : user_id, 'user_rank' : user_rank},
					dataType : 'json',
					success:function(data){
						alert(data.msg)
						
						/* 사용자 관리 게시판 reload */
						pagination_manageUser(1);
					},
					error:function(data){
						alert(data.msg)
					}
				})
			}else{
				return;
			}
		}
		
	}