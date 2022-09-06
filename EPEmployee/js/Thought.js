$(document).ready(function() {

    GetListThoughts();
});

function GetListThoughts() {
 
    $.ajax
    ({
 
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPThought')/items?$top=1&$select=Thought&$expand=AttachmentFiles&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
               
                $('#thoughtdsc').html(data.d.results[0].Thought);
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}