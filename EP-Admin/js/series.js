 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 var Pillar;
 var Etype;
 $(document).ready(function() { 
     
     $.noConflict();
	   seriesHtml(2);
   
   $("#collapseOne1").addClass("show");
   $(".publishSeriesEvent").click(function() {getSeriesData()});
    
   $("select.SREPillar").change(function(){
        Pillar = $(this).children("option:selected").val();
   });
   
   $("select.SREtype").change(function(){
       Etype= $(this).children("option:selected").val();
   }); 

  });
  
  
   $("#evTitle1,#evsubTitle1,#evDesc1,#evPillar1,#evDate111,#evSTime1,#evETime1,#evLink1,#evLocation1,#evSpeaker1,#evOrga1,.FileInputClass").on("input", function () {    	
        canChangeColorCreateEvent2();
    });
    function canChangeColorCreateEvent2(){  
        var EventChange = true;  
        $("#evTitle1,#evsubTitle1,#evDesc1,#evPillar1,#evDate111,#evSTime1,#evETime1,#evLink1,#evLocation1,#evSpeaker1,#evOrga1,.FileInputClass").each(function(){
            if($(this).val()==''){
                EventChange = false;
            }
        });
        if(EventChange){
            $('.publishSeriesEvent').addClass("EnableBtn");  
            $('#SeriesAutopub').addClass("EnableBtn");   
            $('#saveNow').addClass("EnableBtn"); 
        }else{
            $('.publishSeriesEvent').removeClass("EnableBtn")             
            $('#AutopublishEvent').removeClass("EnableBtn") 
            $('#saveNow').removeClass("EnableBtn")  
        }
     
    }

  
  
 function getSeriesData() { 
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
 	var EventStartTime = $("input[id='evSTime"+i+"']").val().toUpperCase(); 	
 	var EventEndTime = $("input[id='evETime"+i+"']").val().toUpperCase();
 	EventStartTime = EventStartTime.substring(0, 4)+" "+ EventStartTime.substring(4,EventStartTime.length);
 	EventEndTime = EventEndTime.substring(0, 4)+" "+ EventStartTime.substring(4,EventStartTime.length);
 	
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
	"EventStatus": "Published",	 
	"Files": SeriesfileArray
	}); 
	
    
   createNewItemWithAttachments("EPEvent", data).then( 
		function() { 
		//if (oLoader.close) setTimeout(function () { oLoader.close(); }, 3000); 
		//window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/UploadBanner.aspx");   
		}, 
		function(sender, args) { 
		console.log('Error occured' + args.get_message()); 
		})
	}
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
	  
	// listItem.set_item("Title","Title123"); 
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
	 context.executeQueryAsync(function() { 
		 var id = listItem.get_id(); 
		 if (listValues[0].Files.length != 0) { 
			 if (fileCountCheck <= listValues[0].Files.length - 1) { 
				 loopFileUpload(listName, id, listValues, fileCountCheck).then(function() {}, 
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
 SeriesuploadFileHolder(listName, id, listValues[0].Files[fileCountCheck].Attachments).then( 
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
  
 function SeriesuploadFileHolder(listName, id, file) { 
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
 
  $("#s4-workspace").on("scroll", function(){
	$("#ui-datepicker-div, .ui-timepicker-container").hide();
});