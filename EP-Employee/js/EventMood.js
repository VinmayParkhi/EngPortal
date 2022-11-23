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
var userId = _spPageContextInfo.userId;
var Pillar;
var EvDate;
$(document).ready(function() { 

  	var url=window.location.href;
        uniquID= Number(url.split('=')[1]);
        EmpId = $("#EMpID").text();
        Ed= $("#EvDate").text();
        Ed= $(".endTime").text();
        Edt= moment(Ed+' '+ Et).format('YYYY-MM-DDTHH:mm');        
        EventMoodonLoad(uniquID);
        
  	$(".emoji-1").on("click", function(){
  			text = $(this).find("h6").html();
  			EvTitle = $(".eventdtlsTitleLeft h5 label").html();
			Pillar = $(".eventdtlsTitleLeft h6 i label").html();
			EvDate = $("#EvDate").html();
			CheckRatingEventList(text,EvTitle,Pillar,EvDate);
			//alert("test"+text);
			EventMoodCount(text);
  	});
  	$(".emoji-2").on("click", function(){
  			text = $(this).find("h6").html();
  			EvTitle = $(".eventdtlsTitleLeft h5 label").html();
			Pillar = $(".eventdtlsTitleLeft h6 i label").html();
			EvDate = $("#EvDate").html();
			CheckRatingEventList(text,EvTitle,Pillar,EvDate);
			EventMoodCount(text);
  	})
	$(".emoji-3").on("click", function(){
  			text = $(this).find("h6").html();
  			EvTitle = $(".eventdtlsTitleLeft h5 label").html();
			Pillar = $(".eventdtlsTitleLeft h6 i label").html();
			EvDate = $("#EvDate").html();
			CheckRatingEventList(text,EvTitle,Pillar,EvDate);
			EventMoodCount(text);
  	})
  	

  	});
  	
function EventMoodCount(moodValue){
	var userId = _spPageContextInfo.userId;

  $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEventMood')/items?$select=ID,Title&$filter=AuthorId eq "+userId+" and EventID eq "+uniquID+"",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
        	success: function (data, status, xhr) {
            dataresults = data.d.results;
            //console.log(dataresults);
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
 
  	
  	function CheckRatingEventList(moodValue,EvTitle,Pillar,EvDate){
    var userId = _spPageContextInfo.userId;
  $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPRating')/items?$select=ID,Title&$filter=EmpID eq "+userId+" and EventID eq "+uniquID+"",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
            success: function (data, status, xhr) {
            dataresults = data.d.results;
            console.log(dataresults);
                if(data.d.results.length > 0){
                    //alert("already Exist")
                }else{
                    MainListUpdate(userId,uniquID,text,EvTitle,Pillar,EvDate);                
                }
            }
     });    
}
  	
function EventMoodonLoad(uniquID){
	var userId = _spPageContextInfo.userId;

  $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEventMood')/items?$select=ID,Title&$filter=AuthorId eq "+userId+" and EventID eq "+uniquID+"",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
        success: function (data, status, xhr) {
           var dataresults = data.d.results;
            //console.log(dataresults.length);
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
GetEventMoodCountInList();
}

function ErrorFunction(error) {
}

function CreateMoodItem(userId,uniquID,moodValue) {
		 
 	var	Dept = $("#dept").html();
 	var	Loc = $("#loc").html();
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEventMood')/items"
	var data = {
		__metadata: { 'type': 'SP.Data.EPEventMoodListItem' },
  		"MoodStatus":moodValue,
  		"EventID":String(uniquID),
		"EmpID":String(userId),
 		"Location":Loc,
		"Department":Dept

	}
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
		success: SuccessFunctionCreate,
		error: ErrorFunction
	});
}

function SuccessFunctionCreate(data) {

GetEventMoodCountInList(uniquID);
}

function ErrorFunction(error) {
}

function GetEventMoodCountInList(){
		var ExcitedMood = 0;
		var NotExcited = 0;
		var NotSure = 0;
		
		$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEventMood')/items?$select=ID,EventID,Title,MoodStatus&$filter=EventID eq "+uniquID+" &$order By = Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
			for(i=0; i < dataresults.length; i++){
               	if (dataresults[i].MoodStatus == "Excited"){
			           ExcitedMood++;
			    }else  if (dataresults[i].MoodStatus == "Not Excited"){
			           NotExcited++;
			    }else if (dataresults[i].MoodStatus == "Not Sure"){
			           NotSure++;
                }else{
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
		"Excited":String(ExcitedMood),
		"NotExcited":String(NotExcited),
		"NotSure": String(NotSure)
		}

	$.ajax({
		url: siteUrl,
		type: "POST",
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
}

function ErrorFunction(error) {
}


function MainListUpdate(userId,uniquID,moodValue,EvTitle,Pillar,EvDate) {
     var    Dept = $("#dept").html();
     var    Loc = $("#loc").html();
     var EmpName = _spPageContextInfo.userDisplayName;
     var EmpEmailID = _spPageContextInfo.userLoginName;
     var StartTime = $(".eventdtlsClockText div:nth-child(2) label span.startTime").html();
     var EndTime = $(".endTime").html();
     EndTime = EvDate+" "+EndTime;     
     StartTime = EvDate+" "+StartTime;
     var Duration = $(".duration").html();
     var siteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EPRating')/Items"
     var data = {
     __metadata: { 'type': 'SP.Data.EPRatingListItem' },
     "Title" : EmpName,
     "EmpEmailID": EmpEmailID,
     "MoodStatus":moodValue,
     "EventID":String(uniquID),
     "EmpID":String(userId),
     "Location":Loc,
     "Department":Dept,
     "EventTitle" : EvTitle,
     "Pillar" : Pillar,
     "EventDate": EvDate,
     "EventStartTime" : StartTime,
     "EventEndTime" : EndTime,
     "Duration" : Duration
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
        success: SuccessFunction,
        error: ErrorFunction
    });
}
function SuccessFunction(data) {
}
function ErrorFunction(error) {
}
