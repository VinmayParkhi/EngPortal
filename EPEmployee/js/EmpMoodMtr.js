 var moodcount = 0; 
 	var text;
 	var username;
 	var EmpId;
 	var Dept;
 	var Loc;
 $(document).ready(function() { 
 
 $(".emoji").on("click", function() { 
 		username = $("#username").text();
 		Dept = $("#dept").html();
 		Loc = $("#loc").html();
 		EmpId = $("#userEmail").text();
 		text = $(this).find("input").val();		
 		$("#BtnSubmitCount").removeClass("disabled");
 	}); 
 });  
 
  $("#BtnSubmitCount").on("click", function(){
  		//MoodCountCheck();
  		MoodCountCheck()
  });

function MoodCountCheck(){  	
  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPMoodMeterListItem'},
   		"Mood":text,
<<<<<<< HEAD
		//"EmpID":EmpId,		
		"Title":username,
=======
		"EmpID":EmpId,		
		"EmpName":username,
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
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

