var minDate, maxDate;

var getPillar;
var rowId;
$(document).ready(function() {
   
    
   // $.noConflict();
       loadListItems();   
		  /* minDate = new DateTime($('#min'), {
        format: 'MMMM Do YYYY'
        
    });
    maxDate = new DateTime($('#max'), {
        format: 'MMMM Do YYYY'
    });

       
        $('#min, #max').on('change', function() {
        table.draw();
    });*/
 });
    
    $("#min, #max").datepicker({ 
dateFormat: 'dd M, yy',
changeMonth: true,
changeYear: true,
minDate: "-0Y", 
maxDate: "+10Y",
yearRange: "1900:2100"  

});

$( "#min" ).datepicker( "setDate", new Date());
$( "#max" ).datepicker( "setDate", 31);

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
);
*/
function loadListItems() {

               var siteurl = "https://infornt.sharepoint.com/sites/RNTENG";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby = Created desc";
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

 $('#datatable').DataTable({

                
            })

      


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

                var dataTableExample = $('#datatable').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }



                dataTableExample = $('#datatable').DataTable({   
              language: {
                    search: "",
                    searchPlaceholder: "Search"
                },

                 
				scrollY: '500px',
        scrollCollapse: true,
                    

                    pagingType:'full_numbers',

                    autoWidth: true,

                    deferRender:true,                       

                    lengthMenu: [10,25, 50,100, 200, 500],                       

                    "aaData": data.d.results,

                        "aoColumns": [                      

                        {"mData": "ID"},
                        
                        {
							"render": function(data, type, row, meta ) {              
							return '<h7 id="event-pillar" class="'+row.Pillar+'">'+row.Pillar+'</h7></br><h6 class="event-desc" style="font-size:14px !important;font-weight: 600 !important; height:2%">'+row.Title+'</h6>'; }
						},

                        
                       // {"mData": "Pillar"},

                       // {"mData": "EventDescription"}, 
                        
  						 {"mData": "EventStartTime",

                            "render": function(data) {
                                     var date = new Date(data);
                                     var month = date.getMonth()+1;
                                    var time = date.toLocaleTimeString();
									//time.toUTCString();
                                    return date.getDate()+"/"+(month.toString().length > 1 ? month : "0" + month)+ "/" + date.getFullYear() +"  "+ time;
                                }

                        },
                        {
						    "render": function(data, type, row, meta ) {  
						    
						    var ExcitedMooddata = row.Response1;
						    var BoringMooddata = row.Response2;						    
						    var FrustretedMooddata = row.Response3;
						    if ( ExcitedMooddata  == null ){
						   		//alert("test");
						   		ExcitedMooddata = "0";
							  // some_variable is either null or undefined
							} 
							if ( BoringMooddata == null ){
						   		//alert("test");
						   		BoringMooddata = "0";
							  // some_variable is either null or undefined
							} 
							if ( FrustretedMooddata == null ){
						   		//alert("test");
						   		FrustretedMooddata = "0";
							  // some_variable is either null or undefined
							}
							return '<span><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/Group 3265.svg" alt="not available" style="margin:0px 5px; width:10%;">'+ExcitedMooddata+'<span><span><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/Icon ionic-md-sad.svg" alt="not available" style="margin:0px 5px; width:10%;">'+BoringMooddata+'<span><span><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/Group 3266.svg" alt="not available" style="margin:0px 5px; width:10%;">'+FrustretedMooddata+'<span>';      
							}   
						    //return '<h7 id="event-pillar" class="'+row.Pillar+'">'+row.Pillar+'</h7></br><h6 class="event-desc" style="font-size:11px !important;font-weight: 300 !important;">'+row.EventDescription+'</h6>'; }
						},  
     
						
						{"mData": "Status"}, 
          
						//{"mData": "EventSpeakerName"},
						
						
						
						{"mData": "Actions"},
						{
							/*"render": function (data, type, row, meta)
		                      {
		                          var setUrl = "https://infornt.sharepoint.com/Lists/CreateEve/EditForm.aspx?ID="+row.ID
		                          console.log(setUrl);
		                         // var result = '<a class="fa fa-pencil" onclick="PopupForm(\'' + setUrl + '\')"></a>'
		                         // var result = "<a class='fa fa-pencil' onclick='PopupForm("'https://infornt.sharepoint.com/Lists/CreateEve/EditForm.aspx?ID=11'")'></a>"
		                          return result;
		                      }*/
						
							"render": function(data, type, row, meta ) {              
							//rowId = row.ID;
						//return '<a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/edit_event.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" id="editbtn"></i></a><a class="ms-4"><i class="fa fa-trash" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></a>'; }
						return '<div id="temp" onclick="showimg(this)"><img id="threedot"  src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/edit_event.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a>+<a class="ms-4"><i class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></a></div></div>';
						//return '<span class="Eventaction" id="action" onclick="action();"><img src="https://infornt.sharepoint.com/SiteAssets/Admin/New_Folder/Admin_Main Images/Group 3112 (1).png" style="width:6px; height:20px;"></span><div class="actionDIv"></div>'; }
						//return ''; 
						}
						},
						/*{
			                mData: null,
			                className: "dt-center editor-edit",
			                //defaultContent: '<a class="fa fa-pencil" href="VM/Details/' + data + '">' + row.Activity_Id + '</a>',
			                orderable: false
			            },*/
			           						
						/*{ title: "", "defaultContent": "<button onclick='edititem();'>Edit</button>" },
             			{ title: "", "defaultContent": "<button onclick='deleteitem();'>Delete</button>" }*/
						//{"mData": "Category"},

                      
                       

                     ]

                });

            }

            catch(e) { 

        alert(e.message); 

    }
}

/*function action(){
	
	 $(".actionDIv").append("<span class='actionhover'><a href='https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/create_event.aspx?EventID="+rowId+"'><i class='fa-solid fa-pen'></i></a><i class='fa-solid fa-trash'></i><i class='fa-solid fa-rocket'></i></span>");
		//alert("test");
	   console.log("testing ok");
	   
	}
*/

function PopupForm(url) {
alert(url);
            alert("value of url " + url);
            var formDiv = $('<div/>');
            $.get(url).done(function (response) {
                formDiv.html(response);

                Popup = formDiv.dialog({
                    autoOpen: true,
                    resizable: false,
                    title: 'fill details',
                    height: 500,
                    width: 700,
                    close: function () {
                        Popup.dialog('destroy').remove();
                    }
                });
            });
        }
        
        
        
        
        $("#editbtn").on("click",function(){
        
        getPillar= $(this).parent(tr).find("#event-pillar").text();
        alert("pillar:-",getPillar);
        });
 /*********************************************************************************************/
    
var listName = "EPEvent";   
  
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
            },  
            error: function(data) {  
                alert("failed");  
            }  
        });  
     
} 





/***********************************************************************************/
/*$(".action").on("click", function(){
 

  //function() {
	alert('hover succes');
   // $( this ).append( $( "<span class='actionhover' style='background-color:red;'><a  href=' '><i class='fa-solid fa-pen'></i></a><i class='fa-solid fa-trash'></i><i class='fa-solid fa-rocket'></i></span>" ) );

  //}, function() {

  //  $( this ).find( ".actionhover" ).last().remove();

  //}

});*/


function showimg(x) {
  var x = x.querySelector('#editbox');
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}



