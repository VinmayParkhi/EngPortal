 var uploadDate;
 var ThoughText;
  $(document).ready(function() {
    GetThoughtDate();
 });

function GetThoughtDate() {
	var today= new Date();
    today = moment(today).format('DD MMM,YYYY');
    console.log("Today",today)
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPThought')/items?$select=Created,Title&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
               uploadDate = moment(data.d.results[0].Created).calendar();	
               ThoughText = data.d.results[0].Title;
               
               	console.log("ThoughText"+ThoughText)

               if(uploadDate == today){
               
               uploadDate = "Today"
               }
               	$(".yesterdayText").html(uploadDate);
               	$("#textfield").val(ThoughText);

						                            
            			                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}



