 var uniquID;
 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 var Pillar;
 var Etype;
 var ImageUrl;
 $(document).ready(function() { 
 
 
 $('#evback').click(function() {
             history.go(-1);        
    });
 //$('#file_input').multifile();//For facilitate multi file upload 
  var url=window.location.href;
   uniquID= url.split('=')[1];
  
  eventDetails(uniquID);
  $("#UpdateEvent").click(function(){
  	UpdateEventPublishdata();
  	
  });
  
   $("#SaveForNow").click(function(){
  	UpdateEventSavedata();
  	
  });

     $("#EvType,#evTitle,#evDesc,#pillar,#evLink,#evSpeaker,#evOrg,#evKey,.SingleDayEventUpload").on("input", function () {    	
        canChangeColorEditEvent();
        
    });
    function canChangeColorEditEvent(){  
        var EventChangetrue = true;  
        $("#EvType,#evTitle,#evDesc,#pillar,#evLink,#evSpeaker,#evOrg,#evKey,.SingleDayEventUpload").each(function(){
            if($(this).val()==''){
                EventChangetrue = false;
            }
        });
        if(EventChangetrue){
            $('#UpdateEvent').addClass("EnableBtn");  
            $('#AutopublishEvent').addClass("EnableBtn");   
            $('#SaveForNow').addClass("EnableBtn"); 
        }else{
            $('#UpdateEvent').removeClass("EnableBtn")             
            $('#AutopublishEvent').removeClass("EnableBtn") 
            $('#SaveForNow').removeClass("EnableBtn")  
        }
    } 
     
  });
  
function eventDetails(id){
	eventData=getListItem('EPEvent','ID',id);
  	if(eventData!=undefined){
  		eventData=JSON.parse(eventData);
  		if(eventData.d.results.length > 0){
  			var date = moment(eventData.d.results[0].EventDate).format('DD MMM,YYYY');
  			var StartTime = moment.utc(eventData.d.results[0].EventStartTime).format('hh:mm A');
  			var EndTime = moment.utc(eventData.d.results[0].EventEndTime).format('hh:mm A');
  			$("#evTitle").val(eventData.d.results[0].Title);
  			$("#pillar").val(eventData.d.results[0].Pillar);
  			$("#EvType").val(eventData.d.results[0].EventType);
  			$("#evDesc").val(eventData.d.results[0].EventDescription);
  			$("#sEdate").val(date);
  			$("#SSTime1").val(StartTime);
  			$("#SETime1").val(EndTime);
  			$("#evLink").val(eventData.d.results[0].EventLink);
  			$("#evSpeaker").val(eventData.d.results[0].EventSpeakerName);
  			$("#evOrg").val(eventData.d.results[0].EventOrganizerName);
  			$("#evKey").val(eventData.d.results[0].EventKeywords);
  			ImageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$"+ id +"&$select=Attachments&$expand=AttachmentFiles";

 //console.log("ImageURL: "+ImageUrl )
  			//get current attachment url and pass it to global variable
  		}
  	}
  	
  	var EventStartTime = $("input[id='SSTime1']").val(); 	
	var EventEndTime = $("input[id='SETime1']").val();
	console.log(EventStartTime,EventEndTime,"times");
	
	function getTimeDiff(EventStartTime, EventEndTime) {

  return moment.duration(moment(EventEndTime, "HH:mm:ss a").diff(moment(EventStartTime, "HH:mm:ss a")));
}

diff = getTimeDiff(EventStartTime, EventEndTime)
var gap = (`${diff.hours()} hr: ${diff.minutes()} min`);
console.log(gap);
$("#duration").text(gap);


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
	console.log("URL:"+url);
	return listitemData.responseText;
}

/********************************************Get EventData To Update***********************************************************************/

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

function UpdateEventPublishdata(){

 	 	var EventDate = $("input[id='sEdate']").val();
 	var EventStartTime = $("input[id='SSTime1']").val(); 	
 	var EventEndTime = $("input[id='SETime1']").val();
 	
 	
 	var EventStartDateTime = moment(EventDate+ ' ' +EventStartTime).format('YYYY/MM/DD HH:mm');
    var EventEndDateTime = moment(EventDate+ ' ' +EventEndTime).format('YYYY/MM/DD HH:mm');    
    //console.log("Start :"+EventStartDateTime +" End :"+EventEndDateTime);


  	//var eid=$("#uniquID").val();
  	var ename = $("#evTitle").val();
  	var pillar = $("#pillar").val();
	var evtype = $("#EvType").val();
	var evdesc = $("#evDesc").val();
	var evdate = $("#sEdate").val();
	var evstime = EventStartDateTime;
	var evetime = EventEndDateTime;
	var evlink = $("#evLink").val();
	var evspname = $("#evSpeaker").val();
	var evorg = $("#evOrg").val();
	var evkey = $("#evKey").val();
	var published = "Published";

	var fileArray = []; 
	$("#attachFilesHolder input:file").each(function() { 
		if ($(this)[0].files[0]) { 
			fileArray.push({ "Attachment": $(this)[0].files[0] }); 
		} 
	}); 
	//arraycount += fileArray.length;


  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPEventListItem'},
  	 	"Title":ename,
  	 	"Pillar":pillar,
  	 	"EventType":evtype,
  	 	"EventDescription":evdesc,
		"EventDate":evdate,
		"EventStartTime":evstime,
		"EventEndTime":evetime,
		"EventLink":evlink,
		"EventSpeakerName":evspname,
		"EventOrganizerName":evorg,
		"EventKeywords":evkey,
		"EventStatus": published
		
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
  
function UpdateEventSavedata(){
  	//var eid=$("#uniquID").val();
  	var ename = $("#evTitle").val();
  	var pillar = $("#pillar").val();
	var evtype = $("#EvType").val();
	var evdesc = $("#evDesc").val();
	var evdate = $("#sEdate").val();
	var evstime = $("#SSTime1").val();
	var evetime = $("#SETime1").val();
	var evlink = $("#evLink").val();
	var evspname = $("#evSpeaker").val();
	var evorg = $("#evOrg").val();
	var evkey = $("#evKey").val();
	var save = "Draft";

	var fileArray = []; 
	$("#attachFilesHolder input:file").each(function() { 
		if ($(this)[0].files[0]) { 
			fileArray.push({ "Attachment": $(this)[0].files[0] }); 
		} 
	}); 
	//arraycount += fileArray.length;


  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPEventListItem'},
  	 	"Title":ename,
  	 	"Pillar":pillar,
  	 	"EventType":evtype,
  	 	"EventDescription":evdesc,
		"EventDate":evdate,
		"EventStartTime":evstime,
		"EventEndTime":evetime,
		"EventLink":evlink,
		"EventSpeakerName":evspname,
		"EventOrganizerName":evorg,
		"EventKeywords":evkey,
		"EventStatus": save
		
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
		//alert("Update error");
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
                url:  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CreateEve')/items(" + id + ")/AttachmentFiles/add(FileName='" + fileName + "')",                                       
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
 
 