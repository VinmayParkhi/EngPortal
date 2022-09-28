var accntname;
var admin;
var cardID;
var Designation;
var EmployeeId;
var loginUserName = _spPageContextInfo.userDisplayName;
var RolePosition = _spPageContextInfo.isSiteAdmin;
$(document).ready(function () {
<<<<<<< HEAD
	GetUserRoleList();    
	LoadUserItems3();
  
=======
	LoadUserItems3();
	GetRoleList();      
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8

	//CheckUserRole(loginUserName);
	//getListItems();
});


<<<<<<< HEAD
function GetUserRoleList() {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPAccessControl')/items?$select=*&$filter=(Title eq '"+loginUserName+"')",
=======

function GetRoleList() {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPAccessControl')/items?$select=*&$filter=(EmpName eq '"+loginUserName+"')",
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            dataresults = data.d.results;
            console.log(dataresults);
            for (var i = 0; i < dataresults.length; i++) {
<<<<<<< HEAD
           
=======
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
               Designation = data.d.results[i].Designation;
               
               //EventDates = moment(data.d.results[i].EventDate).format('YYYY-MM-DD');              
               } // for loop End					                 
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}



<<<<<<< HEAD

=======
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
function LoadUserItems3(){
	$.ajax({
		url: _spPageContextInfo.siteAbsoluteUrl+ "/_api/Web/SiteGroups/GetByName('RNTENG%20Owners')/users",
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
<<<<<<< HEAD
					accntname = data.d.results[i].Title;					
					admin = data.d.results[i].Designation;
					cardID = data.d.results[i].EmpEmailID;
=======
					accntname = data.d.results[i].EmpName;					
					admin = data.d.results[i].Designation;
					cardID = data.d.results[i].EmpMail;
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
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


function getuserProperties(user,admin,cardID){
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
			var picurl = data.d.PictureUrl;
			console.log('picurl',picurl);
			if(picurl == null){
				//picurl =  _spPageContextInfo.siteAbsoluteUrl+ "/_layouts/15/userphoto.aspx?size=S&accountname="+data.d.Email;
				picurl = 'https://infornt.sharepoint.com/SiteAssets/Images/Image Icon/Image Icon/Icon awesome-user-circle.png';
			}
			var AdminDesignation;
			if (admin == true){
				AdminDesignation = "Admin";
				
			}else{
				AdminDesignation = "NonAdmin"
			}
			//alert(displayname +": ADmin Designation :"+AdminDesignation);
			
			
<<<<<<< HEAD
			userExistData= getListItem('EPAccessControl','Title',displayname);
=======
			userExistData= getListItem('EPAccessControl','EmpName',displayname);
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
			 if(userExistData!= undefined) {
			 userExistData=JSON.parse(userExistData);
			 if(userExistData.d.results.length > 0){
					//alert("User Exist");
					
					
				}else{
					//alert("User Created");
<<<<<<< HEAD
					PostGroupDataList(displayname,picurl,user,AdminDesignation,cardID);
=======
					PostGroupDataList(displayname,picurl,accntname.replace("#","%23"),AdminDesignation,cardID);
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
				}
				
				
				for(i = 0; i < data.d.UserProfileProperties.results.length; i++){
				if(data.d.UserProfileProperties.results[i].Key == "Department"){
					dept = data.d.UserProfileProperties.results[i].Value;
					
					//dept = "O365"
				}
			}    
			
			
			
					if(admin == true){
					//alert("admin is available");
						$("#groupid").append("<div class='card emp-card' style=''><div class='card-image mx-auto'><p class='lefticon' data-bs-toggle='modal' data-bs-target='#staticBackdrop' onclick='DeleteCard(this.id);' id="+data.d.AccountName+"><input type='hidden' id='AccName' value="+data.d.AccountName+"><i class='fa-solid fa-trash-can' id='"+EmployeeId+"'></i></p><img src='"+picurl+"' style='border-radius:50%;width: 100px;'></div><div class='card-body ms-4'><h5 class='card-title'>"+displayname+"</h5><p class='card-text'>"+dept+"</p><input type='radio' id='"+displayname+"' checked name='"+displayname+"' value='Admin' onclick='UpdateRole(this.id,this.value);' style='margin-right:5px;'><span for='Admin'>Admin</span><input type='radio' class='ms-4' id='"+displayname+"' onclick='UpdateRole(this.id,this.value);' name='"+displayname+"' value='Nonadmin' style='margin-right:5px;'><span for='Nonadmin'>Non-Admin</span></div></div>"); 
						
					}else{
						$("#groupid").append("<div class='card emp-card' style=''><div class='card-image mx-auto'><p class='lefticon' onclick='DeleteCard(this.id);' id="+data.d.AccountName+"><input type='hidden' id='AccName' value="+data.d.AccountName+"><i class='fa-solid fa-trash-can' id='"+EmployeeId+"'></i></p><img src='"+picurl+"' style='border-radius:50%;width: 100px;'></div><div class='card-body ms-4'><h5 class='card-title'>"+displayname+"</h5><p class='card-text'>"+dept+"</p><input type='radio' id='"+displayname+"' name='"+displayname+"' value='Admin' onclick='UpdateRole(this.id,this.value);' style='margin-right:5px;'><span for='Admin'>Admin</span><input type='radio' class='ms-4' checked id='"+displayname+"' onclick='UpdateRole(this.id,this.value);' name='"+displayname+"' value='Nonadmin' style='margin-right:5px;'><span for='Nonadmin'>Non-Admin</span></div></div>");                                                    
					}
					}
					
					
					if (Designation == "Admin"){
               		
               		
               
               }else{
                  //alert("I am non-Admin");
                  $(".lefticon").css("display","none");
                  $(".emp-card span").css("display","none");
                  $(".emp-card input").css("display","none");
                 $(".search-box").css("display","none");

                  
                  //$(".lefticon").addClass("DisabledData");
               }
			console.log(data);	
			
     
			//$("#groupid").append("<div class='card emp-card' style=''><div class='card-image mx-auto'><p class='lefticon' onclick='DeleteCard(this.id);' id="+data.d.AccountName+"><input type='hidden' id='AccName' value="+data.d.AccountName+"><i class='fa-solid fa-trash-can' id='"+cardID+"'></i></p><img src='"+picurl+"' style='border-radius:50%;width: 100px;'></div><div class='card-body ms-4'><h5 class='card-title'>"+displayname+"</h5><p class='card-text'>"+dept+"</p><input type='radio' id='Admin"+cardID+"' name='"+cardID+"' value='Admin' style='margin-right:5px;'><span for='Admin'>Admin</span><input type='radio' class='ms-4' id='Nonadmin"+cardID+"' name='"+cardID+"' value='Nonadmin' style='margin-right:5px;'><span for='Nonadmin'>Non-Admin</span></div></div>");                                                    
		},
		error: function (error){
			console.log(error);
		}
	});
}



function getListItem(listName,columnname,colValue) {
<<<<<<< HEAD

=======
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
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
debugger;

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


function DeleteCard(id){
   //var accName = $(".lefticon").children('#AccName').val();
   removeUserFromGroup(id,3);
};


function removeUserFromGroup(userLoginName,groupid)
{
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
 	alert(userLoginName+" has been removed from group");
 	location.reload();
 },
 error: function (error){
	console.log(error);
 }

 });
}


/*start display the add user popup when the add user button is clicked*/

function adduser(){  
	var GroupName = 'RNTENG%20Owners';			
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
		width: 850,
		height: 372
	};
	SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
}


<<<<<<< HEAD
function PostGroupDataList(Title,Image,actname,admin,cardID){
=======
function PostGroupDataList(EmpName,Image,actname,admin,cardID){
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8

	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPAccessControl')/items";
	var data = {
		__metadata: { 'type': 'SP.Data.EPAccessControlListItem' },  		
<<<<<<< HEAD
		"EmpEmailID":actname,
		"Designation":admin,
		"Title" : Title,
		"EmpID": cardID		
=======
		"EmpMail":actname,
		"Designation":admin,
		"EmpName" : EmpName
		//"": cardID		
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
		//"EventEndDate":Edt
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
//alert("test done");
//GetEventMoodCount()
//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function ErrorFunction(error) {
alert('Error!' +error.responseText);
console.log('Error!' +error.responseText);
}

<<<<<<< HEAD
function UpdateGroupDataList(Title,Image,actname,admin,cardID){

	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPAccessControl')/items("+Title+")";
	var data = {
		__metadata: { 'type': 'SP.Data.EPAccessControlListItem' },  		
		"EmpEmailID":actname,
		"Designation":admin,
		"Title" : Title,
		"EmpID": cardID	
=======
function UpdateGroupDataList(EmpName,Image,actname,admin,cardID){

	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPAccessControl')/items("+EmpName+")";
	var data = {
		__metadata: { 'type': 'SP.Data.EPAccessControlListItem' },  		
		//"EmpMail":actname,
		"Designation":admin,
		"EmpName" : EmpName
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
		//"": cardID		
		//"EventEndDate":Edt
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
//alert("Update test done");
//GetEventMoodCount()
//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
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
alert("Role Updated"+EmpID);
//GetEventMoodCount()
//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function ErrorFunction1(error) {
alert('Error!' +error.responseText);
console.log('Error!' +error.responseText);
}





<<<<<<< HEAD
function UpdateRole(Title,RoleValue){
	 userRoleData = getListItem('EPAccessControl','Title',Title);
=======
function UpdateRole(EmpName,RoleValue){
	 userRoleData = getListItem('EPAccessControl','EmpName',EmpName);
>>>>>>> bdf0b129be5c2250ab0e559a940604f01c6b56b8
	 if(userRoleData != undefined) {
	 userRoleData =JSON.parse(userRoleData);
	 if(userRoleData .d.results.length > 0){
			alert("Update Role");
			var EmpID = userRoleData.d.results[0].ID;
			UpdateRoleList(EmpID,RoleValue)
		}else{
			alert("User Employee");
			//PostGroupDataList(displayname,picurl,accntname.replace("#","%23"),AdminDesignation,cardID);
		}

}
}



