 var uniquID;
 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 //var Pillar;
// var Etype;
 var ImageUrl;
 $(document).ready(function() { 
 //$('#file_input').multifile();//For facilitate multi file upload 
  var url=window.location.href;
   uniquID= url.split('=')[1];
  
  eventDetails(uniquID);
  $("#UpdateSurvey").click(function(){
  	UpdateSurveydata();
  	
  });
  
     
     
  });
  
function eventDetails(id){
	eventData=getListItem('EPSurvey','ID',id);
  	if(eventData!=undefined){
  		eventData=JSON.parse(eventData);
  		if(eventData.d.results.length > 0){
  			
  			$("#sTitle").val(eventData.d.results[0].Title);
   			$("#sDesc").val(eventData.d.results[0].SurveyDescreption);
  			$("#sDate").val(eventData.d.results[0].SurveyStartDate);
  			$("#eDate").val(eventData.d.results[0].SurveyEndDate);
  			$("#sLink").val(eventData.d.results[0].SurveyLink);
  			ImageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPSurvey')/items?$"+ id +"&$select=Attachments&$expand=AttachmentFiles";

 console.log("ImageURL: "+ImageUrl)
  			//get current attachment url and pass it to global variable
  		}
  	}
  	console.log(eventData);
  }
  

function getListItem(listname,columnname,colvalue){
	var url=_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('"+ listname +"')/items?$select=*&$filter="+ columnname +" eq '"+ colvalue +"'";
	var listitemData = '';
	listitemData = $.ajax({
		url:url,
		method: "GET",
		async: false,
		headers: {
			"Accept": "application/json; odata=verbose",
			"content-type": "application/json; odata=verbose",
			"X-RequestDigest":$("#__REQUESTDIGEST").val()
		},
		success:function (data){},
		error:function (error){
			console.log(error.responseText)
		}
	});
	console.log("URL:"+url);
	return listitemData.responseText;
}

/********************************************Get EventData To Update***********************************************************************/

function UpdateSurveydata(){
  	//var eid=$("#uniquID").val();
  	var ename = $("#sTitle").val();
  	var evdesc = $("#sDesc").val();	
	var evsdate = $("#sDate").val();
	var evedate = $("#eDate").val();
	var evlink = $("#sLink").val();
	/*var evetime = $("#SETime1").val();
	
	var evspname = $("#evSpeaker").val();
	var evorg = $("#evOrg").val();*/
	//var srkey = $("#sDesc").val();
	//alert(srkey);

	/*var fileArray = []; 
	$("#attachFilesHolder input:file").each(function() { 
		if ($(this)[0].files[0]) { 
			fileArray.push({"Attachment": $(this)[0].files[0] }); 
		} 
	});*/
	//arraycount += fileArray.length;


  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPSurveyListItem'},
  	 	"Title":ename,
  	 	"SurveyStartDate":evsdate,
  	 	"SurveyEndDate":evedate,
  	 	"SurveyLink":evlink,
  	 	"SurveyDescreption":evdesc
  	 	/*"EventType":evtype,
  	 	
		"EventDate":evdate,
		"EventStartTime":evstime,
		"EventEndTime":evetime,
		
		"EventSpeakerName":evspname,
		"EventOrganizerName":evorg,*/
		//"
		
  	};
  	$.ajax({
		url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPSurvey')/items("+ uniquID +")",
		method: "POST",
		contentType: "application/json; odata=verbose",
		data:JSON.stringify(item),
		headers: {
			"Accept": "application/json; odata=verbose",
			"X-RequestDigest":$("#__REQUESTDIGEST").val(),
			"IF-MATCH": "*",
			"X-HTTP-Method":"MERGE"
			
		},
		success:OnSuccess,
		error:OnError
	});
	function OnSuccess(data){
		/*if(fileArray.length > 0){
			AddAttachments(uniquID);
		}*/
		alert("Sucessfully updated");
	}

    function OnError(data){
		alert("Update error");
	}
  };

  
  /**********************************************************************************************************************************************/
  
  
function checkFileExists(){
var sitecollectionurl=_spPageContextInfo.webAbsoluteUrl;
    $.ajax({
            //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/getFileByServerRelativeUrl('/"+sitecollectionurl+"'/Lists/CreateEve/Attachments/"+ id +"/test.txt')",
        	url:ImageUrl, 
			method: "GET",            
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                if(data.d.Exists){  
            //delete file if it already exists
                    DeleteFile();
                }
            },
            error: function (data) {
//check if file not found error
                AddAttachments(uniquID);               
            }
      });
}
//console.log("URL data :"+url);
function DeleteFile(){
    $.ajax({
      url: ImageUrl,
      //url: "https://sitecollectionurl/_api/web/getFileByServerRelativeUrl('/sitecollectionurl/Lists/Test/Attachments/1/test.txt')",
      method: 'DELETE',
      headers: {
        'X-RequestDigest': document.getElementById("__REQUESTDIGEST").value
        },
      success: function (data) {            
            AddAttachments(uniquID);
        },
        error: function (data) {
            console.log(data);      
        }
    });
}

  
  
function AddAttachments(id)
{   
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
        var fileInput = $('#file_upload');
        var fileName = fileInput[0].files[0].name;
        alert(fileName)
        var reader = new FileReader();
        reader.onload = function (e) {
        var fileData = e.target.result;
            var res11 = $.ajax(
            {                             
                url:  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Createsurveyform')/items(" + id + ")/AttachmentFiles/add(FileName='" + fileName + "')",                                       
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
                        console.log("success");                                               
                },
                error: function (data) {                                                
                        console.log("Error occured." + data.responseText);
                }
            });                          
        };
        reader.readAsArrayBuffer(fileInput[0].files[0]);

    });                                          
}
 
 
 