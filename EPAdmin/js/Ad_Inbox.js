$(document).ready(function() {
       
       $.noConflict();
       loadListItems();   
         
});


function loadListItems() {

               var siteurl = "https://infornt.sharepoint.com/sites/RNTENG";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPContactUs')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby = Created desc";
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

                var dataTableExample = $('#datatable3').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }



                dataTableExample = $('#datatable3').DataTable({ 
                
					language: {
                    search: "",
                    searchPlaceholder: "Search",
                    lengthMenu: "Show _MENU_ Entries"
                },


			 scrollY: '500px',
       		 scrollCollapse: true,
                      

                    pagingType:'full_numbers',

                    autoWidth: true,

                    deferRender:true,                       

                    lengthMenu: [10,50,100, 200, 500],                       

                    "aaData": data.d.results,

                        "aoColumns": [                      

                        {"mData": "ID"},

                         {
			                  "render": function(data, type, row, meta ) {              
			                  return '<h7 id="event-pillar" class="'+row.EmpName+'">'+row.EmpName+'</h7></br><h6 class="event-desc" style="font-size:14px !important;font-weight: 300 !important;">'+row.EmpEmailID+'</h6>'; }
			              },
                        
                        {"mData": "Category"},
                        
                        {"mData": "Message"},
                        
  						 {"mData": "Created",

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
                     ]

                });

            }

            catch (e) { 

        //alert(e.message); 

    }

}
/*
$(document).ready(function () {
    $('#example').DataTable({
"language": {
        "search": "",
        "searchPlaceholder": "search",
        "show": "",
       }
       

    });
});*/
 