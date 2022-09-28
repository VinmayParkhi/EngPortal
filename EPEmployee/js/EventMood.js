var EventID;
var EmpID;
var EmpId;
var Excited=0;
var NotExcited=0;
var NotSure=0;
var text;
var uniquID;
var Ed;
var Et;
var Edt;
$(document).ready(function() { 
  /*$(".emoji").on("click", function() { 
  		EventMoodCount();
 		
  	});*/
  	//GetEventMoodCount();
  	var url=window.location.href;
        uniquID= Number(url.split('=')[1]);
        EmpId = $("#EMpID").text();
        Ed= $("#EvDate").text();
        Ed= $(".endTime").text();
        Edt= moment(Ed+' '+ Et).format('YYYY-MM-DDTHH:mm');
        //EventdateTime = EventdateTime.format('YYYY-MM-DDTHH:mm:s')
               
        console.log("Unique Event Id"+uniquID);
        console.log("Unique Emp Id"+EmpId);
        
        EventMoodonLoad(uniquID);
        
  	$(".emoji-1").on("click", function(){
  			text = $(this).find("h6").html();
  			
			//alert("test"+text);
			EventMoodCount(text);
  	});
  	$(".emoji-2").on("click", function(){
  			text = $(this).find("h6").html();
			//alert("test"+text);
			EventMoodCount(text);
  	})
	$(".emoji-3").on("click", function(){
  			text = $(this).find("h6").html();
			//alert("test"+text);
			EventMoodCount(text);
  	})
  	

  	});
  	
function EventMoodCount(moodValue){
	var userId = _spPageContextInfo.userId;

  $.ajax({
<<<<<<< HEAD
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEventMood')/items?$select=ID,Title&$filter=AuthorId eq "+userId+" and EventID eq "+uniquID+"",
=======
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEventMood')/items?$select=ID,Title,Excited,NotExcited,NotSure&$filter=AuthorId eq "+userId+" and Excited eq "+uniquID+"",
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
        	success: function (data, status, xhr) {
            dataresults = data.d.results;
            console.log(dataresults);
                if(data.d.results.length > 0){
                	 if (moodValue == "Excited"){
			           
			           UpdateMood(data.d.results[0].ID,moodValue,uniquID);
			         }else if(moodValue == "Not Excited"){
			           
			           UpdateMood(data.d.results[0].ID,moodValue,uniquID);
			         }else if(moodValue == "Not Sure"){
			          
			           UpdateMood(data.d.results[0].ID,moodValue,uniquID);
			         }

                }else{
                	CreateMoodItem(userId,uniquID,moodValue);
                
                }
            }
     });    
 }
 
  	
function EventMoodonLoad(uniquID){
	var userId = _spPageContextInfo.userId;

  $.ajax({
<<<<<<< HEAD
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEventMood')/items?$select=ID,Title&$filter=AuthorId eq "+userId+" and EventID eq "+uniquID+"",
=======
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEventMood')/items?$select=ID,Title,Excited,NotExcited,NotSure&$filter=AuthorId eq "+userId+" and Excited eq "+uniquID+"",
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
        success: function (data, status, xhr) {
           var dataresults = data.d.results;
            console.log(dataresults.length);
                if(data.d.results.length > 0){
                	 if (data.d.results[0].MoodStatus == "Excited"){
			           //alert("Excited");
			           $(".borderLinear1").addClass("test")
			    }else  if (data.d.results[0].MoodStatus == "Not Excited"){
			           //alert("Not Excited");
			           $(".borderLinear2").addClass("test");
			         }else if (data.d.results[0].MoodStatus == "Not Sure"){
			           //alert("Not Sure");
			           $(".borderLinear3").addClass("test");
			         }

                }else{
                	CreateMoodItem(userId,uniquID,moodValue);
                	
                }
            }
     });    
 }

 
 /*
function UpdateMood(id,moodValue){   
//alert("test")
	  	var item={
	  	 	__metadata: { 'type': 'SP.Data.EPEventMoodListItem' },	   		
	  	 	"MoodStatus":moodValue  	
   		};
  		console.log(item);
  	  	$.ajax({
		url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEventMood')/items("+id+")",
		type: "POST",
		contentType: "application/json; odata=verbose",
		data:JSON.stringify(item),
		headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val()		
		},
		success:OnSuccess,
		error:OnError
	});
	function OnSuccess(data){
		//alert("Sucessfully updated");
	}
    function OnError(data){
		alert("Update error"+data.responseText);
	}
}
*/


function UpdateMood(id,moodValue,uniquID) {
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEventMood')/items("+id+")"
	var item = {
		__metadata: { 'type': 'SP.Data.EPEventMoodListItem' },
  		"MoodStatus":moodValue	
  	}
	//console.log(data);
	$.ajax({
		url: siteUrl,
		type: "POST",
		async:false,
		data: JSON.stringify(item),
		headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val(),
				"IF-MATCH": "*",           
				"X-HTTP-Method": "MERGE"

		},
		success: SuccessFunction1,
		error: ErrorFunction
	});
}

function SuccessFunction1(data) {
//alert("test done");
GetEventMoodCount(uniquID);
//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function ErrorFunction(error) {
//alert('Error!' +error.responseText);
}







function CreateMoodItem(userId,uniquID,moodValue) {
		 
 	var	Dept = $("#dept").html();
 	var	Loc = $("#loc").html();
<<<<<<< HEAD
=======

>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEventMood')/items"
	var data = {
		__metadata: { 'type': 'SP.Data.EPEventMoodListItem' },
  		"MoodStatus":moodValue,
<<<<<<< HEAD
  		"EventID":uniquID,
		"EmpID":userId,
=======
  		"Excited":uniquID,
		"NotSure":userId,
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
 		"Location":Loc,
		"Department":Dept

		//"EventEndDate":Edt
	}
	console.log(data);
	$.ajax({
		url: siteUrl,
		type: "POST",
		async:false,
		data: JSON.stringify(data),
		headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val()
				

		},
		success: SuccessFunction3,
		error: ErrorFunction
	});
}

function SuccessFunction3(data) {

//UpdateEventMoodCountList(ExcitedMood,NotExcited,NotSure);
GetEventMoodCount(uniquID);
//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function ErrorFunction(error) {
//alert('Error!' +error.responseText);
}




function GetEventMoodCount(){
<<<<<<< HEAD
=======
		
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
		var ExcitedMood = 0;
		var NotExcited = 0;
		var NotSure = 0;
		
		$.ajax({
<<<<<<< HEAD
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEventMood')/items?$select=ID,EventID,Title,MoodStatus&$filter=EventID eq "+uniquID+" &$order By = Created desc",
=======
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEventMood')/items?$select=ID,Title,Excited,MoodStatus,NotExcited,NotSure&$filter=Excited eq "+uniquID+" &$order By = Created desc",
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            //var EventID = data.d.results[0].ID;
            console.log("EventID : "+EventID);
            //console.log(dataresults);
			for(i=0; i < dataresults.length; i++){
               	if (dataresults[i].MoodStatus == "Excited"){
			           //alert("Excited");
			           ExcitedMood++;
			           console.log("Excited MoodCount : "+ExcitedMood)
			    }else  if (dataresults[i].MoodStatus == "Not Excited"){
			           //alert("Not Excited");			           
			           NotExcited++;
			           console.log("Not Excited MoodCount : "+NotExcited)
			    }else if (dataresults[i].MoodStatus == "Not Sure"){
			           //alert("Not Sure");			           
			           NotSure++;
			           console.log("Not Sure MoodCount : "+NotSure)
                }else{
                	//CreateMoodItem(userId,uniquID,moodValue);
                }
            }
            UpdateEventMoodCountList(ExcitedMood,NotExcited,NotSure);
        }
     });
     
 }
 
 
 
 function UpdateEventMoodCountList(ExcitedMood,NotExcited,NotSure){
 	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items("+uniquID+")";
	var data = {
		__metadata: { 'type': 'SP.Data.EPEventListItem' },  		
		"Exited":String(ExcitedMood),
		"NotExcited":String(NotExcited),
		"NotSure": String(NotSure)
		

		//"EventEndDate":Edt
	}
	console.log(data);
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
<<<<<<< HEAD
		success: SuccessFunctionUpdate,
=======
		success: SuccessFunction,
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
		error: ErrorFunction
	});
}

<<<<<<< HEAD
function SuccessFunctionUpdate(data) {
alert("Done Succefully")
=======
function SuccessFunction(data) {

>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
}

function ErrorFunction(error) {
//alert('Error!' +error.responseText);
}

