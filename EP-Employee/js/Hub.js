$(document).ready(function(){

GetHubHeadTiles();
GetHubMainTiles();
});

function GetHubHeadTiles() {
 	var today= new Date();
 	today = moment(today).toISOString();
    $.ajax({

        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPBanner')/items?&$top=1&$select=ID,Pillar,Title,Attachments,BannerDescription&$expand=AttachmentFiles&$filter=(Pillar eq 'Uncover')&$orderby=Created desc",

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
               var Image = data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl;
               var EventTitle = data.d.results[i].Title;
               var Description = data.d.results[i].BannerDescription;

               
               var ArrowURL = data.d.results[i].ArrowImg;			

                $(".cardHeadWr").append('<a href="#"style="text-decoration:none;"><div class="card cardPoster" style="border-radius:1.5rem;background:linear-gradient(-90deg, #00000000 0%, #121112 21%, #000000 90%),url('+Image+');background-position:100%; background-repeat: no-repeat; background-size: contain;" class="cardHeadWr"> <div class="textCard subCardText"><h4>'+EventTitle+'</h4>'+
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

                $(".cardBottomWr").append('<div class="mainTiles" style="text-decoration:none;"><div class="card cardPoster1" style="padding: 5rem 5rem; position:relative;border-radius:1.5rem;background:linear-gradient(90deg, #00000000 0%, #121112 31%, #000000 92%),url('+Image+');background-position:0%; background-repeat: no-repeat; background-size: contain; height:17rem;" class="cardHeadWr"> <div class="textCard subCardText1" ><h4>'+Pillar+'</h4>'+
                                '<p>'+Description+'</p><a style="color:#FF3D97; text-decoration:none;" href="'+TargetURL+'">See More Details -></a></div> </div></div>'); 
                            
            } // for loop End  
            
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}




















