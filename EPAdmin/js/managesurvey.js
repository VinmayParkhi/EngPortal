var All = 0;
var Scheduled = 0;
var Autopublished = 0;
var Draft = 0;
var Past = 0;
var log = console.log;


var minDate, maxDate;
var dataTableExample;
$(document).ready(function() {
   
   DateMin = new DateTime($('#min'), {
        format: 'MMMM Do YYYY'
    });
    DateMax = new DateTime($('#max'), {
        format: 'MMMM Do YYYY'
    });

 

    $.noConflict();
       loadListItems();  
 

/*$("#min, #max").datepicker({ 
		dateFormat: 'dd M, yy',
		changeMonth: true,
		changeYear: true,
		DateMin: "-0Y", 
		DateMax: "+10Y",
		yearRange: "1900:2100"  

})*/

/*sb start*/

   var fromDateCh;
    $("#min").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function (dateText) {
                var fromDate = $(this).val();
                fromDateCh = moment.utc(fromDate).format('DD/MM/YYYY')
                
                log(fromDateCh);
                
            }
    });
    
   
    $("#max").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function (dateText) {
                var date2 = $(this).val();
                var toDateCh = moment.utc(date2).format('DD/MM/YYYY')
                //log(fromDate)
                var siteurl = "https://infornt.sharepoint.com/sites/RNTENG";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPSurvey')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby = Created desc";
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
            var res = data.d.results;
              log(data)
              //log(fromDate)
              //log(date2)
              
              
              //var frmdt = new Date(fromDate);
              var filterData = [];
              
              for(var k=0;k<res.length;k++){
                  var eventDt = res[k].SurveyStartDate;
                   var Edate = moment.utc(eventDt).format('DD/MM/YYYY')
                   //var newEdate = new Date(Edate);
                   log(Edate)
                    //log(newEdate)
                   //log(fromDate == Edate)
                  if(Edate >= fromDateCh && Edate <= toDateCh){
                      //alert('date matched');
                      filterData.push(res[k]);
                      log(res[k]);
                      
                      
                   }/* if end*/
                   
              }/*for end*/
              successFuncFltr(filterData);
            }/*success end*/
            
            });
         }
    });
  /*sb end*/
	
	 $('.arrow-img').on("mouseover",function(e){
   $('#myImg').slideDown(1);
  });     
  $('.arrow-img').on("mouseleave",function(e){
   $('#myImg').slideUp(1);
  });  
  $('#min, #max').on('change', function () {
        table.draw();
    });
    $("#min").change(function(){
   alert("test");
   var DateMax=$("#min").val();
   var DateMin=$("#max").val();
   
   console.log(DateMax);
   console.log(DateMin);
  alert("The text has been changed.");

});

});
//$( "#min" ).datepicker( "setDate", new Date());
//$( "#max" ).datepicker( "setDate", 31);

$.fn.dataTable.ext.search.push(
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
);

function loadListItems() {

               var siteurl ="https://infornt.sharepoint.com/sites/RNTENG";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPSurvey')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby = Created desc";
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

                if(data.d.results.length > 0 )

                 { 

                  successFunction(data);                                                 
					
					var dataresults = data.d.results;
				console.log(dataresults);
				$("#AllCount").html(dataresults.length);
				for(var i =0; i< dataresults.length; i++){
				var Status = data.d.results[i].Status;
					if(Status == "Published"){
						Scheduled++;
						console.log("Scheduled"+Scheduled);
						$("#scheduled").html(Scheduled);
					}else if(Status == "Autopublish"){
						Autopublished++;
						console.log("Autopublished"+Autopublished);
						$("#autopublished").html(Autopublished);
					}else if(Status == "Draft"){
						Draft++;
						console.log("Draft"+Draft);
						$("#Draft").html(Draft);
					}else if(Status == "Completed"){
						Feedback++;
						console.log("Feedback"+Feedback);
						$("#Completed").html(Draft);
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

var siteurl ="https://infornt.sharepoint.com/sites/RNTENG";

        try {

                 dataTableExample = $('#dataTable2').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }



                dataTableExample = $('#dataTable2').DataTable({    
                		scrollY: '70vh',

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

                       {"mData": "ID"},

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
									var Autodate = moment.utc(row.AutopublishDate).format('DD MMM, YYYY hh:mm a');
									var Status = row.Status;
								if(Status == "Autopublish"){
									return '<span id="event-pillar" class="'+row.Status+'">'+row.Status +"<br>"+Autodate+'</span>';
								}else{
									return '<span id="event-pillar" class="'+row.Status+'">'+row.Status+'</span>';
								}
								}
						},

						
						//{"mData": ""},
						
						{
			              	"render": function(data, type, row, meta ) {          
			              			var StatusColumn =  row.Status;
			              			if(StatusColumn == "Published"){
			              				return '<div id="temp" onclick="showimg(this)"><img id="threedot"  src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/threedot.png" style="width:40px;"><div id="editbox"><a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/edit_survey.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a><a class="ms-4"><i class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></a></div></div>';
			              			}else if(StatusColumn == "Draft"){
			              				return '<div id="temp" onclick="showimg(this)"><img id="threedot"  src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/threedot.png" style="width:40px;"><div id="editbox"><a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/edit_survey.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a>+<a class="ms-4"><i class="fa fa-trash" style="color:black;margin: 0px 6px 0px -11px" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></i></a></div></div>';
			              			}
							//return '<a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/edit_survey.aspx?SurveyID='+row.ID+'"><i class="fa fa-pencil" id="editbtn"></i></a><i class="fa fa-trash" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/>'; }
							return '<div id="temp" onclick="showimg(this)"><img id="threedot"  src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/threedot.png" style="width:40px;"><div id="editbox"><a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/edit_survey.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a>+<a class="ms-4"><i class="fa fa-trash" style="color:black;margin: 0px 6px 0px -11px" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></div></div>';
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
    openDialog("https://infornt.sharepoint.com/sites/RNTENG/Lists/TeamsNotificationList/NewForm.aspx?EventID="+id);    
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

var siteurl ="https://infornt.sharepoint.com/sites/RNTENG";

        try {

                 dataTableExample = $('#dataTable2').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }



                dataTableExample = $('#dataTable2').DataTable({    
                		scrollY: '70vh',

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

                       {"mData": "ID"},

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
									var Autodate = moment.utc(row.AutopublishDate).format('DD MMM, YYYY hh:mm a');
									var Status = row.Status;
								if(Status == "Autopublish"){
									return '<span id="event-pillar" class="'+row.Status+'">'+row.Status +"<br>"+Autodate+'</span>';
								}else{
									return '<span id="event-pillar" class="'+row.Status+'">'+row.Status+'</span>';
								}
								}
						},

						
						//{"mData": ""},
						
						{
			              	"render": function(data, type, row, meta ) {          
			              			var StatusColumn =  row.Status;
			              			if(StatusColumn == "Published"){
			              				return '<div id="temp" onclick="showimg(this)"><img id="threedot"  src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/threedot.png" style="width:40px;"><div id="editbox"><a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/edit_survey.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a><a class="ms-4"><i class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></a></div></div>';
			              			}else if(StatusColumn == "Draft"){
			              				return '<div id="temp" onclick="showimg(this)"><img id="threedot"  src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/threedot.png" style="width:40px;"><div id="editbox"><a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/edit_survey.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a>+<a class="ms-4"><i class="fa fa-trash" style="color:black;margin: 0px 6px 0px -11px" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></i></a></div></div>';
			              			}
							//return '<a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/edit_survey.aspx?SurveyID='+row.ID+'"><i class="fa fa-pencil" id="editbtn"></i></a><i class="fa fa-trash" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/>'; }
							return '<div id="temp" onclick="showimg(this)"><img id="threedot"  src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/threedot.png" style="width:40px;"><div id="editbox"><a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/edit_survey.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a>+<a class="ms-4"><i class="fa fa-trash" style="color:black;margin: 0px 6px 0px -11px" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></div></div>';
							//return '<span class="Eventaction" id="action" onmouseover="action();" onmouseout="actionback()"><img src="https://infornt.sharepoint.com/SiteAssets/Admin/New_Folder/Admin_Main Images/Group 3112 (1).png" style="width:6px; height:20px;"></span><div class="actionDIv"></div>'; 
							}

			            }
                     ]

                });

            }

            catch (e) { 

        alert(e.message); 

    }

}

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
                alert("Item Deleted " +myID);  
                location.reload();
            },  
            error: function(data) {  
                alert("failed");  
            }  
        });  
     
} 










//$("#createSurvey").on("click", function(){
 //location.href = "https://infornt.sharepoint.com/SitePages/ENG_Admin/Admin_Createsurveyform.aspx";
 
 //}
 
function showimg(x) {
  var x = x.querySelector('#editbox');
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

 
 
 

