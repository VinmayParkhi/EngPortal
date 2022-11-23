 var CurrentDate;
 var EventID;
 var log = console.log;
 var EventStartTime;
 var EventEndTime;
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
 var reviewID;
 var EvtTitle;
 var EventDate;
 var EvStartDate;
 var EvEndDate; 
 var EvID;
$(document).ready(function() {
 
 
    GetUpcomingEvents();   
    GetPastEvents();
    
    
     $.ajax({
        
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,EventDate,VideoURL&$expand=AttachmentFiles&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
          var allResults = data.d.results;
          
          log(allResults)
             for(var k=0;k<allResults.length;k++){
             log(allResults[k].Pillar)
             log(allResults[k].Title)
             log(typeof allResults[k].ID)
             
             let allResId = [];
             allResId.push(allResults[k].ID);
             
             var allPastEveCards = document.querySelectorAll('.pastevntsCard');
           
           for(var x=0;x<allPastEveCards.length;x++){
           log(allPastEveCards[x].querySelector('#pillar'));
           log(allPastEveCards[x].querySelector('#EventTitle'));
           
           var pill = allPastEveCards[x].querySelector('#pillar').innerText;
           var title = allPastEveCards[x].querySelector('#EventTitle').innerText;
           
                if(allResults[k].Pillar === pill && allResults[k].Title === title){
                   
                   let pastCards = [];
                   pastCards.push(allPastEveCards[x])
                   allResId.push(allResults[k].ID);
                   setAverageRating(pastCards,allResId)

                   
                }
             }
        }
          }
        });
        
        

           
    var userId = _spPageContextInfo.userId;
       $.ajax({
 		        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPFavouriteEvent')/items?$select=ID,Title,EmpID,EventID,Pillar&$filter=AuthorId eq "+userId+"",

        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var results = data.d.results;
            log(results);
            log(results.length > 0)
            if(results.length > 0){
              
              let a = document.querySelectorAll('.pstvideoImg1');
              for(var j=0;j<results.length;j++){
              
              var id = results[j].EventID;
              
              log(typeof id);
              for(var i=0;i<a.length;i++){
                  var b = a[i].querySelector('.heartDiv > a').getAttribute('hreflang');
                  var bNum = Number(b);
                  log(id);
                  if(bNum === id){
                     log(a[i])
                     var c = [i].querySelector('.heartDiv > a > img');
                     c.setAttribute("src", "images/Group 3212.svg")
                  }
              }
              }
              
              let x = document.querySelectorAll('.upcomingeventsImg');
              for(var j=0;j<results.length;j++){
              
              var id = results[j].EventID;
              
               for(var i=0;i<x.length;i++){
               log(x[i].querySelector('.heart > a').getAttribute('hreflang'))
                  var b = x[i].querySelector('.heart > a').getAttribute('hreflang');
                  var bNum = Number(b);
                  log(id);
                  if(bNum === id){
                     log(x[i])
                     var c = x[i].querySelector('.heart > a > img');
                     c.setAttribute("src", "images/Group 3212.svg")
                  }
              }
              }

            }; /* if end */
            }
       });

    
     /* sb */
  
    $(".submitBtn").on('click',function (){
    var userId = _spPageContextInfo.userId;
    getReviewText = document.querySelector('div.reviewBox > div.reviewTextarea > textarea').value;
  $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPRating')/items?$select=ID,Title&$filter=EmpID eq "+userId+" and EventID eq "+EvID+"",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
            success: function (data, status, xhr) {
            dataresults = data.d.results;
            console.log(dataresults);
                if(data.d.results.length > 0){
                var EventIDs = data.d.results[0].ID;
                    UpdateRating(EventIDs,getReviewText,starRating)
                }else{
                 if(starRating === 0 && (getReviewText === '' || null)){
                 
                 }else{
                     createListItem();
                 }
                }
            }
     });    
});





function UpdateRating(id,ReviewText,starRating) {
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPRating')/items("+id+")"
    var item = {
        __metadata: { 'type': 'SP.Data.EPRatingListItem' },
          "RatingAverage":starRating,
          "Review": ReviewText,
          "EventStartTime": EvStartDate,
          "EventEndTime": EvEndDate
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

}

function ErrorFunction(error) {

}
        
        $(".reviewPopup").on('click',function (event) { 
            
                                           
                var rateA = $("#" + $(this).attr("lblId")).text().split(' ');
                $("#rateno-label").text(rateA[0]);
                $("#baseon-label").text('Based on ' + rateA[1].match(/\d+/) + ' review');
                ratings.ratestar = rateA[0];
                
                
                var textArea = document.querySelector('div.reviewBox > div.reviewTextarea > textarea');
                textArea.value= '';
         
                log(getReviewText)
                
            });
            
            
            $("#star1").on('click', function() {  
              $("#star1").removeClass("fa-regular");
              $("#star1").addClass("fa-solid").css({'font-size':'18px','color':'orange','cursor':'pointer'});
              
              $("#star2, #star3, #star4, #star5").removeClass("fa-solid").css({'font-size':'18px','color':'orange'});
              $("#star2, #star3, #star4, #star5").addClass("fa-regular").css({'font-size':'18px','color':'orange'});

              starRating = 1;
              log(1);
              
  
          });  
          $("#star2").click(function() {  
              $("#star1, #star2").removeClass("fa-regular");
              $("#star1, #star2").addClass("fa-solid").css({'font-size':'18px','color':'orange','cursor':'pointer'});
              
              $("#star3, #star4, #star5").removeClass("fa-solid").css({'font-size':'18px','color':'orange'});
              $("#star3, #star4, #star5").addClass("fa-regular").css({'font-size':'18px','color':'orange'});

              starRating = 2; 
              log(2);
  
          });  
          $("#star3").click(function() {  
              $("#star1, #star2, #star3").removeClass("fa-regular");
              $("#star1, #star2, #star3").addClass("fa-solid").css({'font-size':'18px','color':'orange','cursor':'pointer'});
              
              $("#star4, #star5").removeClass("fa-solid").css({'font-size':'18px','color':'orange'});
              $("#star4, #star5").addClass("fa-regular").css({'font-size':'18px','color':'orange'});

 
              starRating = 3;
              log(3);
  
          });  
          $("#star4").click(function() {  
              $("#star1, #star2, #star3, #star4").removeClass("fa-regular");
              $("#star1, #star2, #star3, #star4").addClass("fa-solid").css({'font-size':'18px','color':'orange','cursor':'pointer'});
              $("#star5").removeClass("fa-solid").css({'font-size':'18px','color':'orange'});
              $("#star5").addClass("fa-regular").css({'font-size':'18px','color':'orange'});
              starRating = 4;
              log(4);
  
          });  
          $("#star5").click(function() {  
              $("#star1, #star2, #star3, #star4, #star5").removeClass("fa-regular");
              $("#star1, #star2, #star3, #star4, #star5").addClass("fa-solid").css({'font-size':'18px','color':'orange','cursor':'pointer'});
 
              starRating = 5;
              log(5);
  
          });
     /* sb End */ 
     

    
    
 });

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

function getTitleName(EvTitle) {

  var reminderTitle = document.getElementById('eventTitle').value = EvTitle;
  var remindCheck = document.getElementById('remindChecked');
  

  log(EvTitle);
  log(reminderTitle.innerText)
  
  remindCheck.onclick = function(){
  var remind = document.querySelector('.remind');	
  var dontRemind = document.querySelector('.dontRemind');
  
  log(remind)
  log(dontRemind);
  
  $('#minutes').change(function(){
  remindBefore = document.getElementById('minutes').value;
       reminderStartTime = startTime;
       reminderDate = new Date(reminderStartTime);
       
       log(reminderDate.getHours()+':'+reminderDate.getMinutes());
       subtractMinutes(remindBefore, reminderDate);
       });
       
     if(remindCheck.checked === true){ 
          
       dontRemind.style.display = 'none';
       remind.style.display = 'block';
       log(remindBefore)
       
     }else if(remindCheck.checked !== true){
     var selectDateValue= document.getElementById('selectDate').value;
     var selectTimeValue= document.getElementById('selectTime').value; 

        dontRemind.style.display = 'flex';
       remind.style.display = 'none';   
     }  
    }  
  };


  function subtractMinutes(numOfMinutes, date) {
  date.setMinutes(date.getMinutes() - numOfMinutes);
  log(date);
  log(date.getHours()+':'+date.getMinutes());
  return date;
};


function GetUpcomingEvents() {
 	var today= moment().format('YYYY-MM-DDTHH:mm:SS');
 	var fmDate;
 	var toDate;
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,AttachmentFiles,EventLink,Attachments,Pillar,Title,EventDescription,EventDate,EventStartTime,EventEndTime,VideoURL&$expand=AttachmentFiles&$filter=(Pillar eq 'Wow and pride') and (EventStatus eq 'Published') and (EventEndTime ge '"+today+"')&$orderby=EventDate asc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            dataresults = data.d.results;
            console.log(dataresults);
            for (var i = 0; i < 3; i++) {
               EventDates = moment(data.d.results[i].EventDate).format('DD MMM,YYYY');              
               EventStartTime = moment.utc(data.d.results[i].EventStartTime).format('hh:mm a');
               EventEndTime = data.d.results[i].EventEndTime;         
               var EventId = data.d.results[i].ID;
               var EventLink = data.d.results[i].EventLink;
               pillar = data.d.results[i].Pillar;
               var EventTitle = data.d.results[i].Title;               
               var EventDescription = data.d.results[i].EventDescription;        
			   var utcDate = new Date(EventStartTime);
			   var hr = addZero(utcDate.getHours());
			   var min = addZero(utcDate.getMinutes());				
			   startTime = hr +':'+ min ;
			   

               var utcDate2 = new Date(EventEndTime);
			   var hr2 = addZero(utcDate2.getHours());
			   var min2 = addZero(utcDate2.getMinutes());				
			   endTime = hr2 +':'+ min2 ;	
				
			   if(i == 0){
		   			fmDate = moment(data.d.results[i].EventDate).format('DD MMM');	
		   			$('#DateRangeWork').html(fmDate);		   		
			   	  }
			   
			   	 if(dataresults.length < 3 && i == 1){
			   		toDate = moment(data.d.results[i].EventDate).format('DD MMM');
			   		$('#DateRangeWork').html(fmDate +' to '+toDate);
			   	}
			   	else{
			   		if(i == 2){			   		
			   		toDate = moment(data.d.results[i].EventDate).format('DD MMM');
				   		if(fmDate == toDate){
				   			$('#DateRangeWork').html(fmDate);
				   		}			   		
				   		else if(fmDate == '' && toDate == ''){
				   			$('#DateRangeWork').html('');
				   		}
						else if(fmDate == '' && toDate != ''){
				   			$('#DateRangeWork').html(toDate);
				   		}	
						else if(fmDate != '' && toDate == ''){
				   			$('#DateRangeWork').html(fmDate);
				   		}	
				   		else{
				   			$('#DateRangeWork').html(fmDate +' to '+toDate);
				   		}
				   	 }
			   	 }

				
			   	imageURL = data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl
		     
               VideoURLs = data.d.results[i].VideoURL;
               	//$('iframe').attr("src",VideoURLs);
				//$("#popupEVTitle").html(EventTitle);				
				//$("#popupEVDesc").html(EventDescription);

                 var a =   "https://amdocs.sharepoint.com/" + data.d.results[i].AttachmentFiles.results[0].ServerRelativeUrl; 
                      
                 $(".upcomingEventsWr").append('<div class="col-12 col-md-6 col-lg-4 card upcomingEventsCard"> <div class="upcomingeventsImg"  style=" display: flex; flex-direction: column; justify-content: center; align-items: start; "> <div class="userImg1"'+
                 								'style="background:linear-gradient(180deg, #00000000 0%, #0D0D0DE8 61%, #121112 67%, #000000 90%),url('+a+');background-position: center top;background-size: 100% 100%;display: flex;flex-direction: column;justify-content: space-between;">'+ 
												'<div class="cornerBtns"> <div class="share" onclick="ShareEvent(this.id)" id="'+EventId+'"> <a style="display: flex; justify-content: end;">'+
												'<img src="images/Transparent_share_02.svg" alt="Share"></a></div><div class="heart">'+
												'<a href="#" onclick="FavEvents(this.id,this.className,this.title,this.name,this.hreflang,event);" hreflang="'+EventId+'" title="'+EventDescription+'"  id="'+EventTitle+'" name="'+imageURL+'" class="'+pillar+'"><img class="upHeart" src="images/Group 3218.svg" alt="Heart"></a>'+
												'</div></div> <div id="'+EventId+'"  style=" width: 100%;" onclick="detailview(dataresults,this.id,pillar,startTime,endTime,EventFullDates,imageURL)"  class="upcomingeventsDetails"><small><i><label id="pillar" class="'+pillar+'">'+pillar+'</label></i></small> <h5><label id="EventTitle">'+EventTitle+'</label></h5>'+
												'<p><label id="EventDesc">'+EventDescription+'</label></p><div class="upcomingeventsDate_Time"><div class="upcomingeventsCalendar">'+
												'<a href="#"> <img src="images/Icon feather-calendar.svg" alt="Mail"><label>'+EventDates+'</label></a></div>'+
												'<div class="upcomingeventsClock"><a href="#"><img src="images/Icon feather-clock.svg" alt="Message"><label>'+EventStartTime+'</label></a> </div> </div> '+
												' </div><div class="upcomingeventsBtn" style="display: flex; align-items: center; justify-content: space-between; width: 100%; height: auto;padding: 0 0.8rem"> <div class="upcomingeventsReminder"><a href="#" onclick="getTitleName(this.name);" class="setReminder" data-bs-toggle="modal" data-bs-target="#HubWbModal" id="HubWbReminder" id="HubWbReminder" name="'+EventTitle+'">Set Reminder</a></div> <div class="upcomingeventsJoin"> <a href="'+EventLink+'" style="color:#fff;">Join</a></div></div> </div></div></div>');
                 
            } // for loop End					                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}
function ShareEvent(id){
	openDialog("https://amdocs.sharepoint.com/sites/EP/Lists/EPEventShare/NewForm.aspx?EventID="+id);	
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
 	var today= moment().format('YYYY-MM-DDTHH:mm:SS');    
 	$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,EventDate,EventStartTime,VideoURL&$expand=AttachmentFiles&$filter=(Pillar eq 'Wow and pride') and (EventStatus eq 'Completed') and (EventEndTime le '"+today+"')and (VideoURL ne null)&$orderby=EventDate desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            for (var i = 0; i < 3; i++) {
               EventDates = moment(data.d.results[i].EventDate).format('YYYY-MM-DD');               
               EventTime = data.d.results[i].EventStartTime;
               EvStartTime = moment.utc(data.d.results[i].EventStartTime).format('hh:mm a');
               var EventId = data.d.results[i].ID;
               pillar = data.d.results[i].Pillar;
               EventTitle= data.d.results[i].Title;
               
               EventDescription= data.d.results[i].EventDescription;
			
			   var utcDate = new Date(EventTime);
			   console.log(utcDate);
			   var hr = addZero(utcDate.getHours());
			   var min = addZero(utcDate.getMinutes());				
			   var localDate = hr +':'+ min ;	
			   			    
               VideoURLs = data.d.results[i].VideoURL;
               	//$('iframe').attr("src",VideoURLs);
				//$("#popupEVTitle").html(EventTitle);				
				//$("#popupEVDesc").html(EventDescription);
				
				if( VideoURLs != null){

                 var b =  "https://amdocs.sharepoint.com/" + data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl; 
                     imageURL = data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl
 				$(".pastEvntsWr1").append('<div class="col-12 col-md-6 col-lg-4 card pastevntsCard"><div class="pstvideoImg1" style="height: auto;background-image:linear-gradient(180deg, #00000000 0%, #0D0D0DE8 74%, #121112 100%), url('+b+');background-repeat: no-repeat;background-position: center top;background-size: 100% 100%;display: flex; flex-direction: column;justify-content: center;align-items: center;">'+ 
 							'<div class="heart_time" style="width: 95%;margin-top: -2rem; "> <div class="heartDiv" style=" float: right;margin-top: 0.5rem">'+
							'<a href="#" onclick="FavEvents(this.id,this.className,this.title,this.name,this.hreflang,event);" hreflang="'+EventId+'" title="'+EventDescription+'"  id="'+EventTitle+'" name="'+imageURL+'" class="'+pillar+'" style="display: flex; justify-content: center;"> <img id="heartImg"'+ 
							'src="images/Group 3218.svg" alt="Heart"'+ 'data-themekey="#" style="width: 60%;"></a> </div> <div class="timeDiv"><label class="time"> </label> </div> </div>'+
                            '<a  class="play player" style="cursor:pointer" onclick="getVid(event)">'+
                                '<img src="images/Group 2834.svg" alt="Play"> </a>'+
                            '<div class="pastevntsDetails"> <div class="radios_Rating"> <div class="radios"><small><label id="pillar" class="'+pillar+'">'+pillar+'</label></small> </div><div class="rating">'+
                            '<img src="images/Icon ionic-ios-star.svg" alt="Star"> <label id="popuprate"> <h5 id="popuprate-h5">0(0)</h5></label>'+
                            '</div> </div> <div class="title_review"> <div class="evntTitle"> <h4> <label id="EventTitle">'+EventTitle+'</label> </h4> </div><div class="review"> <h6>'+
                            '<a id="'+EventId+'" lblId ="popuprate-h5" class="reviewPopup" onclick="getEPlistData(event,this.id)" href="#" class="reviewPopup" lblId = "popuprate-h5" data-bs-toggle="modal" data-bs-target="#ratereviewModal">Write Review</a></h6>'+
                            '</div> </div> <p class="row"><span id="EventDesc">'+EventDescription+'</span></p> </div> </div> <input type="hidden" value="'+VideoURLs+'"> </div></a>'); 
                            $(".player").attr('data-toggle',"modal");
                            $(".player").attr('data-target',"#exampleModal");
                          }
                                         
            } // for loop End  
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}

function setAverageRating(cards,IDs){

log(cards);
log(IDs);

   $.ajax({
        
        
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPRating')/items?$select=ID,EventID,Review,RatingAverage,Title,Created,EmpEmailID&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
           var res = data.d.results;
           var rt1=0;
		        var rt2=0;
		        var rt3=0;
		        var rt4=0;
		        var rt5=0;
		        var num =0;
           for(var c=0;c<res.length;c++){
              if(Number(res[c].EventID) === IDs[0]){
              
                 num = num + 1;
                 
                 log(res[c].RatingAverage) 
                              
		        
                 if(res[c].RatingAverage === 1){
                   rt1 = rt1 + 1;
                 }else if(res[c].RatingAverage === 2){
                   rt2 = rt2 + 1;
                 }else if(res[c].RatingAverage === 3){
                   rt3 = rt3 + 1;
                 }else if(res[c].RatingAverage === 4){
                   rt4 = rt4 + 1;
                 }else if(res[c].RatingAverage === 5){  
                   rt5 = rt5 + 1;
                 }

                var rtTotal = rt5 + rt4 + rt3 + rt2 + rt1;
         var avrTotalRt = (5 * rt5 + 4 * rt4 + 3 * rt3 + 2 * rt2 + 1 * rt1) / rtTotal;
         log(avrTotalRt);
         
         var averageRtRound = Math.round(avrTotalRt * 10) / 10;
         
         
          cards[0].querySelector("#popuprate-h5").innerText = averageRtRound + '('+num+')';
          
                
                

              }
           }
          //log(num) 
        }
        });
}


function getVid(event){
console.log("sankedfaf")
	var vidtest = event.target.parentElement.parentElement.parentElement.lastChild.previousElementSibling.value;
	console.log("vidtest",vidtest);
	var evetit =event.target.parentElement.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.innerText
	console.log(evetit ,"asdasda");
	var evedesc = event.target.parentElement.nextElementSibling.lastElementChild.firstElementChild.innerHTML;
	console.log("evedesc",evedesc );
	
	$(".modalapp iframe").attr('src',vidtest);
	$(".modalfoot h4").html(evetit);
	$(".modalfoot h6").html(evedesc);
	
	}

function detailview(data,event_id,pillar,startTime,endTime,eventDate,imgURL){
		window.location.href = "https://amdocs.sharepoint.com/sites/EP/SitePages/EPEmployee/EventDetails.aspx?EventID=" + event_id ;
	
}
function getIndex(event){
   
    	var DataValue = event.firstElementChild.innerText; 
    	
    }

function FavEvents(EventTitle,pillar,EventDesc,imageURL,id,event){
  		var username = $("#username").text();
 		var EmpId = $("#EMpID").text();
 		var numID = Number(id); 		
 		var ex = event.target;
 		var userId = _spPageContextInfo.userId;

log(userId)

 		/* sb */

 		$.ajax({
 		        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPFavouriteEvent')/items?$select=ID,Title,EmpID,EventID,Pillar&$filter=AuthorId eq "+userId+"",

        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var results = data.d.results;
            var idArray = [];
            var idMatchedArray = [];
            var itemID;
            var empName;
            var empId;
            for(var i=0;i<results.length;i++){
              
              var eventId = Number(results[i].EventID);
              
              log(eventId)
              log(numID === eventId)
              
            if(numID === eventId){
            
                 idArray.push(results[i].EventID);
                 idMatchedArray.push(results[i]);
                 itemID = results[i].ID;
                 empName = results[i].Title;
                 empId = results[i].EmpID;
                 console.log(results[i]);
                 console.log(empName);
            }
                
           } /* for end */
           
           console.log(idArray);
           console.log(idMatchedArray);
             
             if(idArray.length === 0 ){
			        var item={
			  	 	"__metadata":{'type': 'SP.Data.EPFavouriteEventListItem'},
			  	 	"Title": "EventTitle",
			   		"EventID":id,
					"EmpID":EmpId,
					"Title":EventTitle,
					"Pillar":pillar,
					"EventDescription":EventDesc,
					"ImageURL" : imageURL
			  	};
			  	console.log(item);
			
			  	  	$.ajax({
					url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPFavouriteEvent')/items",
					type: "POST",
					contentType: "application/json; odata=verbose",
					data:JSON.stringify(item),
					headers: {
						"Accept": "application/json; odata=verbose",
						"X-RequestDigest":$("#__REQUESTDIGEST").val()		
					},
					success:OnSuccess,
					error:OnError
				    });
             }else if(Number(idArray[0]) === numID && username === empName){
               log(idArray[0] === numID && username === Title)
               RemoveListItem(itemID,event)
             }/* if end */
           }
        });
        
  	  	  	
	function OnSuccess(data){	   
	   
	   var userId = _spPageContextInfo.userId;
 $.ajax({
 		        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPFavouriteEvent')/items?$select=ID,Title,EmpID,EventID,Pillar&$filter=AuthorId eq "+userId+"",

        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var results = data.d.results;
            log(results);
            log(results.length > 0)
            if(results.length > 0){

	   let a = document.querySelectorAll('.pstvideoImg1');
	   
              
              log(a);
                for(var j=0;j<results.length;j++){
              
              var id = Number(results[j].EventID);
            
               for(var i=0;i<a.length;i++){
                  var b = a[i].querySelector('.heartDiv > a').getAttribute('hreflang');
                  log(b);
                  var bNum = Number(b);
                  log(id);
                  if(bNum === id){
                     log(a[i].firstChild.querySelector('.heartDiv > a > img'));
                     var c = a[i].firstChild.querySelector('.heartDiv > a > img');
                     c.setAttribute("src", "images/Group 3212 (1).svg")
                  } 
              }
             }

	       let x = document.querySelectorAll('.upcomingeventsImg');
              
              log(x);
                for(var j=0;j<results.length;j++){
              
              var id = results[j].EventID;
            
               for(var i=0;i<x.length;i++){
                  var b = x[i].querySelector('.heart > a').getAttribute('hreflang');
                  log(b);
                  var bNum = Number(b);
                  log(id);
                  if(bNum === id){
                     log(x[i].querySelector('.heart > a > img'));
                     var c = x[i].querySelector('.heart > a > img');
                     c.setAttribute("src", "images/Group 3212.svg")
                  } 
              }
             }

		} /* if end */
	}

	
	});
}
    function OnError(data){
    debugger;
	}
  };  
  
  /* sb end */
   
function RemoveListItem(delID,event) {  
            
        $.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPFavouriteEvent')/items(" + delID  + ")",  
            type: "POST",  
            contentType: "application/json;odata=verbose",  
            headers: {  
                "Accept": "application/json;odata=verbose",  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "DELETE",  
            },  
            success: function(data) { 
            
            let abc = event.target;
            abc.setAttribute("src", "images/Group 3218.svg")
                             
            },  
            error: function(data) {  
            }  
        });  
     
} 

/* sb */
			  					  

function getEPlistData(event,id){
EvID = id;
     var avgRatingLabel4 = document.getElementById('rateno-label');
           avgRatingLabel4.innerText = 0;
           var totalRatings14 = document.getElementById('baseon-label');
           totalRatings14.innerText = 'Based on 0 reviews';

        
     
     $('#starAv1, #starAv2, #starAv3, #starAv4, #starAv5').removeClass("fa-solid");
       $('#starAv1, #starAv2, #starAv3, #starAv4, #starAv5').addClass("fa-regular").css({'font-size':'14px','color':'orange'});  

     
     testdata = event.target.parentNode.parentNode.previousElementSibling.innerText; 
     testdata2 = event.target.parentNode.parentNode.parentNode.parentNode.querySelector('#pillar').innerText; 
     log(testdata)  
     log(testdata2)         

       
    $.ajax
    ({

       url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventStartTime,EventEndTime,EventDescription,EventDate,VideoURL&$expand=AttachmentFiles&$filter= (Pillar eq 'Wow and pride') and (ID eq '"+id+"')",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
        var results = data.d.results;
        log(results);
              
              reviewID = results[0].ID;
              EvtTitle = results[0].Title;
              EventDate = results[0].EventDate;
              EvStartDate = results[0].EventStartTime;
              EvEndDate = results[0].EventEndTime;
           
         
          showReviewList()
        },
        error: function (xhr, status, error) {
            log("Failed");
        }

        });
             
      }



function createListItem() {
    userName = _spPageContextInfo.userDisplayName;
    userEmail = _spPageContextInfo.userLoginName;
    var userId = _spPageContextInfo.userId;
    var Dept = $("#dept").html();
    var Loc = $("#loc").html();
    var Pillar = $("#pillar").html();
    log(userName )
    log(userEmail )
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('EPRating');
    var itemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = oList.addItem(itemCreateInfo);
    oListItem.set_item('Review', getReviewText);
    oListItem.set_item('RatingAverage', starRating);
    oListItem.set_item('EventID', reviewID);
    oListItem.set_item('Title',userName);
    oListItem.set_item('EmpEmailID',userEmail);
    oListItem.set_item('EmpID',userId);
    oListItem.set_item('Location',Loc);
    oListItem.set_item('Department',Dept);  
    oListItem.set_item('Pillar',Pillar);
    oListItem.set_item('EventTitle',EvtTitle);
    oListItem.set_item('EventDate',EventDate);  
    oListItem.set_item('EventStartTime',EvStartDate);
    oListItem.set_item('EventEndTime',EvEndDate);
    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
}

function onQuerySucceeded() {
    showReviewList();
}

function onQueryFailed(sender, args) {
}



function showReviewList(){
 
     $(".review1Box").remove();
    $.ajax
    ({   
       
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPRating')/items?$select=ID,EventID,Review,RatingAverage,Title,Created,EmpEmailID&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
        var rate1=0;
        var rate2=0;
        var rate3=0;
        var rate4=0;
        var rate5=0;
        var results = data.d.results;
        log(results);        
        for(var i=0; i<results.length; i++){    
            var ratingCount = results[i].RatingAverage;
            log(ratingCount) 
            log(results[i].EventID)
           var ratings = results[i].RatingCount;
          var created = results[i].Created;
          
          var createdTime =  moment(created).fromNow();
          
        log(Number(results[i].EventID) === reviewID)
         if(Number(results[i].EventID) === reviewID){
         
         
         
         log(ratingCount);
         if(ratingCount === 1){               
         $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].Title+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-solid fa-star" id="star-1" style="font-size:18px;color:orange;"></span></li><li><span class="fa-regular fa-star" id="star-2"></span></li><li><span class="fa-regular fa-star" id="star-3"></span></li><li><span class="fa-regular fa-star" id="star-4"></span></li><li><span class="fa-regular fa-star" id="star-5"></span></li><li><label>'+ratingCount+'</label></li></ul></div></div></div><div class="reviewday"><label>'+ createdTime +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');
             
             rate1 = rate1 + 1;

         }else if(ratingCount === 2){           
           $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].Title+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-solid fa-star" id="star-1" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-2" style="font-size:18px;color:orange;"></span></li><li><span class="fa-regular fa-star" id="star-3"></span></li><li><span class="fa-regular fa-star" id="star-4"></span></li><li><span class="fa-regular fa-star" id="star-5"></span></li><li><label>'+ratingCount+'</label></li></ul></div></div></div><div class="reviewday"><label>'+ createdTime +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');

             rate2 = rate2 + 1;

         }else if(ratingCount === 3){           
           $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].Title+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-solid fa-star" id="star-1" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-2" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-3" style="font-size:18px;color:orange;"></span></li><li><span class="fa-regular fa-star" id="star-4"></span></li><li><span class="fa-regular fa-star" id="star-5"></span></li><li><label>'+ratingCount+'</label></li></ul></div></div></div><div class="reviewday"><label>'+ createdTime +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');

             rate3 = rate3 + 1;
         }else if(ratingCount === 4){          
           $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].Title+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-solid fa-star" id="star-1" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-2" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-3" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-4" style="font-size:18px;color:orange;"></span></li><li><span class="fa-regular fa-star" id="star-5"></span></li><li><label>'+ratingCount+'</label></li></ul></div></div></div><div class="reviewday"><label>'+ createdTime +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');

             rate4 = rate4 + 1;
         }else if(ratingCount === 5){           
          $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].Title+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-solid fa-star" id="star-1" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-2" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-3" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-4" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-5" style="font-size:18px;color:orange;"></span></li><li><label>'+ratingCount+'</label></li></ul></div></div></div><div class="reviewday"><label>'+ createdTime +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');

             rate5 = rate5 + 1;          
           
         }
         
         
         var ratingTotal = rate5 + rate4 + rate3 + rate2 + rate1;
         var avrTotalRating = (5 * rate5 + 4 * rate4 + 3 * rate3 + 2 * rate2 + 1 * rate1) / ratingTotal;
         log(avrTotalRating);
         
         var avgRatingLabel = document.getElementById('rateno-label');
         var totalRatings = document.getElementById('baseon-label');
         log(avgRatingLabel);
         avgRatingLabel.innerText = Math.round(avrTotalRating * 10) / 10;
         
         totalRatings.innerText = 'Based on '+ratingTotal+' reviews';
         
         averageRating = Math.round(avrTotalRating * 10) / 10;
         
         var avgRatingLabel2 = document.getElementById('rateno-label');
        var avgRatingLabel2Text = Number(avgRatingLabel2.innerText);
        log(avgRatingLabel2Text);
        
       
    
     
         
         }
         
         
       }
       
       
       if(avgRatingLabel2Text >= 1 && avgRatingLabel2Text <= 1.4){
       $('#starAv1').removeClass("fa-regular");      
       $('#starAv1').addClass("fa-solid").css({'font-size':'14px','color':'orange'}); 
       $('#starAv2, #starAv3, #starAv4, #starAv5').removeClass("fa-solid");
       $('#starAv2, #starAv3, #starAv4, #starAv5').addClass("fa-regular");
       $('#starAvHalf1,#starAvHalf2,#starAvHalf3,#starAvHalf4').css({'display':'none'});       
            
    }else if(avgRatingLabel2Text >= 1.5 && avgRatingLabel2Text <= 1.9){
       $('#starAv1').removeClass("fa-regular");
       $('#starAv1').addClass("fa-solid").css({'font-size':'14px','color':'orange'}); 
       $('#starAv2').css({'display':'none'});
       $('#starAvHalf1').css({'display':'block'}).css({'font-size':'14px','color':'orange'});
       $('#starAv3, #starAv4, #starAv5').removeClass("fa-solid");
       $('#starAv3, #starAv4, #starAv5').addClass("fa-regular");
       $('#starAvHalf2,#starAvHalf3,#starAvHalf4').css({'display':'none'});
             
    }else if(avgRatingLabel2Text >= 2 && avgRatingLabel2Text <= 2.4){ 
       $('#starAv1, #starAv2').removeClass("fa-regular");
       $('#starAv1, #starAv2').addClass("fa-solid").css({'font-size':'14px','color':'orange'});
       $('#starAv3, #starAv4, #starAv5').removeClass("fa-solid");
       $('#starAv3, #starAv4, #starAv5').addClass("fa-regular");
       $('#starAvHalf1,#starAvHalf2,#starAvHalf3,#starAvHalf4').css({'display':'none'});
            
    }else if(avgRatingLabel2Text >= 2.5 && avgRatingLabel2Text <= 2.9){
       $('#starAv1, #starAv2').removeClass("fa-regular");
       $('#starAv1, #starAv2').addClass("fa-solid").css({'font-size':'14px','color':'orange'});
       $('#starAvHalf2').css({'display':'block'}).css({'font-size':'14px','color':'orange'});       
       $('#starAv3').css({'display':'none'});
       $('#starAv1, #starAv2').removeClass("fa-regular");
       $('#starAv1, #starAv2').addClass("fa-solid").css({'font-size':'14px','color':'orange'});       
       $('#starAv4, #starAv5').removeClass("fa-solid");
       $('#starAv4, #starAv5').addClass("fa-regular");
       $('#starAvHalf1,#starAvHalf3,#starAvHalf4').css({'display':'none'});
       
    }else if(avgRatingLabel2Text >= 3 && avgRatingLabel2Text <= 3.4){      
       $('#starAv1, #starAv2, #starAv3').removeClass("fa-regular");
       $('#starAv1, #starAv2, #starAv3').addClass("fa-solid").css({'font-size':'14px','color':'orange'});       
       $('#starAv4, #starAv5').removeClass("fa-solid");
       $('#starAv4, #starAv5').addClass("fa-regular");       
       $('#starAvHalf1,#starAvHalf2,#starAvHalf3,#starAvHalf4').css({'display':'none'});

    }else if(avgRatingLabel2Text >= 3.5 && avgRatingLabel2Text <= 3.9){
       $('#starAv1,#starAv2,#starAv3').removeClass("fa-regular");
       $('#starAv1,#starAv2,#starAv3').addClass("fa-solid").css({'font-size':'14px','color':'orange'});
       $('#starAvHalf3').css({'display':'block'}).css({'font-size':'14px','color':'orange'});
       $('#starAv4').css({'display':'none'});       
       $('#starAv5').removeClass("fa-solid");
       $('#starAv5').addClass("fa-regular");
       $('#starAvHalf1,#starAvHalf2,#starAvHalf4').css({'display':'none'})
       
    }else if(avgRatingLabel2Text >= 4 && avgRatingLabel2Text <= 4.4){      
       $('#starAv1, #starAv2, #starAv3, #starAv4').removeClass("fa-regular");
       $('#starAv1, #starAv2, #starAv3, #starAv4').addClass("fa-solid").css({'font-size':'14px','color':'orange'}); 
       $('#starAv5').removeClass("fa-solid");
       $('#starAv5').addClass("fa-regular");
       $('#starAvHalf1,#starAvHalf2,#starAvHalf3,#starAvHalf4').css({'display':'none'});  
         
    }else if(avgRatingLabel2Text >= 4.5 && avgRatingLabel2Text <= 4.9){
     $('#starAv1, #starAv2, #starAv3, #starAv4').removeClass("fa-regular");
       $('#starAv1, #starAv2, #starAv3, #starAv4').addClass("fa-solid").css({'font-size':'14px','color':'orange'});    
       $('#starAvHalf4').css({'display':'block','font-size':'14px','color':'orange'});
       $('#starAv5').css({'display':'none'});
       $('#starAvHalf1,#starAvHalf2,#starAvHalf3').css({'display':'none'});
       
    }else if(avgRatingLabel2Text == 5){    
       $('#starAv1, #starAv2, #starAv3, #starAv4, #starAv5').removeClass("fa-regular");
       $('#starAv1, #starAv2, #starAv3, #starAv4, #starAv5').addClass("fa-solid").css({'font-size':'14px','color':'orange'});
       $('#starAvHalf1,#starAvHalf2,#starAvHalf3,#starAvHalf4').css({'display':'none'});  
          }
       
      }
    });  
    
    $("#star1, #star2, #star3, #star4, #star5").removeClass("fa-solid").css({'font-size':'18px','color':'orange'});
    $("#star1, #star2, #star3, #star4, #star5").addClass("fa-regular").css({'font-size':'18px','color':'orange'});

    

    
    getReviewText = document.querySelector('div.reviewBox > div.reviewTextarea > textarea');

    getReviewText.value = '';
    
}

/* sb  End*/


  