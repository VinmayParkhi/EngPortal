 var moodcount = 0; 
 	var text;
 	var username;
 	var EmpId;
 	var Dept;
 	var Loc;
 $(document).ready(function() { 
 
 $(".emojiCloneClone").on("click", function() { 
 		username = $("#username").text();
 		Dept = $("#dept").html();
 		Loc = $("#loc").html();
 		EmpId = $("#userEmail").text();
 		text = $(this).find("input").val();		
 		$("#BtnSubmitCountclone").removeClass("disabled");
 	}); 
 });  
 
 function moodCountClone(){
  		EmpMoodCountCheckClone()
  }

function EmpMoodCountCheckClone(){  	
  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPMoodMeterListItem'},
   		"Mood":text,
		"Title":username,
		"EmpLocation":Loc,
		"EmpDepartment":Dept
  	};
  	  	$.ajax({
		url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPMoodMeter')/items",
		type: "POST",
		contentType: "application/json; odata=verbose",
		data:JSON.stringify(item),
		headers: {
			"Accept": "application/json; odata=verbose",
			"X-RequestDigest":$("#__REQUESTDIGEST").val(),			
		},
		success:OnSuccess,
		error:OnError
	});
	function OnSuccess(data){
	}
    function OnError(data){
	}
};
