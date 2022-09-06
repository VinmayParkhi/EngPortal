var minDate, maxDate;
var dataTableExample;
$(document).ready(function() {
   
 

    $.noConflict();
       loadListItems();  


    $('#from-date, #to-date').datepicker({ 
		dateFormat: 'dd M, yy',
		changeMonth: true,
		changeYear: true,
		minDate: "-0Y", 
		maxDate: "+10Y",
		yearRange: "1900:2100"  
	
	});
});

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

                 }         

               },

            error: errorFunction

               });      

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
                
		language: {
                    search: "",
                    searchPlaceholder: "Search"
           	     },

                    pagingType:'full_numbers',

                    autoWidth: true,

                    deferRender:true,                       

                    lengthMenu: [10,50,100, 200, 500],                       

                    "aaData": data.d.results,

                        "aoColumns": [                      

                       {"mData": "ID"},

                        {
							"render": function(data, type, row, meta ) {              
							return '<p id="EventDesc">'+row.SurveyDescreption+'</p>'; }
						},

  					  	{"mData": "SurveyStartDate",

                            "render": function(data) {
                                     var date = new Date(data);
                                     var month = date.getMonth()+1;
                                     var text = date.toString();
                                     const myArray = text.split(" ");
                                     var mnt = myArray[1];
                                     var time = myArray[4];
                                     return date.getDate()+" "+mnt + "," + date.getFullYear()+" "+time ;
                                    
                                }

                        },
     
						
						{"mData": "SurveyEndDate"}, 
          
						{"mData": "Responses"},
						{"mData": "Status"},
						
						//{"mData": ""},
						
						{
			              	"render": function(data, type, row, meta ) {              
							//return '<a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/edit_survey.aspx?SurveyID='+row.ID+'"><i class="fa fa-pencil" id="editbtn"></i></a><i class="fa fa-trash" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/>'; }
							return '<div id="temp" onclick="showimg(this)"><img id="threedot"  src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/edit_survey.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a>+<a class="ms-4"><i class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></a></div></div>';
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
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + myID  + ")",  
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

 
 
 

