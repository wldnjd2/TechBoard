/**
 * 
 */

	/* 체크박스 버튼을 클릭했을 때 해당되는 post_pnum을 담을 배열 */
	var techBoardListArr = [];
	
	/* 전체 체크박스 check*/
	function allCheck(){

		/* 전체 클릭하면*/
		if($("#allCheck").is(":checked")){
			/* 배열을 한번 초기화시켜주고 담기 위해 배열의 길이 0으로 설정*/
			techBoardListArr = [];
			/* 전체 체크박스 checked */
			$("input[name=post_pnum]").prop("checked", true)
			/* 각 행들의 post_pnum값을 가져옴*/
			$("input[name=post_pnum]").each(function(){
				techBoardListArr.push($(this).val());
			})

		}else{
			/* 전체 체크박스 checked 해제 */
			$("input[name=post_pnum]").prop("checked", false)
			/* 배열을 비운다. */
				techBoardListArr=[];

		}
	}
		
	/* 개별 체크박스 check*/
	function singleCheck(post_pnum){
		
		/* 개별 체크박스 체크했을 때 처리 */
		if($("#list_chk"+post_pnum+"").is(":checked")){
			techBoardListArr.push($("#list_chk"+post_pnum+"").val())

		}else{
			$("#allCheck").prop("checked", false)
			/* 개별 체크박스 체크 해제했을 때 처리 */	
			/* splice() 함수를 이용해 배열에서의 특정 값을 삭제 */
			for(var i = 0; i < techBoardListArr.length; i++){
				if(techBoardListArr[i] == $("#list_chk"+post_pnum+"").val()){
					techBoardListArr.splice(i, 1);
					i--;
				}
			}
						

		}
		
	}
	
	/* 관리자 기능 - 게시글 삭제 */
	function deleteTechBoardList(){
		if(techBoardListArr.length == 0 ){
			alert("삭제할 한 개 이상의 게시글을 선택하세요.")
		}else{
			if(confirm("선택한 게시글을 삭제하시겠습니까?")){
				$.ajax({
					url : './deleteTechBoardList.do',
					type : 'POST',
					traditional : true,
					data : { "techBoardListArr" : techBoardListArr },
					dataType : 'json',
					success:function(data){
						alert(data.msg);
						/* 배열 초기화*/
						techBoardListArr=[];
						if($("#allCheck").is(":checked")){
							$("#allCheck").prop("checked", false)
						}
						pagination_techBoardList(1, '');
						
					}
				})
			
			}else{
				return;	
			}
		}
		
	}