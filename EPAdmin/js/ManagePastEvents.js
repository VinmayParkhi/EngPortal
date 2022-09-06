var minDate, maxDate;

$(document).ready(function() {
   
   
   minDate = new DateTime($('#min'), {
        format: 'MMMM Do YYYY'
    });
    maxDate = new DateTime($('#max'), {
        format: 'MMMM Do YYYY'
    });
    
       $.noConflict();
       loadListItems();   
       
       
        $('#min, #max').on('change', function () {
        table.draw();
    });
    
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

                var dataTableExample = $('#dataTable6').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }
                
 



                dataTableExample = $('#dataTable6').DataTable({  
                                     
					language: {
                    search: "",
                    searchPlaceholder: "Search",
                    lengthMenu: "Show _MENU_ Entries"
                },

                    pagingType:'full_numbers',

                    autoWidth: true,
					                    deferRender:true,                       

                    lengthMenu: [10,50,100, 200, 500],                       

                    "aaData": data.d.results,

                        "aoColumns": [                      

                        {"mData": "ID"},

                        //{"mData": "Title"}, 
                        
                        {
							"render": function(data, type, row, meta ) {              
							return '<h7 id="event-pillar" class="'+row.Pillar+'">'+row.Pillar+'</h7></br><h6 class="event-desc" style="font-size:14px !important;font-weight: 400 !important;height:2% !important;">'+row.Title+'</h6>'; }
						},

                        
  						 {"mData": "EventDate",

                            "render": function(data) {
                                     var date = new Date(data);
                                     var month = date.getMonth()+1;
                                     var text = date.toString();
                                     const myArray = text.split(" ");
                                     var mnt = myArray[1];
                                     var time = myArray[4];
                                     return date.getDate()+" "+mnt + "," + date.getFullYear()+" "+time ;
                                    //return date.getDate()+" "+(month.toString().length > 1 ? month : "0" + month)+ "," + date.getFullYear();
                                }

                        },
          
						{"mData": "Status"},
						
						{
													
							"render": function(data, type, row, meta ) {              
							return '<span class="Eventaction" id="action" onmouseover="action();" onmouseout="actionback()"><img src="https://infornt.sharepoint.com/SiteAssets/Admin/New_Folder/Admin_Main Images/Group 3112 (1).png" style="width:6px; height:20px; margin-left:70%"></span><div class="actionDIv"></div>'; }
						},
                     ]

                });

            }

            catch (e) { 

        alert(e.message); 

    }

}

//$("#createSurvey").on("click", function(){
 //location.href = "https://infornt.sharepoint.com/SitePages/ENG_Admin/Admin_Create_Survey.aspx";
 
 //}

