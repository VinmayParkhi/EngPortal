$(document).ready(function() {
    GetListItemAttachments1();
});
 $.noConflict();


function GetListItemAttachments1() {
        var Itemid = 1;
 
    $.ajax
    ({        
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPBanner')/items?$top=1&$select=Attachments,Title,BannerDescription&$expand=AttachmentFiles&$filter=Pillar eq null &$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
               var a =  "https://amdocs.sharepoint.com/" + data.d.results[0].AttachmentFiles.results[0].ServerRelativeUrl;
               console.log(a);
                //var file = a;
  				//var reader = new FileReader();
  				//reader.onloadend = function(e) {
    			//console.log('RESULT', reader.result);
    			//var myreader = reader.result;
    			//console.log("myreader1", myreader);
    // document.getElementById("img").setAttribute("src", myreader);
 				//}
  				//reader.readAsDataURL(file);
                $("#img").append('<img src="'+a+'" width="100" style="border-radius: 50%;"/>');

                $('#imgtitle').html(data.d.results[0].Title);
                $('#imgdsc').html(data.d.results[0].BannerDescription);
            //}
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}