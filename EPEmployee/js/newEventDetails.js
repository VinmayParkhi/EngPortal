 var log = console.log;
 var uniquID;
 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 var Pillar;
 var Etype;
 var ImageUrl;
 var startTime;
 var endTime;
  var getStartTime;
 var getEndTime;
 var excitedMood;
 var boringMood;
 var frustetedMood;
 var moodArray = [];
 var buttonClicked = false;
 var moodText = [];
 var updatedItemIndex;
 var excitedMoodCount=0;
 var boringMoodCount=0;
 var frustetedMoodCount=0;
 var EventTitle;
 var remindBefore;
 var reminderDate;
var EventDt2;
var reminderStartTime;
var EventDesc;
var EventDt;
var EmpId;

 $(document).ready(function() { 
 var getBell = document.querySelector('.bell');
  	log(getBell);

  var getBellParent = getBell.parentElement;
  getBell.style.position = 'relative';
   log(getBellParent)
   // create reminder bell card 
   
 
   /*
     var div = document.createElement('div');
   div.id = 'notificationCard';
   
   getBell.insertAdjacentElement('afterend', div);
   
   var card = document.getElementById('notificationCard');
   card.style.width = '250px';
   card.style.height = '200px';
   card.style.position = 'absolute';
   card.style.background = '#fff';
   card.style.transform = 'translate(-212px, 15px)';
   card.style.borderRadius = '4px';
   */

  //$('#notificationCard').append('<div id="notificationDivMain" style="padding:10px;"><div class="notification"><div class="titleDiv"><div><img></><p class="notificationEventTitle">Event Title</p></div><p class="eventCreatedTime">04:00 PM</p></div></div></div></div><div class="desc"><p class="eventDescription">Description text goes here...</p></div><div><div class"imgDate"><img></><p>25 Aug, 2022</div><div class="imgTime"><img></><p>04:30 PM</p></div></div></div> </div>');
   
 //$('#file_input').multifile();//For facilitate multi file upload 
  var url=window.location.href;
   uniquID= Number(url.split('=')[1]);
   console.log(uniquID);
    showEventDetails(uniquID);
    $("#UpdateEvent").click(function(){
  	UpdateEventdata();
  	
  	var getBell = document.querySelector('.bell');
  	log(getBell);
  	
  });
  
  $("#reminderBtn").on("click", function() { 
  var reminderTitle = document.getElementById('eventTitle').value = EventTitle;
  //var remindeDesc = document.getElementById('eventTitle').value = EventTitle;
  var remindCheck = document.getElementById('remindChecked');
  

  log(EventTitle);
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
       
  });


  function subtractMinutes(numOfMinutes, date) {
  date.setMinutes(date.getMinutes() - numOfMinutes);
  log(date);
  log(date.getHours()+':'+date.getMinutes());
  return date;
};


  $("#setReminderBtn").on("click", function() { 
         setReminderData();
         log('reminder button clicked'); 
  });
  
 $(".emoji.emoji-1").on("click", function() { 
      
 		excitedMoodCount+=1;  
 		console.log(excitedMoodCount,$(this).find('h6').text());
 		moodText.push($(this).find('h6').text());
 		
 		moodCount();
 		
 }); 
 
 $(".emoji.emoji-2").on("click", function() { 
 				
 		
 		boringMoodCount+=1;  
 		console.log(boringMoodCount,$(this).find('h6').text());
 		moodText.push($(this).find('h6').text());
 		moodCount();
 		

 }); 
 $(".emoji.emoji-3").on("click", function() { 		
 		frustetedMoodCount+=1;  
 		console.log(frustetedMoodCount,$(this).find('h6').text());
 		moodText.push($(this).find('h6').text());
 		moodCount();
 }); 
  });
  
  function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

function setReminderData(){
		var remindCheck = document.getElementById('remindChecked');
		
		var reminderTitle = document.getElementById('eventTitle').value;
		var reminderMessage = document.getElementById('reminderMessage').value; 
		var selectDateValue= document.getElementById('selectDate').value;
		var selectTimeValue= document.getElementById('selectTime').value; 
		remindBefore = document.getElementById('minutes').value;
			
		var siteUrl = _spPageContextInfo.webAbsoluteUrl;

	    var clientContext = new SP.ClientContext(siteUrl);
	    var clientContext = new SP.ClientContext(siteUrl);  
        var oList = clientContext.get_web().get_lists().getByTitle('EPReminder');  
        var itemCreateInfo = new SP.ListItemCreationInformation();  
        this.oListItem = oList.addItem(itemCreateInfo);  
        oListItem.set_item('EventTitle', reminderTitle);
        oListItem.set_item('EventDescription', EventDesc);
        oListItem.set_item('EventDate', EventDt2);
        oListItem.set_item('ReminderMessage', reminderMessage);
        //oListItem.set_item('RemindBefore', reminderTime); 
        if(remindCheck.checked === true){
        //oListItem.set_item('Date', EventDt2); 
        oListItem.set_item('ReminderDate', reminderDate); 
        }else if(remindCheck.checked !== true){
        
        var selectTimeValueNew = selectDateValue + " " + selectTimeValue;
        log(selectTimeValueNew);
        //oListItem.set_item('Date', selectDateValue); 
        oListItem.set_item('ReminderDate',selectTimeValueNew);
        } 
        
        oListItem.update();
 clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed))

}
  
  function showEventDetails(id){
  $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,AttachmentFiles,Attachments,Pillar,Title,EventDescription,AverageRating,EventDate,EventStartTime,EventEndTime&$expand=AttachmentFiles",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data) {
        console.log(data)
        
        var results = data.d.results
        console.log(results)
        console.log(results.length)
        
        for (var i = 0; i < results.length; i++) {
        
        if(results[i].ID === id){
          console.log(results[i]);
          EventDt = moment(results[i].EventDate).format('DD MMMM, YYYY');
          EventDt2 = results[i].EventDate;
          log(EventDt);
          log(EventDt2);
          
         var EventWork= results[i].Pillar;
         var EventPillar = results[i].Pillar;
	     EventTitle= results[i].Title;
	     EventDesc= results[i].EventDescription;
	     var EventBannerImg= results[i].AttachmentFiles.results[0].ServerRelativeUrl;
	     startTime = results[i].EventStartTime;
         endTime = results[i].EventEndTime;
          excitedMood = Number(results[i].Response1);
		  boringMood = Number(results[i].Response2);
		 frustetedMood = Number(results[i].Response3);

         moodArray.push(excitedMood);
         moodArray.push(boringMood);
         moodArray.push(frustetedMood);
         
         console.log(moodArray);
         console.log(startTime);
	     console.log(endTime);
	     
	     console.log(excitedMood);
	     console.log(boringMood);
	     console.log(frustetedMood);


         const date = new Date(startTime);
         const hoursAndMinutes = date.getHours() + ':' + date.getMinutes();
         console.log(hoursAndMinutes);
         
                   var utcDateStart = new Date(startTime);
				   var hr = addZero(utcDateStart.getHours());
				   var min = addZero(utcDateStart.getMinutes());				   		
				   getStartTime = hr +':'+ min ;
				   
	
	               var utcDateEnd = new Date(endTime);
				   var hrs = addZero(utcDateEnd.getHours());
				   var mins = addZero(utcDateEnd.getMinutes());				
				   getEndTime = hrs +':'+ mins ;	
				   
				   
				  var difference = utcDateEnd.getTime() - utcDateStart.getTime(); 
				  
				  difference = difference / 1000;
                  var minuteDifference = Math.floor(difference / 60);
                  difference -= minuteDifference * 60;
                  
                  console.log(minuteDifference);
                  
    
    
          console.log(getStartTime);
	     console.log(getEndTime);




         console.log(EventWork);
	     console.log(EventTitle);
	     console.log(EventDesc);
	     console.log(EventBannerImg);
	     
	     
	     var getEventPillar = document.querySelector('div.eventdtlsTitleLeft > h6 > i > label');
	    var getEventTitle = document.querySelector('div.eventdtlsTitleLeft > h5 > label');
	    var getEventDescription = document.querySelector('.eventdtlspara > h6 > label');
	    var GetEventImg= document.querySelector('div.eventdetailsWr > div > div.eventdtlsImg > img');
	    var getStartTm = document.querySelector('label > span.startTime');
	    var getEndTm = document.querySelector('label > span.endTime');
	   var getEventDate = document.querySelector('label.eventDt');	   
	   var getDuration = document.querySelector('label > span.duration');
	   var getHeadEvent = document.querySelector('div.breadcrumbWr > ul > li > label#eventName');
	   var getHeadPillar = document.querySelector('div.breadcrumbWr > ul > li > a > label#Pillar');
	   var MainHead = document.querySelector('div.eventDetailsWrapper > div.evntdtlsHeading > a > div > h3');
	   	   
	   getEventPillar.innerText = EventWork;
	   getHeadPillar.innerText = EventPillar+"+";
	   MainHead.innerText = EventPillar+"+";
	   getEventTitle.innerText = EventTitle;
	   getEventDescription.innerText = EventDesc;
	   GetEventImg.setAttribute('src',"https://infornt.sharepoint.com/" + EventBannerImg)
	   getStartTm.innerText = getStartTime;
	   getEndTm.innerText = getEndTime;
	   getEventDate.innerText = EventDt;
	   getDuration.innerText = minuteDifference + " " +'Minutes';
	   getHeadEvent.innerText = EventTitle;





         console.log(getHeadEvent);
	     console.log(getEventTitle);
	     console.log(getEventDescription);
	    console.log(getStartTime);
	     console.log(getEndTime);



        }
        
        }
            
            }
            });
  }
  
  
  function moodCount(){  
  log(moodText.length);
  log(moodText.length ===1);
  log(moodArray); 
  
  
	if((excitedMoodCount || boringMoodCount || frustetedMoodCount >= 1) && moodText.length === 1){
  	EmpId = $("#EMpID").text();
  	log(EmpId);
  	var siteUrl = _spPageContextInfo.webAbsoluteUrl;

    var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('EPEventMood');
    
    this.oListItem = oList.getItemById(uniquID);
    
    var excited = excitedMood + excitedMoodCount;
    var NotExcited = boringMood + boringMoodCount;
    var NotSure = frustetedMood + frustetedMoodCount;
    
    
	oListItem.set_item('EmpID', EmpId);
	oListItem.set_item('Title', uniquID);
    oListItem.set_item('Excited', excited);
    oListItem.set_item('NotExcited', NotExcited);
    oListItem.set_item('NotSure', NotSure);

    oListItem.update();
    
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed))
}

 };
   
   function onQuerySucceeded() {
    alert('Item updated Successfully!');
    buttonClicked = true;
    updatedMoodCount();
   }

   function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
   }
   

  function updatedMoodCount(){
   if(buttonClicked === true){
   $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,AttachmentFiles,Attachments,Pillar,Title,EventDescription,AverageRating,EventDate,EventStartTime,EventEndTime,Response1,Response2,Response3&$expand=AttachmentFiles",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data) {
        
        var result = data.d.results;
        
        for(var k=0;k<result.length;k++){
          if(result[k].ID === uniquID){
          
          var updatedMoodArray = [];
           console.log(result[k]);
           updatedMoodArray.push(Number(result[k].Response1));
           updatedMoodArray.push(Number(result[k].Response2));
           updatedMoodArray.push(Number(result[k].Response3));
           
           log(updatedMoodArray);
           for(var j=0;j<updatedMoodArray.length;j++){
            //console.log(updatedMoodArray[j],j);
            for(var i =0;i<moodArray.length;i++){
              if(updatedMoodArray[j] > moodArray[i]){
                  log(updatedMoodArray[j],j)
                  updatedItemIndex = j;
                  log(updatedItemIndex)
                                
                  break;
              }
            }
             
             }
             
             
           }
          }
        }
        
        
});
}
  
   }
  
function eventDetails(id){
	eventData=getListItem('CreateEve','ID',id);
  	if(eventData!=undefined){
  		eventData=JSON.parse(eventData);
  		if(eventData.d.results.length > 0){
  			
  			$("#evTitle").val(eventData.d.results[0].EventTitle);
  			$("#Pillar").val(eventData.d.results[0].Pillar);
  			$("#EvType").val(eventData.d.results[0].EventType);
  			$("#evDesc").val(eventData.d.results[0].EventDescription);
  			$("#sEdate").val(eventData.d.results[0].EventDate);
  			$("#SSTime1").val(eventData.d.results[0].EventStartTime);
  			$("#SETime1").val(eventData.d.results[0].EventEndTime);
  			$("#evLink").val(eventData.d.results[0].EventLink);
  			$("#evSpeaker").val(eventData.d.results[0].EventSpeakerName);
  			$("#evOrg").val(eventData.d.results[0].EventOrganizerName);
  			$("#evKey").val(eventData.d.results[0].EventKeywords);
  			ImageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$"+ id +"&$select=Attachments&$expand=AttachmentFiles";

 //console.log("ImageURL: "+ImageUrl )
  			//get current attachment url and pass it to global variable
  		}
  	}
  }
  

function getListItem(listname,columnname,colvalue){
	var url=_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('"+ listname +"')/items?$select=*&$filter="+ columnname +" eq '"+ colvalue +"'";
	var listitemData = '';
	listitemData = $.ajax({
		url:url,
		method: "GET",
		async: false,
		headers: {
			"Accept": "application/json; odata=verbose",
			"content-type": "application/json; odata=verbose",
			"X-RequestDigest":$("#__REQUESTDIGEST").val()
		},
		success:function (data){},
		error:function (error){
			console.log(error.responseText)
		}
	});
	//console.log("URL:"+url);
	return listitemData.responseText;
}

/********************************************Get EventData To Update***********************************************************************/
/*
function updateSeriesData(){

	for(i=0;i<Dropdown_Value;i++){
	
		var ename = $("#evTitle"+i).val();
	  	var pillar = $("#Pillar").val();
		var evtype = $("#EvType").val();
		var evdesc = $("#evDesc").val();
		var evdate = $("#sEdate").val();
		var evstime = $("#SSTime1").val();
		var evetime = $("#SETime1").val();
		var evlink = $("#evLink").val();
		var evspname = $("#evSpeaker").val();
		var evorg = $("#evOrg").val();
		var evkey = $("#evKey").val();
		updateEventSeriesData(ename,pillar)
	}
}

function updateEventSeriesData(ename,pillar){


}
*/
function UpdateEventdata(){
  	//var eid=$("#uniquID").val();
  	var ename = $("#evTitle").val();
  	var pillar = $("#Pillar").val();
	var evtype = $("#EvType").val();
	var evdesc = $("#evDesc").val();
	var evdate = $("#sEdate").val();
	var evstime = $("#SSTime1").val();
	var evetime = $("#SETime1").val();
	var evlink = $("#evLink").val();
	var evspname = $("#evSpeaker").val();
	var evorg = $("#evOrg").val();
	var evkey = $("#evKey").val();

	var fileArray = []; 
	$("#attachFilesHolder input:file").each(function() { 
		if ($(this)[0].files[0]) { 
			fileArray.push({ "Attachment": $(this)[0].files[0] }); 
		} 
	}); 
	//arraycount += fileArray.length;


  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPEventListItem'},
  	 	"EventTitle":ename,
  	 	"Pillar":pillar,
  	 	"EventType":evtype,
  	 	"EventDescription":evdesc,
		"EventDate":evdate,
		"EventStartTime":evstime,
		"EventEndTime":evetime,
		"EventLink":evlink,
		"EventSpeakerName":evspname,
		"EventOrganizerName":evorg,
		"EventKeywords":evkey
		
  	};
  	$.ajax({
		url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items("+ uniquID +")",
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
		if(fileArray.length > 0){
			AddAttachments(uniquID);
		}
		alert("Sucessfully updated");
	}

    function OnError(data){
		alert("Update error");
	}
  };
  
  /**********************************************************************************************************************************************/
  
  
function checkFileExists(){
var sitecollectionurl=_spPageContextInfo.webAbsoluteUrl;
    $.ajax({
            //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/getFileByServerRelativeUrl('/"+sitecollectionurl+"'/Lists/CreateEve/Attachments/"+ id +"/test.txt')",
        	url:ImageUrl, 
			method: "GET",            
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                if(data.d.Exists){  
            //delete file if it already exists
                    DeleteFile();
                }
            },
            error: function (data) {
//check if file not found error
                AddAttachments(uniquID);               
            }
      });
}
//console.log("URL data :"+url);
function DeleteFile(){
    $.ajax({
      url: ImageUrl,
      //url: "https://sitecollectionurl/_api/web/getFileByServerRelativeUrl('/sitecollectionurl/Lists/Test/Attachments/1/test.txt')",
      method: 'DELETE',
      headers: {
        'X-RequestDigest': document.getElementById("__REQUESTDIGEST").value
        },
      success: function (data) {            
            AddAttachments(uniquID);
        },
        error: function (data) {
            console.log(data);      
        }
    });
}

  
  
function AddAttachments(id)
{   
    var digest = "";
    $.ajax(
    {
	    url: "/_api/contextinfo",
	    method: "POST",
	    headers: {
	                    "ACCEPT": "application/json;odata=verbose",
	                    "content-type": "application/json;odata=verbose"
	    },
	    success: function (data) {
	    digest = data.d.GetContextWebInformation.FormDigestValue;
	    },
	    error: function (data) {
	
	    }
    }).done(function() {
        var fileInput = $('#file_upload');
        var fileName = fileInput[0].files[0].name;
        alert(fileName)
        var reader = new FileReader();
        reader.onload = function (e) {
        var fileData = e.target.result;
            var res11 = $.ajax(
            {                             
                url:  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items(" + id + ")/AttachmentFiles/add(FileName='" + fileName + "')",                                       
                method: "POST",
                binaryStringRequestBody: true,
                data: fileData,
                processData: false,
                headers: {
                                "ACCEPT": "application/json;odata=verbose",          
                                "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
                                "content-length": fileData.byteLength
                },                                                                                                                            
                success: function (data) {                                            
                        console.log("success");                                               
                },
                error: function (data) {                                                
                        console.log("Error occured." + data.responseText);
                }
            });                          
        };
        reader.readAsArrayBuffer(fileInput[0].files[0]);

    });                                          
}
 
 
 