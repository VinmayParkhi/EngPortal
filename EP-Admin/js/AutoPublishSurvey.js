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

 


   $("#AutopublishSurveyMain").on("click", function(){
	   PubDate = $("#surveyDate").val();
	   	pubTime = $("#surveyTime").val();
	   	publisheventstatus =PubDate+" "+pubTime;
	    console.log(publisheventstatus);
     });
     
     $("#AutopublishSurvey2").on("click", function(){
        PubDate = $("#surveyDate").val();
	   	pubTime = $("#surveyTime").val();
	   	publisheventstatus =PubDate+" "+pubTime;
	    console.log(publisheventstatus);

	    AutopublishData()
     });
     

   
  });
  
  
 function AutopublishData() { 
	 var data = []; 
	 var fileArray = []; 
	 $("#attachFilesHolder input:file").each(function() { 
		 if ($(this)[0].files[0]) { 
		 fileArray.push({ "Attachment": $(this)[0].files[0] }); 
		 } 
 	}); 
 	var SurveyDate = $("input[id='sDate']").val();
 	var SurveyEndDate = $("input[id='eDate']").val();
    SurveyDate = moment(SurveyDate).format("YYYY/MM/DD");    
    SurveyEndDate = moment(SurveyEndDate).format("YYYY/MM/DD");
	arraycount += fileArray.length;
	data.push({ 
	"Title": $("#sTitle").val(),
	"SurveyDescription": $("textarea#sDesc").val(),
	"SurveyStartDate": SurveyDate,
	"SurveyEndDate": SurveyEndDate,
	"SurveyLink": $("input[id='sLink']").val(),
	"SurveyStatus": "Autopublish",
	"AutoPublishDateTime": publisheventstatus,	
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
  
 listItem.set_item("Title", listValues[0].Title); 
 listItem.set_item("SurveyDescription", listValues[0].SurveyDescription); 
 listItem.set_item("SurveyStartDate", listValues[0].SurveyStartDate);
 listItem.set_item("SurveyEndDate", listValues[0].SurveyEndDate);
 listItem.set_item("SurveyLink", listValues[0].SurveyLink);
 listItem.set_item("SurveyStatus", listValues[0].SurveyStatus);
 listItem.set_item("AutoPublishDateTime", listValues[0].AutoPublishDateTime);
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
 

 
 },
 error: function(error){
 alert("error :"+error);
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
 	var today= new Date();
 	today = moment(today).format("DD-MM-YYYY HH:mm");
 	var today1 = moment(today).add(10, 'minutes').format("DD-MM-YYYY HH:mm");
 	console.log("todays Date"+today);
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPSurvey')/items?$select=ID,SurveyStatus,AutoPublishDateTime&$filter=(SurveyStatus eq 'Autopublish') and ( AutoPublishDateTime le '"+today+"')&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
           var dataresults = data.d.results;
            console.log(dataresults);

            				                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}

function UpdatePublish(id) {
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPSurvey')/items("+id+")"
	var item = {
		__metadata: { 'type': 'SP.Data.EPSurveyListItem' },
  		"Status":"Publish",
  
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



 $("#s4-workspace").on("scroll", function(){
	$("#ui-datepicker-div").hide();
});

