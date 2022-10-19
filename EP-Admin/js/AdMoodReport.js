var minDate, maxDate;
var dept, location, evId;
var CheckedHub;
var CheckedLoc;
var log = console.log;
var siteurl = "https://amdocs.sharepoint.com/sites/EP";


$(document).ready(function() {

$("#MoodDataTable_wrapper > div.dt-buttons > a > span").html("Download");
/* sb start date filter */

   var fromDateChString;
   var toDateChString;
   var fromDateCh;
   var toDateCh;
   //var dateString = "";
   //var toDateString = "";
   
    $("#from-date").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function () {
                var fromDate = $(this).val();
                fromDateCh = moment.utc(fromDate).format('YYYY-MM-DD');
                fromDateChString = "'"+fromDateCh+"T00:00:00Z'";
                
                if(toDateChString === undefined){
                
                var fromDate = "Created ge " + "'"+fromDateCh+"T00:00:00Z'"
                   $.ajax({

            url: siteurl+ "/_api/web/lists/getbytitle('EPMoodMeter')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter= "+fromDate+"&$orderby=ID desc&$groupby=Mood dist",

            type: "GET",

            dataType: "json",

            headers: {

                    "accept": "application/json;odata=verbose"

            },

            success: function (data) {

                if(data.d.results.length > 0 ){                  
                 
                 console.log(data);
               			
                  successFunctionReports(data);                                                 

                 }
                   
                }
                });
              }else if(toDateChString !== undefined){
              
              var fromDate = "Created ge " + "'"+fromDateCh+"T00:00:00Z'" + " and Created le " + "'"+toDateCh+"T24:00:00Z'";

                   $.ajax({

            url: siteurl+ "/_api/web/lists/getbytitle('EPMoodMeter')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter= "+fromDate+"&$orderby=ID desc&$groupby=Mood dist",

            type: "GET",

            dataType: "json",

            headers: {

                    "accept": "application/json;odata=verbose"

            },

            success: function (data) {

                if(data.d.results.length > 0 ){                  
                 
                 console.log(data);
               			
                  successFunctionReports(data);                                                 

                 }
                   
                }
                });

              
              }
                //fromDateString += "Created ge " + "'"+fromDateCh+"T00:00:00Z'" + " and Created le " + "'"+toDateCh+"T00:00:00Z'";
	            //log(fromDateString)
          }
    })
  
   
    $("#to-date").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function (dateText) {
                var date2 = $(this).val();
                toDateCh = moment.utc(date2).format('YYYY-MM-DD')   
                toDateChString =  "'"+toDateCh+"T00:00:00Z'";
                //fromDateString += "Created ge " + "'"+fromDateCh+"T00:00:00Z'" + " and Created le " + "'"+toDateCh+"T00:00:00Z'";
	          //log(fromDateString)
	          
	          if(fromDateChString === undefined){
                
                var toDate = "Created le " + "'"+toDateCh+"T00:00:00Z'"
                   $.ajax({

            url: siteurl+ "/_api/web/lists/getbytitle('EPMoodMeter')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter= "+toDate+"&$orderby=ID desc&$groupby=Mood dist",

            type: "GET",

            dataType: "json",

            headers: {

                    "accept": "application/json;odata=verbose"

            },

            success: function (data) {

                if(data.d.results.length > 0 ){                  
                 
                 console.log(data);
               			
                  successFunctionReports(data);                                                 

                 }
                   
                }
                });
              }else if(fromDateChString !== undefined){
              
              var toDate = "Created ge " + "'"+fromDateCh+"T00:00:00Z'" + " and Created le " + "'"+toDateCh+"T24:00:00Z'";

                   $.ajax({

            url: siteurl+ "/_api/web/lists/getbytitle('EPMoodMeter')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter= "+toDate+"&$orderby=ID desc&$groupby=Mood dist",

            type: "GET",

            dataType: "json",

            headers: {

                    "accept": "application/json;odata=verbose"

            },

            success: function (data) {

                if(data.d.results.length > 0 ){                  
                 
                 console.log(data);
               			
                  successFunctionReports(data);                                                 

                 }
                   
                }
                });
              }
         }
    });
    
    $("#from-date, #to-date").on('keyup',function(){
       var val = $(this).val();
      // log(val);
       if(val.length === 0){
        $("#from-date, #to-date").on('keyup',function(){
        var val = $(this).val();
       //log(val);
        if(val.length === 0){
        //alert('empty')
        var url = siteurl+ "/_api/web/lists/getbytitle('EPMoodMeter')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby=ID desc&$groupby=Mood dist";

        GetEventReport(url)
        }
        });
       }
    });
 /*end date filter */ 

 
 


		var url1 = siteurl+ "/_api/web/lists/getbytitle('EPMoodMeter')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter= MoodFlag eq 'Unread'&$orderby=ID desc";
 $('input[name="Location"],input[name="Department"],#ui-datepicker-div').on('change', function() {
            //Create an Array.
           // var selectedHub = new Array();
            var selectedLoc = new Array();
            var selectedDept = new Array();
            //Reference the Table.
           // var HubSet = "";
               var LocSet = "";
            var DeptSet = "";
           // var chksHub = document.getElementsByName("Hub");
            var chksLoc = document.getElementsByName("Location");            
            var chksDept = document.getElementsByName("Department");
            
            for (var i = 0; i < chksLoc.length; i++) {
                if (chksLoc[i].checked) {
                    selectedLoc.push(chksLoc[i].value);
                    LocSet += "EmpLocation eq "+"'"+chksLoc[i].value+"' or ";
                }
            }
            for (var i = 0; i < chksDept.length; i++) {
                if (chksDept[i].checked) {
                    selectedDept.push(chksDept[i].value);
                    DeptSet += "EmpDepartment eq "+"'"+chksDept[i].value+"' or ";
                }
            }
            var locationsselected =LocSet;
            var lastIndexLoc = locationsselected.lastIndexOf(" or");
            locationsselected = locationsselected.substring(0, lastIndexLoc);
            
            var departmentselected =DeptSet;
            var lastIndexDept = departmentselected.lastIndexOf(" or");
            departmentselected = departmentselected.substring(0, lastIndexDept);
            
            var finalselection = "";
           /* if(hubsselected != ""){
                finalselection = "("+hubsselected+") ";
            }*/
            if(locationsselected != ""){
                	finalselection += "("+locationsselected+") ";
            }
            
            if(departmentselected != ""){
            	if(locationsselected != ""){
                	finalselection += " and ("+departmentselected+") ";
                }else{
                	finalselection += "("+departmentselected+") ";
                }
            }
            
            if(fromDateChString !== undefined && toDateChString !== undefined ){
                finalselection += " and Created ge ("+fromDateChString+") and Created le ("+toDateChString+") ";

            }else if(fromDateChString !== undefined && toDateChString === undefined ){
                finalselection += " and Created ge ("+fromDateChString+") ";

            }else if(toDateChString !== undefined && fromDateChString === undefined){
                finalselection += " and Created le ("+toDateChString+") ";

            }

            
            alert("Final Selected Elements : "+finalselection);
                               
            var url = siteurl+ "/_api/web/lists/getbytitle('EPMoodMeter')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter= (MoodFlag eq 'Read') and "+finalselection+"&$orderby=ID desc&$groupby=Mood dist";
               //alert("Final URL : "+url)
               GetEventReport(url);       
                     
  	});
  	
       $.noConflict();
       GetEventReport(url1);   
  		console.log("URL : "+ url1)
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
	

function GetEventReport(url) {
				//alert("function run");
               var siteurl = "https://amdocs.sharepoint.com/sites/EP";
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
                 
                 
                 
                 console.log(data);
               
					
                  successFunctionReports(data);                                                 

                 } else{
                 	$(".dataTables_empty").addClass("d-block");
                 	$('#MoodDataTable').DataTable().clear().draw();
				}        

               },

            error: errorFunction

               });      

}



function errorFunction(data){
console.log(data);
}

var expanded = false;

function successFunctionReports(data) {

               var today1 = new Date();

               var dd1 = String(today1. getDate()). padStart(2, '0');

               var mm1 = String(today1. getMonth() + 1). padStart(2, '0'); //January is 0!

               var yyyy1 = today1. getFullYear();                                           

               var time = today1.getHours() + "_" + today1.getMinutes() + "_" + today1.getSeconds();

               today1 = dd1 + '_' + mm1 + '_' + yyyy1 + '_' +time;



console.log(data);

var moodMeterReportMap = new Map();
var uniqueResults = [];
var existCount = 0;
for(var i = 0; i < data.d.results.length; i++) {
	var v = data.d.results[i];
	var key = v.Mood + "___" + v.EmpLocation + "___" + v.EmpDepartment;

	if(moodMeterReportMap[key] == undefined){
		v.count = 1;
		moodMeterReportMap[key] = v;
		//console.log("existCount : "+existCount+" DataKey : "+key );
	}else{
		let existData = null;
		existData = moodMeterReportMap[key];
		existData.count = existData.count + 1;
		moodMeterReportMap[key] = existData;
	}

}

for(var k in moodMeterReportMap) {
	uniqueResults.push(moodMeterReportMap[k]);
}
data.d.results = uniqueResults;

	console.log("uniqueResults : "+uniqueResults);

var siteurl ="https://amdocs.sharepoint.com/sites/EP";

        try {

                var dataTableExample = $('#MoodDataTable').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();
                }

				
                dataTableExample = $('#MoodDataTable').DataTable({  
                           
                /*  language: {
                    search: "",
                    searchPlaceholder: "Search",
                    lengthMenu: "Show _MENU_ Entries"
                },      */         
				 pagingType:'full_numbers',

                    autoWidth: true,
					deferRender:true,                       

                    lengthMenu: [10,50,100, 200, 500],                       
					
                    "aaData": data.d.results,

                        "aoColumns": [                      

                       /* {
                        	  "render": function(data, type, row, meta ) {              
			                  //return '<h3 id="event-pillar" class="'+row.ID+'">'+row.ID+'</h3>'; }
			                  return meta.row + 1
			                  }
                        },
*/
                      //{"mData": "ID"}, 
                      
                        
                        {     
                        	                 
							"render": function(data, type, row, meta ) {       
								var moodStatus = row.Mood;
								if(moodStatus == "Happy"){
									return '<h7 id="event-pillar" class="'+row.Title+'"><img src="Images/happy.png" style="width:22px; margin-right: 1rem;">'+row.Mood+'</h7>';
								}else if(moodStatus == "Cool"){
									return '<h7 id="event-pillar" class="'+row.Title+'"><img src="Images/cool.png" style="width:22px; margin-right: 1rem;">'+row.Mood+'</h7>';
								}else if(moodStatus == "Excited"){
									return '<h7 id="event-pillar" class="'+row.Title+'"><img src="Images/exited.png" style="width:22px; margin-right: 1rem;">'+row.Mood+'</h7>';
								}else if(moodStatus == "Boring"){
									return '<h7 id="event-pillar" class="'+row.Title+'"><img src="Images/boring.png" style="width:22px; margin-right: 1rem;">'+row.Mood+'</h7>';
								}else if(moodStatus == "Angry"){
									return '<h7 id="event-pillar" class="'+row.Title+'"><img src="Images/angry.png" style="width:22px; margin-right: 1rem;">'+row.Mood+'</h7>';
								}else if(moodStatus == "Frustrated"){
									return '<h7 id="event-pillar" class="'+row.Title+'"><img src="Images/frustrated.png" style="width:22px; margin-right: 1rem;">'+row.Mood+'</h7>';
								}
							}
						},

                        
  						 {"mData": "EmpLocation"},
          
						{"mData": "EmpDepartment"},
												
						 							
						{     
                        	                 
							"render": function(data, type, row, meta ) {       
								var moodStatus = row.Mood;
								if(moodStatus == "Happy"){
									return '<h7 id="event-pillar" class="'+row.Title+'" style="margin-right: 25px;">'+row.count+'</h7>';
								}else if(moodStatus == "Cool"){
									return '<h7 id="event-pillar" style="margin-right: 25px;" class="'+row.Title+'">'+row.count+'</h7>';
								}else if(moodStatus == "Excited"){
									return '<h7 id="event-pillar" style="margin-right: 25px;" class="'+row.Title+'">'+row.count+'</h7>';
								}else if(moodStatus == "Boring"){
									return '<h7 id="event-pillar" style="margin-right: 25px;" class="'+row.Title+'">'+row.count+'</h7>';
								}else if(moodStatus == "Angry"){
									return '<h7 id="event-pillar" style="margin-right: 25px;" class="'+row.Title+'">'+row.count+'</h7>';
								}else if(moodStatus == "Frustrated"){
									return '<h7 id="event-pillar" style="margin-right: 25px;" class="'+row.Title+'">'+row.count+'</h7>';
								}
							}
						},
						
                     ],
                     
                     dom: 'lBfrtip',        
                   buttons: [ {
			        extend: 'excelHtml5',
	                title: 'Mood Report',	                
	                text : 'Download'		      
	                }
			      ]    
                        
                });

            }

            catch (e) { 
    }
}
