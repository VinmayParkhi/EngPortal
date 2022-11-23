var minDate, maxDate;
var dept, location, evId;
var CheckedHub;
var CheckedLoc;
var log = console.log;
var siteurl = "https://amdocs.sharepoint.com/sites/EP";


$(document).ready(function() {

$("#MoodDataTable_wrapper > div.dt-buttons > a > span").html("Download");

     $("#from-date,#to-date").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true});
      
 
        var url1 = siteurl+ "/_api/web/lists/getbytitle('EPMoodMeter')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter= MoodFlag eq 'Unread'&$orderby=ID desc";
        $('input[name="Location"],input[name="Department"],#to-date,#from-date').on('change', function() {
            var selectedLoc = new Array();
            var selectedDept = new Array();
               var LocSet = "";
            var DeptSet = "";
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
                var checkboxesLoc = document.getElementById("checkboxesDepart");
                    checkboxesLoc.style.display = "none";
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
             var date1 = $("#from-date").val();
                fromDateCh = moment.utc(date1).format('YYYY-MM-DD')   
              var date2 = $("#to-date").val();
                toDateCh = moment.utc(date2).format('YYYY-MM-DD')   	          
	          if(fromDateCh !== "Invalid date" && toDateCh === "Invalid date"){
	           	   if (finalselection != ''){
        			finalselection += " and (Created ge " + "'"+fromDateCh+"T00:00:00Z')"; 				
        			}else{
        			finalselection += "Created ge " + "'"+fromDateCh+"T00:00:00Z'";
				   //finalselection =  "(Created ge " + "'"+fromDateCh+"T00:00:00Z'" + " and Created le " + "'"+toDateCh+"T23:59:59Z')";  
				}
              }else if(fromDateCh !== "Invalid date" && toDateCh !== "Invalid date"){
              	           	   if (finalselection != ''){
        			finalselection += "and (Created ge " + "'"+fromDateCh+"T00:00:00Z'" + " and Created le " + "'"+toDateCh+"T23:59:59Z')"; 				
        			}else{
				   finalselection =  "(Created ge " + "'"+fromDateCh+"T00:00:00Z'" + " and Created le " + "'"+toDateCh+"T23:59:59Z')";  
				}
              }else if(toDateCh !== "Invalid date" && fromDateCh === "Invalid date"){
                if (finalselection != ''){
        				finalselection += " and (Created le '"+toDateCh+"T23:59:59Z')";
				}else{
				   finalselection = "Created le " + "'"+toDateCh+"T23:59:59Z'";  
				}
              
              }

            
            if(finalselection != "" ){      
            var url = siteurl+ "/_api/web/lists/getbytitle('EPMoodMeter')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter= (MoodFlag eq 'Unread') and "+finalselection+"&$orderby=ID desc&$groupby=Mood dist";
                GetEventReport(url);  
            }else{
            var url = siteurl+ "/_api/web/lists/getbytitle('EPMoodMeter')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter= (MoodFlag eq 'Unread') "+finalselection+"&$orderby=ID desc&$groupby=Mood dist";
                GetEventReport(url);  
            }         
  
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
