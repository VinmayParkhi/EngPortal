﻿var Work = 0;
var Life = 0;
var Enrich = 0;
var WowPride = 0;
var ConnectCommunity = 0;
var log = console.log;
var All = 0;
var Scheduled = 0;
var Autopublished = 0;
var Draft = 0;
var complete = 0;
var minDate, maxDate;
var getPillar;
var rowId;


$(document).ready(function() {
/*for stable calendar*/
$("#s4-workspace").scroll(function(){
    $("#ui-datepicker-div").hide();
});

     
     GetAutoPublish()     
   UpDateComplete();

 $('#arrimg').on("click",function(e){
   //$('#myImg').slideDown(1);
   $("#myImg").toggleClass("d-none");
   
    $("#myImg").css("display","block");
     $('#arrimg img').toggleClass("rotateImg");
  }); 
  
  $('#arrimg2').on("click",function(e){
   //$('#myImg').slideDown(1);
   $("#myImg2").toggleClass("d-none");
    $("#myImg2").css("display","block");
     $('#arrimg2 img').toggleClass("rotateImg");
  });   
  
						 
  $('#arrimg').on("mouseleave",function(e){
   //$('#myImg').slideUp(1);
   $("#myImg").addClass("d-none");
  });
  
  $('#arrimg2').on("mouseleave",function(e){
   //$('#myImg').slideUp(1);
   $("#myImg2").addClass("d-none");
  });
                    
/*pop-up filter start*/
 var pillarFilterArray = [];
 var statusFilterArray = [];
 var fromDateCh;
 var toDateCh;
 var datesSelected = "";
 var statusText="";
 var statusText2;
 var statusClass = "";
 


$("#workidLi,#lifeidLi,#wellbeingidLi,#wowidLi,#connectidLi,#AllCountsLi").on("click",function(event){
/*$("#Published").html(0);
$("#autopublished").html(0);
$("#Draft").html(0);
$("#Completed").html(0);*/

    pillarFilterArray = [];
   var text = event.target.innerText
  log(text.includes('Work'));
  
  
  
  //if(fromDateCh === undefined && toDateCh === undefined){
  
  var siteurl = "https://amdocs.sharepoint.com/sites/EP";
  
        if(fromDateCh !== undefined && toDateCh !== undefined && statusClass.length > 0){
        
               var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+datesSelected+" and EventStatus eq '"+statusClass+"'&$orderby=ID desc";
                  alert(url)
        }else if(fromDateCh === undefined && toDateCh === undefined && statusClass.length > 0){
               var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter=EventStatus eq '"+statusClass+"'&$orderby=ID desc";

        }else{
             var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby=ID desc";

        }
                  //var url = siteurl+ "/_api/web/lists/getbytitle('TestList')/items?&$select=*";
               //console.log(url);        

     $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {

                if(data.d.results.length > 0 ){ 
                    log(data)
                    var res = data.d.results;
                    
                    for(var f=0;f<res.length;f++){
                        if(text.includes(res[f].Pillar)){
                        
                         pillarFilterArray.push(res[f])
                          //log(res[f])
                        }else if(text.includes("All")){
                           pillarFilterArray.push(res[f])
                        
                        }                                                
                    }; /* for end */
                    
                   
                    successFuncFltr(pillarFilterArray)
                   var popup = $(".popuptext");
                     popup.removeClass("show");
                     //popup.addClass("hide");

                }
              }  
    });  /* ajax end */
    //}
  
});



$("#AllCountLi,#PublishedLi,#autopublishedLi,#DraftLi,#CompletedLi").on("click",function(event){
     statusText = event.target.innerText
     var statusFilterArray = [];
     statusClass = event.target.className;
     
     var dates = fromDateCh + toDateCh;
     //alert(datesSelected)
        var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                   //alert(datesSelected)
             if(fromDateCh !== undefined && toDateCh !== undefined){
             
             /* $("#workid").html(0);
				$("#lifeid").html(0);
				$("#wellbeingid").html(0);
				$("#wowid").html(0);
				$("#connectid").html(0);*/

               var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+datesSelected+"&$orderby=ID desc";

             }else{
                  var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby=ID desc";
              }  
                //var url = siteurl+ "/_api/web/lists/getbytitle('TestList')/items?&$select=*";
               //console.log(url);        



    $.ajax({



           url: url,



           type: "GET",



           dataType: "json",



           headers: {
                    "accept": "application/json;odata=verbose"
            },



           success: function (data) {



               if(data.d.results.length > 0 && pillarFilterArray.length === 0){
                    log(data)
                    var res = data.d.results;
                    
                    

                    
                    for(var f=0;f<res.length;f++){
                    if(statusText.includes(res[f].EventStatus)){
                           statusFilterArray.push(res[f]);
                        }else if(statusText.includes("All Events")){
                           statusFilterArray.push(res[f])
                        
                        };



                   };
                  }else if(pillarFilterArray.length > 0){
                       
                        for(var t=0;t<pillarFilterArray.length;t++){
                          //log(pillarFilterArray[t]);                        
                          if(statusText.includes(pillarFilterArray[t].EventStatus)){
                           statusFilterArray.push(pillarFilterArray[t]);
                        }else if(statusText.includes("All Events")){
                           statusFilterArray.push(pillarFilterArray[t])
                        
                        };
                        
                        }/* for end */
               
                 }
                 
                 log(statusFilterArray)
                      successFuncFltr(statusFilterArray)
                      
                      
                       var popup = $(".popuptext");
                     popup.removeClass("show");

                 }
             });     
               
    });

/* sb start date filter */

   
   
    $("#from-date").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function () {
                var fromDate = $(this).val();
                fromDateCh = moment.utc(fromDate).format('YYYY-MM-DD');
                
             if(toDateCh !== undefined){
             
                $("#workid").html(0);
				$("#lifeid").html(0);
				$("#wellbeingid").html(0);
				$("#wowid").html(0);
				$("#connectid").html(0);


                $("#Published").html(0);
				$("#autopublished").html(0);
				$("#Draft").html(0);
				$("#Completed").html(0);
				
				var Work = 0;
				var Life = 0;
				var Enrich = 0;
				var WowPride = 0;
				var ConnectCommunity = 0;
				
				var All = 0;
				var Scheduled = 0;
				var Autopublished = 0;
				var Draft = 0;
				var complete = 0;

             
                var fromDateString = "";                  
                                
                fromDateString = "EventDate ge " + "'"+fromDateCh+"T00:00:00Z'" + " and EventDate le " + "'"+toDateCh+"T12:00:00Z'";
                datesSelected = "EventDate ge " + "'"+fromDateCh+"T00:00:00Z'" + " and EventDate le " + "'"+toDateCh+"T12:00:00Z'";

	               
	           
                 log(fromDateString)
                var siteurl = "https://amdocs.sharepoint.com/sites/EP";
                 
                 
                  var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+fromDateString+"&$orderby = Created desc";           
                  
              // alert(url)
               
               $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
            log(res)
            
            $("#AllCounts").html(res.length);
				for(var i =0; i<res.length; i++){
				var Pillare = res[i].Pillar;
					if(Pillare == "Work"){
						Work++;
						console.log("Work"+Work);
						$("#workid").html(Work);
					}else if(Pillare == "Life"){
						Life++;
						console.log("Life"+Life);
						$("#lifeid").html(Life);
					}else if(Pillare == "Wow and pride"){
						WowPride++;
						console.log("WowPride"+WowPride );
						$("#wowid").html(WowPride);
					}else if(Pillare == "Enrich"){
						Enrich++;
						console.log("Wellbeing"+Enrich);
						$("#wellbeingid").html(Enrich);
					}else if(Pillare == "Connect and community"){
						ConnectCommunity ++;
						console.log("ConnectCommunity "+ConnectCommunity );
						$("#connectid").html(ConnectCommunity );
					}else{
						//Others++;
						//console.log("Others"+Others);
					}
				//var Status;
				}
				
          
                    $("#AllCount").html(res.length);
				for(var i =0; i< res.length; i++){
				var Status= res[i].EventStatus;
				
				log(Status)
					if(Status == "Published"){
						Scheduled++;
						console.log("Scheduled"+Scheduled);
						$("#Published").html(Scheduled);
					}else if(Status== "Autopublish"){
						Autopublished++;
						console.log("Autopublished"+Autopublished);
						$("#autopublished").html(Autopublished);
					}else if(Status == "Draft"){
						Draft++;
						console.log("Draft"+Draft);
						$("#Draft").html(Draft);
					}else if(Status == "Completed"){
						complete++;
						console.log("complete"+complete);
						$("#Completed").html(complete);
					}
				
				}

            
                   

            successFunction(data);
            }
            
            });
            }else if(fromDateCh !== undefined && toDateCh === undefined){
            
              var fromDateString = "";                  
                                
                fromDateString = "EventDate ge " + "'"+fromDateCh+"T00:00:00Z'";
	               
	           
                 log(fromDateString)
                var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+fromDateString+"&$orderby = Created desc";           
              // alert(url)
               
               $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
            
            
            log(res)
            successFunction(data);
            }
            
            });

            }
 
          }
    })
    
    
     
    
   
    $("#to-date").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function (dateText) {
                var date2 = $(this).val();
                toDateCh = moment.utc(date2).format('YYYY-MM-DD')
                
                if(fromDateCh !== undefined){
                $("#workid").html(0);
				$("#lifeid").html(0);
				$("#wellbeingid").html(0);
				$("#wowid").html(0);
				$("#connectid").html(0);


                $("#Published").html(0);
				$("#autopublished").html(0);
				$("#Draft").html(0);
				$("#Completed").html(0);
				
				var Work = 0;
				var Life = 0;
				var Enrich = 0;
				var WowPride = 0;
				var ConnectCommunity = 0;
				
				var All = 0;
				var Scheduled = 0;
				var Autopublished = 0;
				var Draft = 0;
				var complete = 0;

                var toDateString = "";
                                
                toDateString = "EventDate ge " + "'"+fromDateCh+"T00:00:00Z'" + " and EventDate le " + "'"+toDateCh+"T12:00:00Z'";
	              datesSelected = "EventDate ge " + "'"+fromDateCh+"T00:00:00Z'" + " and EventDate le " + "'"+toDateCh+"T12:00:00Z'"; 
	           
                 //log(fromDateString)
                var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+toDateString+"&$orderby = Created desc";           
              // alert(url)
               
               $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
            log(res)
            if(data.d.results.length > 0 ){ 
                    
                                      
				 log(res.length)    
					      

                  $("#AllCounts").html(res.length);
				for(var i =0; i<res.length; i++){
				var Pillare = res[i].Pillar;
					if(Pillare == "Work"){
						Work++;
						console.log("Work"+Work);
						$("#workid").html(Work);
					}else if(Pillare == "Life"){
						Life++;
						console.log("Life"+Life);
						$("#lifeid").html(Life);
					}else if(Pillare == "Wow and pride"){
						WowPride++;
						console.log("WowPride"+WowPride );
						$("#wowid").html(WowPride);
					}else if(Pillare == "Enrich"){
						Enrich++;
						console.log("Wellbeing"+Enrich);
						$("#wellbeingid").html(Enrich);
					}else if(Pillare == "Connect and Community"){
						ConnectCommunity ++;
						console.log("ConnectCommunity "+ConnectCommunity );
						$("#connectid").html(ConnectCommunity );
					}else{
						//Others++;
						//console.log("Others"+Others);
					}
				//var Status;
				}
				
          
                    $("#AllCount").html(res.length);
				for(var i =0; i< res.length; i++){
				var Status= res[i].EventStatus;
				
				log(Status)
					if(Status == "Published"){
						Scheduled++;
						console.log("Scheduled"+Scheduled);
						$("#Published").html(Scheduled);
					}else if(Status== "Autopublish"){
						Autopublished++;
						console.log("Autopublished"+Autopublished);
						$("#autopublished").html(Autopublished);
					}else if(Status == "Draft"){
						Draft++;
						console.log("Draft"+Draft);
						$("#Draft").html(Draft);
					}else if(Status == "Completed"){
						complete++;
						console.log("complete"+complete);
						$("#Completed").html(complete);
					}
				
				}
				}

            successFunction(data);  
            }
            
            });
            }else if(toDateCh !== undefined && fromDateCh === undefined){
              var toDateString = "";
                                
                toDateString = "EventDate le " + "'"+toDateCh+"T12:00:00Z'";
	               
	           
                 //log(fromDateString)
                var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+toDateString+"&$orderby = Created desc";           
              //alert(url)
               
               $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
            log(res)
            successFunction(data);  
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
        fromDateCh = undefined;
        toDateCh = undefined;

        statusText = "";
        loadListItems()
        }
        });
       }
    });
 /* sb end date filter */ 

     $.noConflict();
       loadListItems();   
       
       
       
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


/*sb start*/
function successFuncFltr(fltrData){

                $("#workid").html(0);
				$("#lifeid").html(0);
				$("#wellbeingid").html(0);
				$("#wowid").html(0);
				$("#connectid").html(0);


                $("#Published").html(0);
				$("#autopublished").html(0);
				$("#Draft").html(0);
				$("#Completed").html(0);


                    var Work = 0;
					var Life = 0;
					var Enrich = 0;
					var WowPride = 0;
					var ConnectCommunity = 0;					
					var All = 0;
					var Scheduled = 0;
					var Autopublished = 0;
					var Draft = 0;
					var complete = 0;
                    
                    $("#AllCounts").html(fltrData.length);
				for(var i =0; i<fltrData.length; i++){
				var Pillare = fltrData[i].Pillar;
					if(Pillare == "Work"){
						Work++;
						console.log("Work"+Work);
						$("#workid").html(Work);
					}else if(Pillare == "Life"){
						Life++;
						console.log("Life"+Life);
						$("#lifeid").html(Life);
					}else if(Pillare == "Wow and pride"){
						WowPride++;
						console.log("WowPride"+WowPride );
						$("#wowid").html(WowPride);
					}else if(Pillare == "Enrich"){
						Enrich++;
						console.log("Wellbeing"+Enrich);
						$("#wellbeingid").html(Enrich);
					}else if(Pillare == "Connect and Community"){
						ConnectCommunity ++;
						console.log("ConnectCommunity "+ConnectCommunity );
						$("#connectid").html(ConnectCommunity );
					}else{
						//Others++;
						//console.log("Others"+Others);
					}
				//var Status;
				}
				
				$("#AllCount").html(fltrData.length);
				for(var i =0; i< fltrData.length; i++){
				var Status= fltrData[i].EventStatus;
				
				log(Status)
					if(Status == "Published"){
						Scheduled++;
						console.log("Scheduled"+Scheduled);
						$("#Published").html(Scheduled);
					}else if(Status== "Autopublish"){
						Autopublished++;
						console.log("Autopublished"+Autopublished);
						$("#autopublished").html(Autopublished);
					}else if(Status == "Draft"){
						Draft++;
						console.log("Draft"+Draft);
						$("#Draft").html(Draft);
					}else if(Status == "Completed"){
						complete++;
						console.log("complete"+complete);
						$("#Completed").html(complete);
					}
				
				}
				

    log(fltrData)
    
    var today1 = new Date();

               var dd1 = String(today1. getDate()). padStart(2, '0');

               var mm1 = String(today1. getMonth() + 1). padStart(2, '0'); //January is 0!

               var yyyy1 = today1. getFullYear();                                           

               var time = today1.getHours() + "_" + today1.getMinutes() + "_" + today1.getSeconds();

               today1 = dd1 + '_' + mm1 + '_' + yyyy1 + '_' +time;



	//console.log(data);
	
	var siteurl ="https://amdocs.sharepoint.com/sites/EP";

        try {

                var dataTableExample = $('#datatable11').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }



                dataTableExample = $('#datatable11').DataTable({   
              language: {
                    search: "",
                    searchPlaceholder: "Search By Event Name"
                },

                 
				scrollY: '100vh',
        scrollCollapse: true,
                    

                    pagingType:'simple_numbers',

                    //autoWidth: true,

                    deferRender:true,                       

                    lengthMenu: [10,25, 50,100, 200, 500],                       

                    "aaData": fltrData,

                        "aoColumns": [    
                        {
                        	"render": function(data, type, row, meta ){
                        		return meta.row + 1
                        	}                        
                        },      
                  

                        //{"mData": "ID"},
                        
                        {
							"render": function(data, type, row, meta ) {              
							return '<h7 id="event-pillar" class="'+row.Pillar+'">'+row.Pillar+'</h7></br><h6 class="event-desc" style="font-size:12px !important;font-weight: 600 !important; height:2%; ">'+row.Title+'</h6>'; }
						},

                        
                        
  						 {"mData": "EventStartTime",

                            "render": function(data) {
                                     var date = new Date(data);
                                     date = moment.utc(date).format('DD MMM, YYYY hh:mm a')
                                     allDates(date);
                                     log(date);
                                    return date;
                                }

                        },
                        {
						    "render": function(data, type, row, meta ) {  
						    var Excited = row.Excited;
						    var NotExcited = row.NotExcited;
						    var NotSure = row.NotSure;
						    
						    if(Excited == null ){
						    	Excited = "-";
						    }
						    if (NotExcited == null ){
						    	NotExcited = "-";
						    }
						    if (NotSure == null ){
						    	NotSure = "-";
						    }


						    return '<span><img src= "../../SiteAssets/ENG-Admin/Images/Group 3265.svg" alt="not available" style="margin:0px 5px; width:10%;"><span>'+Excited+
						    '<span><img src= "https://amdocs.sharepoint.com/sites/EP/SiteAssets/ENG-Admin/Images/Icon ionic-md-sad.svg" alt="not available" style="margin:0px 5px; width:10%;"><span>'+NotExcited+
						    '<span><img src= "../../SiteAssets/ENG-Admin/images/Group 3266.svg" alt="not available" style="margin:0px 5px; width:10%;">'+NotSure+'<span>';      
							}   
						  },  
     
						
						 {
							"render": function(data, type, row, meta ) {          
								var PublishDate = moment.utc(row.AutoPublishDateTime).format('DD MMM, YYYY hh:mm a');
								var Status = row.EventStatus;
								if(Status == "Autopublish"){
									return '<span id="event-pillar" class="'+row.EventStatus+'2">'+row.EventStatus+"<br>"+PublishDate+'</span>';
								}else{
									return '<span id="event-pillar" class="'+row.EventStatus+'2">'+row.EventStatus+'</span>';
								}
							}
						},

						
						{
													
							"render": function(data, type, row, meta ) {  
							var statusColumn = row.EventStatus;   
							if(statusColumn == "Published"){
								return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href= "https://amdocs.sharepoint.com/sites/EP/SitePages/EPAdmin/EditEvent.aspx?EventID='+row.ID+'"><i class="fa fa-pencil me-3" style="color:black;" id="editbtn"></i></a><a class="me-3"><i data-bs-toggle="modal" data-bs-target="#DeleteModal"  class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></a></div></div>';
						
							}else if(statusColumn == "Completed"){
								return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox" style="color: rgb(0, 0, 0);font-weight: bold;width: 11rem !important;height: 35px;padding: 3px;"><a href="#"><i class="fa-solid fa-upload" style="color:black;" onclick="replaceVideo(this.id)" id="'+row.ID+'"></i></a><div style="height:17px;font-size:10px;margin-left:-8px;">Upload Media</div></div></div>'; 
						
							}else if(statusColumn == "Draft"){
								return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href= "https://amdocs.sharepoint.com/sites/EP/SitePages/EPAdmin/EditEvent.aspx?EventID='+row.ID+'"><i class="fa fa-pencil me-3" style="color:black;" id="editbtn"></i></a><a><i data-bs-toggle="modal" data-bs-target="#DeleteModal" class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></a></div></div>';
							}else{
							return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href= "https://amdocs.sharepoint.com/sites/EP/SitePages/EPAdmin/EditEvent.aspx?EventID='+row.ID+'"><i class="fa fa-pencil" style="color:black;" id="editbtn"></i></a><a><i data-bs-toggle="modal" data-bs-target="#DeleteModal" class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></a></div></div>';
						}
						}
						},
					
                     ]

                });

            }

            catch(e) { 

        alert(e.message); 

    }

}/*sb end*/

/*sb start*/
function showEditBox(x){
         
         //x.style.cursor = "pointer";
         trHover =  x.parentNode.parentNode.parentNode;     
          
         var x = x.querySelector('#editbox');
         log(x)
		    x.style.display = "flex";
		    
           removeEditBox(trHover,x);

};

function removeEditBox(tr,x){
   tr.onmouseout = function(){      
		    x.style.display = "none";       

   };
};

/* sb end */


function loadListItems() {

               var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                 
                  //var url = siteurl+ "/_api/web/lists/getbytitle('TestList')/items?&$select=*";
             
               var url1 = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby=ID desc";
              

 //console.log(url);        

     $.ajax({

            url: url1,

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
				$("#AllCounts").html(dataresults.length);
				for(var i =0; i< dataresults.length; i++){
				var Pillare = data.d.results[i].Pillar;
					if(Pillare == "Work"){
						Work++;
						console.log("Work"+Work);
						$("#workid").html(Work);
					}else if(Pillare == "Life"){
						Life++;
						console.log("Life"+Life);
						$("#lifeid").html(Life);
					}else if(Pillare == "Wow and pride"){
						WowPride++;
						console.log("WowPride"+WowPride );
						$("#wowid").html(WowPride);
					}else if(Pillare == "Enrich"){
						Enrich++;
						console.log("Wellbeing"+Enrich);
						$("#wellbeingid").html(Enrich);
					}else if(Pillare == "Connect and Community"){
						ConnectCommunity ++;
						console.log("ConnectCommunity "+ConnectCommunity );
						$("#connectid").html(ConnectCommunity );
					}else{
						//Others++;
						//console.log("Others"+Others);
					}
				//var Status;
				}
				
				
				var dataresults = data.d.results;
				console.log(dataresults);
				$("#AllCount").html(dataresults.length);
				for(var i =0; i< dataresults.length; i++){
				var Status= data.d.results[i].EventStatus;
					if(Status == "Published"){
						Scheduled++;
						console.log("Scheduled"+Scheduled);
						$("#Published").html(Scheduled);
					}else if(Status== "Autopublish"){
						Autopublished++;
						console.log("Autopublished"+Autopublished);
						$("#autopublished").html(Autopublished);
					}else if(Status == "Draft"){
						Draft++;
						console.log("Draft"+Draft);
						$("#Draft").html(Draft);
					}else if(Status == "Completed"){
						complete++;
						console.log("complete"+complete);
						$("#Completed").html(complete);
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


function adduser(id){
    //openDialog(currsite+'/_layouts/15/aclinv.aspx?GroupId='+CurrGroupId);
    openDialogshare("https://amdocs.sharepoint.com/sites/EP/Lists/EPEventShare/NewForm.aspx?EventID="+id);    
    //window.location.reload();        
}

function openDialogshare(pageUrl) {
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


function replaceVideo(id){
    //openDialog(currsite+'/_layouts/15/aclinv.aspx?GroupId='+CurrGroupId);
    openDialog( "../../Lists/EPEvent/EditForm.aspx?ID="+id);    
    //window.location.reload();        
}

function openDialog(pageUrl) {
    var options = {
        url: pageUrl,
        iconImageUrl: "icons/request.png",
        title: 'Upload Video',
        allowMaximize: false,
        showClose: true,
        width: 500,
        height: 150
    };
    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
}


function errorFunction(data){
console.log(error);
}

 $('#datatable11').DataTable({})

      


function successFunction(data) {
                 
               var today1 = new Date();

               var dd1 = String(today1. getDate()). padStart(2, '0');

               var mm1 = String(today1. getMonth() + 1). padStart(2, '0'); //January is 0!

               var yyyy1 = today1. getFullYear();                                           

               var time = today1.getHours() + "_" + today1.getMinutes() + "_" + today1.getSeconds();

               today1 = dd1 + '_' + mm1 + '_' + yyyy1 + '_' +time;



	//console.log(data);
	
	var siteurl ="https://amdocs.sharepoint.com/sites/EP";

        try {

                var dataTableExample = $('#datatable11').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }



                dataTableExample = $('#datatable11').DataTable({   
              language: {
                    search: "",
                    searchPlaceholder: "Search"
                },

                 
				scrollY: '100vh',
        scrollCollapse: true,
                    

                    pagingType:'simple_numbers',

                    autoWidth: true,

                    deferRender:true,                       

                    lengthMenu: [10,25, 50,100, 200, 500],  
                                         

                    "aaData": data.d.results,

                        "aoColumns": [  
                        {
                        	"render": function(data, type, row, meta ){
                        	var count = meta.row + 1;
                        		return '<span style="opacity:0.6;text-align:center;">'+count+'</span>'
                        	}                        
                        },                    

                        //{"mData": "ID"},
                        
                        {
							"render": function(data, type, row, meta ) {              
							return '<h7 id="event-pillar" class="'+row.Pillar+'">'+row.Pillar+'</h7></br><h6 class="event-desc" style="font-size:12px !important;font-weight: 600 !important; height:2%">'+row.Title+'</h6>'; }
						},

                        
                       // {"mData": "Pillar"},

                       // {"mData": "EventDescription"}, 
                        
  						 {"mData": "EventStartTime",

                            "render": function(data) {
                                     var date = new Date(data);
                                     date = moment.utc(date).format('DD MMM, YYYY hh:mm a')
                                     return '<h7 id="event-pillar" style="opacity:0.6;" class="'+date+'">'+date+'</h7>';                             
                            }

                        },
                        {
						    "render": function(data, type, row, meta ) {  
						    var Excited = row.Excited;
						    var NotExcited = row.NotExcited;
						    var NotSure = row.NotSure;
						    
						    if(Excited == null ){
						    	Excited = "-";
						    }
						    if (NotExcited == null ){
						    	NotExcited = "-";
						    }
						    if (NotSure == null ){
						    	NotSure = "-";
						    }


						    return '<span><img src= "../../SiteAssets/ENG-Admin/images/Group 3265.svg" alt="not available" style="margin:0px 5px; width:10%;"><span>'+Excited+
						    '<span><img src= "../../SiteAssets/ENG-Admin/images/Icon ionic-md-sad.svg" alt="not available" style="margin:0px 5px; width:10%;"><span>'+NotExcited+
						    '<span><img src= "../../SiteAssets/ENG-Admin/images/Group 3266.svg" alt="not available" style="margin:0px 5px; width:10%;">'+NotSure+'<span>';      
							}   
						  },  
     
						
						//{"mData": "Status"}, 
						 {
							"render": function(data, type, row, meta ) {          
								var PublishDate = moment.utc(row.AutoPublishDateTime).format('DD MMM, YYYY hh:mm a');
								var Status = row.EventStatus;
								if(Status == "Autopublish"){
									return '<span id="event-pillar" class="'+row.EventStatus+'2">'+row.EventStatus+"<br>"+PublishDate+'</span>';
								}else{
									return '<span id="event-pillar" class="'+row.EventStatus+'2">'+row.EventStatus+'</span>';
								}
							}
						},

						
						{
													
							"render": function(data, type, row, meta ) {  
							var statusColumn = row.EventStatus;   
													
						
						if(statusColumn == "Published"){
								return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href= "https://amdocs.sharepoint.com/sites/EP/SitePages/EPAdmin/EditEvent.aspx?EventID='+row.ID+'"><i class="fa fa-pencil me-3" style="color:black;" id="editbtn"></i></a><a class="me-3"><i data-bs-toggle="modal" data-bs-target="#DeleteModal1" class="fa fa-trash" style="color:black;" id="Remove-Btn"  onclick="listItemId('+row.ID+')"/></a></div></div>';
						
							}else if(statusColumn == "Completed"){
								return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox" style="color: rgb(0, 0, 0);font-weight: bold;width: 91%;height: 35px;padding: 3px;"><a href="#"><i class="fa-solid fa-upload" style="color:black;" onclick="replaceVideo(this.id)" id="'+row.ID+'"></i></a><div style="height:17px;font-size:10px;margin-left:-8px;">Upload Media</div></div></div>';
						
							}else if(statusColumn == "Draft"){
								return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href= "https://amdocs.sharepoint.com/sites/EP/SitePages/EPAdmin/EditEvent.aspx?EventID='+row.ID+'"><i class="fa fa-pencil me-3" style="color:black;" id="editbtn"></i></a><a><i data-bs-toggle="modal" data-bs-target="#DeleteModal1" class="fa fa-trash" style="color:black;" id="Remove-Btn"  onclick="listItemId('+row.ID+')" ></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;margin-left: 9px;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></a></div></div>';
							}else{
							return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href= "https://amdocs.sharepoint.com/sites/EP/SitePages/EPAdmin/EditEvent.aspx?EventID='+row.ID+'"><i class="fa fa-pencil me-3" style="color:black;" id="editbtn"></i></a><a class="me-3"><i data-bs-toggle="modal" data-bs-target="#DeleteModal1" class="fa fa-trash" style="color:black;" id="Remove-Btn"  onclick="listItemId('+row.ID+')"/></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></a></div></div>';
						}

						}
						},

                     ]

                });

            }

            catch(e) { 

        alert(e.message); 

    }
}


function listItemId(id){
// alert(id);
 $("#Yes").click(function(){
						 RemoveListItem(id);
})
$("#okay").click(function(){
		location.reload();
})
						

}


function allDates(dat){
   log(dat)
};

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
        //alert("pillar:-",getPillar);
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
                //alert("Item Deleted " +myID);  
            },  
            error: function(data) {  
                //alert("failed");  
            }  
        });  
     
} 


/***********************************************************************************/
  

setInterval(GetAutoPublish, 10000);

function GetAutoPublish() {
 	var today = moment().format('YYYY-MM-DDTHH:mm:00'); 	
 	$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,EventStatus,AutoPublishDateTime&$filter=(EventStatus eq 'Autopublish') and ( AutoPublishDateTime le '"+today+"')&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
           var dataresults = data.d.results;
            console.log(dataresults);
				if(dataresults.length > 0){
               var AutoPublishDate =data.d.results[0].AutoPublishDateTime;               
               var Status = data.d.results[0].EventStatus;
               		var ID = data.d.results[0].ID;
               		console.log(AutoPublishDate +" "+ Status +" "+ ID);
               UpdatePublish(ID);
           			}	                 
        },
        error: function (xhr, status, error) {
            //console.log("Failed");
        }
    });
}

function UpdatePublish(EVid) {
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items("+EVid+")"
	var item = {
		__metadata: { 'type': 'SP.Data.EPEventListItem' },
  		"EventStatus":"Published"
  		//"AutoPublishDate" : ""
  	}
	//console.log(data);
	$.ajax({
		url: siteUrl,
		type: "POST",
		async:false,
		data: JSON.stringify(item),
		headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val(),
				"IF-MATCH": "*",           
				"X-HTTP-Method": "MERGE"

		},
		success: SuccessFunction,
		error: ErrorFunction
	});
}

function SuccessFunction(data) {
alert("test done");

//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function ErrorFunction(error) {
alert('Error!' +error.responseText);
}


setInterval(UpDateComplete, 45000);

function UpDateComplete() {
 	var today = moment().format('YYYY-MM-DDTHH:mm:00'); 	
 	$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,EventStatus,EventEndTime&$filter=(EventStatus eq 'Published') and ( EventEndTime le '"+today+"')&$orderby=Created desc",   
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
           var dataresults = data.d.results;
            console.log(dataresults);
				if(dataresults.length > 0){
               var AutoPublishDate = data.d.results[0].EventEndTime;               
               var Status = data.d.results[0].EventStatus;
               		var ID = data.d.results[0].ID;
               		console.log(AutoPublishDate +" "+ Status +" "+ ID);
               UpdateCompleted(ID);
           }		                 
        },
        error: function (xhr, status, error) {
            //console.log("Failed");
        }
    });
}

function UpdateCompleted(id) {
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items("+id+")"
	var item = {
		__metadata: { 'type': 'SP.Data.EPEventListItem' },
  		"EventStatus":"Completed",
  		//"AutoPublishDate" : ""
  	}
	//console.log(data);
	$.ajax({
		url: siteUrl,
		type: "POST",
		async:false,
		data: JSON.stringify(item),
		headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val(),
				"IF-MATCH": "*",           
				"X-HTTP-Method": "MERGE"

		},
		success: SuccessFunction,
		error: ErrorFunction
	});
}

function SuccessFunction(data) {
//alert("test done");

}

function ErrorFunction(error) {
alert('Error!' +error.responseText);
}

