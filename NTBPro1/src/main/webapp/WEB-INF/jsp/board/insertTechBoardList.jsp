<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>게시글 추가</title>
<script src="https://cdn.ckeditor.com/ckeditor5/33.0.0/classic/ckeditor.js"></script>
<script src="<c:url value="js/board/insertTechBoardList.js" />"></script>
<link rel="stylesheet" href="<c:url value="css/board/insertTechBoardList.css" />">
</head>
<body>
    	<div class="bg_addList">
	    	<div class="modalBox_addList">
	    		<button style="display: block;" class="closeBtn_addList" onclick="javascript:closeModal_insertTechBoardList()">x</button>
	    			<div class="header_addList"><h1>게시글 작성</h1></div>
	    			
	    			<div class="body_addList">
	    			<form id="frm_addList">
		    			<input type="hidden" name="post_img" id="post_img_addList" />
		    			<input type="hidden" name="user_id" id="user_id_addList" />
		    			<input type="hidden" name="post_contents" id="post_contents_addList" />
		    			<div class="category_div">
	    					<label class="label_addList" for="category_addList">카테고리</label>
			    			<select style="width: 100px;" name="cat_cname" id="category_addList"></select>
	    				</div>
	    				<div class="title_div">
	    					<label class="label_addList" for="title_addList">제목</label>	
	    					<input style="width : 376px" type="text" name="post_title" id="title_addList" />
	    				</div>
	    				<div class="contents_div">
	    					<label class="label_addList" for="contents_addList">내용</label>
	    						
	    					<textarea id="contents_addList" rows="10" cols="50" name=""></textarea>
							<script src=<c:url value="/js/ckeditor/ckeditor.js"/>></script>
	    				</div>
	    				<div class="image_div">
	    					<label class="label_addList" for="image_addList">이미지선택</label>
	    					<input type="file" id="image_addList" onchange="javascript:encodingImgFile(event)" />
						</div>
	    			</form>
	    			</div>
	    			
	    			
	    			<div class="footer_addList">
	    				<input style="width: 100px; height: 30px;" type="button" value="등록" onclick="javascript:insertTechBoardListOk(myClassicEditor.getData())" />
	    			</div>
	    	</div>
	    </div>
</body>
</html>
