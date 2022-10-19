 	
 	
 	var loginUserName = _spPageContextInfo.userDisplayName;
	var RolePosition = _spPageContextInfo.isSiteAdmin;

 	$(document).ready(function() {
 	GetRoleList();
    //$(".mx-auto").click(function () {
    //$(".home").css("background", "transparent linear-gradient(89deg, #DE8601 0%, #FF3D97 100%) 0% 0% no-repeat padding-box");

                //$(this).addClass("active");     
    //});
});



function GetRoleList() {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPAccessControl')/items?$select=*&$filter=(EmpName eq '"+loginUserName+"')",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            dataresults = data.d.results;
            console.log(dataresults);
            for (var i = 0; i < dataresults.length; i++) {
               Designation = data.d.results[i].Designation;
               
              // alert("I am a"+Designation);
               if (Designation == "Admin"){
               
               
               }else{
                  $(".Access").css("pointer-events","none");

                  $(".Access").css("opacity","0.3");
                 // $(".emp-card span").css("display","none");
                  //$(".emp-card input").css("display","none");
                 //$(".search-box").css("display","none");

               }
               
               //EventDates = moment(data.d.results[i].EventDate).format('YYYY-MM-DD');              
               } // for loop End					                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}
