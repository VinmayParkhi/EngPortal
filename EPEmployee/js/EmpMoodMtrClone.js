 var moodcount = 0; 
 	var text;
 	var username;
 	var EmpId;
 	var Dept;
 	var Loc;
 $(document).ready(function() { 
 
 $(".emojiClone").on("click", function() { 
 		username = $("#username").text();
 		Dept = $("#dept").html();
 		Loc = $("#loc").html();
 		EmpId = $("#userEmail").text();
 		text = $(this).find("input").val();		
 		$("#BtnSubmitCount").removeClass("disabled");
 	}); 
 });  
 
  $("#BtnSubmitCountclone").on("click", function(){
  		//MoodCountCheck();
  		MoodCountCheckClone()
  });

function MoodCountCheckClone(){  	
  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPMoodMeterListItem'},
   		"Mood":text,
		"EmpID":EmpId,		
		"EmpName":username,
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
		//alert("Sucessfully updated");
	}
    function OnError(data){
		//alert("Update error");
	}
};
