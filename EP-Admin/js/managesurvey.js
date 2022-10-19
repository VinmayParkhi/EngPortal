var All = 0;
var Published= 0;
var Autopublished = 0;
var Draft = 0;
var Completed = 0;
var log = console.log;
var trHover;

var minDate, maxDate;
var dataTableExample;
$(document).ready(function() {

/*for stable calendar*/
$("#s4-workspace").scroll(function(){
    $("#ui-datepicker-div").hide();
});

  
   DateMin = new DateTime($('#min'), {
        format: 'MMMM Do YYYY'
    });
    DateMax = new DateTime($('#max'), {
        format: 'MMMM Do YYYY'
    });

 

    $.noConflict();
       loadListItems();  
 
/*sb start*/

   var fromDateCh;
   var toDateCh;
   
   $("#min").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function () {
                var fromDate = $(this).val();
                fromDateCh = moment.utc(fromDate).format('YYYY/MM/DD');
                
             if(toDateCh !== undefined){
                var fromDateString = "";                  
                                
                fromDateString += "SurveyStartDate ge " + "'"+fromDateCh+"T00:00:00Z'" + " and SurveyStartDate le " + "'"+toDateCh+"T12:00:00Z'";
	               
	           
                 log(fromDateString)
                var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPSurvey')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+fromDateString+"&$orderby = Created desc";           
              // alert(url)
               
               $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
            log(res)
            successFunction(data);
            }
            
            });
            }else if(fromDateCh !== undefined && toDateCh === undefined){
              var fromDateString = "";                  
                                
                fromDateString += "SurveyStartDate ge " + "'"+fromDateCh+"T00:00:00Z'";
	               
	           
                 log(fromDateString)
                var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPSurvey')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+fromDateString+"&$orderby = Created desc";           
              // alert(url)
               
               $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
            log(res)
            successFunction(data);
            }
            
            });

            }
 
          }
    })
    
  
    $("#max").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function (dateText) {
                var date2 = $(this).val();
                toDateCh = moment.utc(date2).format('YYYY-MM-DD')
                
                if(fromDateCh !== undefined){
                var toDateString = "";
                                
                toDateString += "SurveyStartDate ge " + "'"+fromDateCh+"T00:00:00Z'" + " and SurveyStartDate le " + "'"+toDateCh+"T12:00:00Z'";
	               
	           
                 //log(fromDateString)
                var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPSurvey')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+toDateString+"&$orderby = Created desc";           
              // alert(url)
               
               $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
            log(res)
            successFunction(data);  
            }
            
            });
            }else if(toDateCh !== undefined && fromDateCh === undefined){
               var toDateString = "";
                                
                toDateString += "SurveyStartDate le " + "'"+toDateCh+"T12:00:00Z'";
	               
	           
                 //log(fromDateString)
                var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPSurvey')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+toDateString+"&$orderby = Created desc";           
              // alert(url)
               
               $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
            log(res)
            successFunction(data);  
            }
            
            });

            }

         }
    });
    
    
    $("#min, #max").on('keyup',function(){
       var val = $(this).val();
      // log(val);
       if(val.length === 0){
        $("#min, #max").on('keyup',function(){
        var val = $(this).val();
       //log(val);
        if(val.length === 0){
        //alert('empty')
        loadListItems()
        }
        });
       }
    });

    
  /*sb end*/
	
   /*$('.arrow-img').on("mouseover",function(e){
   $('#myImg').slideDown(1);
  });     
  $('.arrow-img').on("mouseleave",function(e){
   $('#myImg').slideUp(1);
  });*/
  
  $('#arrimg').on("click",function(e){
    $("#myImg").removeClass("d-none");
    $("#myImg").css("display","block");
  });   
    
  $('#arrimg').on("mouseleave",function(e){
   $("#myImg").addClass("d-none");
  });

    
   /* sb start */
   
   $("#AllCountLi,#autopublishedLi,#DraftLi,#CompletedLi,#PublishedLi").on("click",function(event){
   
   var text = event.target.innerText
  //log(text.includes('Work'));
  
  var pillarFilterArray = [];
  
                 var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPSurvey')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby=ID desc";
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

                if(data.d.results.length > 0 ){ 
                    log(data)
                    var res = data.d.results;
                    
                    for(var f=0;f<res.length;f++){
                        if(text.includes(res[f].SurveyStatus)){
                        
                         pillarFilterArray.push(res[f])
                          //log(res[f])
                        }else if(text.includes("All Events")){
                           pillarFilterArray.push(res[f])
                        
                        }
                                                
                    }; /* for end */
                    successFuncFltr(pillarFilterArray)
                }
              }  
    });  /* ajax end */
  
});

   
/* sb end */ 
    
  $('#min, #max').on('change', function () {
        table.draw();
    });
    $("#min").change(function(){
   //alert("test");
   var DateMax=$("#min").val();
   var DateMin=$("#max").val();
   
   console.log(DateMax);
   console.log(DateMin);
  //alert("The text has been changed.");

});

});
//$( "#min" ).datepicker( "setDate", new Date());
//$( "#max" ).datepicker( "setDate", 31);

/*$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = minDate.val();
        var max = maxDate.val();
        var date = new Date( data[4] );
 
        if (
            ( min === null && max === null ) ||
            ( min === null && date <= max ) ||
            ( min <= date   && max === null ) ||
            ( min <= date   && date <= max )
        ) {
            return true;
        }
        return false;
    }
);*/

function loadListItems() {

               var siteurl ="https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPSurvey')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby=ID desc";
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
log(data)
                if(data.d.results.length > 0 )

                 { 

                  successFunction(data);                                                 
					
					var dataresults = data.d.results;
				//console.log(dataresults);
				$("#AllCount").html(dataresults.length);
				for(var i =0; i< dataresults.length; i++){
				var Status = data.d.results[i].SurveyStatus;
					if(Status == "Published"){
						Published++;
						//console.log("Scheduled"+Scheduled);
						$("#Published").html(Published);
					}else if(Status == "Autopublish"){
						Autopublished++;
						//console.log("Autopublished"+Autopublished);
						$("#autopublished").html(Autopublished);
					}else if(Status == "Draft"){
						Draft++;
						//console.log("Draft"+Draft);
						$("#Draft").html(Draft);
					}else if(Status == "Completed"){
						Completed++;
						//console.log("Feedback"+Feedback);
						$("#Completed").html(Completed);
					}else{
						//Others++;
						//console.log("Others"+Others);
					}
				//var Status;
				}
					
					
					
					
                 }         

               },

            error: errorFunction

               });      

}


/*sb start*/
function successFuncFltr(fltrData){
    log(fltrData)
    
    var today1 = new Date();

               var dd1 = String(today1. getDate()). padStart(2, '0');

               var mm1 = String(today1. getMonth() + 1). padStart(2, '0'); //January is 0!

               var yyyy1 = today1. getFullYear();                                           

               var time = today1.getHours() + "_" + today1.getMinutes() + "_" + today1.getSeconds();

               today1 = dd1 + '_' + mm1 + '_' + yyyy1 + '_' +time;



//console.log(data);

var siteurl ="https://amdocs.sharepoint.com/sites/EP";

        try {

                 dataTableExample = $('#dataTable2').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }



                dataTableExample = $('#dataTable2').DataTable({    
                		scrollY: '100vh',

		language: {
                    search: "",
                    searchPlaceholder: "Search"
           	     },
           	     
                    pagingType:'simple_numbers',

                    autoWidth: true,

                    deferRender:true,                       

                    lengthMenu: [10,50,100, 200, 500],                       

                    "aaData": fltrData,

                        "aoColumns": [       
                          {
                        	"render": function(data, type, row, meta ){
                        		return meta.row + 1
                        	}                        
                        },                     

                       //{"mData": "ID"},

                        {
							"render": function(data, type, row, meta ) {              
							return '<p id="EventDesc">'+row.Title+'</p>'; }
						},

  					  	{"mData": "SurveyStartDate",

                            "render": function(data) {
                                     var date = new Date(data);
                                     date = moment.utc(date).format('DD MMM,YYYY');
                                     return date;
                                    
                                }

                        },
     
						
						{"mData": "SurveyEndDate",
						
						 			"render": function(data) {
                                     var date = new Date(data);
                                     date = moment.utc(date).format('DD MMM,YYYY');
                                     return date;
                                    
                                }

						
						}, 
          
						//{"mData": "Status"},
						 {
							"render": function(data, type, row, meta ) {  
									var Autodate = moment.utc(row.AutoPublishDateTime).format('DD MMM, YYYY hh:mm a');
									var Status = row.SurveyStatus;
								if(Status == "Autopublish"){
									return '<span id="event-pillar" class="'+row.SurveyStatus+'">'+row.SurveyStatus+"<br>"+Autodate+'</span>';
								}else{
									return '<span id="event-pillar" class="'+row.SurveyStatus+'">'+row.SurveyStatus+'</span>';
								}
								}
						},

						
						//{"mData": ""},
						
						{
			              	"render": function(data, type, row, meta ) {          
			              			var StatusColumn =  row.SurveyStatus;
			              			if(StatusColumn == "Published"){
			              				return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href="../../SitePages/EPAdmin/EditSurvey.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a><a class="ms-4"><i data-bs-toggle="modal" data-bs-target="#DeleteModal" class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></a></div></div>';
			              			}else if(StatusColumn == "Draft"){
			              				return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href="../../SitePages/EPAdmin/EditSurvey.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a>+<a class="ms-4"><i data-bs-toggle="modal" data-bs-target="#DeleteModal" class="fa fa-trash" style="color:black;margin: 0px 6px 0px -11px" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></i></a></div></div>';
			              			}
							//return '<a href="../../SitePages/EPAdmin/Edit_survey.aspx?SurveyID='+row.ID+'"><i class="fa fa-pencil" id="editbtn"></i></a><i class="fa fa-trash" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/>'; }
							return '<div id="temp"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href="../../SitePages/EPAdmin/EditSurvey.aspx?EventID='+row.ID+'"></a>+</a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></div></div>';
							//return '<span class="Eventaction" id="action" onmouseover="action();" onmouseout="actionback()"><img src="https://infornt.sharepoint.com/SiteAssets/Admin/New_Folder/Admin_Main Images/Group 3112 (1).png" style="width:6px; height:20px;"></span><div class="actionDIv"></div>'; 
							}

			            }
                     ]

                });

            }

            catch (e) { 

        alert(e.message); 

    }

}/*sb end*/


function adduser(id){
    //openDialog(currsite+'/_layouts/15/aclinv.aspx?GroupId='+CurrGroupId);
    openDialog("https://amdocs.sharepoint.com/sites/EP/Lists/EPEventShare/NewForm.aspx?EventID="+id);    
    //window.location.reload();        
}

function openDialog(pageUrl) {
    var options = {
        url: pageUrl,
        iconImageUrl: "icons/request.png",
        title: 'Share event with people you want',
        allowMaximize: false,
        showClose: true,
        width: 450,
        height: 200
    };
    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
}




function errorFunction(data){
console.log(error);
}



function successFunction(data) {

               var today1 = new Date();

               var dd1 = String(today1. getDate()). padStart(2, '0');

               var mm1 = String(today1. getMonth() + 1). padStart(2, '0'); //January is 0!

               var yyyy1 = today1. getFullYear();                                           

               var time = today1.getHours() + "_" + today1.getMinutes() + "_" + today1.getSeconds();

               today1 = dd1 + '_' + mm1 + '_' + yyyy1 + '_' +time;



console.log(data);

var siteurl ="https://amdocs.sharepoint.com/sites/EP";

        try {

                 dataTableExample = $('#dataTable2').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }



                dataTableExample = $('#dataTable2').DataTable({  
                       
                		scrollY: '100vh',

		language: {
                    search: "",
                    searchPlaceholder: "Search"
           	     },
           	     
                    pagingType:'simple_numbers',

                    autoWidth: true,

                    deferRender:true,                       

                    lengthMenu: [10,50,100, 200, 500],                       

                    "aaData": data.d.results,

                        "aoColumns": [    
                         {
                        	"render": function(data, type, row, meta ){
                        		return meta.row + 1
                        	}                        
                        },                         

                       //{"mData": "ID"},

                        {
							"render": function(data, type, row, meta ) {              
							return '<p id="EventDesc">'+row.Title+'</p>'; }
						},

  					  	{"mData": "SurveyStartDate",

                            "render": function(data) {
                                     var date = new Date(data);
                                     date = moment.utc(date).format('DD MMM,YYYY');
                                     return date;
                                    
                                }

                        },
     
						
						{"mData": "SurveyEndDate",
						
						 			"render": function(data) {
                                     var date = new Date(data);
                                     date = moment.utc(date).format('DD MMM,YYYY');
                                     return date;
                                    
                                }

						
						}, 
          
						//{"mData": "Status"},
						 {
							"render": function(data, type, row, meta ) {  
							
							//log(row.SurveyStatus)
									var Autodate = moment.utc(row.AutoPublishDateTime).format('DD MMM, YYYY hh:mm a');
									var Status = row.SurveyStatus;
									if(Status == "Autopublish"){
										return '<span id="event-pillar" class="'+row.SurveyStatus+'">'+row.SurveyStatus+"<br>"+Autodate+'</span>';
									}else{
										return '<span id="event-pillar" class="'+row.SurveyStatus+'">'+row.SurveyStatus+'</span>';
									}
								}
						},

						
						//{"mData": ""},
						
						{
			              	"render": function(data, type, row, meta ) {          
			              			var StatusColumn =  row.SurveyStatus;
			              			
			              										
			              			if(StatusColumn == "Published"){
			              				return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;cursor:pointer;"><div id="editbox"><a href="../../SitePages/EPAdmin/EditSurvey.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a><a class="ms-4"><i data-bs-toggle="modal" data-bs-target="#DeleteModal1" class="fa fa-trash" style="color:black;" id="Remove-Btn"  onclick="listItemId('+row.ID+')"/></a></div></div>';
			              			}else if(StatusColumn == "Draft"){
			              				return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;cursor:pointer;"><div id="editbox"><a href="../../SitePages/EPAdmin/EditSurvey.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a>+<a class="ms-4"><i data-bs-toggle="modal" data-bs-target="#DeleteModal1" class="fa fa-trash" style="color:black;margin: 0px 6px 0px -11px" id="Remove-Btn" onclick="listItemId('+row.ID+')" /></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></i></a></div></div>';
			              			}else if(StatusColumn == "Autopublish"){
			              			  return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;cursor:pointer;"><div id="editbox"><a href="../../SitePages/EPAdmin/EditSurvey.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a>+<a class="ms-4"><i data-bs-toggle="modal" data-bs-target="#DeleteModal1" class="fa fa-trash" style="color:black;margin: 0px 6px 0px -11px" id="Remove-Btn" onclick="listItemId('+row.ID+')" /></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></i></a></div></div>';
									}else{
										return '<div id="temp" ><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;cursor:pointer;"><div id="editbox"><a href="../../SitePages/EPAdmin/EditSurvey.aspx?EventID='+row.ID+'"></a><a style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></a></div></div>';
			              			}
							}

			            	},
			             ]

                });

            }

            catch (e) { 

        alert(e.message); 

    }

}

function listItemId(id){
// alert(id);
 $("#Yes").click(function(){
	RemoveListItem(id);
})
$("#okay").click(function(){
	window.location.href = 'https://amdocs.sharepoint.com/sites/EP/SitePages/EPAdmin/ManageSurvey.aspx';

})
						

}


/*sb end*/
/* sb start */


 /* successFunction end */

function showEditBox(x){
         
         //x.style.cursor = "pointer";
         trHover =  x.parentNode.parentNode.parentNode;     
          
         var x = x.querySelector('#editbox');
         log(x)
		    x.style.display = "flex";
		    
           removeEditBox(trHover,x);

};

function removeEditBox(tr,x){
   tr.onmouseout = function(){      
		    x.style.display = "none";       

   };
};

/* sb end */

/********************************************************************************************************************************/


var listName = "EPSurvey";

function RemoveListItem(myID) {  
    //var myID = $("#emp-id").val();  
            
        $.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPSurvey')/items(" + myID  + ")",  
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
                //location.reload();
            },  
            error: function(data) {  
                alert("failed");  
            }  
        });  
     
} 

 
function showimg(x) {

   //log(x)
  var x = x.querySelector('#editbox');
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}





setInterval(GetAutoPublish, 10000);

function GetAutoPublish() {
 	var today = moment().format('YYYY-MM-DDTHH:mm:00'); 	
 	$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPSurvey')/items?$select=ID,SurveyStatus,SurveyEndDate&$filter=(SurveyStatus eq 'Autopublish') and ( AutoPublishDateTime le '"+today+"')&$orderby=Created desc",   
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
           var dataresults = data.d.results;
            console.log(dataresults);
				if(dataresults.length > 0){
               var AutoPublishDate =data.d.results[0].SurveyEndDate;               
               var Status = data.d.results[0].SurveyStatus;
               		var ID = data.d.results[0].ID;
               		console.log(AutoPublishDate +" "+ Status +" "+ ID);
               UpdatePublish(ID);
           			}	                 
        },
        error: function (xhr, status, error) {
            //console.log("Failed");
        }
    });
}

function UpdatePublish(ID) {
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPSurvey')/items("+ID+")"
	var item = {
		__metadata: { 'type': 'SP.Data.EPSurveyListItem' },
  		"SurveyStatus":"Published"
  		//"AutoPublishDate" : ""
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
		success: SuccessFunction,
		error: ErrorFunction
	});
}

function SuccessFunction(data) {
//alert("test done");

//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function ErrorFunction(error) {
alert('Error!' +error.responseText);
}







 setInterval(UpDateComplete, 45000);

function UpDateComplete() {
 	var today = moment().format('YYYY-MM-DD'); 	
 	$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPSurvey')/items?$select=ID,SurveyStatus,SurveyEndDate&$filter=(SurveyStatus eq 'Published') and ( SurveyEndDate le '"+today+"')&$orderby=Created desc",   
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
           var dataresults = data.d.results;
            console.log(dataresults);
				if(dataresults.length > 0){
               var AutoPublishDate = data.d.results[0].SurveyEndDate;               
               var Status = data.d.results[0].SurveyStatus;
               		var ID = data.d.results[0].ID;
               		console.log(AutoPublishDate +" "+ Status +" "+ ID);
               UpdateCompleted(ID);
           }		                 
        },
        error: function (xhr, status, error) {
            //console.log("Failed");
        }
    });
}

function UpdateCompleted(id) {
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPSurvey')/items("+id+")"
	var item = {
		__metadata: { 'type': 'SP.Data.EPSurveyListItem' },
  		"SurveyStatus":"Completed",
  		//"AutoPublishDate" : ""
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
		success: SuccessFunction,
		error: ErrorFunction
	});
}

function SuccessFunction(data) {
//alert("test done");

//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function ErrorFunction(error) {
alert('Error!' +error.responseText);
}

$(document).ready(function() {
   
});

 

