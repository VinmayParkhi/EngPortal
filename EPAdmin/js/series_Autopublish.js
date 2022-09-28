 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 var Pillar;
 var Etype;
 var PubDate;
 var pubTime;
 var publisheventstatus;
 $(document).ready(function() { 
     
     //$.noConflict();
	  // seriesHtml(2);
   
   $("#collapseOne1").addClass("show");
   //$("#SeriessaveNow").click(function() {SaveSeriesAutoPublish()});
    
   $("select.SREPillar").change(function(){
        Pillar = $(this).children("option:selected").val();
   });
   
   $("select.SREtype").change(function(){
       Etype= $(this).children("option:selected").val();
   }); 


	   $("#AutopublishSeriesEventBTN").on("click", function(){
	   PubDate = $("#seriesDate").val();
	   	pubTime = $("#seriesTime").val();
	   	publisheventstatus =PubDate+" "+pubTime;
	    console.log(publisheventstatus);
	    SaveSeriesAutoPublish();
     })



  });
  
 function SaveSeriesAutoPublish() { 
 	//oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose("Working on it", "Creating New Item..."); 
	 /*var data = []; 
	 var fileArray = []; 
	 $("#attachFilesHolder input:file").each(function() { 
		 if ($(this)[0].files[0]) { 
		 fileArray.push({ "Attachment": $(this)[0].files[0] }); 
		 } 
 	}); */
 	 var SeriesfileArray = []; 
	 $(".attachFilesHolderData input:file").each(function() { 
		 if ($(this)[0].files[0]) { 
		 SeriesfileArray.push({ "Attachments": $(this)[0].files[0] }); 
		 } 
 	}); 
 	

	arraycount += SeriesfileArray.length;
    var DDLvalue = $('select#options option:selected').val();
	for(i=1;i<=DDLvalue;i++){
	 var data = []; 	
	  	var EventDate = $("input[id='evDate11"+i+"']").val();
 	var EventStartTime = $("input[id='evSTime"+i+"']").val(); 	
 	var EventEndTime = $("input[id='evETime"+i+"']").val();
 	
 	
 	var EventStartDateTime = moment(EventDate+ ' ' +EventStartTime).format('YYYY/MM/DD HH:mm');
    var EventEndDateTime = moment(EventDate+ ' ' +EventEndTime).format('YYYY/MM/DD HH:mm');    
    //console.log("Start :"+EventStartDateTime +" End :"+EventEndDateTime);

	data.push({ 
	"EventType":$("#evType"+i).val(),
	"Title": $("#evTitle"+i).val(),
	"Pillar": $("#evPillar"+i).val(),
	"EventDescription": $("textarea#evDesc"+i).val(),
	"EventDate": EventDate,
	"EventStartTime":EventStartDateTime,
	"EventEndTime": EventEndDateTime,
	"EventSpeakerName": $("input[id='evSpeaker"+i+"']").val(),
	"EventOrganizerName": $("input[id='evOrg"+i+"']").val(),
	"EventKeywords": $("input[id='evKey"+i+"']").val(),
	"EventLink": $("input[id='evLink"+i+"']").val(),	 
	"EventStatus": "Autopublish",	 
	"AutoPublishDateTime": publisheventstatus, 
	"Files": SeriesfileArray
	}); 
	
    
   createNewItemWithAttachmentsAutopublishSeriesEvent("EPEvent", data).then( 
		function() { 
		//if (oLoader.close) setTimeout(function () { oLoader.close(); }, 3000); 
		//window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/UploadBanner.aspx");   
		}, 
		function(sender, args) { 
		console.log('Error occured' + args.get_message()); 
		})
	}
} 
  
  
 var createNewItemWithAttachmentsAutopublishSeriesEvent = function(listName, listValues) { 
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
	 listItem.set_item("EventStatus", listValues[0].EventStatus);  	 
	 listItem.set_item("AutoPublishDateTime", listValues[0].AutoPublishDateTime);
	 listItem.update(); 
	 context.executeQueryAsync(function() { 
		 var id = listItem.get_id(); 
		 if (listValues[0].Files.length != 0) { 
			 if (fileCountCheck <= listValues[0].Files.length - 1) { 
				 loopFileUploadAutopublishSeriesEvent(listName, id, listValues, fileCountCheck).then(function() {}, 
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
  

  
  
  
 function loopFileUploadAutopublishSeriesEvent(listName, id, listValues, fileCountCheck) { 
 var dfd = $.Deferred(); 
 SeriesuploadFileHolderAutopublishSeriesEvent(listName, id, listValues[0].Files[fileCountCheck].Attachments).then( 
 function (data) { 
 var objcontext = new SP.ClientContext(); 
 var targetList = objcontext.get_web().get_lists().getByTitle(listName); 
 var listItem = targetList.getItemById(id); 
 objcontext.load(listItem); 
 objcontext.executeQueryAsync(function () { 
 console.log("Reload List Item- Success"); 
 fileCountCheck++; 
 if (fileCountCheck <= listValues[0].Files.length - 1) { 
 loopFileUploadAutopublishSeriesEvent(listName, id, listValues, fileCountCheck); 
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
  
 function SeriesuploadFileHolderAutopublishSeriesEvent(listName, id, file) { 
	 //file = $(this)[0].files[0];

 	var getFileBuffer = function(file){

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

 getFileBufferAutopublishSeriesEvent(file).then(function(buffer) {

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
 //alert("error :"+error);
 }

 });

 });
 }
 
 function getFileBufferAutopublishSeriesEvent(file) { 
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
 
  $("#s4-workspace").on("scroll", function(){
	$("#ui-datepicker-div, .ui-timepicker-container").hide();
});