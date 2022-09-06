 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 var Pillar;
 var Etype;
 $(document).ready(function() { 
 //$('#file_input').multifile();//For facilitate multi file upload 
  
 $("#NewSaveItem").click(function() {formSave()}); 
  //$("#NewSaveItem1").click(function() {createList("Thought_List")}); 
  $("#NewSaveItem1").click(function() {ThoughtList("Thought_List")}); 
   $(".publishSingleDay").click(function() {createEventList("AdminCreateEvent")});    
   $("#publishSurvey").click(function() {createSurveyList2("Create_Survey")});
   
   
   
   
 $("select.pillar").change(function(){
        Pillar = $(this).children("option:selected").val();

    });
    $("select.evType").change(function(){
        Etype= $(this).children("option:selected").val();

    });

 }); 
  
/***************************************************Home Banner Upload Start******************************************************************/ 
  
 function formSave() { 
 //oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose("Working on it", "Creating New Item..."); 
  
  
 var data = []; 
 var fileArray = []; 
 $("#attachFilesHolder input:file").each(function() { 
 if ($(this)[0].files[0]) { 
 fileArray.push({ "Attachment": $(this)[0].files[0] }); 
 } 
 }); 
 arraycount += fileArray.length;
 data.push({ 
 "Title": $("#BanerTitle").val(), 
 "BannerDescription": $("#Description").val(), 
 "Files": fileArray 
 }); 
 createNewItemWithAttachments("EPBanner", data).then( 
 function
 () { 
 //if (oLoader.close) setTimeout(function () { oLoader.close(); }, 3000); 
 window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/UploadBanner.aspx"); 
  
 }, 
 function(sender, args) { 
 console.log('Error occured' + args.get_message()); 
 } 
 ) 
  
  
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
 listItem.set_item("BannerDescription", listValues[0].BannerDescription); 
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
  
/***********************************************************File Upload code*******************************************************************/
  
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
 
 alert("Uploaded");
 //window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/UploadBanner.aspx");

 
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
    
/******************************************************Home Banner Upload End***************************************************************/ 
  
  
/******************************************************Thought Upload Start*******************************************************************/ 
  
function createList(listName2) {
var siteUrl = _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/GetByTitle('EPThought')/Items";
var data = {
__metadata: { 'type': 'SP.Data.EPThoughtListItem' },
Thought: $("#textfield").val(),
Title: listName2
}
$.ajax({
url: siteUrl,
type: "POST",
async:false,
data: JSON.stringify(data),
headers: {
"accept": "application/json;odata=verbose",
"content-type": "application/json;odata=verbose",
"X-RequestDigest": $("#__REQUESTDIGEST").val()
},
success: onQuerySucceeded,
error: onQueryFailed
});
}

function onQuerySucceeded(data) {
alert("test done");
//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function onQueryFailed(error) {
alert('123!');
}
    
function createEventList(EventList) {
var siteUrl = "https://infornt.sharepoint.com/_api/web/lists/GetByTitle('AdminCreateEvent')/Items";
var fileArray1= []; 
 $(".imageData #file_upload").each(function() { 
 if ($(this)[0].files[0]) { 
 fileArray1.push({ "Attachment": $(this)[0].files[0] }); 
 } 
 }); 
var data = {
__metadata: { 'type': 'SP.Data.AdminCreateEventListItem' },
EventType: Etype,
EventTitle: $("input[id='evTitle']").val(),
Pillar: Pillar ,
//EventImage:fileArray1,
EventDescription: $("textarea#evDesc").val(),
EventDate: $("input[id='sEdate']").val(),
EventStartTime: $("input[id='SSTime1']").val(),
EventEndTime: $("input[id='SETime1']").val(),
EventLink: $("input[id='evLink']").val(),
EventSpeakerName: $("input[id='evSpeaker']").val(),
EventOrganizerName: $("input[id='evOrg']").val(),
EventKeywords: $("input[id='evKey']").val(),
Title: EventList
}
console.log(data);
$.ajax({
url: siteUrl,
type: "POST",
async:false,
data: JSON.stringify(data),
headers: {
"accept": "application/json;odata=verbose",
"content-type": "application/json;odata=verbose",
"X-RequestDigest": $("#__REQUESTDIGEST").val()
},
success: EventSuccess,
error: EventError
});
}

function EventSuccess(data) {
alert("test done");
console.log(data);

//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function EventError(error) {
//alert('Error!', error);
console.log('error'+error.responseText);
}

/**************************************************Thought upload End**************************************************************/ 


 
function createEventList(EventList) {
var siteUrl = "https://infornt.sharepoint.com/_api/web/lists/GetByTitle('AdminCreateEvent')/Items";
var fileArray1= []; 
 $(".imageData #file_upload").each(function() { 
 if ($(this)[0].files[0]) { 
 fileArray1.push({ "Attachment": $(this)[0].files[0] }); 
 } 
 }); 
var data = {
__metadata: { 'type': 'SP.Data.AdminCreateEventListItem' },
EventType: Etype,
EventTitle: $("input[id='evTitle']").val(),
Pillar: Pillar ,
//EventImage:fileArray1,
EventDescription: $("textarea#evDesc").val(),
EventDate: $("input[id='sEdate']").val(),
EventStartTime: $("input[id='SSTime1']").val(),
EventEndTime: $("input[id='SETime1']").val(),
EventLink: $("input[id='evLink']").val(),
EventSpeakerName: $("input[id='evSpeaker']").val(),
EventOrganizerName: $("input[id='evOrg']").val(),
EventKeywords: $("input[id='evKey']").val(),
Title: EventList
}
console.log(data);
$.ajax({
url: siteUrl,
type: "POST",
async:false,
data: JSON.stringify(data),
headers: {
"accept": "application/json;odata=verbose",
"content-type": "application/json;odata=verbose",
"X-RequestDigest": $("#__REQUESTDIGEST").val()
},
success: EventSuccess,
error: EventError
});
}

function EventSuccess(data) {
alert("test done");
console.log(data);

//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function EventError(error) {
//alert('Error!', error);
console.log('error'+error.responseText);
}






function createSurveyList2(listName3) {
var siteUrl = "https://infornt.sharepoint.com/_api/web/lists/GetByTitle('Create_Survey')/Items"
var fileArray2= []; 
 $(".imageData #file_upload1").each(function() { 
 if ($(this)[0].files[0]) { 
 fileArray2.push({ "Attachment": $(this)[0].files[0] }); 
 } 
 }); 
var data = {
__metadata: { 'type': 'SP.Data.Create_x005f_SurveyListItem' },
SurveyTitle	: $("input[id='sTitle']").val(),
//SurveyImage:fileArray2,
SurveyDescreption: $("textarea#sDesc").val(),
SurveyStartDate: $("input[id='sDate']").val(),
SurveyEndDate: $("input[id='eDate']").val(),
SurveyEndDate: $("input[id='sLink']").val(),
Title: listName3
}
console.log(data);
$.ajax({
url: siteUrl,
type: "POST",
async:false,
data: JSON.stringify(data),
headers: {
"accept": "application/json;odata=verbose",
"content-type": "application/json;odata=verbose",
"X-RequestDigest": $("#__REQUESTDIGEST").val()
},
success: onQuerySucceeded1,
error: onQueryFailed1
});
}

function onQuerySucceeded1(data) {
//alert("test done");

//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function onQueryFailed1(error) {
alert('Error!' +error.responseText);
}



function ThoughtList(listName1) {
var siteUrl = _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/GetByTitle('EPThought')/Items";
var data = {
__metadata: { 'type': 'SP.Data.EPThoughtListItem' },
Thought: $("#textfield").val(),
Title: listName1
}
$.ajax({
url: siteUrl,
type: "POST",
async:false,
data: JSON.stringify(data),
headers: {
"accept": "application/json;odata=verbose",
"content-type": "application/json;odata=verbose",
"X-RequestDigest": $("#__REQUESTDIGEST").val()
},
success: onQuerySucceeded,
error: onQueryFailed
});
}

function onQuerySucceeded(data) {
//alert("test done");
$("#textfield").removeClass("editon");
$("#NewSaveItem1").css("background", "rgba(255, 255, 255, 0.2)");
$("#NewSaveItem1").css("color", "#747474 !important");
$(".editstart img").attr("src","https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/Icon feather-edit-2.svg")
location.reload();


//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}


