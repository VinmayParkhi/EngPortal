var accntname;
var admin;
var cardID;
var Designation;
var EmployeeId;
var loginUserName = _spPageContextInfo.userDisplayName;
var RolePosition = _spPageContextInfo.isSiteAdmin;

$(document).ready(function () {
	CheckUserDesignation();
	
	});

function CheckUserDesignation() {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPAccessControl')/items?$select=*&$filter=(Title eq '"+loginUserName+"')",
       // url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPAccessControl')/items?$select=*",
        method: "GET",
        headers:{
               "Accept": "application/json;odata=verbose"
        },           
        success: function (data, status, xhr) {
            dataresults = data.d.results;
            console.log(dataresults);
            for (var i = 0; i < dataresults.length; i++) {           
               Designation = data.d.results[i].Designation;               
               if(Designation == 'Admin'){
               		LoadUserItems3();  		
					GetUserRoleList();
				}
				else{					
					//alert("You dont have access this page. Please contact your system admin.");
           			window.location.href = "https://amdocs.sharepoint.com/sites/EP/SitePages/EPAdmin/AdminHome.aspx";
				}
                     
               } // for loop End					                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}

function GetUserRoleList() {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPAccessControl')/items?$select=*",
        method: "GET",
        headers:{
               "Accept": "application/json;odata=verbose"
        },           
        success: function (data, status, xhr) {
            dataresults = data.d.results;
            console.log(dataresults);
	            for (var i = 0; i < dataresults.length; i++) {
	           
	               Designation = data.d.results[i].Designation;
	               
	               if(Designation == 'Admin'){

							$("#groupid").append("<div class='card emp-card cards'><div class='card-image mx-auto'><p class='lefticon' data-bs-toggle='modal' data-bs-target='#DeletePub' onclick='listItemId(this.id,this.title);' id="+data.d.results[i].EmpEmailID+" title="+data.d.results[i].ID+"><input type='hidden' id='AccName' value="+data.d.results[i].EmpEmailID+"><i class='fa-solid fa-trash-can' id='"+data.d.results[i].ID+"'></i></p><img src='"+data.d.results[i].UserImgUrl+"' style='border-radius:50%;width: 100px;height:11rem;'></div><div class='card-body ms-4'><h5 class='card-title'>"+data.d.results[i].Title+"</h5><p class='card-text'>"+data.d.results[i].Department+"</p><input type='radio' id='"+data.d.results[i].Title+"' checked name='"+data.d.results[i].Title+"' value='Admin' onclick='UpdateRole(this.id,this.value);' style='margin-right:5px;'><span for='Admin'>Admin</span><input type='radio' class='ms-4' id='"+data.d.results[i].Title+"' onclick='UpdateRole(this.id,this.value);' name='"+data.d.results[i].Title+"' value='Nonadmin' style='margin-right:5px;'><span for='Nonadmin' style='background-image: linear-gradient(98deg, #747474, #5d5d5d);'>Non-Admin</span></div></div>"); 		
					}else{
							$("#groupid").append("<div class='card emp-card cards'><div class='card-image mx-auto'><p class='lefticon' data-bs-toggle='modal' data-bs-target='#DeletePub' onclick='listItemId(this.id,this.title);' id="+data.d.results[i].EmpEmailID+" title="+data.d.results[i].ID+"><input type='hidden' id='AccName' value="+data.d.results[i].EmpEmailID+"><i class='fa-solid fa-trash-can' id='"+data.d.results[i].ID+"'></i></p><img src='"+data.d.results[i].UserImgUrl+"' style='border-radius:50%;width: 100px;height:11rem;'></div><div class='card-body ms-4'><h5 class='card-title'>"+data.d.results[i].Title+"</h5><p class='card-text'>"+data.d.results[i].Department+"</p><input type='radio' id='"+data.d.results[i].Title+"' name='"+data.d.results[i].Title+"' value='Admin' onclick='UpdateRole(this.id,this.value);' style='margin-right:5px;'><span for='Admin' style='background-image: linear-gradient(98deg, #747474, #5d5d5d);'>Admin</span><input type='radio' class='ms-4' checked id='"+data.d.results[i].Title+"' onclick='UpdateRole(this.id,this.value);' name='"+data.d.results[i].Title+"' value='Nonadmin' style='margin-right:5px;'><span for='Nonadmin'>Non-Admin</span></div></div>");                                                    
					}                           
            } // for loop End					                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}

function LoadUserItems3(){
	$.ajax({
		url: _spPageContextInfo.siteAbsoluteUrl+ "/_api/Web/SiteGroups/GetByName('EP%20Owners')/users",
		type: "GET",
		dataType: "json",
		headers: {
			"accept": "application/json;odata=verbose"
		},
		success: function (data) {
			console.log(data);
			if(data.d.results.length > 0 ){
				for(i=0;i<data.d.results.length;i++){
					accntname = data.d.results[i].LoginName;					
					admin = data.d.results[i].IsSiteAdmin;
					cardID = data.d.results[i].ID;
					getuserProperties(accntname.replace("#","%23"),admin,cardID);					
				}	                                                 
			}  
			else{
				$("#groupid").append("<div  class='users'>No Members Present</div></br>");
			}       
		},
		error: function (error){
			console.log(error);
		}
	});
}

function getListItems(){
	$.ajax({
		url: _spPageContextInfo.siteAbsoluteUrl+ "/_api/web/lists/getbytitle('EPAccessControl')/items",
		type: "GET",
		dataType: "json",
		headers: {
			"accept": "application/json;odata=verbose"
		},
		success: function (data) {
			console.log(data);
			if(data.d.results.length > 0 )
			{
				for(i=0;i<data.d.results.length;i++){
					accntname = data.d.results[i].Title;					
					admin = data.d.results[i].Designation;
					cardID = data.d.results[i].EmpEmailID;
					//getuserProperties(accntname.replace("#","%23"),admin,cardID);
					console.log(accntname,admin,cardID)
				}	                                                 
			}  
			else{
				$("#groupid").append("<div  class='users'>No Members Present</div></br>");
			}       
		},
		error: function (error){
			console.log(error);
		}
	});
}
function listItemId(id,listID){
// alert(id);
 $("#yesDelete").click(function(){
		removeUserFromGroup(id.replace("%23","#"),3);
   		RemoveListItem(listID);
   		location.reload();
})
$("#okay").click(function(){
		location.reload();
})
						

}


function getuserProperties(user,admin,cardID){
var AdminDesignation;
$.ajax({
		url: _spPageContextInfo.siteAbsoluteUrl+ "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='"+user+"'",
		type: "GET",
		dataType: "json",
		headers: {
			"accept": "application/json;odata=verbose"
		},
		success: function (data) { 
			var dept;
			//var results = data.d.UserProfileProperties.results;
			var displayname = data.d.DisplayName;
			var picurl = _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/userphoto.aspx?size=L&accountname=" + data.d.Email;;			
			//if(picurl != null){picurl = picurl.split('?')[0];}			
			if(picurl == null){
			debugger;
				picurl = 'https://amdocs.sharepoint.com/sites/EP/SiteAssets/EngEmployee/images/Icon awesome-user-circle.png';
			}	
			
			if (admin == true){
				AdminDesignation = "Admin";
				
			}else{
				AdminDesignation = "NonAdmin"
			}		
			
			for(i = 0; i < data.d.UserProfileProperties.results.length; i++){
				if(data.d.UserProfileProperties.results[i].Key == "Department"){
					dept = data.d.UserProfileProperties.results[i].Value;					
					//dept = "O365"
				}
			}
			
			userExistData= getListItem('EPAccessControl','Title',displayname);
			if(userExistData!= undefined) {
				userExistData=JSON.parse(userExistData);
				if(userExistData.d.results.length > 0){				
				}else{					
					PostGroupDataList(displayname,picurl,user,AdminDesignation,cardID,dept);
				}
			}  			
		},
		error: function (error){
			console.log(error);
		}
	});
}

function getListItem(listName,columnname,colValue) {
 	var url= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=*&$filter=" + columnname + " eq '" + colValue +"'" ; 
 	var listitemData = '';
 	listitemData = $.ajax({
 		url: url,
		method: "GET",
 		async:false,
 		headers: { 
 			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
 			'content-type': 'application/json;odata=verbose',
 			'accept': 'application/json;odata=verbose'
 		},
 		success: function (data) {
  		//console.log(data.d.results[0].ID);
 	},
 	error: function (data) {
 		console.log('failure in ' + listName + ' for ' + colValue);
 	}
 });
 return listitemData.responseText;
}

function getUserListItem(listName,colName,colValue){
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*&$filter= "+colName+" eq '"+colValue+"'";
	var listItemData = '';
	listItemData = $.ajax({
		url: siteUrl,
		method: "GET",
		//dataType: "json",
		headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
		success: function (data) {
		alert("Test");
		console.log(data);
		},
		error: function (error){
			console.log(error);
		}
	});
	return listItemData;
}

function DeleteCard(id,listID){
	    	removeUserFromGroup(id.replace("%23","#"),3);
   		RemoveListItem(listID);
	};

function removeUserFromGroup(userLoginName,groupid){
	var url = _spPageContextInfo.siteAbsoluteUrl +"/_api/web/sitegroups/GetById('" + encodeURIComponent(groupid) +"')/users/removebyloginname(@u)?@u='" + encodeURIComponent(userLoginName) +"'";
	return $.ajax({
		url: url,
		method:"POST",
		contentType:"application/json;odata=verbose",
		headers: {
			"Accept":"application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
		success: function (data) { 
			//alert(userLoginName+" has been removed from group");
			location.reload();
		},
		error: function (error){
			console.log(error);
		}		
	});
}

/*****************************Remove user from List**************************************/
function RemoveListItem(myID) {
    $.ajax({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPAccessControl')/items(" + myID  + ")",  
        type: "POST",  
        contentType: "application/json;odata=verbose",  
        headers: {  
            "Accept": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "DELETE",  
        },  
        success: function(data) {  
            //alert("Item Deleted " +myID);  
        },  
        error: function(data) {  
            //alert("failed");  
        }  
    });  
} 

/*start display the add user popup when the add user button is clicked*/
function adduser(){  
	var GroupName = 'EP%Owners';			
   	var CurrGroupId = '3';  
	var currsite = _spPageContextInfo.siteAbsoluteUrl;
	openDialog(currsite+'/_layouts/15/aclinv.aspx?GroupId='+CurrGroupId);	
    //window.location.reload();		
}

function openDialog(pageUrl) {
	var options = {
		url: pageUrl,
		title: 'Add User',
		allowMaximize: false,
		showClose: true,
		width: 800,
		height: 320,
		dialogReturnValueCallback: Function.createDelegate(null, popupClose)
	};
	SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
}

function popupClose(result, value) {
    if (result == SP.UI.DialogResult.Cancel) {
    	//alert('closed');
	}
	else {
	   LoadUserItems3();
	   //location.reload(true);
	   setTimeout(location.reload(true),5000)
	   //GetUserRoleList();
	}
            
}
						
function PostGroupDataList(Title,Image,actname,admin,cardID,dept){
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPAccessControl')/items";
	var data = {
		__metadata: { 'type': 'SP.Data.EPAccessControlListItem' },  		
		"EmpEmailID":actname,
		"Designation":admin,
		"Title" : Title,
		"EmpID": cardID,		
		"UserImgUrl":Image,
		"Department":dept
	}
	console.log(data);
	$.ajax({
		url: siteUrl,
		type: "POST",
		//async:false,
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
}

function ErrorFunction(error) {
	alert('Error!' +error.responseText);
	console.log('Error!' +error.responseText);
}

function UpdateGroupDataList(Title,Image,actname,admin,cardID){

	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPAccessControl')/items("+Title+")";
	var data = {
		__metadata: { 'type': 'SP.Data.EPAccessControlListItem' },  		
		"EmpEmailID":actname,
		"Designation":admin,
		"Title" : Title,
		"EmpID": cardID	
	}
	console.log(data);
	$.ajax({
		url: siteUrl,
		type: "POST",
		//async:false,
		data: JSON.stringify(data),
		headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val(),
				"IF-MATCH": "*",           
				"X-HTTP-Method": "MERGE"	
				},
		success: SuccessFunction,
		error: ErrorFunction
	});
}

function SuccessFunction(data) {
}

function ErrorFunction(error) {
	alert('Error!' +error.responseText);
	console.log('Error!' +error.responseText);
}

function UpdateRoleList(EmpID,RoleValue) {
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPAccessControl')/items("+EmpID+")"
	var item = {
		__metadata: { 'type': 'SP.Data.EPAccessControlListItem' },
  		"Designation":RoleValue	
  	}
	//console.log(data);
	$.ajax({
		url: siteUrl,
		type: "POST",
		async:false,
		data: JSON.stringify(item),
		headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val(),
				"IF-MATCH": "*",           
				"X-HTTP-Method": "MERGE"

		},
		success: SuccessFunction1,
		error: ErrorFunction1
	});
}

function SuccessFunction1(data) {
	alert("Role Updated for : "+EmpID);
}

function ErrorFunction1(error) {
	alert('Error!' +error.responseText);
	console.log('Error!' +error.responseText);
}

function UpdateRole(Title,RoleValue){
	 userRoleData = getListItem('EPAccessControl','Title',Title);
	 if(userRoleData != undefined) {
		 userRoleData =JSON.parse(userRoleData);
		 if(userRoleData .d.results.length > 0){
				//alert("Update Role");
				location.reload();
				var EmpID = userRoleData.d.results[0].ID;
				UpdateRoleList(EmpID,RoleValue)
		}else{
			//alert("User Employee");
		}
	}
}



