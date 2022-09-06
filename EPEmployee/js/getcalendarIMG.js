$(document).ready(function() {
    GetListItemAttachments();
});


function GetListItemAttachments() {
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
               var a =  "https://infornt.sharepoint.com/" + data.d.results[0].AttachmentFiles.results[0].ServerRelativeUrl;
               console.log(a);
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