 $(document).ready(function(){
	
	
   $('#siteadmin').hide();
	SP.SOD.executeOrDelayUntilScriptLoaded(AutoRedirect,'sp.js');
   });	
                
               function AutoRedirect() {
    var clientContext = new SP.ClientContext.get_current();
    var currentUser = clientContext.get_web().get_currentUser();
    clientContext.load(currentUser);

    var userGroups = currentUser.get_groups();
    clientContext.load(userGroups);
    clientContext.executeQueryAsync(function(){
         var groupsEnumerator = userGroups.getEnumerator();
          while (groupsEnumerator.moveNext()) {
             var group= groupsEnumerator.get_current();
             console.log("group.get_title()",group);               
             if(group.get_title() == "EventAdmin") {
               window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/Admin/home.aspx"
               //alert("is admin");
                $('#siteadmin').show();
                 break;
             }
             else{
              //alert("You do not have permission to access this page, contact your administrator to request access");
            	window.location.href = "https://amdocs.sharepoint.com/sites/EP/SitePages/Employee/EmpMaster.aspx";
             }
   	   	}

    }, function(err){
        alert(err);
    });
}
