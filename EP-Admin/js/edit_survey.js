 var uniquID;
 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 //var Pillar;
// var Etype;
 var ImageUrl;
 $(document).ready(function() { 
 
 
 $('#evback').click(function() {
             history.go(-1);  
                });
 //$('#file_input').multifile();//For facilitate multi file upload 
  var url=window.location.href;
   uniquID= url.split('=')[1];
  
  eventDetails(uniquID);
  $("#UpdateSurvey").click(function(){
  	UpdateSurveydata();
  	
  });
  
       $("#AutopublishSurvey2").on("click", function(){
        PubDate = $("#surveyDate").val();
	   	pubTime = $("#surveyTime").val();
	   	publisheventstatus =PubDate+" "+pubTime;
	    console.log(publisheventstatus);

	    UpdateAutopublishSurveydata()
     });

  
     
  });
  
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
            $('#UpdateSurvey').addClass("EnableBtn");  
           // $('#AutopublishEventMain').addClass("EnableBtn");   
            //$('#saveNowsurvey').addClass("EnableBtn"); 
        }else{
            $('#UpdateSurvey').removeClass("EnableBtn")             
            //$('#AutopublishEventMain').removeClass("EnableBtn") 
            //$('#saveNowsurvey').removeClass("EnableBtn")  
        }
     
    }


  
  
function eventDetails(id){
	eventData=getListItem('EPSurvey','ID',id);
  	if(eventData!=undefined){
  		eventData=JSON.parse(eventData);
  		if(eventData.d.results.length > 0){
  			var Startdate = moment(eventData.d.results[0].SurveyStartDate).format('DD MMM,YYYY');
  			var Endtdate = moment(eventData.d.results[0].SurveyEndDate).format('DD MMM,YYYY');



  			$("#sTitle").val(eventData.d.results[0].Title);
   			$("#sDesc").val(eventData.d.results[0].SurveyDescription);
  			$("#sDate").val(Startdate);
  			$("#eDate").val(Endtdate);
  			$("#sLink").val(eventData.d.results[0].SurveyLink);
  			//ImageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPSurvey')/items?$"+ id +"&$select=Attachments&$expand=AttachmentFiles";
  			
  			
            $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPSurvey')/GetItemByID(" + id + ")?$AttachmentFiles&$expand=AttachmentFiles",
        	
			method: "GET",            
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                //log("https://amdocs.sharepoint.com"+data.d.AttachmentFiles.results[0].ServerRelativeUrl)
                var img = "https://amdocs.sharepoint.com"+data.d.AttachmentFiles.results[0].ServerRelativeUrl;
                $("#imageID").attr("src",img);
            },
            error: function (data) {
             
            }
      });

  			
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
  	var ename = $("#sTitle").val();
  	var evdesc = $("#sDesc").val();	
	var evsdate = $("#sDate").val();
	var evedate = $("#eDate").val();
	var evlink = $("#sLink").val();
  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPSurveyListItem'},
  	 	"Title":ename,
  	 	"SurveyStartDate":evsdate,
  	 	"SurveyEndDate":evedate,
  	 	"SurveyLink":evlink,
  	 	"SurveyDescription":evdesc,
  	 	"SurveyStatus": "Published"
	
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
		//alert("Sucessfully updated");
	}

    function OnError(data){
		alert("Update error");
	}
  };
  
  
  
  
 
  
  
function UpdateAutopublishSurveydata(){
  	var ename = $("#sTitle").val();
  	var evdesc = $("#sDesc").val();	
	var evsdate = $("#sDate").val();
	var evedate = $("#eDate").val();
	var evlink = $("#sLink").val();
  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPSurveyListItem'},
  	 	"Title":ename,
  	 	"SurveyStartDate":evsdate,
  	 	"SurveyEndDate":evedate,
  	 	"SurveyLink":evlink,
  	 	"SurveyDescription":evdesc,
  	 	"SurveyStatus": "Autopublish",
  	 	"AutoPublishDateTime": publisheventstatus		
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
		//alert("Sucessfully updated");
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
 
 
 
 