 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 var Pillar;
<<<<<<< HEAD
 var Etype;  
 $(document).ready(function() { 
 //$('#file_input').multifile();//For facilitate multi file upload 
  
 $("#PublishEvent").click(function() {formCreateNowSingle()}); 
=======
 var Etype; 
 $(document).ready(function() { 
 //$('#file_input').multifile();//For facilitate multi file upload 
  
 $("#PublishEvent").click(function() {
 formCreateNowSingle()
 checkvalidation()
 
 }); 
         
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
     
     
     
   
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
     
     
  
<<<<<<< HEAD
 function formCreateNowSingle() { 
=======
 //function formCreateNowSingle() { 
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
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
<<<<<<< HEAD
	"EventStatus": "Published",
=======
	"Status": "Published",
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
	"Files": fileArray 
	}); 
	
	function checkvalidation(){
	 
  //$('#PublishEvent').on("click", function (e) {  
  alert("test");
            e.preventDefault();  
            var SelectType = $('#eventtype').val();  
             var EventTitle = $('#evTitle').val();  
			 var EventPillar= $('#Pillar').val();  
			 var Description = $('#evDesc').val(); 
			  var SatartDate = $('#sEdate').val(); 
			   var SatarTime= $('#SSTime1').val(); 
			    var EndTime= $('#SSTime1').val();
			    var EventLink = $('#evLink').val();  
			    var Speaker  = $('#evSpeaker').val(); 
			   var Organizer = $('#evOrg').val(); 
			    var Keywords = $('#evKey').val();                
             var File = $("#file_upload").val();
             
            $(".error").remove();  
            if (SelectType.length < 1) {  
              $('#eventtype').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
            }
            if (EventTitle.length < 1) {  
              $('#evTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
            }
            if (EventPillar.length < 1) {
             $('#Pillar').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;position: absolute;top: 13.5rem;">Please Upload Banner Image</span>');
            }
             if (Description.length < 1) {  
              $('#evDesc').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
            }
            if (SatartDate.length < 1) {  
              $('#sEdate').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
            }
            if (SatarTime.length < 1) {
             $('#SSTime1').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;position: absolute;top: 13.5rem;">Please Upload Banner Image</span>');
            }
             if (EndTime.length < 1) {
             $('#SSTime1').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;position: absolute;top: 13.5rem;">Please Upload Banner Image</span>');
            }

             if (EventLink.length < 1) {  
              $('#evLink').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
            }
            if (Speaker.length < 1) {  
              $('#evSpeaker').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
            }
            if (Organizer.length < 1) {  
              $('#evOrg').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
            }
            if (Keywords.length < 1) {  
              $('#evKey').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
            }
             if (Keywords.length < 1) {  
              $('#file_upload').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
            }


     //});
	
	
	}
	  $("#eventtype, #evTitle,#evDesc,#Pillar,#sEdate,#SSTime1,#SSTime1,#evLink,#evSpeaker,#evOrg,#evKey,#file_input").on("input", function () {    	
          canChangeColor();
        });
        
         function canChangeColor(){  
          
      var can = true;  
    
      $("#eventtype, #evTitle,#evDesc,#Pillar,#sEdate,#SSTime1,#SSTime1,#evLink,#evSpeaker,#evOrg,#evKey,#file_input").each(function(){
         if($(this).val()==''){
            can = false;
         }
      });
      
      if(can){
        $('#PublishEvent').addClass("EnableBtn");  
       }else{
        $('#PublishEvent').removeClass("EnableBtn")  
       }
    
    }
    
    
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
<<<<<<< HEAD
 listItem.set_item("EventStatus", listValues[0].EventStatus);
=======
 listItem.set_item("Status", listValues[0].Status);
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
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

  
 