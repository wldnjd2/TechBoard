/**
 * 
 */

/* 게시글 추가 창 열기 */
function openModal_insertTechBoardList() {
	$(".bg_addList").css("display", "flex");

	var str = '';

	for (var i = 0; i < categoryList.length; i++) {
		str += '<option value="' + categoryList[i] + '">' + categoryList[i]
				+ '</option>'
	}
	str = '<option value="">선택</option>' + str;
	$("#category_addList").html(str)
}

/* 게시글 추가 창 닫기 */
function closeModal_insertTechBoardList() {
	$(".bg_addList").css("display", "none")
}

/* 게시글 추가 버튼 클릭 후 처리*/
function insertTechBoardListOk(post_contents) {

	if ($("#category_addList option:selected").val() == "") {
		alert("게시글 카테고리를 선택하세요.")
		return;
	} else if ($("#title_addList").val() == "") {
		alert("제목을 입력하세요.")
		$("#title_addList").focus();
		return;
	} else if (post_contents == "") {
		alert("내용을 입력하세요.")
	}

	$("#post_contents_addList").val(post_contents)
	$("#user_id_addList").val(user_id)

	var formData = $("#frm_addList").serialize();

	$.ajax({
		type : "POST",
		data : formData,
		url : "./insertTechBoardList.do",
		dataType : "json",
		success : function(data) {
			alert(data.msg)
			var str = '';

			for (var i = 0; i < categoryList.length; i++) {
				str += '<option value="' + categoryList[i] + '">'
						+ categoryList[i] + '</option>'
			}
			str = '<option value="">선택</option>' + str;

			$("#category_addList").html(str)

			$("#title_addList").val('');
			myClassicEditor.setData('');
			$("#image_addList").val('');
			pagination_techBoardList(1, '');
			closeModal_insertTechBoardList();
		},
		error : function(error) {
			console.log(error)
		}
	})
}

/* 이미지파일 인코딩 */
function encodingImgFile(event) {

	var reader = new FileReader();
	reader.readAsDataURL(event.target.files[0]);
	reader.onload = function(event) {

		$("#post_img_addList").val(event.target.result);

	}
}
