var minDate, maxDate;
var dept, location, evId;
var CheckedHub;
var CheckedLoc;
var getStartTime;
var getEndTime;
var StartTime2;
var EndTime2;
var log = console.log;
var siteurl = "https://amdocs.sharepoint.com/sites/EP";


$(document).ready(function() {

     $("#from-date,#to-date").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true});
 

		var url1 = siteurl+ "/_api/web/lists/getbytitle('EPRating')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby=ID desc";
       $('input[name="Hub"],input[name="Location"],input[name="Department"],#to-date,#from-date').on('change', function() {
            //Create an Array.
            var selectedHub = new Array();
            var selectedLoc = new Array();
            var selectedDept = new Array();
            //Reference the Table.
            var HubSet = "";
               var LocSet = "";
            var DeptSet = "";
            var chksHub = document.getElementsByName("Hub");
            var chksLoc = document.getElementsByName("Location");            
            var chksDept = document.getElementsByName("Department");
            
            for (var i = 0; i < chksHub.length; i++) {
                if (chksHub[i].checked) {              
                    selectedHub.push(chksHub[i].value);
                    HubSet += "Pillar eq "+"'"+chksHub[i].value+"' or ";
                }
            }
           // alert("Pillar Checked :"+HubSet);
            for (var i = 0; i < chksLoc.length; i++) {
                if (chksLoc[i].checked) {
                    selectedLoc.push(chksLoc[i].value);
                    LocSet += "Location eq "+"'"+chksLoc[i].value+"' or ";
                }
            }
            for (var i = 0; i < chksDept.length; i++) {
                if (chksDept[i].checked) {
                    selectedDept.push(chksDept[i].value);
                    DeptSet += "Department eq "+"'"+chksDept[i].value+"' or ";
                }
            }
            
            
            var hubsselected =HubSet;
            var lastIndex = hubsselected.lastIndexOf(" or");
            hubsselected = hubsselected.substring(0, lastIndex);
            
            var locationsselected =LocSet;
            var lastIndexLoc = locationsselected.lastIndexOf(" or");
            locationsselected = locationsselected.substring(0, lastIndexLoc);
            
            var departmentselected =DeptSet;
            var lastIndexDept = departmentselected.lastIndexOf(" or");
            departmentselected = departmentselected.substring(0, lastIndexDept);
            
            var finalselection = "";
            if(hubsselected != ""){
               	finalselection += "("+hubsselected+") ";
            }
            if(locationsselected != ""){
                if(hubsselected != ""){
                	finalselection += " and ("+locationsselected+") ";
                }else{
                	finalselection += "("+locationsselected+") ";
                }
            }
            if(departmentselected != ""){
            	if(hubsselected != "" || locationsselected != ""){
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
        			finalselection += " and (EventDate ge " + "'"+fromDateCh+"T00:00:00Z')"; 				
        			}else{
				   finalselection =  "(EventDate ge " + "'"+fromDateCh+"T00:00:00Z')";  
				}
              }else if(fromDateCh !== "Invalid date" && toDateCh !== "Invalid date"){
              	           	   if (finalselection != ''){
        			finalselection += "and (EventDate ge " + "'"+fromDateCh+"T00:00:00Z'" + " and EventDate le " + "'"+toDateCh+"T23:59:59Z')"; 				
        			}else{
				   finalselection =  "(EventDate ge " + "'"+fromDateCh+"T00:00:00Z'" + " and EventDate le " + "'"+toDateCh+"T23:59:59Z')";  
				}
              }else if(toDateCh !== "Invalid date" && fromDateCh === "Invalid date"){
                if (finalselection != ''){
        				finalselection += " and (EventDate le '"+toDateCh+"T23:59:59Z')";
				}else{
				   finalselection = "EventDate le " + "'"+toDateCh+"T23:59:59Z'";  
				}
              
              }
       
            if(finalselection != "" ){      
            var url = siteurl+ "/_api/web/lists/getbytitle('EPRating')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+finalselection+"&$orderby=ID desc";
                GetEventReport(url);  
            }else{
            var url = siteurl+ "/_api/web/lists/getbytitle('EPRating')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+finalselection+"&$orderby=ID desc";
                GetEventReport(url);  
            }
            
  	});
  	
       $.noConflict();
       GetEventReport(url1);   
  
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
               var siteurl = "https://amdocs.sharepoint.com/sites/EP";

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
                 	$('#ReportDataTable').DataTable().clear().draw();       
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





var EventReportMap = new Map();
let uniqueResults = [];
for(var i = 0; i < data.d.results.length; i++) {
	let v = data.d.results[i];	
	var key = v.EventID + "___" + v.Location + "___" + v.Department;

	if(EventReportMap[key] == undefined){
		v.MoodCount = [];
		v.MoodCount.push(v.MoodStatus);
		v.AllRatings = [];
		v.AllRatings.push(v.RatingAverage);
		EventReportMap[key] = v;
		console.log("EventReportMap : "+EventReportMap[key]);
	}else{
		let existData = null;
		existData = EventReportMap[key];
		existData.AllRatings.push(v.RatingAverage);
		existData.MoodCount.push(v.MoodStatus);
		EventReportMap[key] = existData;
	}

}

for(var k in EventReportMap) {
	let d = EventReportMap[k];
	let sum = 0;
	let count = 0;
	let Excited = 0;
	let NotExcited = 0;
	let NotSure = 0;
	for (var i = 0; i< d.AllRatings.length; i++){
		if(d.AllRatings[i] != null){
			sum = sum + d.AllRatings[i];
			count++;
		}
	}
	for (var i = 0; i< d.MoodCount.length; i++){
		if(d.MoodCount[i] == "Excited"){
			//sum = sum + d.AllRatings[i];
			Excited++;
		}else if(d.MoodCount[i] == "Not Excited"){
			NotExcited++;
		}else if(d.MoodCount[i] == "Not Sure"){
			NotSure++;
		}
	}
	EventReportMap[k].ExcitedCount = Excited;
	EventReportMap[k].NotExcitedCount = NotExcited;
	EventReportMap[k].NotSureCount = NotSure; 
	EventReportMap[k].Review = count;
	EventReportMap[k].AvgRating = sum / count;
	uniqueResults.push(EventReportMap[k]);
}


data.d.results = uniqueResults;
console.log("Final Unique Results : "+uniqueResults)





var siteurl ="https://amdocs.sharepoint.com/sites/EP";

        try {

                var dataTableExample = $('#ReportDataTable').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }
                
 



                dataTableExample = $('#ReportDataTable').DataTable({  
					language: {
                    search: "",
                    searchPlaceholder: "Search",
                    lengthMenu: "Show _MENU_ Entries"
                },
				rowGroup: {
				        dataSrc: [
				            'Location',
				            'Department'
				        ]
				    },
                    pagingType:'full_numbers',

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
                       //{"mData": "Title"}, 
                      
                        
                        {     
                        	                 
							"render": function(data, type, row, meta ) {           
							return '<h7 id="event-pillar" class="'+row.Pillar+'">'+row.Pillar+'</h7></br><h6 class="event-desc" style="font-size:10px;font-weight: 400 !important;height:2% !important;">'+row.EventTitle+'</h6>'; }
						},

                        
  						 {"mData": "Location"},
          
						{"mData": "Department"},
												
						 {
							"render": function(data, type, row, meta ) {    
							var Excited = 0; var NotExcited = 0; var NotSure = 0; 
							var MoodStatus = row.MoodStatus;
							//alert(MoodStatus)
							if(MoodStatus == "Excited"){
								Excited++;
							}else if(MoodStatus == "Not Excited"){
								NotExcited++;
							}else if(MoodStatus == "Not Sure"){
								NotSure++;
							}else{
								
							}


						   return '<span><img src="images/Group 3265.svg" alt="not available" style="margin:0px 5px 0px 0px; width:10%;">'+row.ExcitedCount+'<span> - <span><img src="images/Icon ionic-md-sad.svg" alt="not available" style="margin:0px 5px; width:10%;">'+row.NotExcitedCount+'<span> - <span><img src="images/Group 3266.svg" alt="not available" style="margin:0px 5px; width:10%;">'+row.NotSureCount+'<span>';      
						  }   
						},  
						
						{
							"render": function(data, type, row, meta ) { 
							var rate = row.AvgRating
							if (isNaN(rate)) rate = 0;
							var review = row.Review
							return '<span id="event-pillar" class="'+rate+'" style="display: flex;align-items: center;"><img style="width: 10%;margin-right: 3px;" src="Images/Icon ionic-ios-star.svg">'+rate.toFixed(1)+' <span style="color:#FF3D97; margin-left:5px;">'+review+' Reviews</span></span>'; }
						},
							
						{                        
							"render": function(data, type, row, meta ) {       
							var EventDate = row.EventDate;
							var StartTime = row.EventStartTime;
							//alert(StartTime)
							var EndTime = row.EventEndTime;
								EventDate = moment.utc(EventDate).format('DD MMM, YYYY'); 
								 var StartTime1 = moment.utc(StartTime).format('hh:mm a');
							     var EndTime1 = moment.utc(EndTime).format('hh:mm a'); 
								
                                StartTime2 = moment.utc(StartTime).format('hh:mm a');
								EndTime2 = moment.utc(EndTime).format('hh:mm a');  
 
                                log(StartTime2)
                                log(EndTime2)
                                                             				         
						         
						         var utcDateStart = new Date(StartTime);
								
					             var utcDateEnd = new Date(EndTime);
								  
								   log(utcDateStart)
                                log(utcDateEnd)

								   
								  var difference = utcDateEnd.getTime() - utcDateStart.getTime(); 
				  
								  difference = difference / 1000;
				                  var minuteDifference = Math.floor(difference / 60);
				                  difference -= minuteDifference * 60;
				                  
				                  console.log(minuteDifference);

								//var duration =EndTime.diff(StartTime);
								//var hours = duration.asHours();								
								//alert("duration : "+duration)
								
							return '<h7 id="event-pillar" class="">'+EventDate+'</h7><h7 class="event-desc" style="font-size:10px;font-weight: 400 !important;height:2% !important;">'+StartTime1+' - '+EndTime1+' - '+minuteDifference+' Minutes</h7>'; }
						},						
                     ],
                     
                     dom: 'lBfrtip',        
                   buttons: [ {
			        extend: 'excelHtml5',
	                title: 'Event Report',	                
	                text : 'Download'		      
	                }
			      ]  
                });

            }

            catch (e) { 

        //alert(e.message); 

    }

}
