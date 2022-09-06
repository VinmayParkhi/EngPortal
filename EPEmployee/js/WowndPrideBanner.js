$(document).ready(function() {
	//alert("test");
    GetWorkBanner();
});
var pillar;
function GetWorkBanner() {
    
    //var Itemid = 1;
 
    $.ajax
    ({
    	//url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('AdminHubUploadImgtTest')/items?$select=ID,Attachments,Pillar,EventTitle,EventDescription,AverageRating,EventDate,EventStartTime,VideoURL&$expand=AttachmentFiles&$orderby=Created desc",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPBanner')/items?$top=1&select=AttachmentFiles,Title,BannerDescription,Pillar&$expand=AttachmentFiles&$filter=Pillar eq 'Wow and Pride'&$orderby=Created desc",
        method: "GET",
       	
        headers:
           {
              
               "Accept": "application/json;odata=verbose"
           },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            //for( var i=0; i<dataresults.length; i++){
            
            //pillar = data.d.results[i].Pillar;
           //console.log(pillar);
            //if(pillar == "Work"){
                var a =  "https://infornt.sharepoint.com/" + data.d.results[0].AttachmentFiles.results[0].ServerRelativeUrl;
                //$(".workBannerTop").append('<img src="'+ a +'" width="100" style="border-radius: 50%;"/>');
 				$(".workBannerTop").attr('style','padding:8rem 9rem;border-radius:1.5rem;background:linear-gradient(-90deg, #00000000 0%, #121112 33%, #000000 90%),url('+ a +');background-position:100%; background-repeat: no-repeat; background-size: contain;');
 				

                $('#WorkTitle').html(data.d.results[0].Title);
                $('#workDesc').html(data.d.results[0].BannerDescription);
               // }
            //}
            //}
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}