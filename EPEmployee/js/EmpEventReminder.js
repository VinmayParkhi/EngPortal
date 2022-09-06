 var CurrentDate;
 var EventID;
 
 var ReminderDate;
 var ReminderMessage;
 //var EventEndTime;
 //var EventTime;
  

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
 	var today= new Date();
 	//today = moment(today).toISOString();
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
           // console.log(dataresults);
            
            for (var i = 0; i <dataresults.length; i++) {
               ReminderDate = moment(data.d.results[i].ReminderDate).format('YYYY-MM-DD HH:mm');           
               //console.log(ReminderDate); 
               var EventDate = moment(data.d.results[i].ReminderDate).format('YYYY-MM-DD'); 
               ReminderTime = moment(data.d.results[i].Created).format('HH:mm');           
              // console.log(ReminderTime); 
               ReminderMessage  = data.d.results[i].EventDescription;
               EventEndTime = data.d.results[i].EventEndTime;         
               EventID = data.d.results[i].ID;
               var EventTitle = data.d.results[i].EventTitle; 
            if(today == ReminderDate ){
            	$(".redDot").removeClass("d-none");
            	//$("#notificationCard").addClass("d-none");
            	$(".MainTool").removeClass("d-none");
            	$(".MainTool").show().delay(5000).fadeOut();
           		  $("#notificationCard").append('<div id="notificationDivMain" style="padding:10px;"> <div class="notification" style="padding: 10px; background: #F2ECD5; margin: 5px; border-radius: 10px;"> <div class="titleDiv d-flex"> <span> <img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon material-access-alarm.svg">'+
											   '<span style="color:#FA4683; font-size:11px">Event Reminder</span><span class="ReminderTime">'+ReminderTime+'</span></span></div><p class="eventDescription">'+ReminderMessage+'</p> <span>'+
											   '<img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-md-calendar.svg">'+EventDate+'</span><span><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-md-time.svg">04:30 PM</span>	'+
											   '<a href="#" style="color:#FF3D97; font-weight:600; text-decoration:underline;">Join</a> </div> </div>');
            }
            else {
            	if(data.d.results[i].Status == 0 ){
            		$(".redDot").removeClass("d-none");
           		}
           		else{
           			$(".redDot").addClass("d-none");
           		}
            }
            
            			                                  
            } // for loop End					                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}



function PastReminder() {
 	var today= new Date();
 	var conditiontoday = moment(today).toISOString();
 	today = moment(today).format('YYYY-MM-DD HH:mm');
 	//console.log(today)
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPReminder')/items?$select=ID,EventDescription,ReminderDate,EventDate,EventTitle&$filter = ReminderDate le '"+conditiontoday+"'&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            dataresults = data.d.results;
           // console.log(dataresults);
            
            for (var i = 0; i <dataresults.length; i++) {
               ReminderDate = moment(data.d.results[i].ReminderDate).format('YYYY-MM-DD HH:mm');           
               //console.log(ReminderDate); 
               var EventDate = moment(data.d.results[i].EventDate).format('YYYY-MM-DD'); 
               ReminderTime = moment(data.d.results[i].ReminderDate).format('HH:mm');           
              // console.log(ReminderTime); 
               ReminderMessage  = data.d.results[i].EventDescription;
               EventEndTime = data.d.results[i].EventEndTime;         
               EventID = data.d.results[i].ID;
               var EventTitle = data.d.results[i].EventTitle; 
                  $(".notificationCard").append('<div id="notificationDivMain"> <div class="notification" style="padding: 10px; margin: 5px; border-radius: 10px;"> <div class="titleDiv d-flex"> <div> <img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon material-access-alarm.svg">'+
											   '<span style="color:#FA4683; font-size:11px">Past Event</span><span class="ReminderTime">'+ReminderTime+'</span></div></div><p class="eventDescription" style="max-width: 300px;  -webkit-line-clamp: 2; padding: 0px; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; display: -webkit-box;">'+ReminderMessage+'</p> <div style="display:flex;"> <span style="display:flex; align-items:center;">'+
											   '<img style="width:15%; margin-left:5px;" src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-md-calendar.svg">'+EventDate+'</span><span style="display:flex; align-items:center;"><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-md-time.svg">04:30 PM</span></div> </div> </div>');
            			                                  
            
            
                
            } // for loop End					                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}


$(".bell").on("click", function(){
$(".MainTool").toggleClass("d-none");
//$(".PopMsg").toggleClass("d-none");
})


