var minDate, maxDate;

$(document).ready(function() {
   
      
       $.noConflict();
       GetEventReport();   
       
       
           
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


function GetEventReport() {
				//alert("function run");
               //var siteurl = "https://infornt.sharepoint.com/sites/RNTENG";

                  //var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby = Created desc";
                  var url = "https://prod-07.centralindia.logic.azure.com:443/workflows/58a615e39c4b4e8784ba5286e235e28f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UfzKrGSMN-Tzk7NLxUzJXL7wDfM-OLfoI5fvb_LC6-Y";
               console.log(url);  
               console.log("///////////////////////////"+url);
      

     $.ajax({
            url: url,

            type: "POST",

            dataType: "json",

            headers: {

                    "accept": "application/json;odata=verbose"

            },

            success: function (data) {
            alert("test");
            for(i =0; i<data.length; i++){
	            var arr = data[i].split('\n');
	            console.log(arr);
	            
            }
            //var arr = data.split('\n');
            //console.log(arr);
            console.log("///////////////////////////"+data.length);
			
                if(data.length > 0 )

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

                var dataTableExample = $('#EventReportTable').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }

                dataTableExample = $('#EventReportTable').DataTable({  
                     dom: 'Bfrtip',        
                     buttons: [ 'excel'],             
					language: {
                    search: "",
                    searchPlaceholder: "Search",
                    lengthMenu: "Show _MENU_ Entries"
                },

                    pagingType:'full_numbers',

                    autoWidth: true,
					                    deferRender:true,                       

                    lengthMenu: [10,50,100, 200, 500],                       

                    "aaData": data,

                        "aoColumns": [                      

                        {
                        
							"render": function(data, type, row, meta ) {        							
							return '<h7 id="event-pillar" class="'+row.split("\n")[1]+'">'+row.split("\n")[1]+'</h7></br><h6 class="event-desc" style="font-size:14px !important;font-weight: 400 !important;height:2% !important;">'+data[0].split('\n')[0]+'</h6>'; }
						
                        },

                       //{"mData": "Title"}, 
                        
                        {
							"render": function(data, type, row, meta ) {        							
							return '<p id="event-pillar" class="'+row.split("\n")[2]+'">'+row.split("\n")[2]+'</p></br><h6 class="event-desc" style="font-size:14px !important;font-weight: 400 !important;height:2% !important;">'+row.split("\n")[3]+'</h6>'; }
						},

                        
  						 {"mData": "Location",

                            /*"render": function(data) {
                                     var date = new Date(data);
                                     var month = date.getMonth()+1;
                                     var text = date.toString();
                                     const myArray = text.split(" ");
                                     var mnt = myArray[1];
                                     var time = myArray[4];
                                     return date.getDate()+" "+mnt + "," + date.getFullYear()+" "+time ;
                                    //return date.getDate()+" "+(month.toString().length > 1 ? month : "0" + month)+ "," + date.getFullYear();
                                }*/

                        },
          
						{"mData": "Department"},
												
						 {
							"render": function(data, type, row, meta ) {      
						   	return '<span><img src= "../../SiteAssets/ENG-Admin/images/Group 3265.svg" alt="not available" style="margin:0px 5px; width:10%;">'+row.split("\n")[4]+'<span> - <span><img src= "../../SiteAssets/ENG-Admin/images/Icon ionic-md-sad.svg" alt="not available" style="margin:0px 5px; width:10%;">'+row.split("\n")[5]+'<span> - <span><img src= "../../SiteAssets/ENG-Admin/images/Group 3266.svg" alt="not available" style="margin:0px 5px; width:10%;">'+row.split("\n")[6]+'<span>';      
						  }   
						},  
						
						{
							"render": function(data, type, row, meta ) {    
							var averageRating = row.split("\n")[7];
							//alert(Number(averageRating).toFixed(1));
						   	return '<span><img src= "../../SiteAssets/ENG-Admin/images/Group 3265.svg" alt="not available" style="margin:0px 5px; width:10%;">'+Number(averageRating).toFixed(1)+'<span> - <span><img src= "../../SiteAssets/ENG-Admin/images/Icon ionic-md-sad.svg" alt="not available" style="margin:0px 5px; width:10%;">'+row.split("\n")[8]+'<span>';      
						  }   
						},  
						//{"mData": "Reviews"},
							
						{"mData": "EventDate",

                            "render": function(data, type, row, meta) {
                            		var EdDate = row.split("\n")[9];
                            		console.log(EdDate)
                                     var date = new Date(EdDate);
                                     var month = date.getMonth()+1;
                                     var text = date.toString();
                                     const myArray = text.split(" ");
                                     var mnt = myArray[1];
                                     var time = myArray[4];
                                     return date.getDate()+" "+mnt + "," + date.getFullYear()+" "+time ;
                                    
                                }

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

