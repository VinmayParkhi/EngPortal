$(document).ready(function(){

CardsImage();
});




function CardsImage() {
 	var today= new Date();
 	today = moment(today).toISOString();
    $.ajax({
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('NewHome')/items?$select=ID,Title,Pillar,EventTitle,EventDescription,AverageRating,EventDate,EventStartTime,VideoURL&$expand=AttachmentFiles&$filter=Pillar eq 'Work' and EventDate le '"+today+"'&$orderby=Created desc",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPTile')/items?$select=ID,Module,Title,ImageURL,Description,TargetURL,ArrowImg&$expand=AttachmentFiles&$filter=Title eq 'ManageHub'",

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
               var TargetURL = data.d.results[i].TargetURL;
               var Desc = data.d.results[i].Description;


               
               //var ArrowURL = data.d.results[i].ArrowImg;			
			  //var b =   _spPageContextInfo.webAbsoluteUrl + data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl; 
                      
                 $(".cardBottomWr").append('<div class="mainTiles" style="text-decoration:none;"><div class="cardimg'+Module+'"" style="padding: 5rem 5rem; position:relative;border-radius:1.5rem;background:linear-gradient(90deg, #00000000 0%, #121112 40%, #000000 92%),url('+Image+');background-position:0%; background-repeat: no-repeat; background-size: contain; height:20rem; margin:2% 0%;" class="cardHeadWr"> <div class="textCard" style="position: absolute;top: 22%; left: 40%;"><h4>'+Module+'</h4>'+
                                '<p>'+Desc+'</p><a style="color:#FF3D97; text-decoration:none;" href="'+TargetURL+'">See More Details</a></div> </div></div>');
                
               
                            
            } // for loop End  
            
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}