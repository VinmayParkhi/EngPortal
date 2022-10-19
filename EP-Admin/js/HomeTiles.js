$(document).ready(function(){

GetPastEvents();
});




function GetPastEvents() {
 	var today= new Date();
 	today = moment(today).toISOString();
    $.ajax({
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('NewHome')/items?$select=ID,Title,Pillar,EventTitle,EventDescription,AverageRating,EventDate,EventStartTime,VideoURL&$expand=AttachmentFiles&$filter=Pillar eq 'Work' and EventDate le '"+today+"'&$orderby=Created desc",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPTile')/items?$select=ID,Module,Title,ImageURL,TargetURL,ArrowImg&$expand=AttachmentFiles&$filter=Title eq 'HomeTiles'",

		 method: "GET",
          headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            for (var i = 0; i <dataresults.length; i++) {
               var Module = data.d.results[i].Module;
               var EventId = data.d.results[i].ID;
               var Image = data.d.results[i].ImageURL;
               var TargetURL= data.d.results[i].TargetURL;

               
               var ArrowURL = data.d.results[i].ArrowImg;			
			  //var b =   _spPageContextInfo.webAbsoluteUrl + data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl; 
                      
                $(".MainDiv").append('<a class="m-2 test card card-design access-control '+Module+'" href="'+TargetURL+'">'+                
				                     '<img class="dataimg" src="'+Image+'" alt="">'+
				                     '<span class="span-data">'+Module+'<img class="icon" src="'+ArrowURL+'" alt=""></span>'); 
                            
            } // for loop End  
            
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}


