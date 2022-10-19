var CurrentDate = '';
var EventID =''; 
var Mood =''; 
var count = 0; 
var count1 = 0; 
var count2 = 0;
var count3 = 0;
var count4 = 0;        
var count5 = 0; 
var MoodDate; 
var InboxId;
var loginUserName = _spPageContextInfo.userDisplayName;


$(document).ready(function(){
//AutoRedirect();
	LoadUserItems();
	userdetails();
	/*$('#siteadmin').hide();
	SP.SOD.executeOrDelayUntilScriptLoaded(AutoRedirect,'sp.js');*/
	GetPastEvents1();
	Notification();
});

function userdetails(){
	var requesturl = "https://amdocs.sharepoint.com/sites/EP/_api/SP.UserProfiles.PeopleManager/GetMyProperties";
	$.ajax({      
		url: requesturl,      
		type: "GET",      
		headers: {      
			"Accept": "application/json; odata=verbose"      
		},      
		async: false,      
		success: function(data) { 
			console.log(data);
			var results = data.d.UserProfileProperties.results; 
  
			$("#username").html(data.d.DisplayName);
			$("#username1").html(data.d.DisplayName);
			
			$("#profileIMG").append('<img src="'+data.d.PictureUrl+'" width="100" style="border-radius: 50%;"/>');
			$("#profileimg").append('<img src="'+data.d.PictureUrl+'" width="100" style="border-radius: 10%;"/>');
			$("#profileImg").append('<img src="'+data.d.PictureUrl+'" width="100" style="border-radius: 50%;"/>');
			$("#toggleMenuUser").html(data.d.DisplayName);

			for (i = 0; i < results.length; i++) {
				if (results[i].Key == "Department") {
					console.log(results[i].Value);
					$("#Dept").html("HO");
					$("#dept").html("Consultant");
					$("#toggleMenuDept").html("Developer");}							 
				}  
			},      
		error: function(error) {      
			console.log("fnGetUserProps:: " + error);      
		}      
	});                
}


function LoadUserItems(){
var userGroupName;
	$.ajax({
		url: _spPageContextInfo.siteAbsoluteUrl+ "/_api/Web/SiteGroups/GetByName('EP%Owners')/users",
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
					if(loginUserName == data.d.results[i].Title){
						//alert("Is Admin"+loginUserName)
						userGroupName = data.d.results[i].Title;
						
					}
				}
					if(loginUserName == userGroupName){
						//alert("Is Admin"+loginUserName)
					}else{
             			//alert("is Non admin")
              			alert("You do not have permission to access this page, contact your administrator to request access");
            			window.location.href = "https://amdocs.sharepoint.com/sites/EP/SitePages/Employee/EmpMaster.aspx";
             		}                                               
			}  
			     
		},
		error: function (error){
			console.log(error);
		}
	});
}



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
               //window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/Admin/home.aspx"
               //alert("is admin");
                $('#siteadmin').show();
                 //break;
             }
             else{
             alert("is Non admin")
              //alert("You do not have permission to access this page, contact your administrator to request access");
            	window.location.href = "https://amdocs.sharepoint.com/sites/EP/SitePages/Employee/EmpMaster.aspx";
             }
   	   	}

    }, function(err){
        alert(err);
    });
    }

//


function Notification() {

	var siteurl = "https://amdocs.sharepoint.com/sites/EP";
	
	var url = siteurl+ "/_api/web/lists/getbytitle('EPContactUs')/items?&$top=5000&$select=*&$filter= Status eq 'Unread'&$orderby = Created desc";
	  //var url = siteurl+ "/_api/web/lists/getbytitle('TestList')/items?&$select=*";
	console.log(url);        

     $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {

                    "accept": "application/json;odata=verbose"

            },

            success: function (data) {
				var dataresults = data.d.results;
				console.log(dataresults);
				//var Status;
				if(dataresults.length > 0){
				//alert(dataresults.length);
					$(".notification").show();
				}
				else{
				//alert(dataresults.length);
					$(".notification").hide();
				}					
             },

            //error: errorFunction

	});      

}

  
function GetPastEvents1() {
    // Specify the Id of the Item that you want to fetch
    var Itemid = 1;
	var d = new Date();

	var month = d.getMonth()+1;
	var day = d.getDate();
	
	var output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;

    $.ajax
    ({
        
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('List Name')/items(" + Itemid + ")/AttachmentFiles",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPMoodMeter')/items?$select=*&$filter= MoodFlag eq 'Unread'&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            for (var i = 0; i <dataresults.length; i++) {
                Mood = data.d.results[i].Mood;
             	MoodDate = moment(data.d.results[i].Created).format('YYYY-MM-DD');
				$("#Boring").html(count);
				$("#Excited").html(count1);
				$("#Happy").html(count2);
				$("#Frustrated").html(count3);
				$("#Cool").html(count4);
				$("#Angry").html(count5);

           		if(Mood == "Boring" && output == MoodDate)
                 {
                   	count++;
                	$("#Boring").html(count);
                	//console.log(count);

                 }
                 else if(Mood == "Excited" && output == MoodDate)
                 {
                 
                	//alert("Excited");                	
                	count1++;
                	$("#Excited").html(count1)                	
                	//console.log(count1);


                 }
                 else if(Mood == "Happy" && output == MoodDate)
                 {
                 
                	//alert("Happy");
                	count2++;
                	$("#Happy").html(count2)                	
                	//console.log(count1);


                 }
				else if(Mood == "Frustrated" && output == MoodDate)
                 {
                 
                	//alert("Frustrated");
                	count3++;
                	$("#Frustrated").html(count3)                	
                	//console.log(count1);


                 }
                 else if(Mood == "Cool" && output == MoodDate)
                 {
                 
                	//alert("Cool");
                	count4++;
                	$("#Cool").html(count4)                	
                	//console.log(count1);


                 }
                 else if(Mood == "Angry" && output == MoodDate){
                 	count5++;
                	$("#Angry").html(count5)                	
                	//console.log(count5);

                 }


             }
            
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}
var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
       var yyyy = today.getFullYear();

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var mm = monthNames[today.getMonth()];

   today = dd + '-' + mm + '-' + yyyy;
    $("#today").html(today);
   
   console.log(today)

function heartImage(){
	EventID = $(this).attr('id');
	alert(this.EventID);	;
	FavEvents();
}


function FavEvents(){
  		var username = $("#username").text();
 		var EmpId = $("#EMpID").text(); 		
 
	
  	var item={
  	 	"__metadata":{'type': 'SP.Data.FavoriteEventsListItem'},
  	 	"Title": "FavoriteEvents",
   		"EventID":EventID,
		"EmpID":EmpId,
		"UserName":username 
  	};
  	console.log(item);
  	  	$.ajax({
		url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('FavoriteEvents')/items",
		type: "POST",
		contentType: "application/json; odata=verbose",
		data:JSON.stringify(item),
		headers: {
			"Accept": "application/json; odata=verbose",
			"X-RequestDigest":$("#__REQUESTDIGEST").val(),			
		},
		success:OnSuccess,
		error:OnError
	});
	function OnSuccess(data){
		alert("Sucessfully updated");
	}

    function OnError(data){
		alert("Update error");
	}
  };
  
  

    

