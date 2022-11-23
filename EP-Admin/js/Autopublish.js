 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 var Pillar;
 var Etype;
 var PubDate;
 var pubTime;
 var publisheventstatus;
 $(document).ready(function() { 
 $("select.pillar").change(function(){
        Pillar = $(this).children("option:selected").val();

    });
    $("select.evType").change(function(){
        Etype= $(this).children("option:selected").val();

    });

   $("#AutopublishEvent2").on("click", function(){
	   PubDate = $("#Date").val();
	   	pubTime = $("#Time").val();
	   	publisheventstatus =PubDate+" "+pubTime;
	    console.log(publisheventstatus);
	    AutopublishData();
     })
   
  });
  
function GetDate(){
  		var	PublDate = $("#Date").val();
	   	var publTime = $("#Time").val();
	   	PublDate = moment(PublDate).format("DD MMM, YYYY")
	   //	publTime = moment(publTime).format("HH:mm")
	   	$("#AutopublishEventDate").html(PublDate);
	   	$("#AutopublishEventTime").html(publTime);	
  }
  
 function AutopublishData() { 
 	//oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose("Working on it", "Creating New Item..."); 
	 var data = []; 
	 var fileArray = []; 
	 $("#attachFilesHolder input:file").each(function() { 
		 if ($(this)[0].files[0]) { 
		 fileArray.push({ "Attachment": $(this)[0].files[0] }); 
		 } 
 	}); 
 	var EventDate = $("input[id='sEdate']").val();
 	var EventStartTime = $("input[id='SSTime1']").val().toUpperCase(); 	
 	var EventEndTime = $("input[id='SETime1']").val().toUpperCase();
 	EventStartTime = EventStartTime.substring(0, 4)+" "+ EventStartTime.substring(4,EventStartTime.length);
 	EventEndTime = EventEndTime.substring(0, 4)+" "+ EventEndTime.substring(4,EventEndTime.length);

 	
 	
 	var EventStartDateTime = moment(EventDate+ ' ' +EventStartTime).format('YYYY/MM/DD HH:mm');
    var EventEndDateTime = moment(EventDate+ ' ' +EventEndTime).format('YYYY/MM/DD HH:mm');    
    //console.log("Start :"+EventStartDateTime +" End :"+EventEndDateTime);
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
	"EventLocation": $("input[id='evLocation']").val(),
	"EventLink": $("input[id='evLink']").val(),
	"EventStatus": "Autopublish",
	"AutoPublishDateTime": publisheventstatus,	
	"Files": fileArray 
	}); 
	
    
    
	createNewItemWithAttachmentsAutoPub("EPEvent", data).then( 
	function() { 
	//if (oLoader.close) setTimeout(function () { oLoader.close(); }, 3000); 
	//window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/UploadBanner.aspx");   
	}, 
	function(sender, args) { 
	console.log('Error occured' + args.get_message()); 
	})
} 
  
  
 var createNewItemWithAttachmentsAutoPub = function(listName, listValues) { 
 var fileCountCheck = 0; 
 var fileNames; 
 var context = new SP.ClientContext.get_current(); 
 var dfd = $.Deferred(); 
 var targetList = context.get_web().get_lists().getByTitle(listName); 
 context.load(targetList); 
 var itemCreateInfo = new SP.ListItemCreationInformation(); 
 var listItem = targetList.addItem(itemCreateInfo);
  
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
 listItem.set_item("EventLocation", listValues[0].EventLocation);
 listItem.set_item("EventStatus", listValues[0].EventStatus);
 listItem.set_item("AutoPublishDateTime", listValues[0].AutoPublishDateTime);
 listItem.update(); 
 context.executeQueryAsync( 
 function() { 
 var id = listItem.get_id(); 
 if (listValues[0].Files.length != 0) { 
 if (fileCountCheck <= listValues[0].Files.length - 1) { 
 loopFileUploadAutoPub(listName, id, listValues, fileCountCheck).then( 
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
  
 function loopFileUploadAutoPub(listName, id, listValues, fileCountCheck) { 
 var dfd = $.Deferred(); 
 uploadFileHolderAutoPub(listName, id, listValues[0].Files[fileCountCheck].Attachment).then( 
 function (data) { 
 var objcontext = new SP.ClientContext(); 
 var targetList = objcontext.get_web().get_lists().getByTitle(listName); 
 var listItem = targetList.getItemById(id); 
 objcontext.load(listItem); 
 objcontext.executeQueryAsync(function () { 
 console.log("Reload List Item- Success"); 
 fileCountCheck++; 
 if (fileCountCheck <= listValues[0].Files.length - 1) { 
 loopFileUploadAutoPub(listName, id, listValues, fileCountCheck); 
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
  
 function uploadFileHolderAutoPub(listName, id, file) { 
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

 getFileBufferAutoPub(file).then(function(buffer) {

 $.ajax({


 url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + id + ")/AttachmentFiles/add(FileName='" + file.name + "')",

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
 


 
 function getFileBufferAutoPub(file) { 
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
 
 
