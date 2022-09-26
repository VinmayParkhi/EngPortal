var Surveys = 0;
var AppIssues = 0;
var Feedback = 0;
var Hub = 0;
var Events = 0;
var Others = 0;
var log = console.log;
var dataresults;
$(document).ready(function() {
       
       DateMin = new DateTime($('#min'), {
        format: 'MMMM Do YYYY'
    });
    DateMax = new DateTime($('#max'), {
        format: 'MMMM Do YYYY'
    });
    

       $.noConflict();
       loadListItems(); 
       PopUpValue();
      var table = $('#datatable3').DataTable();
      $('#datatable3 tbody').on('click', 'tr', function () {
      //alert("test");
      $('#datatable3').DataTable().clear().destroy();
			var id = $(this).find("h3").text();
			var Status = $(this).find("h4").text();
			if(Status == "Unread"){
				UpdateNotification(id);
				loadListItems();
			}
      });  
      $("#min, #max").datepicker({ 
		dateFormat: 'dd M, yy',
		changeMonth: true,
		changeYear: true,
		DateMin: "-0Y", 
		DateMax: "+10Y",
		yearRange: "1900:2100"  

})

      
    $('#arrimg').on("mouseover",function(e){
   $('#myImg').slideDown(1);
  });     
  $('#arrimg').on("mouseleave",function(e){
   $('#myImg').slideUp(1);
  });
  
/*sb start*/

   var fromDateCh;
    $("#from-date").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function (dateText) {
                var fromDate = $(this).val();
                fromDateCh = moment.utc(fromDate).format('DD/MM/YYYY')
                
                log(fromDateCh);
                
            }
    });
    
   
    $("#to-date").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function (dateText) {
                var date2 = $(this).val();
                var toDateCh = moment.utc(date2).format('DD/MM/YYYY')
                //log(fromDate)
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
            var res = data.d.results;
              log(data)
              //log(fromDate)
              //log(date2)
              
              
              //var frmdt = new Date(fromDate);
              var filterData = [];
              
              for(var k=0;k<res.length;k++){
                  var eventDt = res[k].Created;
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




     
  $('#min, #max').on('change', function () {
        table.draw();
    });
    $("#min").change(function(){
   alert("test");
   var DateMax=$("#mix").val();
   var DateMin=$("#min").val();
   
   console.log(DateMax);
   console.log(DateMin);
  alert("The text has been changed.");

});

});
$( "#min" ).datepicker( "setDate", new Date());
$( "#max" ).datepicker( "setDate", 31);




function UpdateNotification(id){
  	var Status = "Read";  	
  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPContactUsListItem'},
  	 	"Status":Status		
  	};
  	$.ajax({
		url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPContactUs')/items("+id+")",
		method: "POST",
		contentType: "application/json; odata=verbose",
		data:JSON.stringify(item),
		headers: {
			"Accept": "application/json; odata=verbose",
			"X-RequestDigest":$("#__REQUESTDIGEST").val(),
			"IF-MATCH":"*",
			"X-HTTP-Method":"MERGE",
			
		},
		success:OnSuccess,
		error:OnError
	});
	function OnSuccess(data){
	 	Notification();
		//alert(id+"Updated Successfully");
	}

    function OnError(data){
		alert("Update error");
	}
  };



function Notification() {

	var siteurl = "https://infornt.sharepoint.com/sites/RNTENG";
	
	var url = siteurl+ "/_api/web/lists/getbytitle('EPContactUs')/items?&$top=5000&$select=*&$filter= Status eq 'Unread'&$orderby=Status desc";
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


function PopUpValue() {

	var siteurl = "https://infornt.sharepoint.com/sites/RNTENG";
	
	var url = siteurl+ "/_api/web/lists/getbytitle('EPContactUs')/items?&$top=5000&$select=*&$orderby=Created asc";
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
				$("#AllCounts").html(dataresults.length);
				for(var i =0; i< dataresults.length; i++){
				var Category = data.d.results[i].Category;
					if(Category == "Surveys"){
						Surveys++;
						console.log("Surveys"+Surveys);
						$("#SurveysCount").html(Surveys);
					}else if(Category  == "Hub"){
						Hub++;
						console.log("Hub"+Hub);
						$("#Hubcount").html(Hub);
					}else if(Category  == "Application Issues"){
						AppIssues++;
						console.log("AppIssues"+AppIssues);
						$("#issuecount").html(AppIssues);
					}else if(Category  == "Feedback"){
						Feedback++;
						console.log("Feedback"+Feedback);
						$("#feedcount").html(Feedback);
					}else if(Category  == "Events"){
						Events++;
						console.log("Events"+Events);
						$("#Eventscount").html(Events);
					}else{
						Others++;
						console.log("Others"+Others);
						$("#otherscount").html(Others);
						
					}
				//var Status;
				}				
             },

            //error: errorFunction

	});      

}




function loadListItems() {

               var siteurl = "https://infornt.sharepoint.com/sites/RNTENG";
               

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPContactUs')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby=Created desc";
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
            		dataresults = data.d.results.length;

                if(data.d.results.length > 0 )
						console.log(i);
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



//console.log(data);

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
                
                columnDefs: [
		            {
		                target: 5,
		                visible: true,
		            },
		        ],
                
                rowCallback: function(row, data, index){
				  	if(data[6]== "Unread"){
				  	//alert("test");
				    	$(row).find('td:nth-child(6)').css('color', 'red');
				    }				
				},
				
									 scrollY: '70vh',
		       		 scrollCollapse: true,
                      

                    pagingType:'simple_numbers',

                    autoWidth: true,
                    
                  

                    deferRender:true,                       

                    lengthMenu: [10,50,100, 200, 500],                       

                    "aaData": data.d.results,

                        "aoColumns": [                      

                        {
                        
                        "render": function(data, type, row, meta ) {   
                        		return '<h3 id="mainId" class="'+row.ID+'">'+row.ID+'</h3>'; 
			               			                 	
			                  }

                        },

                         {
			                  "render": function(data, type, row, meta ) {              
			                  return '<h7 id="event-pillar" class="'+row.EmpName+'">'+row.EmpName+'</h7></br><h6 class="event-desc" style="font-size:11px !important;font-weight: 300 !important;">'+row.EmpEmailID+'</h6>'; }
			              },
                        
                        {"mData": "Category"},
                        
                        {"mData": "Message"},
                        
  						 {"mData": "Created",

                            "render": function(data) {
                                     var date = new Date(data);
                                     date = moment(date).calendar();
                                     /*var month = date.getMonth()+1;
                                     var text = date.toString();
                                     const myArray = text.split(" ");
                                     var mnt = myArray[1];
                                     var time = myArray[4];*/
                                     return date;
                                    //return date.getDate()+" "+(month.toString().length > 1 ? month : "0" + month)+ "," + date.getFullYear();
                                }

                        },
                        {
                        "render": function(data, type, row, meta ) {              
			                  return '<h4 id="mainId" class="'+row.Status+'">'+row.Status+'</h4>'; }
}
                     ]

                });

            }

            catch (e) { 

        //alert(e.message); 

    }

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
                
                columnDefs: [
		            {
		                target: 5,
		                visible: true,
		               
		            },
		           {
        				"targets": 2,
        				"className": "text-right",
   					},
		            {
        				"targets": 3,
        				"className": "text-right",

   					},
   					
   					
		            {
        				"targets": 4,
        				"className": "text-right",
   					}
   				

		            
		        ],
                
                rowCallback: function(row, data, index){
				  	if(data[6]== "Unread"){
				  	//alert("test");
				    	$(row).find('td:nth-child(6)').css('color', 'red');
				    }				
				},

					 scrollY: '70vh',
		       		 scrollCollapse: true,
                      

                    pagingType:'simple_numbers',

                    autoWidth: true,
                    
                  

                    deferRender:true,                       

                    lengthMenu: [10,50,100, 200, 500],                       

                    "aaData": fltrData,

                        "aoColumns": [                      

                        {
                        
                        "render": function(data, type, row, meta ) {              
			                  return '<h3 id="mainId" class="'+row.ID+'">'+row.ID+'</h3>'; }

                        },

                         {
			                  "render": function(data, type, row, meta ) {              
			                  return '<h7 id="event-pillar" class="'+row.EmpName+'">'+row.EmpName+'</h7></br><h6 class="event-desc" style="font-size:14px !important;font-weight: 300 !important;">'+row.EmpEmailID+'</h6>'; }
			              },
                        
                        {"mData": "Category"},
                        
                        {"mData": "Message"},
                        
  						 {"mData": "Created",

                            "render": function(data) {
                                     var date = new Date(data);
                                     date = moment(date).calendar();
                                     /*var month = date.getMonth()+1;
                                     var text = date.toString();
                                     const myArray = text.split(" ");
                                     var mnt = myArray[1];
                                     var time = myArray[4];*/
                                     return date;
                                    //return date.getDate()+" "+(month.toString().length > 1 ? month : "0" + month)+ "," + date.getFullYear();
                                }

                        },
                        {
                        "render": function(data, type, row, meta ) {              
			                  return '<h4 id="mainId" class="'+row.Status+'">'+row.Status+'</h4>'; }
}
                     ]

                });

            }

            catch (e) { 

        //alert(e.message); 

    }

}/*sb end*/



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