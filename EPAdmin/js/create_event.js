 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 var Pillar;
 var Etype;  
 $(document).ready(function() { 
  const tod = new Date();
const yyyy = tod.getFullYear();
let mm = tod.getMonth() + 1; 
let dd = tod.getDate();
var hour = tod.getHours();
var minute = tod.getMinutes();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = yyyy + '-' + mm + '-' + dd;
console.log(formattedToday,"today's Date");
$('document').ready(function(){
    
    $('#SSTime1').timepicker({
        interval:30,
    });
    var pickedDate;
    $("#sEdate").datepicker({
	        dateFormat: 'yy-mm-dd',
	        changeMonth: true,
	        changeYear: true,
	        minDate: "-0Y",
	        maxDate: "+10Y",
	        yearRange: "1900:2100"  
	    });
        
        $("#sEdate").on("change",function(){
        var selected = $(this).val();
        pickedDate = selected;
        console.log(pickedDate,"selected Date");
    });

    $('#sEdate').on("change", function() {
        if(pickedDate == formattedToday){
            console.log("inside if");
            $('#SSTime1').timepicker('option', 'minTime', "" + hour + ":" + minute + "");
            $('#SSTime1').timepicker('option', 'interval', '30');
            
            $('#SETime1').timepicker('option', 'minTime', "" + hour + ":" + minute + "");
            $('#SETime1').timepicker('option', 'interval', '30');

        }else{
            console.log("inside else");
            $('#SSTime1').timepicker('option', 'minTime', '00:00am');
            $('#SSTime1').timepicker('option', 'maxTime', '12:00pm');
            
            $('#SETime1').timepicker('option', 'minTime', '00:00am');
            $('#SETime1').timepicker('option', 'maxTime', '12:00pm');

       
        }
    });
});
 //$('#file_input').multifile();//For facilitate multi file upload 
  
 $("#PublishEvent").click(function() {formCreateNowSingle()}); 
     
      
     
   
 $("select.pillar").change(function(){
 debugger;
        Pillar = $(this).children("option:selected").val();

    });
    $("select.evType").change(function(){
        Etype= $(this).children("option:selected").val();

    });

  $("#PublishEventBtn1 > div > div > div.modal-footer > button").click(function(){
    //alert("The paragraph was clicked.");
    
    
    $(".single-day input").val("");
    $(".single-day textarea").val("");
    $(".single-day select").val("");
  });

    $("#eventtype, #evTitle,#evDesc,#Pillar,#sEdate,#SSTime1,#SSTime1,#evLink,#evSpeaker,#evOrg,#evKey,.SingleDayEventUpload").on("input", function () {    	
        canChangeColorCreateEvent();
    });
    function canChangeColorCreateEvent(){  
        var EventChange = true;  
        $("#eventtype, #evTitle,#evDesc,#Pillar,#sEdate,#SSTime1,#SSTime1,#evLink,#evSpeaker,#evOrg,#evKey,.SingleDayEventUpload").each(function(){
            if($(this).val()==''){
                EventChange = false;
            }
        });
        if(EventChange){
            $('.publishSingleDay').addClass("EnableBtn");  
            $('#AutopublishEvent').addClass("EnableBtn");   
            $('#saveNow').addClass("EnableBtn"); 
        }else{
            $('.publishSingleDay').removeClass("EnableBtn")             
            $('#AutopublishEvent').removeClass("EnableBtn") 
            $('#saveNow').removeClass("EnableBtn")  
        }
     
    }
});
     
     
  
 function formCreateNowSingle() { 
 	//oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose("Working on it", "Creating New Item..."); 
	 var data = []; 
	 var fileArray = []; 
	 $("#attachFilesHolder input:file").each(function() { 
		 if ($(this)[0].files[0]) { 
		 fileArray.push({ "Attachment": $(this)[0].files[0] }); 
		 } 
 	}); 
 	var EventDate = $("input[id='sEdate']").val();
 	var EventStartTime = $("input[id='SSTime1']").val(); 	
 	var EventEndTime = $("input[id='SETime1']").val();
 	
 var EventStartDateTime = moment(EventDate+ ' ' +EventStartTime).format('YYYY/MM/DD HH:mm');
    var EventEndDateTime = moment(EventDate+ ' ' +EventEndTime).format('YYYY/MM/DD HH:mm');    
    console.log("Start :"+EventStartDateTime +" End :"+EventEndDateTime);
	arraycount += fileArray.length;
	data.push({ 
	"EventType":Etype,
	"Title": $("#evTitle").val(),
	"Pillar":Pillar,
	"EventDescription": $("textarea#evDesc").val(),
	"EventDate": $("input[id='sEdate']").val(),
	"EventStartTime":EventStartDateTime,
	"EventEndTime": EventEndDateTime,
	"EventSpeakerName": $("input[id='evSpeaker']").val(),
	"EventOrganizerName": $("input[id='evOrg']").val(),
	"EventKeywords": $("input[id='evKey']").val(),
	"EventLink": $("input[id='evLink']").val(),
	"EventStatus": "Published",
	"Files": fileArray 
	}); 
	
    
    
	createNewItemWithAttachmentsEvent("EPEvent", data).then( 
	function() { 
	//if (oLoader.close) setTimeout(function () { oLoader.close(); }, 3000); 
	//window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/UploadBanner.aspx");   
	}, 
	function(sender, args) { 
	console.log('Error occured' + args.get_message()); 
	})
} 
  
  
 var createNewItemWithAttachmentsEvent= function(listName, listValues) { 
 var fileCountCheck = 0; 
 var fileNames; 
 var context = new SP.ClientContext.get_current(); 
 var dfd = $.Deferred(); 
 var targetList = context.get_web().get_lists().getByTitle(listName); 
 context.load(targetList); 
 var itemCreateInfo = new SP.ListItemCreationInformation(); 
 var listItem = targetList.addItem(itemCreateInfo);
  
 //listItem.set_item("Title","Title123"); 
 listItem.set_item("EventType", listValues[0].EventType);
 listItem.set_item("Title", listValues[0].Title); 
 listItem.set_item("Pillar", listValues[0].Pillar);
 listItem.set_item("EventDescription", listValues[0].EventDescription); 
 listItem.set_item("EventDate", listValues[0].EventDate); 
 listItem.set_item("EventStartTime", listValues[0].EventStartTime);  
 listItem.set_item("EventEndTime", listValues[0].EventEndTime); 
 listItem.set_item("EventSpeakerName", listValues[0].EventSpeakerName); 
 listItem.set_item("EventOrganizerName", listValues[0].EventOrganizerName);  
 listItem.set_item("EventKeywords", listValues[0].EventKeywords); 
 listItem.set_item("EventLink", listValues[0].EventLink);
 listItem.set_item("EventStatus", listValues[0].EventStatus);
 listItem.update(); 
 context.executeQueryAsync( 
 function() { 
 var id = listItem.get_id(); 
 if (listValues[0].Files.length != 0) { 
 if (fileCountCheck <= listValues[0].Files.length - 1) { 
 loopFileUploadEvent(listName, id, listValues, fileCountCheck).then( 
 function() { 
 }, 
 function(sender, args) { 
 console.log("Error uploading"); 
 dfd.reject(sender, args); 
 } 
 ); 
 } 
 } 
 else { 
 dfd.resolve(fileCountCheck); 
 } 
 }, 
 function(sender, args) { 
 console.log('Error occured' + args.get_message()); 
 } 
 ); 
 return dfd.promise(); 
 } 
  
  function SetTimeComplete(){
  
  var eventdate = new Date(); 
  	eventdate = moment.utc(eventdate).format("YYYY/MM/DD HH:mm");
  if(eventdate == EventEndDateTime){
  		SetCompleteInList();
  }
  
  }
  
  
 function loopFileUploadEvent(listName, id, listValues, fileCountCheck) { 
 var dfd = $.Deferred(); 
 uploadFileHolderEvent(listName, id, listValues[0].Files[fileCountCheck].Attachment).then( 
 function (data) { 
 var objcontext = new SP.ClientContext(); 
 var targetList = objcontext.get_web().get_lists().getByTitle(listName); 
 var listItem = targetList.getItemById(id); 
 objcontext.load(listItem); 
 objcontext.executeQueryAsync(function () { 
 console.log("Reload List Item- Success"); 
 fileCountCheck++; 
 if (fileCountCheck <= listValues[0].Files.length - 1) { 
 loopFileUploadEvent(listName, id, listValues, fileCountCheck); 
 } else { 
 console.log(fileCountCheck + ": Files uploaded"); 
 attcount += fileCountCheck; 
 if (arraycount == attcount) { 
// if (oLoader.close) setTimeout(function () { oLoader.close();  }, 3000); 
 	window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/UploadBanner.aspx");
 } 
  
 } 
 }, 
 function (sender, args) { 
 	console.log("Reload List Item- Fail" + args.get_message()); 
 }); 
  
 }, 
 function(sender, args) { 
	console.log("Not uploaded"); 
 	dfd.reject(sender, args); 
 }); 
 return dfd.promise(); 
 } 
  
  //File Upload code
  
 function uploadFileHolderEvent(listName, id, file) { 
	 //file = $(this)[0].files[0];

 	var getFileBuffer = function(file) {

		var deferred = $.Deferred();

 		var reader = new FileReader();

 		reader.onload = function(e) {
 			deferred.resolve(e.target.result);
 		}

 		reader.onerror = function(e) {
 			deferred.reject(e.target.error);
 			 		}

 reader.readAsArrayBuffer(file);

 return deferred.promise();

 };

 getFileBufferEvent(file).then(function(buffer) {

 $.ajax({


 url: _spPageContextInfo.webAbsoluteUrl +
 "/_api/web/lists/getbytitle('" + listName + "')/items(" + id + ")/AttachmentFiles/add(FileName='" + file.name + "')",

 method: 'POST',

 data: buffer,

 processData: false,


 headers: {


 "Accept": "application/json; odata=verbose",

 "content-type": "application/json; odata=verbose",


 "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,


 "content-length": buffer.byteLength
 },
 success: function(response) {
 
 //alert("Uploaded");
 //window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/UploadBanner.aspx");

 
 },
 error: function(error){
 alert("error :"+error);
 }

 });

 });
 }
 


 
 function getFileBufferEvent(file) { 
 var deferred = $.Deferred(); 
 var reader = new FileReader(); 
 reader.onload = function(e) { 
 deferred.resolve(e.target.result); 
 } 
 reader.onerror = function(e) { 
 deferred.reject(e.target.error); 
 } 
 reader.readAsArrayBuffer(file); 
 return deferred.promise(); 
 } 
 
 
/*function SetCompleteInList(){
 	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items("+userId+")";
	var data = {
		__metadata: { 'type': 'SP.Data.EPEventListItem' },  		
		"Status": Completed		
	}
	console.log(data);
	$.ajax({
		url: siteUrl,
		method: "POST",
		async:false,
		data: JSON.stringify(data),
		headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val(),
				"IF-MATCH":"*",
				"X-HTTP-Method":"MERGE"
		},
		success: SuccessFunction,
		error: ErrorFunction
	});
}

function SuccessFunction(data) {
alert("test Success");
}

function ErrorFunction(error) {
alert('Error!' +error.responseText);
}*/

  
 