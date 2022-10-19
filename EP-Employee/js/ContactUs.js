 var Category;
  $(document).ready(function() { 
 
   $("#submit").click(function() {
   
   contactList("EPContactUs")
   
   
    $("textarea").val("");
    $("select").val("");

   });
   
   
   $("#category,#comments").on("input", function () {    	
        canChangeColorCreateEvent();
    });
    function canChangeColorCreateEvent(){  
        var buttonChange = true;  
        $("#category,#comments").each(function(){
            if($(this).val()==''){
                buttonChange = false;
            }
        });
        if(buttonChange){ 
            $('#submit').addClass("EnableBtn");   
        }else{
            $('#submit').removeClass("EnableBtn")  
        }
     
    }

   
 $("select.category").change(function(){
        Category = $(this).children("option:selected").val();

    });
     }); 

function contactList(SPListName) {

	var siteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EPContactUs')/Items"
	var data = {
		__metadata: { 'type': 'SP.Data.EPContactUsListItem' },
		Title: $("input[id='MemberName']").val(),
		Category: Category,
		Message: $("textarea#comments").val(),
		EmpEmailID : $("#userEmail").html(),
		Status :"Unread",
		//Title: SPListName
	}
	console.log(data);
	$.ajax({
		url: siteUrl,
		type: "POST",
		async:false,
		data: JSON.stringify(data),
		headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
		success: SuccessFunction,
		error: ErrorFunction
	});
}

function SuccessFunction(data) {
//alert("test done");

//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function ErrorFunction(error) {
//alert('Error!' +error.responseText);
}