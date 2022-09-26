$(document).ready(function() {

$('#datatable_wrapper > div.dt-buttons > button > span').html("red wine"); 

      // alert("test");
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
   //var url = siteurl+ "/_api/web/lists/getbytitle('EPMoodMeter')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby = Created desc";
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
                 //alert("test"+Boring)
                   	Happy++;
                	$(".Happy").html(Happy);
                	//console.log(Boring);

                 }
                 else if(Mood == "Excited")
                 {
                 
                	//alert("Excited");                	
                	Excited++;
                	$(".Excited").html(Excited)                	
                	//console.log(count1);


                 }
                 else if(Mood == "Cool")
                 {
                 
                	//alert("Happy");
                	Cool++;
                	$(".Cool").html(Cool)                	
                	//console.log(count1);


                 }
				else if(Mood == "Boring")
                 {
                 
                	//alert("Frustrated");
                	Boring++;
                	$(".Boring").html(Boring)                	
                	//console.log(count1);


                 }
                 else if(Mood == "Frustrated")
                 {
                 
                	//alert("Cool");
                	Frustrated++;
                	$(".Frustrated").html(Frustrated)                	
                	//console.log(count1);
                 }
                 else if(Mood == "Angry"){
                 	Angry++;
                	$(".Angry").html(Angry)                	
                	//console.log(count5);

                 }
             }
       },
       error: function (xhr, status, error) {
           console.log("Failed");
       }
       
   });
}









