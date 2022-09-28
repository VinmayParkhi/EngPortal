 var CurrentDate;
 var EventID;
 
 var ReminderDate;
 var ReminderMessage;
 //var EventEndTime;
 //var EventTime;
 var Status;

 $(document).ready(function() {
 $(".redDot").addClass("d-none");

    ReminderMessage();
    PastReminder();
   
    

 });

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}
setInterval(ReminderMessage, 45000);
function ReminderMessage() {
	var userId = _spPageContextInfo.userId;
	var today= moment().format('YYYY-MM-DD HH:mm'); 	
//today = moment(today).format('YYYY-MM-DD HH:mm');
 	//var today1 = moment(today).add(1, 'hours').format('YYYY-MM-DD HH:mm');
 	////console.log("test date"+today1);
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPReminder')/items?$select=*&$filter=(AuthorId eq "+userId+")&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            dataresults = data.d.results;
           // //console.log(dataresults);
            
            for (var i = 0; i <dataresults.length; i++) {
<<<<<<< HEAD
               ReminderDate = moment.utc(data.d.results[i].ReminderDateTime).format('YYYY-MM-DD HH:mm');            
=======
               ReminderDate = moment.utc(data.d.results[i].ReminderDate).format('YYYY-MM-DD HH:mm');            
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
               console.log(ReminderDate); 
               var EventDate = moment(data.d.results[i].EventDate).format('YYYY-MM-DD'); 
               var EventDate1 = moment(data.d.results[i].EventDate).format('YYYY-MM-DD HH:mm'); 
               ReminderTime = moment(data.d.results[i].Created).format('HH:mm');           
              //console.log(ReminderDate +"and"+ EventDate1 ); 
               ReminderMessage  = data.d.results[i].EventDescription;
               EventEndTime = data.d.results[i].EventEndTime;         
               EventID = data.d.results[i].ID;
               var EventTitle = data.d.results[i].EventTitle; 
<<<<<<< HEAD
            if(today >= ReminderDate && data.d.results[i].ReminderStatus == "Unread"){
=======
            if(today >= ReminderDate && data.d.results[i].Status == "Unread"){
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
            	$(".redDot").removeClass("d-none");
            	//$("#notificationCard").addClass("d-none");
            	$(".MainTool").removeClass("d-none");
            	$(".MainTool").show().delay(7000).fadeOut();
           		  $("#notificationCard").append('<div id="notificationDivMain" onclick="UpdateNotification(this.className);" class="'+EventID+'" style=""> <div class="notification" style="padding: 10px; background: #F2ECD5; margin: 5px; border-radius: 10px;"> <div class="titleDiv d-flex align-items-center justify-content-between"><span style="height:auto;display:flex;align-items:self-start;"><img style="margin-right: 5px;width: 13px;height:auto;"  src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon material-access-alarm.svg">'+
											   '<span style="color:#FA4683; font-size:11px;height:auto;">Event Reminder</span></span><span class="ReminderTime" style="height:auto;">'+ReminderTime+'</span></div><p class="eventDescription" style="margin-top: 1rem;">'+ReminderMessage+'</p> <div class="d-flex align-items-center justify-content-between"><span style="height:auto;display:flex; align-items:flex-start;">'+
											   '<img style="width:12px;height:auto;margin-right: 5px;" src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-md-calendar.svg">'+EventDate+'</span><span style="height:auto;display:flex; align-items:flex-start;"><img style="width:12px;height:auto;margin-right: 5px;" src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-md-time.svg">04:30 PM</span>	'+
											   '<a href="#" style="    color: #FF3D97;text-decoration: underline;font-size: 10px;font-wight:600;background:none;width: 40px;text-align: center;padding: 3px;">Join</a> <div> </div> </div>');
	        }
            else {
<<<<<<< HEAD
            	if(data.d.results[i].ReminderStatus == "Unread" && ReminderDate <= today){
=======
            	if(data.d.results[i].Status == "Unread" && ReminderDate <= today){
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
            		$(".redDot").removeClass("d-none");
           		}
           		else{
           			//$(".redDot").addClass("d-none");
           		}
            }
            
            			                                  
            } // for loop End					                 
        },
        error: function (xhr, status, error) {
            //console.log("Failed");
        }
    });
}



function PastReminder() {
	var userId = _spPageContextInfo.userId;
 	var today= new Date();
 	var conditiontoday = moment(today).toISOString();
 	today = moment(today).format('YYYY-MM-DD HH:mm');
 	//console.log(today)
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPReminder')/items?$select=*&$filter=AuthorId eq "+userId+" &$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            dataresults = data.d.results;
            //console.log(dataresults);
            
            for (var i = 0; i <dataresults.length; i++) {
<<<<<<< HEAD
               ReminderDate = moment.utc(data.d.results[i].ReminderDateTime).format('YYYY-MM-DD HH:mm');           
=======
               ReminderDate = moment.utc(data.d.results[i].ReminderDate).format('YYYY-MM-DD HH:mm');           
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
               //console.log(ReminderDate); 
               var EventDate = moment(data.d.results[i].EventDate).format('YYYY-MM-DD'); 
               //ReminderTime = moment(data.d.results[i].ReminderDate).format('HH:mm');           
              // //console.log(ReminderTime); 
               ReminderMessage  = data.d.results[i].EventDescription;
               EventEndTime = data.d.results[i].EventEndTime;         
               EventID = data.d.results[i].ID;
               
               var EventTitle = data.d.results[i].EventTitle; 
<<<<<<< HEAD
               if(ReminderDate < today && data.d.results[i].ReminderStatus == "Unread"){
=======
               if(ReminderDate < today && data.d.results[i].Status == "Unread"){
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
                   $(".redDot").removeClass("d-none");
                  $(".notificationCard").append('<div id="notificationDivMain" onclick="UpdateNotification(this.className);" class="'+EventID+'"> <div class="notification" style="padding: 10px; background: #F2ECD5; margin: 5px; border-radius: 10px;"> <div class="titleDiv d-flex"> <div class="subdiv"><div class="d-flex align-items-center"> <img style="margin-right:2px;width:15px" src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon material-access-alarm.svg">'+
											   '<span style="color:#FA4683; font-size:11px;height:auto;">Event Reminder</span></div><span class="ReminderTime" style="height:auto;">'+ReminderDate+'</span></div></div><p class="eventDescription" style="margin-top:1rem; max-width: 300px;  -webkit-line-clamp: 2; padding: 0px; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; display: -webkit-box;">'+ReminderMessage+'</p> <div style="display:flex;justify-content:space-between"> <span style="display:flex; align-items:center;height:auto;">'+
											   '<img style="width:15px;margin-right:2px" src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-md-calendar.svg">'+EventDate+'</span><span style="display:flex; align-items:center;height:auto;"><img style="height:auto;width:15px;margin-right:2px" src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-md-time.svg">04:30 PM</span></div> </div> </div>');
            			                                  
            
<<<<<<< HEAD
            	}else if(ReminderDate <= today && data.d.results[i].ReminderStatus == "Read"){
=======
            	}else if(ReminderDate <= today && data.d.results[i].Status == "Read"){
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
            	
                  $(".notificationCard").append('<div id="notificationDivMain" style="border-bottom: 1px solid #e4e4e4;" onclick="UpdateNotification(this.className);" class="'+EventID+'"> <div class="notification" style="padding: 10px; margin: 5px; border-radius: 10px;"> <div class="titleDiv d-flex"> <div class="subdiv"><div class="d-flex align-items-center">  <img style="margin-right:2px;width:15px" src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon material-access-alarm.svg">'+
											   '<span style="color:#FA4683; font-size:11px;height:auto;">Event Reminder</span></div><span class="ReminderTime"  style="height:auto;">'+ReminderDate+'</span></div></div><p class="eventDescription" style="margin-top:1rem; max-width: 300px;  -webkit-line-clamp: 2; padding: 0px; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; display: -webkit-box;">'+ReminderMessage+'</p> <div style="display:flex;justify-content:space-between"> <span style="display:flex; align-items:center;height:auto;">'+
											   '<img style="width:15px;margin-right:2px" src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-md-calendar.svg">'+EventDate+'</span><span style="display:flex; align-items:center;height:auto;"><img  style="height:auto;width:15px;margin-right:2px" src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-md-time.svg">04:30 PM</span></div> </div> </div>');
            			                                  
            
            	}else{
            	 //$(".notificationCard").append('<span style="display:flex;justify-content:center;margin:10px 0;">No-past Reminders</span>');
            	
            	}
                
            } // for loop End					                 
        },
        error: function (xhr, status, error) {
            //console.log("Failed");
        }
    });
}



function UpdateNotification(id){
  	var Status = "Read";  	
  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPReminderListItem'},
<<<<<<< HEAD
  	 	"ReminderStatus":Status		
=======
  	 	"Status":Status		
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
  	};
  	$.ajax({
		url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPReminder')/items("+id+")",
		method: "POST",
		contentType: "application/json; odata=verbose",
		data:JSON.stringify(item),
		headers: {
			"Accept": "application/json; odata=verbose",
			"X-RequestDigest":$("#__REQUESTDIGEST").val(),
			"IF-MATCH":"*",
			"X-HTTP-Method":"MERGE",
			
		},
		success:OnSuccess,
		error:OnError
	});
	function OnSuccess(data){
		location.reload();
	 	//Notification();
		//alert(id+"Updated Successfully");
	}

    function OnError(data){
		//alert("Update error");
	}
  };







$(".bell").on("click", function(){
	$(".MainTool").toggleClass("d-none");
	event.stopPropagation();
})


$(".notification").on("click", function(){
	$(".MainTool").toggleClass("d-none");
	event.stopPropagation();
})
$("body").on("click", function(){
	$(".MainTool").addClass("d-none");
})


