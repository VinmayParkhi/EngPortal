 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 var Pillar;
 var Etype;
 $(document).ready(function() { 
  
 $("#publishSurvey").click(function() {formSaveSurvey()}); 
     
       
 
    $("#sTitle,#sDesc,#sDate,#eDate,#sLink,.custom-file-input").on("input", function () {    	
        canChangeColorCreateEvent();
    });
    function canChangeColorCreateEvent(){  
        var EventChange = true;  
        $("#sTitle,#sDesc,#sDate,#eDate,#sLink,.custom-file-input").each(function(){
            if($(this).val()==''){
                EventChange = false;
            }
        });
        if(EventChange){
            $('#publishSurvey').addClass("EnableBtn");  
            $('#AutopublishSurveyMain').addClass("EnableBtn");   
            $('#saveNowsurvey').addClass("EnableBtn"); 
        }else{
            $('#publishSurvey').removeClass("EnableBtn")             
            $('#AutopublishSurveyMain').removeClass("EnableBtn") 
            $('#saveNowsurvey').removeClass("EnableBtn")  
        }
     
    }
    
      $("#publishSurvey").click(function(){
    //alert("The paragraph was clicked.");
    
    
    $(".serveyEventForm input").val("");
    $(".serveyEventForm textarea").val("");
    $("serveyEventForm select").val("");
  });

});
    
 function formSaveSurvey() { 
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
 //var EventStartDateTime = moment(EventDate+ ' ' +EventStartTime).format('YYYY/MM/DD HH:mm');
    SurveyDate = moment(SurveyDate).format("YYYY/MM/DD");    
    SurveyEndDate = moment(SurveyEndDate).format("YYYY/MM/DD");
	arraycount += fileArray.length;
	data.push({ 
	"Title": $("#sTitle").val(),
	"SurveyDescription": $("textarea#sDesc").val(),
	"SurveyStartDate": SurveyDate,
	"SurveyEndDate": SurveyEndDate,
	"SurveyLink": $("input[id='sLink']").val(),
	"SurveyStatus": "Published",
	"Files": fileArray 
	}); 
	
    console.log(data);
    
	createNewItemWithAttachmentsSurvey("EPSurvey", data).then( 
	function() { 
	}, 
	function(sender, args) { 
	console.log('Error occured' + args.get_message()); 
	})
} 
  
  
 var createNewItemWithAttachmentsSurvey = function(listName, listValues) { 
 var fileCountCheck = 0; 
 var fileNames; 
 var context = new SP.ClientContext.get_current(); 
 var dfd = $.Deferred(); 
 var targetList = context.get_web().get_lists().getByTitle(listName); 
 context.load(targetList); 
 var itemCreateInfo = new SP.ListItemCreationInformation(); 
 var listItem = targetList.addItem(itemCreateInfo);
  
 listItem.set_item("Title", listValues[0].Title); 
 listItem.set_item("SurveyDescription", listValues[0].SurveyDescription); 
 listItem.set_item("SurveyStartDate", listValues[0].SurveyStartDate);
 listItem.set_item("SurveyEndDate", listValues[0].SurveyEndDate);
 listItem.set_item("SurveyLink", listValues[0].SurveyLink);
 listItem.set_item("SurveyStatus", listValues[0].SurveyStatus);
 listItem.update(); 
 context.executeQueryAsync( 
 function() { 
 var id = listItem.get_id(); 
 if (listValues[0].Files.length != 0) { 
 if (fileCountCheck <= listValues[0].Files.length - 1) { 
 loopFileUploadSurvey(listName, id, listValues, fileCountCheck).then( 
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
  
 function loopFileUploadSurvey(listName, id, listValues, fileCountCheck) { 
 var dfd = $.Deferred(); 
 uploadFileHolderSurvey(listName, id, listValues[0].Files[fileCountCheck].Attachment).then( 
 function (data) { 
 var objcontext = new SP.ClientContext(); 
 var targetList = objcontext.get_web().get_lists().getByTitle(listName); 
 var listItem = targetList.getItemById(id); 
 objcontext.load(listItem); 
 objcontext.executeQueryAsync(function () { 
 console.log("Reload List Item- Success"); 
 fileCountCheck++; 
 if (fileCountCheck <= listValues[0].Files.length - 1) { 
 loopFileUploadSurvey(listName, id, listValues, fileCountCheck); 
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
  
 function uploadFileHolderSurvey(listName, id, file) { 
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

 getFileBufferSurvey(file).then(function(buffer) {

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

 
 },
 error: function(error){
 //alert("error :"+error);
 }

 });

 });
 }
 


 
 function getFileBufferSurvey(file) { 
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
  
 