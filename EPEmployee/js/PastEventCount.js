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
 GetPastEvents()
});


function GetPastEvents() {
    var today= new Date();
    today = moment(today).toISOString();
   $.ajax({
       url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,AverageRating,EventDate,EventStartTime,VideoURL&$expand=AttachmentFiles&$filter= EventDate le '"+today+"'&$orderby=Created desc",
       method: "GET",
       headers:
          {
              "Accept": "application/json;odata=verbose"
          },
          
       success: function (data, status, xhr) {
           var dataresults = data.d.results;
                        
           for(var m=0; m<=dataresults.length; m++){
                var totalEvetnts = dataresults.length;
             $("#PastEventCount").text(totalEvetnts);

}
       },
       error: function (xhr, status, error) {
           console.log("Failed");
       }
   });
}
