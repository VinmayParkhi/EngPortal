$(document).ready(function() { 
  $(".btnSubmit").on("click", function(){
  EventMoodCount();
  });

function EventMoodCount(){
  $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEventMood')/items?$select=ID,Title,EmpID,Excited,NotExcited,NotSure",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
        success: function (data, status, xhr) {
            dataresults = data.d.results;
            console.log(dataresults);
            for (var i = 0; i <dataresults.length; i++) {         
               var EventID = data.d.results[i].Title;
               var EmpID = data.d.results[i].EmpID;
               var Excited = data.d.results[i].Excited;
               var NotExcited = data.d.results[i].NotExcited;
               var NotSure = data.d.results[i].NotSure;
           }
         }
   };
};        