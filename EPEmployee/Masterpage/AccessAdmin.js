var loginUserName = _spPageContextInfo.userDisplayName;
var RolePosition = _spPageContextInfo.isSiteAdmin;


$(document).ready(function () {
	GetRoleList();      

	//CheckUserRole(loginUserName);
	//getListItems();
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
               //alert("I am a : "+Designation)
               //EventDates = moment(data.d.results[i].EventDate).format('YYYY-MM-DD');              
               } // for loop End	
               if (Designation == "Admin"){
               		
               		
               
               }else{
                  //alert("I am non-Admin");
                  $(".menu").css("display","none");
                  $("#username1").addClass("d-none");  
                  $("#username2").removeClass("d-none");     
                  $("#ArrowDown1").addClass("d-none");       
                  //$(".lefticon").addClass("DisabledData");
               }
				                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}
