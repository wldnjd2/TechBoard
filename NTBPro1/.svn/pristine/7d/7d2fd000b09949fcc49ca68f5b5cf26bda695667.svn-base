/*모달창 닫기*/
function closeModal() {
	$(".detailModal_hidden").css("display", "none");
}

/*게시글 클릭 시 상세정보로 이동 */
function moveToDetail(post_pnum){
	$.ajax({
		url: "./selectBoardDetail.do",
		type: "POST",
		dataType: "json",
		data: {'post_pnum' : post_pnum},
		success: function(data){
			
			//Display Modal
			$(".detailModal_hidden").css("display", "flex");
			
			/*데이터 불러오기*/
			//댓글 불러오기
			replyList(post_pnum);
			//좋아요 개수 불러오기
			var replyLikeCount = data.replyLikeCount;
			var LikeCount = document.getElementById('likeCount_div');
			$("#likeCount_div").html("좋아요 : "+replyLikeCount);
			//좋아요 불러오기
			var Like = document.getElementById('post_like');
			Like.innerText ='';
			if(data.replyLikeShow == null) {
				Like.innerText +='♡';
				Like.setAttribute('onclick', "LikeAdd(" + post_pnum +")" );
			}else {
				Like.innerText += '♥';
				Like.setAttribute('onclick', "LikeCancel(" + post_pnum +")" );
			}
			//싫어요 개수 불러오기
			var replyHateCount = data.replyHateCount;
			$("#HateCount_div").html("싫어요 : "+replyHateCount);
			//싫어요 불러오기
			var Hate = document.getElementById('post_hate');
			Hate.innerText = '';
			if(data.replyHateShow == null) {
				Hate.innerText +='싫어요';
				Hate.setAttribute('onclick', "HateAdd(" + post_pnum +")" );
						
			}else {
				Hate.innerText += '싫어요 취소';
				Hate.setAttribute('onclick', "HateCancel(" + post_pnum +")" );
			}
			console.log(data)
			
			//작성자 이미지 갖고 오기
			var writerImg = data.writerImage;
			var writerImageDiv = document.getElementById("writer_img");
			writerImageDiv.src = writerImg;
			
			//게시글 작성자 인지 확인해서 버튼 노출
			var manageDiv = document.getElementById("manageDiv");
			var guestDiv = document.getElementById("guestDiv");
			if(data.compare_boardwriter == 1) { //게시글 작성자로 접속
				manageDiv.style.display= "block";
				guestDiv.style.display= "none";
			}else {  //게스트로 접속
				guestDiv.style.display= "block";
				manageDiv.style.display= "none";
			}
			
			//컨트롤러에서 데이터 가져와서 jsp에서 데이터 출력
			$("#post_pnum").html(data.resultVO.post_pnum);
			$("#post_regdate").html(data.resultVO.post_regdate);
			$("#post_title").html(data.resultVO.post_title);
			$("#detail_post_contents").html(data.resultVO.post_contents);
			//이미지
			$("#post_img").attr("src", data.resultVO.post_img);
			$("#post_hits").html(data.resultVO.post_hits);
			$("#user_id").html(data.resultVO.user_id);
			$("#cat_cname").html(data.resultVO.cat_cname);
			
//수정중------첨부파일
// 				$("#detil_post_file").html(data.resultVO.post_file);
// 				$("#detail_post_fname").html(data.resultVO.post_fname);
// 				$("#detail_post_file").attr("href", data.resultVO.post_file )
				
		},
		error: function (e){
			console.log(e);
		}
	});
}

/*게시글 삭제*/
function deleteModalDetail(post_pnum){
	
	data = {"post_pnum" : post_pnum}
	$.ajax({
		url: "./deleteBoardDetail.do",
		type: "POST",
		dataType: "json",
		data: data,
		success: function(data){
			//모달창 닫기
			closeModal()
			//메인페이지를 로드한다
			pagination_techBoardList(1, '')
		},
		error: function(e){
			console.log(e)
		}
	});
}
	
/*db에 댓글 데이터 insert*/
function replyInsert(post_pnum){
	
	//댓글 글자열 변수에 옮김
	var rep_contents =$('#rep_contents').val();
		
	//유효성 검사
	if(rep_contents == 0){
		alert("댓글을 입력하세요.")
	}else{
		
		var insertData = {
					"rep_contents" : rep_contents,
					"post_pnum" : post_pnum,
					 };
		$.ajax({
			url: "./insertBoardReply.do",
			type: "POST",
			dataType: "json",
			data: insertData,
			success: function(data){
				//저장된 댓글 불러오기
				replyList(post_pnum);
			},
			error: function(e){
				console.log(e);
			}
		});
	}
}

/*댓글 불러오기*/
function replyList(post_pnum){
	$.ajax({
		url: "./selectBoardReplyList.do",
		type: "POST",
		dataType: "json",
		data: {'post_pnum' : post_pnum},
		success: function(data){
			
			var resultList = data.resultVO;
			var resultList_CNT = data.resultVO_CNT;
			var replyModal = document.getElementById("replyModal");
			
			//댓글 총 갯수 불러오기
			$("#rep_rnum_CNT").html(resultList_CNT);
			
			//댓글 불러오기 초기화
			replyModal.innerHTML = '';
			
			for(var i = 0 ; i<resultList.length; i++){
				
				//태그 요소 생성
				var rep_rnum_result = resultList[i].rep_rnum;
				var replyModal_div1 = document.createElement("div");
				var replyModal_div2 = document.createElement("div");
				var clean_div = document.createElement("div");
				replyModal_div1.setAttribute('class', "reply_div")
				replyModal_div2.setAttribute('id',"contentsReset"+rep_rnum_result);
				clean_div.setAttribute('class', "clear");
					
				var replyModal_modButton = document.createElement("button");
				replyModal_modButton.setAttribute('onclick',"replyUpdateWindow("+rep_rnum_result + ", " + post_pnum+")");
				replyModal_modButton.setAttribute('class', "ui primary button fr");
				
				var replyModal_delButton = document.createElement("button");
				replyModal_delButton.setAttribute('onclick',"replyDelete("+rep_rnum_result + ", " + post_pnum+")");
				replyModal_delButton.setAttribute('class', "ui primary button fr");
				
				var replyModal_br = document.createElement("br");
				
				
				replyModal_div1.innerText =
						'작성자 : '+resultList[i].user_id+" | "+
						'작성일 : '+ resultList[i].rep_regdate;
					
				replyModal_div2.innerText =
						'내용 : '+resultList[i].rep_contents;
				
				replyModal_modButton.innerText = "수정";
				replyModal_delButton.innerText = "삭제";
				
				replyModal.append(replyModal_div1);
				replyModal.append(clean_div);
				replyModal_div1.append(replyModal_div2);
				replyModal_div2.append(replyModal_br);
				replyModal_div2.append(replyModal_br);
				
				replyModal_div2.append(replyModal_modButton);	
				replyModal_div2.append(replyModal_delButton);	
			}
		},
		error: function(e){
			console.log(e);
		}
	});
}

/*댓글 수정 버튼 누르면 textarea 띄우기 */		
function replyUpdateWindow(rep_rnum_result, post_pnum){
		
	var contentsReset = document.getElementById("contentsReset"+rep_rnum_result);
	contentsReset.innerHTML = '';
		
	var replyModal_text = document.createElement("textarea");
	replyModal_text.setAttribute('id', "replyModal_text_val");
	
	var replyModal_saveButton = document.createElement("button");
	replyModal_saveButton.setAttribute('class', "ui primary button fr");
	replyModal_saveButton.setAttribute('id', "modify_save_btn");
	replyModal_saveButton.setAttribute('onclick', "replyUpdateSave("+rep_rnum_result + ", " + post_pnum +" )")
	replyModal_saveButton.innerText = "수정완료";
	
	var replyModal_br = document.createElement("br");
		
	contentsReset.append(replyModal_text);
	contentsReset.append(replyModal_saveButton);
}
		
/*댓글 수정완료 저장 */
function replyUpdateSave(rep_rnum_result, post_pnum){
	var replyModal_text_val = document.getElementById("replyModal_text_val").value;
	
	var updateDataSave = {
				"rep_rnum" : rep_rnum_result,
				"post_pnum" : post_pnum,
				"rep_contents" : replyModal_text_val
				 };
	$.ajax({
		url: "./updateBoardReplyList.do",
		type: "POST",
		dataType: "json",
		data: updateDataSave,
		success: function(data){
			//저장된 댓글 불러오기
			replyList(post_pnum)
		},
		error: function(e){
			console.log(e)
		}
	});
}

/*댓글 삭제*/
function replyDelete(rep_rnum_result, post_pnum){
	var deleteData = {
		"rep_rnum" : rep_rnum_result,
		"post_pnum" : post_pnum
	}
	$.ajax({
		url: "./deleteBoardReplyList.do",
		type: "POST",
		dataType: "json",
		data: deleteData,
		success: function(data){
			//저장된 댓글 불러오기
			replyList(post_pnum)
		},
		error: function(e){
			console.log(e)
		}
	});
}

/*db에 좋아요 데이터 insert*/ 
function LikeAdd(post_pnum){
	data = {"post_pnum" : post_pnum}
	$.ajax({
		url: "./replyLikeAdd.do",
		type: "POST",
		dataType: "json",
		data: data,
		success: function(data){
			moveToDetail(post_pnum);
			
		},
		error: function(e){
			console.log(e)
		}
	});
}
	
/*좋아요 취소 delete*/
function LikeCancel(post_pnum){
	$.ajax({
		url: "./replyLikeCancel.do",
		type: "POST",
		dataType: "json",
		data: {"post_pnum" : post_pnum},
		success: function(data){
			moveToDetail(post_pnum);
		},
		error: function(e){
			console.log(e)
		}
	});
}

/*db에 싫어요 데이터 insert*/ 
function HateAdd(post_pnum){
	$.ajax({
		url: "./replyHateAdd.do",
		type: "POST",
		dataType: "json",
		data: {"post_pnum" : post_pnum},
		success: function(data){
			moveToDetail(post_pnum);
				
		},
		error: function(e){
			console.log(e)
		}
	});
}
	
/*싫어요 delete*/
function HateCancel(post_pnum){
	$.ajax({
		url: "./replyHateCancel.do",
		type: "POST",
		dataType: "json",
		data: {"post_pnum" : post_pnum},
		success: function(data){
			moveToDetail(post_pnum);
		},
		error: function(e){
			console.log(e)
		}
	});
}
	

	
//수정중----------게시판 상세내용 수정
//function modifyModalDetail(post_pnum){
//	
//	//수정완료버튼
//	var modifyDetailFinish = document.createElement("button");
//	modifyDetailFinish.innerText = '수정완료';
//	//취소 버튼
//	var modifyDetailCancel = document.createElement("button");
//	modifyDetailCancel.innerText = '취소';
//		
//	//작성일 textarea 객체 생성
//	var regdate_text = document.createElement("textarea");
//		
//	//제목
//	var postTitle = document.getElementById("post_title");
//	var postTitle_text = document.createElement("input");
//	postTitle_text.setAttribute('type',"text");
//	postTitle.append(postTitle_text);
//	//내용
//	var postTitle = document.getElementById("post_title");
//	var postTitle_text = document.createElement("input");
//	postTitle_text.setAttribute('type',"text");
//	postTitle.append(postTitle_text);
//	//이미지
//	var postTitle = document.getElementById("post_title");
//	var postTitle_text = document.createElement("input");
//	postTitle_text.setAttribute('type',"text");
//	postTitle.append(postTitle_text);
//		
//	data = {"post_pnum" : post_pnum}
//	$.ajax({
//		url: "./updateBoardDetail.do",
//		type: "POST",
//		dataType: "json",
//		data: data,
//		success: function(data){
//			
//		},
//		error: function(e){
//			console.log(e)
//		}
//	});
//}

