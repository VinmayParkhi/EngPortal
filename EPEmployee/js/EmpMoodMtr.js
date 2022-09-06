 var moodcount = 0; 
 	var text;
 	var username;
 	var EmpId;
 $(document).ready(function() { 
  $(".btnSubmit").on("click", function(){
  MoodMeterCheck1();
  });
 $(".emoji").on("click", function() { 
 		username = $("#username").text();
 		EmpId = $("#EMpID").text();
 		text = $(this).find("input").val();
 		//console.log("testdata :"+text);
 		//alert("Your mood now :- "+username);
		//alert("test"+text);
		$(".btnSubmit").removeClass("disabled");
 	}); 
 });  
function MoodMeterCheck1(){  	
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();	
	var output = d.getFullYear() + '/' + (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;
  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPMoodMeterListItem'},
   		"Mood":text,
		"EmpID":EmpId,
		//"MoodDate":output,
		"EmpName":username 
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
		alert("Update error");
	}
};

