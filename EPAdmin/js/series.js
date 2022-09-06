 var Pillar;
 var Etype;
 $(document).ready(function() { 
   seriesHtml(2);
   
   $(".publishSeriesEvent").click(function() {getSeriesData()});
    
   $("select.SREPillar").change(function(){
        Pillar = $(this).children("option:selected").val();
   });
   
   $("select.SREtype").change(function(){
       Etype= $(this).children("option:selected").val();
   });
 }); 
 
function getSeriesData(){
	var DDLvalue = $('select#options option:selected').val();
	for(i=1;i<=DDLvalue;i++){
		var ename = $("#evTitle"+i).val();
	  	var pillar = $("#evPillar"+i).val();
	  	var subTitle = $("#evsubTitle"+i).val();
		var evtype = $("#evType"+i).val();
		var evdesc = $("#evDesc"+i).val();
		//var evdate = $("#evDate"+i).val();
		//var evstime = $("#evSTime"+i).val();
		//var evetime = $("#evETime"+i).val();
		var evlink = $("#evLink"+i).val();
		var evspname = $("#evSpeaker"+i).val();
		var evorg = $("#evOrga"+i).val();
		var evkey = $("#evKey"+i).val();
		
		var fileArray = []; 
		$("#attachFilesHolder input:file").each(function() { 
			if ($(this)[0].files[0]) { 
				fileArray.push({ "Attachment": $(this)[0].files[0] }); 
			} 
		}); 
		insertSeriesEventdata(i,ename,pillar,subTitle,evtype,evdesc,evlink,evspname,evorg,evkey,fileArray);
		console.log("Test Series Data : "+i+" - "+ename+" - "+pillar+" - "+subTitle+" - "+evtype+" - "+evdesc+" - "+evlink+" - "+evspname+" - "+evorg+" - "+evkey)
	}
}

function insertSeriesEventdata(i,ename,pillar,subTitle,evtype,evdesc,evlink,evspname,evorg,evkey,fileArray){

  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPEventListItem'},
  	 	"Title":ename,
  	 	"Pillar":pillar,
  	 	"EventSubtitle":subTitle,  	 	
  	 	"EventType":evtype,
  	 	"EventDescription":evdesc,
		//"EventDate":evdate,
		//"EventStartTime":evstime,
		//"EventEndTime":evetime,
		"EventLink":evlink,
		"EventSpeakerName":evspname,
		"EventOrganizerName":evorg,
		"EventKeywords":evkey
		
  	};
  	$.ajax({
		url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items",
		method: "POST",
		contentType: "application/json; odata=verbose",
		data:JSON.stringify(item),
		headers: {
			"Accept": "application/json; odata=verbose",
			"X-RequestDigest":$("#__REQUESTDIGEST").val()			
		},
		success:OnSuccess,
		error:OnError
	});
	function OnSuccess(data){
		var id = data.d.ID;
		if(fileArray.length > 0){
			//AddAttachments(i,id,fileArray);
			//uploadFileHolder('CreateEve',id,fileArray)
		}
		alert("Sucessfully updated");
	}

    function OnError(data){
		console.log("Error occured." + data.responseText);
	}
  };


function AddAttachments(i,id,fileArray){   
    var digest = "";
    $.ajax(
    {
	    url: "/_api/contextinfo",
	    method: "POST",
	    headers: {
	                    "ACCEPT": "application/json;odata=verbose",
	                    "content-type": "application/json;odata=verbose"
	    },
	    success: function (data) {
	    digest = data.d.GetContextWebInformation.FormDigestValue;
	    },
	    error: function (data) {
	
	    }
    }).done(function() {
        var fileInput = $('#file_upload'+i);
        var fileName = fileArray[0].Attachment.name;
        alert(fileName)
        var reader = new FileReader();
        reader.onload = function (e) {
        var fileData = e.target.result;
            var res11 = $.ajax({                             
                url:  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items(" + id + ")/AttachmentFiles/add(FileName='" + fileName + "')",                                       
                method: "POST",
                binaryStringRequestBody: true,
                data: fileData,
                processData: false,
                headers: {
                                "ACCEPT": "application/json;odata=verbose",          
                                "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
                                "content-length": fileData.byteLength
                },                                                                                                                            
                success: function (data) {                                            
                        console.log("success for : "+i+" - "+fileName);                                               
                },
                error: function (data) {                                                
                        console.log("Error occured." + data.responseText);
                }
            });                          
        };
        reader.readAsArrayBuffer(fileInput[0].files[0]);

    });                                          
}


function uploadFileHolder(listName, id, file) { 	
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
	url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getbytitle('" + listName + "')/items(" + id + ")/AttachmentFiles/add(FileName='" + file.name + "')",
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
  
 

