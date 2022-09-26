 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 var Pillar;
 var Etype;
 var PubDate;
 var pubTime;
 var publisheventstatus;
 $(document).ready(function() { 
 //$('#file_input').multifile();//For facilitate multi file upload 
  
 //$(".savenow").click(function() {formSave()}); 
     
     GetAutoPublish()     
   UpDateComplete();
 $("select.pillar").change(function(){
        Pillar = $(this).children("option:selected").val();

    });
    $("select.evType").change(function(){
        Etype= $(this).children("option:selected").val();

    });

  $("#PublishEventBtn1 > div > div > div.modal-footer > button").click(function(){
    alert("The paragraph was clicked.");
    
    
    $(".single-day input").val("");
    $(".single-day textarea").val("");
    $(".single-day select").val("");
  });


   $("#AutopublishEvent2").on("click", function(){
	   PubDate = $("#Date").val();
	   	pubTime = $("#Time").val();
	   	publisheventstatus =PubDate+" "+pubTime;
	    console.log(publisheventstatus);
	    AutopublishData()
     })
   
  });
  
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
 	var EventStartTime = $("input[id='SSTime1']").val(); 	
 	var EventEndTime = $("input[id='SETime1']").val();
 	
 	
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
	"EventLink": $("input[id='evLink']").val(),
	"Status": "Autopublish",
	"AutoPublishDateTime": $("#Date").val() +" "+ $("#Time").val(),	
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
  
 listItem.set_item("Title","Title123"); 
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
 listItem.set_item("Status", listValues[0].Status);
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
 
 
 

function UpdateNotification(id){
  	var Status = "Read";  	
  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPContactUsListItem'},
  	 	"Status":Status		
  	};
  	$.ajax({
		url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPContactUs')/items("+id+")",
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
	 	Notification();
		//alert(id+"Updated Successfully");
	}

    function OnError(data){
		alert("Update error");
	}
  };
setInterval(GetAutoPublish, 10000);

function GetAutoPublish() {
 	var today = moment().format('YYYY-MM-DDTHH:mm:00'); 	
 	$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Status,AutoPublishDateTime&$filter=(Status eq 'Autopublish') and ( AutoPublishDateTime le '"+today+"')&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
           var dataresults = data.d.results;
            console.log(dataresults);
				if(dataresults.length > 0){
               var AutoPublishDate =data.d.results[0].AutoPublishDateTime;               
               var Status = data.d.results[0].Status;
               		var ID = data.d.results[0].ID;
               		console.log(AutoPublishDate +" "+ Status +" "+ ID);
               UpdatePublish(ID);
           			}	                 
        },
        error: function (xhr, status, error) {
            //console.log("Failed");
        }
    });
}

function UpdatePublish(id) {
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items("+id+")"
	var item = {
		__metadata: { 'type': 'SP.Data.EPEventListItem' },
  		"Status":"Published"
  		//"AutoPublishDate" : ""
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
		success: SuccessFunction,
		error: ErrorFunction
	});
}

function SuccessFunction(data) {
alert("test done");

//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function ErrorFunction(error) {
alert('Error!' +error.responseText);
}


setInterval(UpDateComplete, 10000);

function UpDateComplete() {
 	var today = moment().format('YYYY-MM-DDTHH:mm:00'); 	
 	$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Status,EventEndTime&$filter=(Status eq 'Published') and ( EventEndTime le '"+today+"')&$orderby=Created desc",   
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
           var dataresults = data.d.results;
            console.log(dataresults);
				if(dataresults.length > 0){
               var AutoPublishDate =data.d.results[0].EventEndTime;               
               var Status = data.d.results[0].Status;
               		var ID = data.d.results[0].ID;
               		console.log(AutoPublishDate +" "+ Status +" "+ ID);
               UpdateCompleted(ID);
           }		                 
        },
        error: function (xhr, status, error) {
            //console.log("Failed");
        }
    });
}

function UpdateCompleted(id) {
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items("+id+")"
	var item = {
		__metadata: { 'type': 'SP.Data.EPEventListItem' },
  		"Status":"Completed",
  		//"AutoPublishDate" : ""
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
		success: SuccessFunction,
		error: ErrorFunction
	});
}

function SuccessFunction(data) {
//alert("test done");

//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function ErrorFunction(error) {
alert('Error!' +error.responseText);
}

