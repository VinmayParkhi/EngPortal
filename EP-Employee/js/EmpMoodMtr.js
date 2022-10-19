 var moodcount = 0; 
 	var text;
 	var username;
 	var EmpId;
 	var Dept;
 	var Loc;
 	var userId = _spPageContextInfo.userId;
 $(document).ready(function() { 
 
 $(".emoji").on("click", function() { 
 //alert("test data");
 		username = $("#username").text();
 		Dept = $("#dept").html();
 		Loc = $("#loc").html();
 		EmpId = $("#userEmail").text();
 		text = $(this).find("input").val();		
 		$(".btnSubmit").removeClass("disabled");
 	}); 
 });  
 
 function moodCount(){
  		EventMoodCount(text);
  }

function EventMoodCount(moodValue){
	var userId = _spPageContextInfo.userId;
	var today = new Date();
		today = moment.utc(today).format("YYYY-MM-DD")
  $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPMoodMeter')/items?$select=*&$filter=EmpID eq "+userId+" and MoodFlag eq 'Read'",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
        	success: function (data, status, xhr) {
            dataresults = data.d.results;
                if(data.d.results.length > 0){
                	var created = moment.utc(data.d.results[0].Created).format("YYYY-MM-DD");
                	if(today == created){
                	 	console.log("Created "+data.d.results[0].Created+" and ID"+data.d.results[0].ID);
                	 	UpdateMoodList(data.d.results[0].ID);
                	 }else{
                	 	EmpMoodCountCheck();
                	 }
                }else{
                	EmpMoodCountCheck();
                }
            }
     });    
 }
  
 function UpdateMoodList(listID){
 	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPMoodMeter')/items("+listID+")";
	var data = {
		__metadata: { 'type': 'SP.Data.EPMoodMeterListItem' },  		
		
		"MoodFlag" : "Unread"		

		//"EventEndDate":Edt
	}
	//console.log(data);
	$.ajax({
		url: siteUrl,
		type: "POST",
		//async:false,
		data: JSON.stringify(data),
		headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val(),
				"IF-MATCH":"*",
				"X-HTTP-Method":"MERGE"
		},
		success: SuccessFunctionUpdate,
		error: ErrorFunction
	});
}

function SuccessFunctionUpdate(data) {
alert("Success");
EmpMoodCountCheck();
}

function ErrorFunction(error) {
//alert('Error!' +error.responseText);
}

 
 
function EmpMoodCountCheck(){  	
  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPMoodMeterListItem'},
   		"Mood":text,
		"EmpID":String(userId),		
		"Title":username,
		"EmpLocation":Loc,
		"EmpDepartment":Dept,
		"MoodFlag" : "Read"
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
		alert("Sucessfully updated");
	}
    function OnError(data){
		alert("Update error");
	}
};

