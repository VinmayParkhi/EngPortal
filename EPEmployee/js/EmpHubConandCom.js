 var CurrentDate;
 var EventID;
 
 var EventStartTime;
 var EventEndTime;
 //var EventEndTime;
 //var EventTime;
 var EventDates ;               
 var EventFullDates ;
 var EventId ;
 var pillar;
 var EventTitle;
 var EventDescription;
 var AverageRating;               	 
 var VideoURLs;
 var startTime;
 var endTime;
 var localDate;
 var imageURL;
 var dataresults;
 var videotest;
 

 $(document).ready(function() {
    GetUpcomingEvents();
    GetPastEvents()
 });

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

function GetUpcomingEvents() {
 	var today= new Date();
 	today = moment(today).toISOString();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,AttachmentFiles,Attachments,Pillar,Title,EventDescription,AverageRating,EventDate,EventStartTime,EventEndTime,VideoURL&$expand=AttachmentFiles&$filter=Pillar eq 'Connect and community' and EventDate ge '"+today+"'&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            dataresults = data.d.results;
            console.log(dataresults);
            for (var i = 0; i <3; i++) {
               EventDates = moment(data.d.results[i].EventDate).format('DD MMM,YYYY');               
               EventStartTime = data.d.results[i].EventStartTime;
               EventEndTime = data.d.results[i].EventEndTime;         
               var EventId = data.d.results[i].ID;
               pillar = data.d.results[i].Pillar;
               var EventTitle = data.d.results[i].Title;               
               var EventDescription = data.d.results[i].EventDescription;
               AverageRating  = data.d.results[i].AverageRating; 
               //console.log(EventTime);
               //console.log(EventEndTime);
        
			   var utcDate = new Date(EventStartTime);
			   var hr = addZero(utcDate.getHours());
			   var min = addZero(utcDate.getMinutes());				
			   startTime = hr +':'+ min ;
			   

               var utcDate2 = new Date(EventEndTime);
			   var hr2 = addZero(utcDate2.getHours());
			   var min2 = addZero(utcDate2.getMinutes());				
			   endTime = hr2 +':'+ min2 ;	
	
			   			    
               VideoURLs = data.d.results[i].VideoURL;
               	 //document.getElementById('VideoURL').setAttribute("src","VideoURLs");
               	$('iframe').attr("src",VideoURLs);
				$("#popupEVTitle").html(EventTitle);				
				$("#popupEVDesc").html(EventDescription);

                 var a =   "https://infornt.sharepoint.com/" + data.d.results[i].AttachmentFiles.results[0].ServerRelativeUrl; 
                      
                 $(".upcomingEventsWr").append('<div class="upcomingEventsCard"  > <div class="upcomingeventsImg"> <div class="userImg1" style="background:linear-gradient(180deg, #00000000 0%, #0D0D0DE8 61%, #121112 67%, #000000 90%), url('+a+');background-size: cover;"> <div class="cornerBtns"> <div class="share" onclick="adduser(this.id)" id="'+EventId+'"> <a style="z-index:111;">'+
                                     '<img src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon open-share-boxed.svg" alt="Share"></a></div><div class="heart">'+
                                    '<a href="#" onclick="heartImage();" id="'+EventId+'"> <img src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon feather-heart.svg" alt="Heart"></a>'+
                                	'</div></div> </div></div><div id="'+EventId+'"  onclick="detailview(dataresults,this.id,pillar,startTime,endTime,EventFullDates,imageURL)"  class="upcomingeventsDetails"><small><i><label id="pillar" class="'+pillar+'">'+pillar+'</label></i></small> <h5><label id="EventTitle">'+EventTitle+'</label></h5>'+
                        			'<p><label id="EventDesc">'+EventDescription+'</label></p><div class="upcomingeventsDate_Time"><div class="upcomingeventsCalendar">'+
                                	'<a href="#"> <img src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon feather-calendar.svg" alt="Mail"><label>'+EventDates+'</label></a></div>'+
                                    '<div class="upcomingeventsClock"><a href="#"><img src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon feather-clock.svg" alt="Message"><label>'+startTime+'</label>'+
                                	'</a> </div> </div> <div class="upcomingeventsBtn" style="display:inline-block;"> <div class="upcomingeventsReminder"></div><a href="#" class="setReminder">Set Reminder </a></div> <div class="upcomingeventsJoin" style="display:inline-block; background: linear-gradient(90deg, #DE8601 0%, #FF3D97 100%); padding: 0.5rem 4rem; border-radius: 0.5rem;"> <a href="#" style="color:#fff;">Join'+
                                	'</a></div> </div> </div> </div>');
                 
            } // for loop End					                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}
function adduser(id){
	//openDialog(currsite+'/_layouts/15/aclinv.aspx?GroupId='+CurrGroupId);
	openDialog("https://infornt.sharepoint.com/sites/RNTENG/Lists/TeamsNotificationList/NewForm.aspx?EventID="+id);	
    //window.location.reload();		
}

function openDialog(pageUrl) {
	var options = {
		url: pageUrl,
		iconImageUrl: "icons/request.png",
		title: 'Share event with people you want',
		allowMaximize: false,
		showClose: true,
		width: 450,
		height: 200
	};
	SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
}



function GetPastEvents() {
 	var today= new Date();
 	today = moment(today).toISOString();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,AverageRating,EventDate,EventStartTime,VideoURL&$expand=AttachmentFiles&$filter=Pillar eq 'Connect and community' and EventDate le '"+today+"'&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            for (var i = 0; i <3; i++) {
               EventDates = moment(data.d.results[i].EventDate).format('YYYY-MM-DD');               
               //EventFullDates = moment(data.d.results[i].EventDate).format('DD MMMM, YYYY');
               EventTime = data.d.results[i].EventStartTime;
               var EventId = data.d.results[i].ID;
               pillar = data.d.results[i].Pillar;
               var EventTitle= data.d.results[i].Title;
               
               var EventDescription= data.d.results[i].EventDescription;
               AverageRating  = data.d.results[i].AverageRating;  
			
			   var utcDate = new Date(EventTime);
			   console.log(utcDate);
			   var hr = addZero(utcDate.getHours());
			   var min = addZero(utcDate.getMinutes());				
			   var localDate = hr +':'+ min ;	
			   			    
               VideoURLs = data.d.results[i].VideoURL;
               console.log("log of",data.d.results[i]);
               console.log("video is",VideoURLs);
               	 //document.getElementById('VideoURL').setAttribute("src","VideoURLs");
               	$('iframe').attr("src",VideoURLs);
				$("#popupEVTitle").html(EventTitle);				
				$("#popupEVDesc").html(EventDescription);
				if(AverageRating  == null){
					AverageRating  = '0'
				}
                 var b =  "https://infornt.sharepoint.com/" + data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl; 
                      
               $(".pastEvntsWr1").append('<div class="pastevntsCard" style="height: 25vh; "><div class="pstvideoImg1" style="height: 23vh;background-image:linear-gradient(180deg, #00000000 0%, #0D0D0DE8 74%, #121112 100%), url('+b+');background-repeat: no-repeat;background-size: cover;"> <label class="time">15:03</label>'+
                            '<a  class="play player" style="cursor:pointer" onclick="getVid(event)">'+
                                '<img src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Group 2834.svg" alt="Play"> </a>'+
                            '<a href="#" onclick="heartImage();" id="'+EventId+'" class="heartImg"> <img id="heartImg" src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Group 3218.svg" alt="Heart"></a>'+  
                            '<div class="pastevntsDetails"> <div class="radios_Rating"> <div class="radios"><small><label id="pillar" class="'+pillar+'">'+pillar+'</label></small> </div><div class="rating">'+
                            '<img src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon ionic-ios-star.svg" alt="Star"> <label id="popuprate"> <h5 id="popuprate-h5">'+AverageRating+'</h5></label>'+
                            '</div> </div> <div class="title_review"> <div class="evntTitle"> <h4> <label id="EventTitle">'+EventTitle+'</label> </h4> </div><div class="review"> <h6>'+
                            '<a id="1" lblId ="popuprate-h5" class="reviewPopup" href="#" class="reviewPopup" lblId = "popuprate-h5" data-bs-toggle="modal" data-bs-target="#ratereviewModal">Write Review</a></h6>'+
                            '</div> </div> <p class="row"><span id="EventDesc">'+EventDescription+'</span></p> </div> </div> <input type="hidden" value="'+VideoURLs+'"> </div></a>'); 
                            $(".player").attr('data-toggle',"modal");
                            $(".player").attr('data-target',"#exampleModal");
                             $(".player").attr('data-keyboard',"false");
                            $(".player").attr('data-backdrop',"static");


                            
            } // for loop End  
            
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}

//$(".modalapp").append('<video controls width="250"><source id="VideoURL" src="'+VideoURLs[1]+'" type="video/mp4">');              


function getVid(event){
console.log("sankedfaf")
	var vidtest = event.target.parentElement.parentElement.parentElement.lastChild.previousElementSibling.value;
	console.log("vidtest",vidtest);
	var evetit = event.target.parentElement.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.innerText;
	console.log(evetit ,"asdasda");
	//var evedesc = event.target.lastChild.previousElementSibling.lastElementChild.firstElementChild.innerText;
	var evedesc = event.target.parentElement.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.innerText;
	console.log("evedesc",evedesc );
	//$(".modalapp").append('<video controls width="400" id="myid"><source id="VideoURL" src="'+vidtest+'" type="video/mp4">');             
	 // $("video:last").css("display", "block");
	
	$(".modalapp iframe").attr('src',vidtest);
	$(".modalfoot h4").html(evetit);
	$(".modalfoot h6").html(evedesc);
	
	}
/*
function test() {

 	var iframe = $('<iframe frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>');

 	var dialog = $("#iframeHolder").append(iframe).appendTo("body").dialog({

 		autoOpen: false,

 		modal: true,

 		resizable: false,

 		width: "auto",

 		height: "auto",

 		close: function () {

 			iframe.attr("src", "");

 		}

 	});
 	}
 $("#iframeData").on("click", function (e) {

 	e.preventDefault();

 	var src = $(this).attr("href");

 	var title = $(this).attr("data-title");

 	var width = $(this).attr("data-width");

 	var height = $(this).attr("data-height");

 	iframe.attr({

 		width: +width,

 		height: +height,

  		src: src

 	});

 	dialog.dialog("option", "title", title).dialog("open");

  });*/

function detailview(data,event_id,pillar,startTime,endTime,eventDate,imgURL){
	/*console.log("Event id is :",event_id);
	//console.log("Event title is :",evetit);
	//console.log("Event desc is :",evedesc);
	console.log(pillar);
	console.log(startTime);
	console.log(endTime);
	console.log(eventDate);
	console.log(imgURL);
	console.log(data);
	var eventID = Number(event_id);
	console.log(eventID);

	console.log(_spPageContextInfo.webAbsoluteUrl)

	
	var getWrapper = document.querySelector('.eventWorkWrapper');
	var getEventWrapper = document.querySelector('.eventDetailsWrapper');
	
	console.log(getWrapper);
	console.log(getEventWrapper);
	
	
	
	//var upcomingEventCardsList = document.querySelectorAll('.upcomingEventsCard');
	//console.log(upcomingEventCardsList);
	for(var i =0; i < data.length; i++){
	   console.log(data[i].ID);
	   if(data[i].ID === eventID){
	     console.log(data[i]);
	     var EventWork= data[i].Pillar;
	     var EventTitle= data[i].EventTitle;
	     var EventDesc= data[i].EventDescription;
	     var EventBannerImg= data[i].AttachmentFiles.results[0].ServerRelativeUrl;

	     
         
	     console.log(EventWork);
	     console.log(EventTitle);
	     console.log(EventDesc);
	     console.log(EventBannerImg);
	     
	     
	     
	    break;
	   }
	}
	getWrapper.style.display = 'none';
	getEventWrapper.style.display = 'block';	
	
	var getEventPillar = document.querySelector('div.eventdtlsTitleLeft > h6 > i > label');
	var getEventTitle = document.querySelector('.eventTitle > label');
	var getEventDescription = document.querySelector('.eventdtlspara > h6 > label');
	var getStartTime = document.querySelector('label > span.startTime');
	var getEndTime = document.querySelector('label > span.endTime');
	var getEventDate = document.querySelector('label.eventDt');
	var EventBannerImg2= document.querySelector('div.eventdetailsWr > div > div.eventdtlsImg > img');
		
	
	getEventPillar.innerText = EventWork;
	getEventTitle.innerText = EventTitle;
	getEventDescription.innerText = EventDesc;
	getStartTime.innerText = startTime;
	getEndTime.innerText = endTime;
	getEventDate.innerText = eventDate;
	EventBannerImg2.setAttribute('src',_spPageContextInfo.webAbsoluteUrl + EventBannerImg)
	
	console.log(getEventPillar);
	
	//console.log(EventBannerImg.setAttribute('src',"_spPageContextInfo.webAbsoluteUrl + imgURL"));*/
	window.location.href = "https://infornt.sharepoint.com/sites/RNTENG/SitePages/Employee/EmpEventDetails.aspx?EventID=" + event_id ;
	//return '<a href="https://infornt.sharepoint.com/SitePages/ENG_EMP/EventDetails.aspx?EventID='+event_id+'">'
}


function heartImage(){
	
	EventID = $(this).attr('id');	
	//$("#eID").val();
	alert(this.EventID);
	//alert("Test",EventID);
	FavEvents();
}


function FavEvents(){
  		var username = $("#username").text();
 		var EmpId = $("#EMpID").text();
 		//var EventID = $("#eID").val();
  	
	
  	var item={
  	 	"__metadata":{'type': 'SP.Data.FavoriteEventsListItem'},
  	 	"Title": "FavoriteEvents",
   		"EventID":EventID,
		"EmpID":EmpId,
		"UserName":username 
  	};
  	console.log(item);
  	  	$.ajax({
		url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('FavoriteEvents')/items",
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
  
  
  