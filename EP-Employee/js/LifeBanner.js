$(document).ready(function() {
    GetWorkBanner();
});
var pillar;
function GetWorkBanner() {
 
    $.ajax
    ({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPBanner')/items?$top=1&select=AttachmentFiles,Title,BannerDescription,Pillar&$expand=AttachmentFiles&$filter=Pillar eq 'Life'&$orderby=Created desc",
        method: "GET",
       	
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
                var a =  "https://amdocs.sharepoint.com/" + data.d.results[0].AttachmentFiles.results[0].ServerRelativeUrl;
 				$(".workBannerTop").attr('style','margin-bottom: 1rem;border-radius:1.5rem;background:linear-gradient(-90deg, #00000000 0%, #121112 21%, #000000 90%),url('+ a +');background-position:100%; background-repeat: no-repeat; background-size: contain !important;');
 				

                $('#WorkTitle').html(data.d.results[0].Title);
                $('#workDesc').html(data.d.results[0].BannerDescription);
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}