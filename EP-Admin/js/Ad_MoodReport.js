$(document).ready(function() {

$('#datatable_wrapper > div.dt-buttons > button > span').html("red wine"); 
       $.noConflict();
       GetMood();   
         
});
var Mood;
   var Excited = 0;
   var Boring = 0;
   var Happy = 0;
   var Cool = 0;
   var Angry = 0;
var Frustrated = 0;
function GetMood() {
   $.ajax({
       url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPMoodMeter')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby = Created desc",
       method: "GET",
       headers:
          {
              "Accept": "application/json;odata=verbose"
          },
          
       success: function (data, status, xhr) {
       
           var dataresults = data.d.results;
           console.log(dataresults.length);

	           for (var i = 0; i <dataresults.length; i++) {
              	Mood = data.d.results[i].Mood;
           		if(Mood == "Happy")
                 {
                   	Happy++;
                	$(".Happy").html(Happy);

                 }
                 else if(Mood == "Excited")
                 {
                            	
                	Excited++;
                	$(".Excited").html(Excited)                	
                 }
                 else if(Mood == "Cool")
                 {
                	Cool++;
                	$(".Cool").html(Cool)                	
                 }
				else if(Mood == "Boring")
                 {
                	Boring++;
                	$(".Boring").html(Boring)                	
                 }
                 else if(Mood == "Frustrated")
                 {
                	Frustrated++;
                	$(".Frustrated").html(Frustrated)                	
                 }
                 else if(Mood == "Angry"){
                 	Angry++;
                	$(".Angry").html(Angry)               

                 }
             }
       },
       error: function (xhr, status, error) {
           console.log("Failed");
       }
       
   });
}









