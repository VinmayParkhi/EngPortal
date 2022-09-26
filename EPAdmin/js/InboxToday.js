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
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPContactUs')/items?$select=Created,Status&$orderby=Createddesc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
               uploadDate = moment.utc(data.d.results[0].Created).calendar();	
               ThoughText = data.d.results[0].Status;
               
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
