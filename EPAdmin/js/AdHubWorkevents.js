var CurrentDate;
var EventID;


var EventDates ;               
var EventFullDates ;
var EventTime ;
var EventId ;
var pillar;
var EventTitle;
var EventDescription;
var AverageRating;               	 
var VideoURLs;

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
       url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,AverageRating,EventDate,EventStartTime,VideoURL,Response1,Response2,Response3&$expand=AttachmentFiles&$filter=Pillar eq 'Work' and EventDate ge '"+today+"'&$orderby=Created desc",
       method: "GET",
       headers:
          {
              "Accept": "application/json;odata=verbose"
          },
          
       success: function (data, status, xhr) {
           var dataresults = data.d.results;
           for (var i = 0; i <3; i++) {
              EventFullDates = moment(data.d.results[i].EventDate).format('DD MMMM, YYYY');
              EventTime = data.d.results[i].EventStartTime;
              var EventId = data.d.results[i].ID;
              pillar = data.d.results[i].Pillar;
              var EventTitle= data.d.results[i].Title;
              var EventDescription= data.d.results[i].EventDescription;
              var ExcitedMoodData= data.d.results[i].Response1;
              var BoringMoodData= data.d.results[i].Response2;
              var FrustetedMoodData= data.d.results[i].Response3;


              AverageRating  = data.d.results[i].AverageRating;  
           
              var utcDate = new Date(EventTime);
              var hr = addZero(utcDate.getHours());
              var min = addZero(utcDate.getMinutes());				
              var localDate = hr +':'+ min ;	
                              
              VideoURLs = data.d.results[i].VideoURL;
                   //document.getElementById('VideoURL').setAttribute("src","VideoURLs");
                  $('iframe').attr("src",VideoURLs);
               $("#popupEVTitle").html(EventTitle);				
               $("#popupEVDesc").html(EventDescription);

                var a =  "https://infornt.sharepoint.com/"+ data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl; 
                     
							if ( ExcitedMoodData == null ){
						   		//alert("test");
						   		ExcitedMoodData = "-";
							  // some_variable is either null or undefined
							} 
							if ( BoringMoodData == null ){
						   		//alert("test");
						   		BoringMoodData = "-";
							  // some_variable is either null or undefined
							} 
							if ( FrustetedMoodData== null ){
						   		//alert("test");
						   		FrustetedMoodData = "-";
							  // some_variable is either null or undefined
							} 
                   
                $(".eventlist").append('<div class="card me-3 my-2"> <span class="img"> <img src="'+a+'" alt=""></span> <div class="card-data"> <small><label id="pillar" class="'+pillar+'">'+pillar+'</label></small><span>'+EventTitle+'</span>'+
                                       '<p id="EventDesc">'+EventDescription+'</p> <span style="display:flex;"> <span class="date" style="display:flex; align-items:baseline;"><img style="width:10%; margin-right:6px;" src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon feather-calendar.svg" alt="Mail">'+
                                       '<label>'+EventFullDates+'</label> </span> <span class="timedata" style="display:flex; align-items:baseline;"><img style="width:14%; margin-right:6px;" src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon feather-clock.svg" alt="Message">'+localDate+'</span> </span> <span class="card-bottom">'+
                                       '<span class="card-left"> <a href="#"><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/excited.png" alt=""><small>'+ExcitedMoodData+'</small></a>'+
                                       '<a href="#"><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/boring.png" alt=""><small>'+BoringMoodData+'</small></a>'+
                                       '<a href="#"><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/frustrated.png" alt=""><small>'+FrustetedMoodData+'</small></a></span>'+
                                       '<span class="card-right"> <button class="btn btn-edit"><a href="https://mail.zoho.com/zm/#mail/folder/inbox/p/1661172600567110001">Edit</a></button></span> </span> </div> </div>'); 
                                                       
           } // for loop End					                 
       },
       error: function (xhr, status, error) {
           console.log("Failed");
       }
   });
}




function GetPastEvents() {
    var today= new Date();
    today = moment(today).toISOString();
   $.ajax({
       url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,AverageRating,EventDate,EventStartTime,VideoURL&$expand=AttachmentFiles&$filter=Pillar eq 'Work' and EventDate le '"+today+"'&$orderby=Created desc",
       method: "GET",
       headers:
          {
              "Accept": "application/json;odata=verbose"
          },
          
       success: function (data, status, xhr) {
           var dataresults = data.d.results;
                        
           for(var m=0; m<=dataresults.length; m++){
                var totalEvetnts = dataresults.length;
             $("#EventCount").text(totalEvetnts+" Events");

}

           for (var i = 0; i <3; i++) {
              EventDates = moment(data.d.results[i].EventDate).format('YYYY-MM-DD');               
              EventFullDates = moment(data.d.results[i].EventDate).format('DD MMMM, YYYY');
              EventTime = data.d.results[i].EventStartTime;
              var EventId = data.d.results[i].ID;
              pillar = data.d.results[i].Pillar;
              var EventTitle= data.d.results[i].Title;
              var EventDescription= data.d.results[i].EventDescription;
              AverageRating  = data.d.results[i].AverageRating;  
           
              var utcDate = new Date(EventTime);
              var hr = addZero(utcDate.getHours());
              var min = addZero(utcDate.getMinutes());				
              var localDate = hr +':'+ min ;	
                              
              VideoURLs = data.d.results[i].VideoURL;
                   //document.getElementById('VideoURL').setAttribute("src","VideoURLs");
               //   $('iframe').attr("src",VideoURLs);
             //  $("#popupEVTitle").html(EventTitle);				
               //$("#popupEVDesc").html(EventDescription);
					
                var b =   "https://infornt.sharepoint.com/" + data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl; 
                 console.log(b); 
                $(".pastEventsWr").append('<div class="pasteventsCard de"> <div class="videoImg1"   style="height: 23vh;background-image:linear-gradient(180deg, #00000000 0%, #0D0D0DE8 74%, #121112 100%), url('+b+');background-repeat: no-repeat;background-size: cover;">'+
                						  '<a class="play player" style="cursor:pointer" onclick="getVid(event)">'+
                               			  '<img src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Group 2834.svg" alt="Play"> </a>'+
                                          '<div class="pasteventsDetails"><h5><label>'+EventTitle+'</label></h5> <p><span id="EventDesc">'+EventDescription+'</span></p>'+
                                          '</div> </div> <input type="hidden" value="'+VideoURLs+'"> </div>');
                $(".player").attr('data-toggle',"modal");
                $(".player").attr('data-target',"#exampleModal");
                     
                                
           } // for loop End                
       },
       error: function (xhr, status, error) {
           console.log("Failed");
       }
   });
}

function getVid(event){
console.log("sankedfaf")
	var vidtest = event.target.parentElement.parentElement.parentElement.lastChild.previousElementSibling.value;
	var evetit = event.target.parentElement.nextElementSibling.firstElementChild.firstElementChild.innerText;
	var evedesc = event.target.parentElement.nextElementSibling.lastElementChild.firstElementChild.innerText;
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

function detailview(clicked_id,evetit,evedesc){
   console.log("id is :",clicked_id);
   console.log("Event title is :",evetit);
   console.log("Event desc is :",evedesc);
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