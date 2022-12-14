$(document).ready(function(){

GetHubHeadTiles();
GetHubMainTiles();
});




function GetHubHeadTiles() {
 	var today= new Date();
 	today = moment(today).toISOString();
    $.ajax({
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('NewHome')/items?$select=ID,Title,Pillar,EventTitle,EventDescription,AverageRating,EventDate,EventStartTime,VideoURL&$expand=AttachmentFiles&$filter=Pillar eq 'Work' and EventDate le '"+today+"'&$orderby=Created desc",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPTile')/items?$select=ID,Pillar,Title,ImageURL,TargetURL,Description&$expand=AttachmentFiles&$filter=Title eq 'EmpHub' and Pillar eq 'Uncover your calling'",

		 method: "GET",
          headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            for (var i = 0; i <dataresults.length; i++) {
               var Pillar = data.d.results[i].Pillar;
               var EventId = data.d.results[i].ID;
               var Image = data.d.results[i].ImageURL;
               var TargetURL = data.d.results[i].TargetURL;
               var Description = data.d.results[i].Description;

               
               var ArrowURL = data.d.results[i].ArrowImg;			
			  //var b =   _spPageContextInfo.webAbsoluteUrl + data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl; 
                      //$(".workBannerTop").attr('style','padding:8rem 9rem;border-radius:1.5rem;background:linear-gradient(-90deg, #00000000 0%, #121112 33%, #000000 90%),url('+ a +');background-position:100%; background-repeat: no-repeat; background-size: contain;');

                $(".cardHeadWr").append('<a href="#"style="text-decoration:none;"><div class="card cardPoster" style="padding: 3rem 0; position:relative;border-radius:1.5rem;background:linear-gradient(-90deg, #00000000 0%, #121112 33%, #000000 90%),url('+Image+');background-position:100%; background-repeat: no-repeat; background-size: contain;" class="cardHeadWr"> <div class="textCard subCardText"><h4>'+Pillar+'</h4>'+
                                '<p>'+Description+'</p></div> </div></a>'); 
                            
            } // for loop End  
            
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}



function GetHubMainTiles() {
 	var today= new Date();
 	today = moment(today).toISOString();
    $.ajax({
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('NewHome')/items?$select=ID,Title,Pillar,EventTitle,EventDescription,AverageRating,EventDate,EventStartTime,VideoURL&$expand=AttachmentFiles&$filter=Pillar eq 'Work' and EventDate le '"+today+"'&$orderby=Created desc",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPTile')/items?$select=ID,Pillar,Title,ImageURL,TargetURL,Description&$expand=AttachmentFiles&$filter=Title eq 'EmpHub' and Pillar ne 'Uncover your calling'",

		 method: "GET",
          headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            for (var i = 0; i <dataresults.length; i++) {
               var Pillar = data.d.results[i].Pillar;
               var EventId = data.d.results[i].ID;
               var Image = data.d.results[i].ImageURL;
               var TargetURL = data.d.results[i].TargetURL;
               var Description = data.d.results[i].Description;

               
               var ArrowURL = data.d.results[i].ArrowImg;			
			  //var b =   _spPageContextInfo.webAbsoluteUrl + data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl; 
                      //$(".workBannerTop").attr('style','padding:8rem 9rem;border-radius:1.5rem;background:linear-gradient(-90deg, #00000000 0%, #121112 33%, #000000 90%),url('+ a +');background-position:100%; background-repeat: no-repeat; background-size: contain;');

                $(".cardBottomWr").append('<div class="mainTiles" style="text-decoration:none;"><div class="card cardPoster1" style="padding: 5rem 5rem; position:relative;border-radius:1.5rem;background:linear-gradient(90deg, #00000000 0%, #121112 47%, #000000 92%),url('+Image+');background-position:0%; background-repeat: no-repeat; background-size: contain; height:17rem;" class="cardHeadWr"> <div class="textCard subCardText1" ><h4>'+Pillar+'</h4>'+
                                '<p>'+Description+'</p><a style="color:#FF3D97; text-decoration:none;" href="'+TargetURL+'">See More Details</a></div> </div></div>'); 
                            
            } // for loop End  
            
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}




















