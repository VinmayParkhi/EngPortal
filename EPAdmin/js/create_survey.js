 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 var Pillar;
 var Etype;
 $(document).ready(function() { 
 //$('#file_input').multifile();//For facilitate multi file upload 
  
 $("#publishSurvey").click(function() {formSave()}); 
     
       
 
    $("#sTitle,#sDesc,#sDate,#eDate,#sLink,.publishsingleSurvey").on("input", function () {    	
        canChangeColorCreateEvent();
    });
    function canChangeColorCreateEvent(){  
        var EventChange = true;  
        $("#sTitle,#sDesc,#sDate,#eDate,#sLink,.publishsingleSurvey").each(function(){
            if($(this).val()==''){
                EventChange = false;
            }
        });
        if(EventChange){
            $('#publishSurvey').addClass("EnableBtn");  
            $('#AutopublishEventMain').addClass("EnableBtn");   
            $('#saveNowsurvey').addClass("EnableBtn"); 
        }else{
            $('#publishSurvey').removeClass("EnableBtn")             
            $('#AutopublishEventMain').removeClass("EnableBtn") 
            $('#saveNowsurvey').removeClass("EnableBtn")  
        }
     
<<<<<<< HEAD
    }
});
    
=======
     
   
 $("select.pillar").change(function(){
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


     
     
  });
  
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
 function formSave() { 
 	//oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose("Working on it", "Creating New Item..."); 
	 var data = []; 
	 var fileArray = []; 
	 $("#attachFilesHolder input:file").each(function() { 
		 if ($(this)[0].files[0]) { 
		 fileArray.push({ "Attachment": $(this)[0].files[0] }); 
		 } 
 	}); 
 	var SurveyDate = $("input[id='sDate']").val();
 	var SurveyEndDate = $("input[id='eDate']").val();
<<<<<<< HEAD
 //var EventStartDateTime = moment(EventDate+ ' ' +EventStartTime).format('YYYY/MM/DD HH:mm');
=======
 	//var EventStartTime = $("input[id='SSTime1']").val(); 	
 	//var EventEndTime = $("input[id='SETime1']").val();
 	
 //var EventStartDateTime = moment(EventDate+ ' ' +EventStartTime).format('YYYY/MM/DD HH:mm');
    //var EventEndDateTime = moment(EventDate+ ' ' +EventEndTime).format('YYYY/MM/DD HH:mm');    
    //console.log("Start :"+EventStartDateTime +" End :"+EventEndDateTime);
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
    SurveyDate = moment(SurveyDate).format("YYYY/MM/DD");    
    SurveyEndDate = moment(SurveyEndDate).format("YYYY/MM/DD");
	arraycount += fileArray.length;
	data.push({ 
<<<<<<< HEAD
	"Title": $("#sTitle").val(),
	"SurveyDescription": $("textarea#sDesc").val(),
	"SurveyStartDate": SurveyDate,
	"SurveyEndDate": SurveyEndDate,
	"SurveyLink": $("input[id='sLink']").val(),
	"SurveyStatus": "Published",
=======
	//"EventType":Etype,
	"Title": $("#sTitle").val(),
	//"Pillar":Pillar,
	"SurveyDescreption": $("textarea#sDesc").val(),
	"SurveyStartDate": SurveyDate,
	
	"SurveyEndDate": SurveyEndDate,
	//"EventStartTime":EventStartDateTime,
	//"EventEndTime": EventEndDateTime,
	//"EventSpeakerName": $("input[id='evSpeaker']").val(),
	//"EventOrganizerName": $("input[id='evOrg']").val(),
	//"EventKeywords": $("input[id='evKey']").val(),
	"SurveyLink": $("input[id='sLink']").val(),
	"Status": "Published",
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
	"Files": fileArray 
	}); 
	
    console.log(data);
    
	createNewItemWithAttachments("EPSurvey", data).then( 
	function() { 
	//if (oLoader.close) setTimeout(function () { oLoader.close(); }, 3000); 
	//window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/UploadBanner.aspx");   
	}, 
	function(sender, args) { 
	console.log('Error occured' + args.get_message()); 
	})
} 
  
  
 var createNewItemWithAttachments = function(listName, listValues) { 
 var fileCountCheck = 0; 
 var fileNames; 
 var context = new SP.ClientContext.get_current(); 
 var dfd = $.Deferred(); 
 var targetList = context.get_web().get_lists().getByTitle(listName); 
 context.load(targetList); 
 var itemCreateInfo = new SP.ListItemCreationInformation(); 
 var listItem = targetList.addItem(itemCreateInfo);
  
<<<<<<< HEAD
 listItem.set_item("Title", listValues[0].Title); 
 listItem.set_item("SurveyDescription", listValues[0].SurveyDescription); 
 listItem.set_item("SurveyStartDate", listValues[0].SurveyStartDate);
 listItem.set_item("SurveyEndDate", listValues[0].SurveyEndDate);
 listItem.set_item("SurveyLink", listValues[0].SurveyLink);
 listItem.set_item("SurveyStatus", listValues[0].SurveyStatus);
=======
 //listItem.set_item("Title","Title123"); 
 //listItem.set_item("EventType", listValues[0].EventType);
 listItem.set_item("Title", listValues[0].Title); 
 //listItem.set_item("Pillar", listValues[0].Pillar);
 listItem.set_item("SurveyDescreption", listValues[0].SurveyDescreption); 
 listItem.set_item("SurveyStartDate", listValues[0].SurveyStartDate);
 listItem.set_item("SurveyEndDate", listValues[0].SurveyEndDate);
 //listItem.set_item("EventStartTime", listValues[0].EventStartTime);  
 //listItem.set_item("EventEndTime", listValues[0].EventEndTime); 
 //listItem.set_item("EventSpeakerName", listValues[0].EventSpeakerName); 
 //listItem.set_item("EventOrganizerName", listValues[0].EventOrganizerName);  
 //listItem.set_item("EventKeywords", listValues[0].EventKeywords); 
 listItem.set_item("SurveyLink", listValues[0].SurveyLink);
 listItem.set_item("Status", listValues[0].Status);
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
 listItem.update(); 
 context.executeQueryAsync( 
 function() { 
 var id = listItem.get_id(); 
 if (listValues[0].Files.length != 0) { 
 if (fileCountCheck <= listValues[0].Files.length - 1) { 
 loopFileUpload(listName, id, listValues, fileCountCheck).then( 
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
  
 function loopFileUpload(listName, id, listValues, fileCountCheck) { 
 var dfd = $.Deferred(); 
 uploadFileHolder(listName, id, listValues[0].Files[fileCountCheck].Attachment).then( 
 function (data) { 
 var objcontext = new SP.ClientContext(); 
 var targetList = objcontext.get_web().get_lists().getByTitle(listName); 
 var listItem = targetList.getItemById(id); 
 objcontext.load(listItem); 
 objcontext.executeQueryAsync(function () { 
 console.log("Reload List Item- Success"); 
 fileCountCheck++; 
 if (fileCountCheck <= listValues[0].Files.length - 1) { 
 loopFileUpload(listName, id, listValues, fileCountCheck); 
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
  
 function uploadFileHolder(listName, id, file) { 
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

 getFileBuffer(file).then(function(buffer) {

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
 


 
 function getFileBuffer(file) { 
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
  
 