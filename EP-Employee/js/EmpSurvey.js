
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
    GetPastSurvey();

 });

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

function GetOngoingSurvey() {
 	var today= new Date();
 	today = moment(today).toISOString();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPSurvey')/items?$select=ID,Attachments,Title,SurveyDescription,SurveyEndDate,SurveyStatus,SurveyLink&$expand=AttachmentFiles&$filter=SurveyStatus eq 'Published' and SurveyEndDate ge '"+today+"'&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            console.log(dataresults)
            for (var i = 0; i <=dataresults.length; i++) {
               EventDates = moment.utc(data.d.results[i].SurveyEndDate).format('DD MMMM, YYYY');               
               //EventFullDates = moment(data.d.results[i].SurveyEndDate).format('DD MMMM, YYYY');
         	   var SurveyId = data.d.results[i].ID;
               var SurveyTitle= data.d.results[i].Title;
               var SurveyDescreption = data.d.results[i].SurveyDescription;
               var SurveyLink = data.d.results[i].SurveyLink;
               AverageRating  = data.d.results[i].AverageRating;  
			
			            
                 var a =   "https://amdocs.sharepoint.com/" + data.d.results[i].AttachmentFiles.results[0].ServerRelativeUrl; 
                      
                 $("#surveyOngoingWrID").append('<div class="surveyOngoing" style="align-items:center;margin: 17px 0px;background: #000000;padding:1.5rem 1rem;border-radius: 1rem;"> <div class="surveyImg"> <img src="'+a+'" alt=""> </div> <div class="s-btn"><div class="surveyDesc"> <div class="surveyDescWr"> <div class="surveyannualEvnt">'+
											   '<label><small>Annual Event 2022</small></label> </div> <div class="funanza"> <label>'+SurveyTitle+'</label> </div>'+
											   '<div class="please"> <small> '+SurveyDescreption+'</small> </div> </div> </div> <div class="leftBtn"> <div class="endDate"> <label>End Date: '+EventDates+'</label>'+
											   '</div><div class="surveyBtn"><a href="'+SurveyLink+'" target="_blank" class="btnSurvey">Start Survey</a></div></div></div></div>');
                 
            } // for loop End					                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}










function GetPastSurvey() {
 	var today= new Date();
 	today = moment(today).toISOString();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPSurvey')/items?$select=ID,Attachments,Title,SurveyDescription,SurveyEndDate,SurveyStatus,SurveyLink&$expand=AttachmentFiles&$filter=SurveyStatus eq 'Completed' and SurveyEndDate le '"+today+"'&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            console.log(dataresults)
            for (var i = 0; i <=dataresults.length; i++) {
               EventDates = moment.utc(data.d.results[i].SurveyEndDate).format('DD MMMM, YYYY');               
               //EventFullDates = moment(data.d.results[i].SurveyEndDate).format('DD MMMM, YYYY');
         	   var SurveyId = data.d.results[i].ID;
               var SurveyTitle= data.d.results[i].Title;
               var SurveyDescreption = data.d.results[i].SurveyDescription;
               var SurveyLink = data.d.results[i].SurveyLink;
               AverageRating  = data.d.results[i].AverageRating;  
			
			            
                var a =   "https://amdocs.sharepoint.com/" + data.d.results[i].AttachmentFiles.results[0].ServerRelativeUrl; 
                      
                 $("#surveyPastWrID").append('<div class="surveyPast" style="align-items:center;margin: 17px 0px;background: #000000;padding:1.5rem 1rem;border-radius: 1rem;"> <div class="surveyPstImg"> <img src="'+a+'" alt=""> </div> <div class="surveyPstDesc"> <div class="surveyPstDescWr"> <div class="surveyPstannualEvnt">'+
												'<label><small>Survey Subtitle</small></label> </div> <div class="funanza"> <label>'+SurveyTitle+'</label> </div> <div class="please">'+ 
												'<small>'+SurveyDescreption+'</small> </div> </div> </div> <div class="end_submit"> <div class="endedDate">'+
												'<label>Ended on: '+EventDates+'</label></div> <div class="surveyPstLbl">  </div> </div> </div>');
                 
           } // for loop End					                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}








