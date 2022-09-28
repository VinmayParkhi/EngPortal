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
	
	
	var currentDate = new Date();	
	var curMonth = currentDate.getMonth()+ 1;
	 if (curMonth < 10) { curMonth = '0' + curMonth; 
	 }
	  $('#month').prop('selectedIndex', curMonth);
   $('.month').val(curMonth);
   $('.month option:lt(' + curMonth + ')').css('display','none');
   //$('.month').prop('selectedIndex', "select");

	$('.compmonth option:gt(' + curMonth + ')').css('display','none');
	 var date = new Date();
        var year = date.getFullYear();
        //console.log(year);
        var today = moment().format('MM-DD');
        $('select.month option')[0].innerText=$('select.month option:selected').val();
    	 $('select.month option')[0].innerHTML=$('select.month option:selected').val();
    	 $("select.month").val($('select.month option:selected').val());
    	 if ($('select.month option:selected').val() == curMonth) {
        var sd = today;
        var ed = moment(sd).clone().endOf('month').format('MM-DD');
    } else {
        var sd =$('select.month option:selected').val()+"-01";
        var ed = moment(sd).clone().endOf('month').format('MM-DD');
    }
    var date = new Date();
            var year = date.getFullYear();
            
            //$("#year").attr=("value",year);
            var aha = document.getElementById('year');
            aha.innerText = year;
            var startOfMonth = (year+"-"+sd);
            var endOfMonth = (year+"-"+ed);
            console.log(startOfMonth);
            console.log(endOfMonth);
        	GetUpcomingEvents(today);
	
	
	
	GetPastEvents()
	 $('select.compmonth').change(function() {       
     $('select.compmonth option')[0].innerText=$('select.compmonth option:selected').val();
     $('select.compmonth option')[0].innerHTML=$('select.compmonth option:selected').val();
     $("select.compmonth").val($('select.compmonth option:selected').val());
			
			//console.log("99"+$('select.month option:selected').val());
            if ($('select.compmonth option:selected').val() == curMonth) {
                var sdc =$('select.compmonth option:selected').val()+"-01";    
                var edc = today;
               } else {
                var sdc =$('select.compmonth option:selected').val()+"-01";    
               var edc = moment(sdc).clone().endOf('month').format('MM-DD');
               }
            var datec = new Date();
            var yearc = datec.getFullYear();
            var ahac = document.getElementById('compyear');
            ahac.innerText = yearc;
            var startOfMonthc = (yearc+"-"+sdc);
            var endOfMonthc = (yearc+"-"+edc);
            console.log(startOfMonthc);
            console.log(endOfMonthc);
            //SelectedDateUpcomingEvents(startOfMonth,endOfMonth);
            CompletedEvents(startOfMonthc,endOfMonthc);
    });

	
	   $('select.month').change(function() {
	        $(".eventlist").empty();
            	$('.uce').hide();
     var date = new Date();
        var year = date.getFullYear();
        //console.log(year);
        var today = moment().format('MM-DD');
        console.log(today);
     $('select.month option')[0].innerText=$('select.mont option:selected').val();
     $('select.month option')[0].innerHTML=$('select.month option:selected').val();
     $("select.month").val($('select.month option:selected').val());
    console.log($('select.month option:selected').val());

    if ($('select.month option:selected').val() == curMonth) {
        var sd = today;
        var ed = moment(sd).clone().endOf('month').format('MM-DD');
    } else {
        var sd =$('select.month option:selected').val()+"-01";
        var ed = moment(sd).clone().endOf('month').format('MM-DD');
    }
 
			
			//console.log("99"+$('select.month option:selected').val());
            
            var date = new Date();
            var year = date.getFullYear();
            
            //$("#year").attr=("value",year);
            var aha = document.getElementById('year');
            aha.innerText = year;
            var startOfMonth = (year+"-"+sd);
            var endOfMonth = (year+"-"+ed);
            console.log(startOfMonth);
            console.log(endOfMonth);
            SelectedDateUpcomingEvents(startOfMonth,endOfMonth);
    });
	 });



function addZero(i) {
 if (i < 10) {i = "0" + i}
 return i;
}

function GetUpcomingEvents(today) {
    var today= moment().format('YYYY-MM-DDTHH:mm:SS');
   $.ajax({
       url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=*,Attachments&$expand=AttachmentFiles&$filter=(Pillar eq 'Life') and (EventStatus eq 'Published') and (EventEndTime ge '"+today+"')&$orderby=Created desc",
       method: "GET",
       headers:
          {
              "Accept": "application/json;odata=verbose"
          },
          
       success: function (data, status, xhr) {
           var dataresults = data.d.results;
           console.log(dataresults.length);
           if(dataresults.length > 0 ){
	           for (var i = 0; i < 3; i++) {
	              EventFullDates = moment(data.d.results[i].EventDate).format('DD MMM, YYYY');
	              var EventStartTime = moment.utc(data.d.results[i].EventStartTime).format('hh:mm a');
	              EventTime = data.d.results[i].EventEndTime;
	              var EventId = data.d.results[i].ID;
	              var pillar = data.d.results[i].Pillar;
	              var EventTitle= data.d.results[i].Title;
	              var EventDescription= data.d.results[i].EventDescription;
	              var ExcitedMoodData= data.d.results[i].Exited;
	              var BoringMoodData= data.d.results[i].NotExcited;
	              var FrustetedMoodData= data.d.results[i].NotSure;
	
	
	              //AverageRating  = data.d.results[i].AverageRating;  
	           
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
	                   
	                $(".eventlist").append('<div id="upcomEvent" class="col-4 card uce"> <span class="img"> <img src="'+a+'" alt=""></span> <div class="card-data"> <small><label id="pillar" class="'+pillar+'">'+pillar+'</label></small><span>'+EventTitle+'</span>'+
	                                       '<p id="EventDesc">'+EventDescription+'</p> <span style="display:flex;"> <span class="date" style="display:flex; align-items:baseline;"><img style="width:10%; margin-right:6px;" src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon feather-calendar.svg" alt="Mail">'+
	                                       '<label>'+EventFullDates+'</label> </span> <span class="timedata" style="display:flex; align-items:baseline;"><img style="width:14%; margin-right:6px;" src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon feather-clock.svg" alt="Message">'+EventStartTime+'</span> </span> <span class="card-bottom">'+
	                                       '<span class="card-left"> <a href="#"><img src= "../../SiteAssets/ENG-Admin/images/excited.png" alt=""><small>'+ExcitedMoodData+'</small></a>'+
	                                       '<a href="#"><img src= "../../SiteAssets/ENG-Admin/images/boring.png" alt=""><small>'+BoringMoodData+'</small></a>'+
	                                       '<a href="#"><img src= "../../SiteAssets/ENG-Admin/images/frustrated.png" alt=""><small>'+FrustetedMoodData+'</small></a></span>'+
	                                       '<span class="card-right"> <button class="btn btn-edit"><a href= "../../SitePages/Admin/edit_event.aspx?EventID='+EventId+'"">Edit</a></button></span> </span> </div> </div>'); 
	                                                       
	           } // for loop End
           }else{
             $(".eventlist").append('<div id="upcomEvent" class="card me-3 my-2"><p id="EventDesc">No upcoming event.</p>');
             }			                 
       },
       error: function (xhr, status, error) {
           console.log("Failed");
       }
   });
}

function CompletedEvents(sc,ec) {
	console.log("aha",sc,ec);
    var today= new Date();
    today = moment(today).toISOString();
   $.ajax({
       url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,EventDate,EventStartTime,VideoURL&$expand=AttachmentFiles&$filter=Pillar eq 'Life' and EventDate ge '"+sc+"' and EventDate le '"+ec+"'&$orderby=Created desc",
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

           // for loop End                
       },
       error: function (xhr, status, error) {
           console.log("Failed");
       }
   });
}

function SelectedDateUpcomingEvents(sd,ed) {

   console.log("startdate:",sd,"lastdate:",ed);
   $.ajax({
       url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=*,Attachments&$expand=AttachmentFiles&$filter=Pillar eq 'Life' and EventDate ge '"+sd+"' and EventDate le '"+ed+"'&$orderby=Created desc",
       method: "GET",
       headers:
          {
              "Accept": "application/json;odata=verbose"
          },
          
       success: function (data, status, xhr) {
           var dataresults = data.d.results;
           console.log(dataresults.length);
           if(dataresults.length > 0 ){
           for (var i = 0; i <3; i++) {
              EventFullDates = moment(data.d.results[i].EventDate).format('YYYY, MMM DD');
              EventTime = data.d.results[i].EventStartTime;
              var EventId = data.d.results[i].ID;
              var pillar = data.d.results[i].Pillar;
              var EventTitle= data.d.results[i].Title;
              var EventDescription= data.d.results[i].EventDescription;
              var ExcitedMoodData= data.d.results[i].Response1;
              var BoringMoodData= data.d.results[i].Response2;
              var FrustetedMoodData= data.d.results[i].Response3;


              //AverageRating  = data.d.results[i].AverageRating;  
           
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
                   
                $(".eventlist").append('<div class="card me-3 my-2 monthlyEvent"> <span class="img"> <img src="'+a+'" alt=""></span> <div class="card-data"> <small><label id="pillar" class="'+pillar+'">'+pillar+'</label></small><span>'+EventTitle+'</span>'+
                                       '<p id="EventDesc">'+EventDescription+'</p> <span style="display:flex;"> <span class="date" style="display:flex; align-items:baseline;"><img style="width:10%; margin-right:6px;" src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon feather-calendar.svg" alt="Mail">'+
                                       '<label>'+EventFullDates+'</label> </span> <span class="timedata" style="display:flex; align-items:baseline;"><img style="width:14%; margin-right:6px;" src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon feather-clock.svg" alt="Message">'+localDate+'</span> </span> <span class="card-bottom">'+
                                       '<span class="card-left"> <a href="#"><img src= "../../SiteAssets/ENG-Admin/images/excited.png" alt=""><small>'+ExcitedMoodData+'</small></a>'+
                                       '<a href="#"><img src= "../../SiteAssets/ENG-Admin/images/boring.png" alt=""><small>'+BoringMoodData+'</small></a>'+
                                       '<a href="#"><img src= "../../SiteAssets/ENG-Admin/images/frustrated.png" alt=""><small>'+FrustetedMoodData+'</small></a></span>'+
                                       '<span class="card-right"> <button class="btn btn-edit"><a href= "../../SitePages/Admin/edit_event.aspx?EventID='+EventId+'">Edit</a></button></span> </span> </div> </div>'); 
                                                       
           } // for loop End	
           }else{
           
           	$(".eventlist").append('<div class="monthlyEvent" class="card me-3 my-2"><p id="EventDesc">No upcoming event.</p>');
             }
           				                 
       },
       error: function (xhr, status, error) {
           console.log("Failed");
       }
   });
}


function GetPastEvents() {
    var today= new Date();
    var today= moment().format('YYYY-MM-DDTHH:mm:SS');
   $.ajax({
       url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=*,Attachments&$expand=AttachmentFiles&$filter=(Pillar eq 'Life') and (EventEndTime le '"+today+"')&$orderby=Created desc",
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
              //AverageRating  = data.d.results[i].AverageRating;  
           
              var utcDate = new Date(EventTime);
              var hr = addZero(utcDate.getHours());
              var min = addZero(utcDate.getMinutes());				
              var localDate = hr +':'+ min ;	
                              
              VideoURLs = data.d.results[i].VideoURL;
                   //document.getElementById('VideoURL').setAttribute("src","VideoURLs");
                  $('iframe').attr("src",VideoURLs);
               $("#popupEVTitle").html(EventTitle);				
               $("#popupEVDesc").html(EventDescription);
					
                var b =   "https://infornt.sharepoint.com/" + data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl; 
                 console.log(b); 
                $(".pastEventsWr").append('<div class="pasteventsCard de"> <div class="row align-items-center justify-content-center videoImg1" style="height: 23vh;background-image:linear-gradient(180deg, #00000000 0%, #0D0D0DE8 74%, #121112 100%), url('+b+');background-repeat: no-repeat;background-size: cover;">'+
                						  '<a class="col-12 play player" style="cursor:pointer;width: 24%;" onclick="getVid(event)">'+
                               			  '<img src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Group 2834.svg" alt="Play" style="width: 100%;"> </a>'+
                                          '<div class="col-12 pasteventsDetails" style="height: 35px;padding: 0 1rem;"><h5><label>'+EventTitle+'</label></h5> <p><span id="EventDesc">'+EventDescription+'</span></p>'+
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