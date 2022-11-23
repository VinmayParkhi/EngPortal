$(document).ready(function() {

    GetListThoughts();
});

function GetListThoughts() {
 
    $.ajax
    ({
 
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPThought')/items?$top=1&$select=Title&$expand=AttachmentFiles&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
               
                $('#thoughtdsc').html(data.d.results[0].Title);
        },
        error: function (xhr, status, error) {
        }
    });
}