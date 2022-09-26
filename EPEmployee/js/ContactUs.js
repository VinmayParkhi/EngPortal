 var Category;
  $(document).ready(function() { 
 //$('#file_input').multifile();//For facilitate multi file upload 
  
 
   $("#submit").click(function() {contactList("EPContactUs")});
   
   
   
   
 $("select.category").change(function(){
        Category = $(this).children("option:selected").val();
        //alert("selected category"+Category );

    });
     }); 

function contactList(SPListName) {
	var siteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EPContactUs')/Items"
	var data = {
		__metadata: { 'type': 'SP.Data.EPContactUsListItem' },
		EmpName: $("input[id='MemberName']").val(),
		Category: Category,
		Message: $("textarea#comments").val(),
		EmpEmailID : $("#userEmail").html(),
		Status :"Unread",
		Title: SPListName
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