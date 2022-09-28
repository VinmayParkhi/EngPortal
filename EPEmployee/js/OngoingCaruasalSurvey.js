
$("#ongoingID").on("click", function(){
    $("#ongoingID").addClass("Border_line");
    $("#pastID").removeClass("Border_line");
    $("#surveyOngoingWrID").removeClass("d-none");
    $("#surveyOngoingWrID").addClass("d-block");
    $("#surveyPastWrID").addClass("d-none");
});
$("#pastID").on("click", function(){
    $("#pastID").addClass("Border_line");
    $("#ongoingID").removeClass("Border_line");
    $("#surveyOngoingWrID").removeClass("d-block");
    $("#surveyOngoingWrID").addClass("d-none");
    $("#surveyPastWrID").removeClass("d-none");
    $("#surveyPastWrID").addClass("d-block");
});



 var CurrentDate;
 var EventID;
 var EventDates ;               
 var EventFullDates ;
 var EventTime ;
 var EventId ;
 var pillar;
 var EventTitle;
 var EventDescription;
 var AverageRating;               	 
 var VideoURLs;

 $(document).ready(function() {
    GetOngoingSurvey();
     
 });

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

function GetOngoingSurvey() {
 	//var today= new Date();
 	var today= moment().format('YYYY-MM-DDTHH:mm:SS');
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPSurvey')/items?$select=ID,Attachments,Title,SurveyDescription,SurveyEndDate,SurveyLink&$expand=AttachmentFiles&$filter= SurveyEndDate ge '"+today+"'&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            console.log(dataresults)            
            for (var i = 0; i <3; i++) {
               EventDates = moment(data.d.results[i].SurveyEndDate).format('DD MMM, YYYY');               
               //EventFullDates = moment(data.d.results[i].SurveyEndDate).format('DD MMMM, YYYY');
         	   var SurveyId = data.d.results[i].ID;
               var SurveyTitle= data.d.results[i].Title;
               var SurveyDescreption = data.d.results[i].SurveyDescription;
               var SurveyLink = data.d.results[i].SurveyLink;
               AverageRating  = data.d.results[i].AverageRating;  
				var j = i+1;
			   var totalSurvey = dataresults.length; 
			   
                 var a =  "https://infornt.sharepoint.com/"+ data.d.results[i].AttachmentFiles.results[0].ServerRelativeUrl; 
                      
                 $("#carousel-inner").append('<div class="carousel-item" id="carausel-item'+i+'"> <div class="surveyHeading"> <h6>Surveys</h6> <label>'+j+' of '+totalSurvey+'</label> </div> <div class="mainSurvey">'+
											'<div class="surveySlider"> <div class="amdocsLogo"> <div class="amdocsImgs"> <div class="d-flex align-items-center"> <img src="'+a+'" alt="">'+
											'</div></div> <div class="annualEvent">'+
											'<label>Annual Event 2022</label> </div> </div> <div class="surveyText"> <div class="share">'+SurveyTitle+'</div> <div class="feedback">'+SurveyDescreption+'</div> </div>'+
											'<a href="'+SurveyLink+'" class="click"> <i class="fa-solid fa-arrow-pointer"></i> <h6>Click here to take the survey</h6> </a> </div> </div> </div></div>');
				
								                 
                 
                 $("#carausel-item0").addClass("active");
                 
                 
                 
                                  $("#carousel-innerclone").append('<div class="carousel-item" id="carausel-itemclone'+i+'"> <div class="surveyHeading"> <h6>Surveys</h6> <label>'+j+' of '+totalSurvey+'</label> </div> <div class="mainSurvey">'+
											'<div class="surveySlider"> <div class="amdocsLogo"> <div class="amdocsImgs"> <div class="d-flex align-items-center"> <img src="'+a+'" alt="">'+
											'</div></div> <div class="annualEvent">'+
											'<label>Annual Event 2022</label> </div> </div> <div class="surveyText"> <div class="share">'+SurveyTitle+'</div> <div class="feedback">'+SurveyDescreption+'</div> </div>'+
											'<a href="'+SurveyLink+'" class="click"> <i class="fa-solid fa-arrow-pointer"></i> <h6>Click here to take the survey</h6> </a> </div> </div> </div></div>');
				
								                 
                 
                 $("#carausel-itemclone0").addClass("active");

                                  
            } // for loop End					                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}

